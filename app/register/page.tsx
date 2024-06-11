"use client"
import Input from "@/app/components/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import AuthSocialButton from "@/app/components/auth-social-button";
import axios from "axios"
import Link from "next/link";
function Register() {
  let router = useRouter();
  const session = useSession();
  let [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    setLoading(true);
    await axios.post("/api/register",data)
    .then(()=>signIn("credentials",data))
    .catch((error)=>toast.error("something error"))
    .finally(()=>setLoading(false))
  }
  const socialAction = async(action: string) => {
   
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("invalid credential");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("logged in");
          // router.push("/users")
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div
      className={
        "flex items-center justify-center bg-white rounded-md flex-col gap-3 h-screen"
      }
    >
      <Input
      
        Icon={() => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
        )}
        type={"name"}
        placeholder={"name"}
        register={{...register("name")}}
        id={"name"}
      />
      <Input
        Icon={() => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
        )}
        type={"email"}
        placeholder={"Email"}
        register={{...register("email", {
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Email must be correctly",
          },
        })}}
        id={"email"}
      />
      <Input
        Icon={() => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
        )}
        type={"password"}
        placeholder={"password"}
        register={{...register("password", {
          required: "Password is required..",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "password must had to one  uppercase,one lowercase and one special character",
          },
        })}}
        id={"password"}
      />
      <div className="mt-6 flex gap-2">
        <AuthSocialButton
          Icon={BsGithub}
          onClick={() => socialAction("github")}
        />
        <AuthSocialButton
          Icon={BsGoogle}
          onClick={() => socialAction("google")}
        />
      </div>
      <button className={"btn bg-slate-200"} onClick={handleSubmit(onSubmit)}>register</button>
      <Link href="/login" className={"bg-slate-200"}>
        Already have account?
      </Link>
    </div>
  );
}
export default Register;
