import React, { useState, useEffect } from "react";

function Review() {
  const [postsToReview, setPostsToReview] = useState([]);

  useEffect(() => {
    const posts = [
      { id: 1, title: "첫 번째 포스트", lastRead: "2024-09-15" },
      { id: 2, title: "두 번째 포스트", lastRead: "2024-09-01" },
    ];
    setPostsToReview(posts.filter((post) => checkIfNeedsReview(post.lastRead)));
  }, []);

  const checkIfNeedsReview = (lastReadDate) => {
    const today = new Date();
    const lastRead = new Date(lastReadDate);
    const daysDiff = (today - lastRead) / (1000 * 60 * 60 * 24);
    return daysDiff > 30;
  };

  return (
    <div>
      <h2>Posts to Review</h2>
      <ul>
        {postsToReview.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Review;