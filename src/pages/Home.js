import React from "react";
import Post from "../components/Posts";

function Home() {
  const posts = [
    { id: 1, title: "첫 번째 포스트", summary: "포스트 요약...", tags: ["JavaScript", "CSS"] },
    { id: 2, title: "두 번째 포스트", summary: "다른 포스트 요약...", tags: ["React", "HTML"] },
  ];

  return (
    <div>
      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Home;