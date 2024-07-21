'use client'
import Link from "next/link"
import { CircleUser, Menu, OctagonAlert, Package2, Search } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import LoadingState from "@/components/LoadingState"
import { deleteStore, doesStoreNameExist, updateStoreName } from "./actions"
import { getStoreByUserId, getUser } from "@/actions/actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function Page() {

    const router = useRouter();
    const { toast } = useToast()
    const [selectedSection, setSelectedSection] = useState("general");
    const [newStoreName, setNewStoreName] = useState("");
    const [open, setOpen] = useState<boolean>(false);

    const handleChangeStoreName = async () => {
        try {
            setOpen(true);
            const storeNameExist = await doesStoreNameExist(newStoreName);
            if (storeNameExist) {
                toast({
                    title: 'This Store name is used',
                    description : 'try other one!',
                    variant: 'destructive',
                  });
                  setOpen(false);
                  return
            }
            const user = await getUser()
            const store = await getStoreByUserId(user!.id)
            const res = await updateStoreName(store.id , newStoreName)
            if(res){
                setOpen(false);
                toast({
                    title: 'Store name Was Successfully changed',
                    variant: 'default',
                  });
                router.refresh()
            }
            else {
                setOpen(false);
                toast({
                    title: 'Store name Was not changed',
                    variant: 'destructive',
                  });
                router.refresh()
            }
        } catch (error) {
            console.log(error)
            setOpen(false);
            toast({
                title: 'Error',
                variant: 'destructive',
                });
                console.log(error)
            
        }
    }


    return (
        <>
        <LoadingState isOpen={open} />


            <div className="flex min-h-screen w-full flex-col">
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Settings</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav
                            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                        >
                            <Link href="#" className={`font-semibold ${selectedSection === "general" ? "text-primary" : ""}`} onClick={() => setSelectedSection("general")}>
                                General
                            </Link>
                        </nav>
                        <div className="grid gap-6">
                            {selectedSection === "general" && (
                                <Card x-chunk="dashboard-04-chunk-1">
                                    <CardHeader>
                                        <CardTitle>Store Name</CardTitle>
                                        <CardDescription>
                                            Change your store name.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    <Input 
                                            placeholder="New Store Name" 
                                            value={newStoreName}
                                            onChange={(e) => setNewStoreName(e.target.value)}
                                        />                                    </CardContent>
                                    <CardFooter className="border-t px-6 py-4">
                                        <Button onClick={handleChangeStoreName}>Change</Button>
                                    </CardFooter>
                                </Card>
                            )}
                            
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
