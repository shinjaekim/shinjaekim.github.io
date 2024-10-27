import React from "react";

function Post({ title, summary, tags }) {
  return (
    <article className="post">
      <h3>{title}</h3>
      <p>{summary}</p>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default Post;