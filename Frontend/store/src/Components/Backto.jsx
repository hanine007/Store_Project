import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
export const Backto =()=>{
return(
<div className="flex">
<Link to="/" className="bg-blue-500 text-white px-4 rounded-md">
<BsArrowLeft className=" text-4xl" />
</Link>
</div>
)
}