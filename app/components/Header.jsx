"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { CgProfile } from "react-icons/cg";
import {app} from "@/lib/firebaseConfig";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  const saveUserInfo = useCallback(async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session?.user?.email), {
        userName: session?.user?.name,
        email: session?.user?.email,
      });
    }
  }, [db,session?.user]);
  useEffect(() => {
    saveUserInfo();
  }, [session,saveUserInfo]);
  return (
    <div className="navbar  bg-white">
      <a
        className="btn btn-ghost text-xl"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image width={20} height={20} src={logo} alt="logo" />
      </a>

      <a className="btn btn-ghost text-xl" onClick={() => router.push("/")}>
        Home
      </a>

      <a
        className="btn btn-ghost text-xl"
        onClick={() => {
          if (session?.user) {
            router.push("/pin-builder");
          } else {
            router.push("/login");
          }
        }}
      >
        Create
      </a>

      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-100 bg-slate-300"
        />
      </div>

      <div className="flex-1 justify-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <IoIosNotificationsOutline size={30} />
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        {!Boolean(session?.user) && (
          <Link className="btn" href={"/login"}>
            Login
          </Link>
        )}
        <div className="dropdown dropdown-end">
          {session?.user && (
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => router.push(`/${session?.user?.email}`)}
            >
              <div className=" rounded-full">
                <CgProfile className="text-lg" />
                {/* <img
                alt="Tailwind CSS Navbar component"
                src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
              /> */}
              </div>
            </div>
          )}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
