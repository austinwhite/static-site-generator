#!/usr/bin/env node

import { getStylesheetTag } from "./util.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require("fs");
const matter = require("gray-matter");
const md = require("markdown-it")()
  .use(require("markdown-it-katex"), { output: "html", throwOnError: true })
  .use(require("markdown-it-imsize"), { autofill: true })
  .use(require("markdown-it-highlightjs"));

function writeHtmlDocument(title, summary, body, stylesheets) {
  return (
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
      '<head>\n' +
        '<meta charset="utf-8">\n' +
        '<meta name="description" content="' + summary + '">\n' +
        '<meta name="viewport" content="width=device-width">\n' +
        '<title>' + title + '</title>\n' +
        stylesheets.map(getStylesheetTag).join(' ') + '\n' +
        '<link rel="shortcut icon" href="site_files/favicon.ico">\n' +
      '</head>\n' +
      '<body>\n' +
        body + '\n' +
      '</body>\n' +
    '</html>'
  );
}

export function formatPost(postPath, stylesheets) {
  fs.existsSync(postPath);

  let frontMatter = matter(fs.readFileSync(postPath));
  let mdContent = frontMatter.content;
  let title = frontMatter.data.title;
  let tags = frontMatter.data.tags;
  let date = frontMatter.data.date;
  let summary = frontMatter.data.summary;

  if (
    mdContent == null ||
    title == null ||
    tags == null ||
    date == null ||
    summary == null
  ) {
    throw new Error("invalid front matter in file " + postPath);
  }

  mdContent = "# " + title + mdContent;

  let parsedHtml = "<article>" + md.render(mdContent) + "</article>";
  let htmlDocument = writeHtmlDocument(title, summary, parsedHtml, stylesheets);

  return htmlDocument;
}
