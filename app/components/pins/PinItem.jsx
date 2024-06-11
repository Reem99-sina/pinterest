import UserTag from "../UserTag"
import Image from 'next/image'
import {useRouter} from "next/navigation"
function PinItem({pin}) {
   let router= useRouter()
  return (
    <div className="text-center" onClick={()=>router.push(`/pin/${pin.id}`)}>
    <div className="relative 
       before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-gray-600 
       before:opacity-50
       before:inset-0
       cursor-pointer
       " 
    style={{backgroundImage:`url(${pin.image})`}}>
       <Image src={pin.image}
        alt={pin.title}
        width={500}
        height={500}
        className='rounded-3xl 
        cursor-pointer relative z-0'
        />
    
    </div>
    <h2 className="text-black font-semibold ">
        {pin.title}
        </h2>
        <UserTag user={pin}/>
    </div>
  )
}
export default PinItem