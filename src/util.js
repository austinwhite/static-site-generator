#!/usr/bin/env node

export function getStylesheetTag(stylesheet) {
  return '<link rel="stylesheet" href=site/rsc/styles/' + stylesheet + ">";
}

export function getPostMetadata(postPath) {
  return null;
}
