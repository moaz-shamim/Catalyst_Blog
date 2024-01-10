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
    <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100 bg-gray-50 text-gray-800 flex flex-col items-center prose">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded pb-5">
        <img
          src={storageService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-60 sm:h-96 dark:bg-gray-500 object-cover"
        />
      </div>

      {isAuthor && (
        <div className="absolute right-10 top-29">
          <Link to={`/edit-post/${post.$id}`}>
            <Button className="inline-flex items-center p-2 m-2 justify-center w-15 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 bg-violet-600  dark:text-violet-400 text-gray-100 dark:border-violet-400 border-gray-900">
              Edit
            </Button>
          </Link>

          <Button
            className="inline-flex items-center p-2 m-2 justify-center w-15 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 bg-violet-600  dark:text-violet-400 text-gray-100 dark:border-violet-400 border-gray-900"
            onClick={deletePost}
          >
            Delete
          </Button>
        </div>
      )}

      <div className="w-full mb-6 flex flex-row">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>

      <div className="w-full">{parse(post.content)}</div>

      <div className="w-full mb-6 flex flex-row-reverse">
        <span className="hover:underline dark:text-gray-400">
          {post.userName}
        </span>
        <p className=" dark:text-violet-400 text-violet-600">Created By : &nbsp; </p>
      </div>

    </div>
  ) : null;
}
