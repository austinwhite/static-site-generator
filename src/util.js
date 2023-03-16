#!/usr/bin/env node

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const matter = require("gray-matter");
const fs = require("fs");

export function getStylesheetTag(relativePath, stylesheet) {
  return '<link rel="stylesheet" href=' + relativePath + "/" + stylesheet + ">";
}

export function getPostMetadata(postPath) {
  let frontMatter = matter(fs.readFileSync(postPath));
  let mdContent = frontMatter.content;
  let title = frontMatter.data.title;
  let tags = frontMatter.data.tags;
  let date = frontMatter.data.date;
  let summary = frontMatter.data.summary;

  if (!mdContent || !title || !tags || !date || !summary) {
    throw new Error("invalid front matter in file " + postPath);
  }

  mdContent = "# " + title + mdContent;

  return { mdContent, title, tags, date, summary };
}
