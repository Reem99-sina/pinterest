import PinItem from "./PinItem"
function PinsList({lists}){
    
return (
<div className="mt-7 px-2 md:px-5
     columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-auto">
    {lists.map((ele,index)=><PinItem pin={ele}key={index}/>)}
</div>
)
}
export default PinsList