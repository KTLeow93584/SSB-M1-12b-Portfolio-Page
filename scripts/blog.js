import { blogPosts } from "./blog-post-list.js";

// Max Column Size for Bootstrap to Overflow: 12.
const sizePerColumn = 4;
const blogThumbnailBaseURL = "images/blog-thumbnails";

export function loadBlogPostSection() {
  const experienceElement = document.getElementById("blog-post-list");
  let result = "";

  for (let i = 0; i < blogPosts.length; ++i) {
    const blogPost = blogPosts[i];
    
    result += `
      <div id="blog-post-${i+1}" class="blog-post col-lg-${sizePerColumn} px-2 pb-5 mx-auto">
        <div class="row">
          <img src="${blogThumbnailBaseURL}/${blogPost.thumbnail}" alt="" class="rounded">
          <a href="#blog-post-${i+1}" class="fs-2 thin-underline  base-text">${blogPost.headline}</a>
          <p class="fs-6 mt-2 base-text">${blogPost.summary}</p>
          <a href="#blog-post-${i+1}" class="fs-6 text-decoration-none interactable-theme">Read More →</a>
        </div>
      </div>
    `;
  }

  experienceElement.innerHTML += result;
}