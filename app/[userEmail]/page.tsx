"use client"
import {useEffect,useState} from "react"
import { getFirestore,getDoc,doc, query,collection,getDocs,where } from 'firebase/firestore'
import app from "@/lib/firebaseConfig"
import UserInfo from "@/app/components/userInfo"
import PinsList from "@/app/components/pins/PinList"
function Profile({params}:{params:{userEmail:string}}) {
    let [userInfo,setUserInfo]=useState()
    let [Listpins,setListpins]=useState([])

    const db=getFirestore(app)
  
    const getDocumentUser=async()=>{
        const q = query(collection(db, "pinterest-post"), where("email", "==", userInfo?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((item)=>setListpins(Listpins=>([...Listpins,item.data()])))

    }
    const getUserDoc=async(email:string)=>{
        const docRef=await getDoc(doc(db,"user",email))
        if(docRef?.data()){
            setUserInfo(docRef?.data())
        }
        
        console.log(docRef?.data(),"docRef")
    }
useEffect(()=>{
if(params?.userEmail){
    getUserDoc(params?.userEmail.replace("%40","@"))
    console.log(params?.userEmail.replace("%40","@"),"params?.userEmail")
}
},[params])
useEffect(()=>{
    if(userInfo?.email){
        getDocumentUser()
    }
},[userInfo])
  return (
    <div className={"flex items-center justify-center bg-white rounded-md flex-col gap-3 h-screen"}>
        {userInfo&&<UserInfo userInfo={userInfo}/>}
        {userInfo&&<PinsList lists={Listpins}/>}
    </div>
  )
}
export default Profile