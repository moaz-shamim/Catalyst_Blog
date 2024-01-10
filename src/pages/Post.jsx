import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/dataBase";
import storageService from "../appwrite/storage";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100  text-gray-800 flex flex-col items-center">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded pb-5">
        <img
          src={storageService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-60 sm:h-96 dark:bg-gray-500 object-cover"
        />
      </div>

      <div className="prose dark:prose-invert ">
        <div className="w-full mb-6 flex flex-row">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <div className="w-full">{parse(post.content)}</div>

        <div className="w-full mb-6 flex flex-row justify-between ">
          <p className=" dark:text-violet-400  text-violet-600">
            Created By : &nbsp;{" "}
            <span className="hover:underline text-gray-800 dark:text-gray-400">
              {post.userName}
            </span>
          </p>

          {isAuthor && (
            <div className="inline-flex items-center w-24 justify-between p-2 m-2 ">
              <Link to={`/edit-post/${post.$id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="mdi-file-document-edit-outline"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className=" dark:text-violet-400 text-violet-600 hover:text-green-600 hover:dark:text-green-400"
                >
                  <path
                    d="M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>

              <button>
                <svg
                  version="1.1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="svg-icon text-violet-600 dark:text-violet-400 hover:text-red-600 hover:dark:text-red-400" // Tailwind CSS classes for text color
                  onClick={deletePost}
                >
                  <path
                    d="M15,16H19V18H15V16M15,8H22V10H15V8M15,12H21V14H15V12M11,10V18H5V10H11M13,8H3V18A2,2 0 0,0 5,20H11A2,2 0 0,0 13,18V8M14,5H11L10,4H6L5,5H2V7H14V5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
