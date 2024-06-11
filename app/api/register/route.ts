import prisma from "@/lib/prismadb"
import {NextResponse} from "next/server"
import bcrypt from "bcrypt"
export async function POST(request:Request){
    try{
        const body = await request.json()
        const {name,email,password}=body
        if(!name||!email){
            return new NextResponse("Missing info",{status:400})
        }
        const hashpassword=await bcrypt.hash(password,12)

        const user=await prisma.user.create({
            data:{
                email,
                password:hashpassword,
                name
            }
        })
        return NextResponse.json(user)
    }catch(error){
       
        return new NextResponse("internal error",{status:500})

    }
    
}