import UserTag from "../UserTag";
import Image from "next/image";
import { useRouter } from "next/navigation";
function PinItem({ pin }) {
  let router = useRouter();
  return (
    <div
      className="text-center flex flex-col bg-white shadow-lg justify-around p-4 rounded-md"
      onClick={() => router.push(`/pin/${pin.id}`)}
    >
      <div
        className="flex items-center justify-center relative 
       before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-gray-600 
       before:opacity-50
       before:inset-0
       cursor-pointer
       "
       
      >
        <Image
          src={pin.image}
          alt={pin.title}
          width={200}
          height={200}
          className="rounded-3xl  w-full
        cursor-pointer relative z-0"
        />
      </div>

      <UserTag user={pin}>
        <h2 className="text-black font-semibold ">{pin.title}</h2>
      </UserTag>
    </div>
  );
}
export default PinItem;
