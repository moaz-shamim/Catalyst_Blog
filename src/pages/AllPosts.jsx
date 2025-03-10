import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/dataBase";
import { useSelector } from "react-redux";

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [input, setInput] = useState();

	// console.log(input);

	useEffect(() => {
		setIsLoading(true);
		databaseService
			.getPosts()
			.then((posts) => {
				if (posts) {
					console.log("posts", posts);
					setPosts(posts.documents);
				}
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				setPosts([]);
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return (
			<div className="w-full h-[60vh] flex items-center justify-center">
				<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>{" "}
			</div>
		);
	}

	return (
		<div className="w-full py-8">
			<Container>
				<section className="dark:bg-gray-800 dark:text-gray-100  ">
					<div className="container max-w-6xl  mx-auto space-y-6 sm:space-y-12">
						<div className="container max-w-6xl space-y-6 sm:space-y-12">
							<input
								type="text"
								placeholder="Search by User Name"
								className="w-full sm:w-auto py-2 text-sm rounded-md focus:ring-1 focus:ring-violet-500 dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 border-double border-2 border-violet-400 focus:border-violet-200"
								value={input}
								onChange={(event) => setInput(event.target.value)}
							/>
						</div>

						<div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{input
								? (() => {
										const filterPosts = posts.filter((post) => {
											return post.userName.toLowerCase().includes(input.toLowerCase());
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
								  ))}
						</div>
					</div>
				</section>
			</Container>
		</div>
	);
}
