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
  fs.existsSync("./posts");

  const postDirs = fs
    .readdirSync("./posts", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return postDirs.map((post) => path.join("posts", post, post + ".md"));
}

function main() {
  fs.rmSync("site", { recursive: true, force: true });
  fs.mkdirSync("site/posts/images", { recursive: true });
  fs.mkdirSync("site/rsc", { recursive: true });
  fs.cpSync("site_files", "site/rsc", { recursive: true });

  const postPaths = getPostPaths();

  fs.writeFileSync(
    "site/index.html",
    generateIndex(indexStylesheets, postPaths)
  );

  for (let i = 0; i < postPaths.length; i++) {
    const postPath = postPaths[i];
    const fileName = postPath.split(path.sep)[2].split(".")[0];

    fs.writeFileSync(
      "site/posts/" + fileName + ".html",
      formatPost(postPath, postStylesheets)
    );
  }
}
