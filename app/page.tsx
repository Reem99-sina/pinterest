"use client"
import Image from "next/image";
import {signIn,useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import {useEffect,useState} from "react"
import app from "@/lib/firebaseConfig"
import PinsList from "@/app/components/pins/PinList"
import { getFirestore,getDoc,doc, query,collection,getDocs,where } from 'firebase/firestore'
export default function Home() {

  const { data: session, status } = useSession()
  let router=useRouter()
  let [Listpins,setListpins]=useState([])
  const db=getFirestore(app)
  const getDocumentUser=async()=>{
    const q = query(collection(db, "pinterest-post"), where("email", "==", session?.user?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item)=>setListpins(Listpins=>([...Listpins,item.data()])))

}
  useEffect(()=>{
     if(status!="authenticated"){
      router.push("/login") 
    }else{
      router.push("/") 
    }
  },[status,session])
  useEffect(()=>{
    if(session?.user?.email){
        getDocumentUser()
    }
},[session?.user?.email])
  return (
 <div className="h-screen">
 {<PinsList lists={Listpins}/>}
 </div>
  );
}
