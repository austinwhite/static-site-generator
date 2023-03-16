import { formatPost } from "./format-post.js";
import { generateIndex } from "./format-index.js";
import * as fs from "fs";
import * as path from "path";

const indexStylesheets = ["index.css", "global.css"];

const postStylesheets = [
  "github.css",
  "katex.min.css",
  "global.css",
  "posts.css",
];

main();

function getPostPaths() {
  if (!fs.existsSync("./posts")) {
    throw new Error("posts directory does not exist.");
  }

  const postDirs = fs
    .readdirSync("posts", { withFileTypes: true })
    .filter((dirent) => dirent.name.endsWith(".md"))
    .filter((dirent) => dirent.name != "README.md")
    .map((dirent) => dirent.name);

  return postDirs.map((post) => path.join("posts", post));
}

function main() {
  fs.rmSync("site", { recursive: true, force: true });
  fs.mkdirSync("site/posts/images", { recursive: true });
  fs.mkdirSync("site/rsc", { recursive: true });
  fs.cpSync("site_files", "site/rsc", { recursive: true });
  fs.cpSync("posts/images", "site/posts/images", { recursive: true });

  const postPaths = getPostPaths();

  fs.writeFileSync(
    "site/index.html",
    generateIndex(indexStylesheets, postPaths)
  );

  postPaths.map((postPath) => {
    const fileName = postPath.split(path.sep)[1].split(".")[0];

    fs.writeFileSync(
      "site/posts/" + fileName + ".html",
      formatPost(postPath, postStylesheets)
    );
  });
}
