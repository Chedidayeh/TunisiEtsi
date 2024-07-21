import {PrismaAdapter} from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/db"
import { getUserById } from "./userData/user"
import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { UserType } from "@prisma/client"

// Extend the `Session` interface to include `role` and `id`
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserType
    } & DefaultSession["user"];
  }
}

 
declare module "next-auth/jwt" {
  interface JWT {
    role?: UserType
  }
}




export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token,session }) {
      if(token.sub && session.user){
        session.user.id = token.sub
      }

      if(token.role && session.user){

        session.user.role = token.role
      }


      return session
    },
    async jwt ({token}) {
      if(!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token
      token.role = existingUser.userType

      return token
    },
  },
  adapter : PrismaAdapter(db),
  session : {strategy : "jwt"},
  ...authConfig,
})