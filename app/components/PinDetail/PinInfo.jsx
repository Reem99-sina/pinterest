import React from "react";
import UserTag from "../UserTag";
import dynamic from "next/dynamic";
const useShareWindow = dynamic(() => import("../share-window"), {
  ssr: false, // Disable Server-Side Rendering (SSR)
});

function PinInfo({ pinDetail }) {
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage,
  };
   const windowCustom = useShareWindow();
  return (
    <div className="text-black">
      <h2 className="text-[30px] font-bold mb-10">{pinDetail.title}</h2>
      <UserTag user={user} />
      <h2 className="mt-10">{pinDetail.desc}</h2>
      <button
        className="p-2 bg-[#e9e9e9] px-5 text-[23px]
      mt-10 rounded-full hover:scale-105 transition-all"
        onClick={() => windowCustom?.open(pinDetail.link)}
      >
        Open Url
      </button>
    </div>
  );
}

export default PinInfo;
