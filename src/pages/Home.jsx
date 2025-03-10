import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/dataBase";
import storageService from "../appwrite/storage";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Home() {
  const [posts, setPosts] = useState([]);
  console.log("posts",posts);
  
  const [isLoading, setIsLoading] = useState(true);
  const userStatus = useSelector((state) => state.auth.status);
  const location = useLocation();
  const navigate = useNavigate();
  const filteredData = location.state ? location.state.data : null;
  const filteredPosts = filteredData ? posts.filter((post) => post.category === filteredData) : posts.filter((post) => post.category === "Web Tech"); 
  const firstPost = filteredPosts[0];
  const restPost = filteredPosts.slice(1);


  useEffect(() => {
    setIsLoading(true)
    databaseService.getPosts([])
    .then((posts) => {
      if (posts) {
        console.log("posts",posts);
        setPosts(posts.documents);
      } else {
        setPosts([]);
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error);
      setPosts([]);
    })
    .finally(() => setIsLoading(false));
  }, [userStatus]);


  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="w-full  mt-4 text-center">
        <Container>
          <section className=" dark:bg-gray-800 dark:text-gray-50">
            <div className="container mx-auto flex flex-col items-center justify-center p-6 space-y-8 md:p-10 md:px-24 xl:px-48  mb-7">
              <h1 className="text-5xl font-bold leadi text-center text-violet-600 dark:text-violet-400">
                Login to Read Posts.
              </h1>
              <p className="text-xl font-medium text-center text-grey-900">
                Get Started to write Blog on this Blog application Start
                Creating a simple blog article ,Easy-to-understand app for
                smooth use.
              </p>
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
                <button
                  className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 bg-violet-600 text-gray-100 dark:text-gray-900"
                  onClick={() => navigate("/login")}
                >
                  Get started
                </button>
              </div>
            </div>
          </section>
        </Container>
      </div>
    );
  }

  // {filteredData ?}
  return (
    <div className="w-full ">
      <section className="dark:bg-gray-800 dark:text-gray-100 bg-gray-100 text-gray-800">
        {/* {location.state.data ? :() } */}
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          <Link
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900 bg-gray-50"
            to={`/post/${firstPost.$id}`}
          >
            <img
              src={storageService.getFilePreview(firstPost.featuredImage)}
              alt=""
              className=" w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500 bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                {firstPost.title}
              </h3>

              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <span className="self-center text-xs dark:text-gray-400 text-gray-600">
                    Created at : {firstPost.$createdAt.slice(0, 10)}
                  </span>
                  <span className="self-center text-xs dark:text-gray-400 text-gray-600 ">
                    {firstPost.$createdAt.slice(11, 16)}
                  </span>
                </div>
              </div>

              <p class="overflow-hidden max-h-36">{parse(firstPost.content)}</p>

              <div className="flex space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 dark:text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="self-center text-sm">
                  by {firstPost.userName}
                </span>
              </div>
            </div>
          </Link>

          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restPost.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
