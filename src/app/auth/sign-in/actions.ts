'use server'

import * as z from "zod"
import { LoginSchema } from "../schemas"
import {signIn} from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { db } from "@/db"
import { getUserByEmail } from "@/userData/user"
import { User } from "@prisma/client"
import crypto from 'crypto';
import { sendResetPassEmail } from "@/lib/mailer"


export const login = async (values: z.infer<typeof LoginSchema> , redirectUrl : string | null) => {
    // Validate the fields using Zod schema
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!", success : "" };
    }

    // Destructure email and password from validated data if data is defined
        const { email, password } = validatedFields.data;

        try {

            // Fetch the user by email
            const user = await getUserByEmail(email)
        
            if (!user) {
                return { error: "No account found!", success: "" };
            }
        
            // Check if the user's email is verified
            if (!user.emailVerified) {
                return { error: "Email not verified!", success: "" };
            }

            // Attempt to sign in with credentials
            await signIn("credentials", {
                email: email,
                password: password,
                redirect : false
            });



            // Return success if signIn doesn't throw an error
            return { success: "Login successful!", error : ""};
        } catch (error) {
            // Handle authentication errors
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: "No account found !" ,
                            success : ""
                        };
                    default:
                        return { error: "Unknown error!",  success : "" };
                }
            }
            // Throw other errors
            throw error;
        }

      
};

export const resetPassword = async (user: User) => {
    try {
        const resetPassToken = crypto.randomBytes(32).toString('hex');

        await db.user.update({
            where: { id: user.id },
            data: {
                resetPassToken,
            },
        });

        // Send verification token email
        await sendResetPassEmail(user.email, user.username, resetPassToken);

        return true;
    } catch (error) {
        console.error("Error resetting password:", error);
        return false;
    }
};



