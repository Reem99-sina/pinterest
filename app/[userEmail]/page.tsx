"use client";
import { useCallback, useEffect, useState } from "react";
import {
  getFirestore,
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import {app} from "@/lib/firebaseConfig";
import UserInfo from "@/app/components/userInfo";
import PinsList from "@/app/components/pins/PinList";
function Profile({ params }: { params: { userEmail: string } }) {
  let [userInfo, setUserInfo] = useState<any>();
  let [Listpins, setListpins] = useState<any[]>([]);

  const db = getFirestore(app);
 

  const getDocumentUser = useCallback(async () => {
    const q = query(
      collection(db, "pinterest-post"),
      where("email", "==", userInfo?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) =>
      setListpins((Listpins) => [...Listpins, item.data()])
    );
  }, [db,userInfo?.email]);

  const getUserDoc = useCallback(async (email: string) => {
    const docRef = await getDoc(doc(db, "user", email));
    if (docRef?.data()) {
      setUserInfo(docRef?.data());
    }
  }, [db]);
  useEffect(() => {
    if (params?.userEmail) {
      getUserDoc(params?.userEmail.replace("%40", "@"));
    }
  }, [params,getUserDoc]);
  useEffect(() => {
    
    if (userInfo?.email) {
      getDocumentUser();
    }
  }, [userInfo?.email,getDocumentUser]);
  return (
    <div
      className={
        "flex items-center justify-center bg-mainColor rounded-md flex-col gap-3 min-h-screen"
      }
    >
      {userInfo && <UserInfo userInfo={userInfo} />}
      {userInfo && <PinsList lists={Listpins} />}
    </div>
  );
}
export default Profile;
