#!/usr/bin/env node

const fs = require("fs");
const matter = require("gray-matter");
const md = require("markdown-it")()
  .use(require("markdown-it-katex"), { output: "html", throwOnError: true })
  .use(require("markdown-it-imsize"), { autofill: true })
  .use(require("markdown-it-highlightjs"));

main();

function get_stylesheet_tag(href){
  return '<link rel="stylesheet" href=' + href + '>';
}

function write_html_document(title, summary, body, stylesheets) {
  return (
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
      '<head>\n' +
        '<meta charset="utf-8">\n' +
        '<meta name="description" content="' + summary + '">\n' +
        '<meta name="viewport" content="width=device-width">\n' +
        '<title>' + title + '</title>\n' +
        stylesheets.map(get_stylesheet_tag).join(' ') + '\n' +
      '</head>\n' +
      '<body>\n' +
        body + '\n' +
      '</body>\n' +
    '</html>'
  );
}

function main() {
  let front_matter = matter(fs.readFileSync("./posts/Managing_Linux_Dotfiles_With_GNU_Stow/Managing_Linux_Dotfiles_With_GNU_Stow.md"));
  let md_content = front_matter.content;
  let title = front_matter.data.title;
  let tags = front_matter.data.tags;
  let date = front_matter.data.date;
  let summary = front_matter.data.summary;

  const stylesheets = [
    "site_files/highlightjs_styles/github.css",
    "site_files/katex.min.css",
    "site_files/style.css"
  ];

  md_content = "# " + title + md_content

  parsed_html = "<article>" + md.render(md_content) + "</article>";
  html_document = write_html_document(title, summary, parsed_html, stylesheets);

  console.log(html_document);
}
