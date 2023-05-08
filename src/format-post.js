#!/usr/bin/env node

import { getPostMetadata, getStylesheetTag } from './util.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const fs = require('fs')
const md = require('markdown-it')()
  .use(require('markdown-it-katex'), { output: 'html', throwOnError: true })
  .use(require('markdown-it-imsize'), { autofill: true })
  .use(require('markdown-it-highlightjs'))

function writeHtmlDocument(title, summary, body, stylesheets) {
  return (
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '<meta charset="utf-8">\n' +
    '<meta name="description" content="' +
    summary +
    '">\n' +
    '<meta name="viewport" content="width=device-width">\n' +
    '<title>' +
    title +
    '</title>\n' +
    stylesheets
      .map((stylesheet) => getStylesheetTag('../rsc', stylesheet))
      .join(' ') +
    '\n' +
    '<link rel="shortcut icon" href="../rsc/favicon.ico">\n' +
    '</head>\n' +
    '<body>\n' +
    body +
    '\n' +
    '</body>\n' +
    '</html>'
  )
}

export function formatPost(postPath, stylesheets) {
  if (!fs.existsSync(postPath)) {
    throw new Error(postPath + ' does not exist.')
  }

  const { mdContent, title, summary } = getPostMetadata(postPath)

  let parsedHtml = '<article>' + md.render(mdContent) + '</article>'
  let htmlDocument = writeHtmlDocument(title, summary, parsedHtml, stylesheets)

  return htmlDocument
}
