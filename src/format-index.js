#!/usr/bin/env node

import { getStylesheetTag, getPostMetadata } from "./util.js";
import { topBar } from "./top-bar.js";
import * as fs from "fs";

function getHeroImagePath(postPath) {
  const postImagesPath = "posts/images/" + postPath.split(/[/.]+/)[1];
  const heroImageName = fs
    .readdirSync(postImagesPath)
    .filter((dirent) => dirent.startsWith("hero."));

  return postImagesPath + "/" + heroImageName;
}

function convertDate(date) {
  date = date.split("-");

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "Septmenber",
    10: "October",
    11: "November",
    12: "December",
  };

  return months[parseInt(date[0])] + " " + date[1] + ", " + date[2];
}

function sortPosts(postPaths) {
  postPaths.sort((a, b) => {
    let { date: aDate } = getPostMetadata(a);
    let { date: bDate } = getPostMetadata(b);
    aDate = Math.floor(new Date(aDate).getTime() / 1000);
    bDate = Math.floor(new Date(bDate).getTime() / 1000);

    return bDate > aDate ? 1 : -1;
  });
}

function getFront(stream, stylesheets) {
  stream.push("<!DOCTYPE html>\n");
  stream.push(
    '<meta content="width=device-width, initial-scale=1.0" name="viewport">\n'
  );
  stream.push('<html lang="en">\n');
  stream.push("<head>\n");
  stream.push(
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n'
  );
  stream.push(
    '<meta name="description" content="The personal website of Austin White">\n'
  );
  stream.push("<title>Austin White</title>\n");
  stream.push('<link rel="shortcut icon" href="../site/rsc/favicon.ico">\n');
  stream.push(
    stylesheets
      .map((stylesheet) => getStylesheetTag("../site/rsc", stylesheet))
      .join("\n") + "\n"
  );
  stream.push("</head>\n");
}

function generateBody(stream, postPaths) {
  sortPosts(postPaths);

  stream.push("<body>\n");
  stream.push("<div class='container'>\n");

  stream.push("<header>\n");
  topBar(stream);
  stream.push("</header>\n");

  postPaths.map((postPath) => {
    const { title, date, summary } = getPostMetadata(postPath);
    const heroImagePath = getHeroImagePath(postPath);
    const htmlPath = postPath.replace(".md", ".html");

    stream.push("<div class='post'>\n");
    stream.push("<div class='hero'>\n");
    stream.push('<a href="' + htmlPath + '">\n');
    stream.push("<div class='img-container'>");
    stream.push(
      '<img src="' + heroImagePath + '" class="clip" alt="' + title + '">\n'
    );
    stream.push("</div>\n");
    stream.push("</a>\n");
    stream.push("</div>\n");
    stream.push("<div class='postInfo'>\n");
    stream.push("<div class='title'>\n");
    stream.push(
      '<a href="' + htmlPath + '"><strong>' + title + "</strong></a>\n"
    );
    stream.push("</div>\n");
    stream.push("<div class='date'>\n");
    stream.push("<small>" + convertDate(date) + "</small>");
    stream.push("</div>\n");
    stream.push("<div class='summary'>\n");
    stream.push(summary + "\n");
    stream.push("</div>\n");
    stream.push("</div>\n");
    stream.push("</div>\n");
  });

  stream.push("</div>\n");
  stream.push("</body>\n");
}

function getBack(stream) {
  stream.push("</html>\n");
}

export function generateIndex(stylesheets, postPaths) {
  let indexPageStream = [];

  getFront(indexPageStream, stylesheets);
  generateBody(indexPageStream, postPaths);
  getBack(indexPageStream);

  return indexPageStream.join("");
}
