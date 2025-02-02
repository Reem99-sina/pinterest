"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";

function UserTag({ user, children }) {
  //const {data:session}=useSession();

  return (
    <div className=" py-4">
      {user ? (
        <div
          className="flex gap-3 
       items-center"
        >
          {user.image && (
            <Image
              src={user.image}
              alt="userImage"
              width={45}
              height={45}
              className="rounded-full"
            />
          )}
          {!user.image && <CgProfile className="text-lg" />}
          <div>
            {children}
            <h2 className="text-[14px] font-medium">{user.name}</h2>
            <h2 className="text-[12px]">{user.email}</h2>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserTag;
