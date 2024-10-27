import React from "react";

function Tags() {
  const tags = ["JavaScript", "CSS", "React", "HTML"];

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <a href={`#${tag}`}>{tag}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tags;