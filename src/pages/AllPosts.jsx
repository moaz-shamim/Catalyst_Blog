import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/dataBase";
import { useSelector } from "react-redux";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const [input, setInput] = useState();

  // console.log(input);

  useEffect(() => {
    databaseService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
  

        <section className="dark:bg-gray-800 dark:text-gray-100 ">
        {authStatus && (
          <div className="container max-w-6xl pl-6  space-y-6 sm:space-y-12 ">
   
            <input
              type="text"
              placeholder="Search..."
              className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 border-double border-4 border-violet-400"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
        )}

          <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12 ">

            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
              {input
                ? (() => {
                    const filterPosts = posts.filter((post) => {
                      return post.userName === input;
                    });


                    return filterPosts.map((post) => (
                      <div key={post.$id}>
                        <PostCard {...post} />
                      </div>
                    ));
                  })()
                : posts.map((post) => (
                    <div key={post.$id}>
                      <PostCard {...post} />
                    </div>
                  ))
                }

            
            </div>

          </div>
        </section>
      </Container>
    </div>
  );
}
