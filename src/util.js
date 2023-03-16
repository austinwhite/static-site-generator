#!/usr/bin/env node

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const matter = require("gray-matter");
const fs = require("fs");

export function getStylesheetTag(stylesheet) {
  return '<link rel="stylesheet" href=../../site/rsc/' + stylesheet + ">";
}

export function getPostMetadata(postPath) {
  return null;
}
