#!/usr/bin/env node

import { getStylesheetTag } from "./util.js";

function generateBody(stream, postPaths) {
  stream.push("<body>\n");

  for (let i = 0; i < postPaths.length; i++) {
    stream.push(postPaths[i] + "\n");
  }

  stream.push("</body>\n");
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
  stream.push('<link rel="shortcut icon" href="site_files/favicon.ico">\n');
  stream.push(stylesheets.map(getStylesheetTag).join("\n") + "\n");
  stream.push("</head>\n");
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
