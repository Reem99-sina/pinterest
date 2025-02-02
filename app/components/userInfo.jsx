import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineMail } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
function UserInfo({ userInfo }) {
  let router = useRouter();
  const { data: session, status } = useSession();
  return (
    <div className="text-center">
      <UserInfo />
      <h2 className="text-[30px] font-semibold text-black">
        {userInfo?.userName}
      </h2>
      <h2 className="text-gray-400 flex items-center gap-3">
        <MdOutlineMail />
        {userInfo?.email}
      </h2>
      <button className="bg-gray-300 p-3 rounded-full text-black font-semibold mt-5 flex items-center gap-3">
        <FaShareAlt />
        share
      </button>
      {session?.user ? (
        <button
          className="bg-gray-300 p-3 rounded-full text-black font-semibold mx-5"
          onClick={() => {
            signOut();
            router.push("/login");
          }}
        >
          logout
        </button>
      ) : null}
    </div>
  );
}
export default UserInfo;
