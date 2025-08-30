import storageService from "../appwrite/storage";
import { Link } from "react-router-dom";
import parse from "html-react-parser";



export default function PostCard(
    { $id,
      title, 
      featuredImage,
      content,
      $createdAt,
      userName
     }) {



  return (
    <Link to={`/post/${$id}`}>
    <div  className="max-w-sm  mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 bg-gray-50 ">
      <img
        src={storageService.getFileView(featuredImage)}
        alt={title}
        className="object-cover w-full rounded h-44 dark:bg-gray-700 bg-gray-500"
      />
      <div class="px-6 py-4">
      <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">  {title.length > 26 ? title.slice(0, 24) + '...' : title}
      </h3>

         {/* <div class="font-bold text-xl mb-2 text-white"> {title}</div> */}
     

      <p class="overflow-hidden h-36  max-h-36">{parse(content)}</p>
      <p className=" dark:text-violet-400 text-violet-600">Read more...</p>

      <div className="flex justify-between space-x-2 my-2">
				
        <span className="self-center text-xs dark:text-gray-400 text-gray-600">Created at :  {$createdAt.slice(0,10)}</span>
      <span className="self-center text-xs dark:text-violet-400 text-violet-600">By: &nbsp;{userName}</span>
     
      </div>

      </div>

    </div>
    </Link>

  );
}
