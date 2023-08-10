# static site generator

* Minimalist aesthetic.
* Responsive design.
* Supports Katex typesetting and language specific code syntax highlighting.
* Thumbnail images for each post allowing the reader to more effectivly scan available articles.

### Building

```bash
npm install
npm run build
# build will be saved in site/
```

### Using this site as a template

Make the following modifiations:
* Change 'Austin White' in top-bar.js to your name.
* Change the social links in top-bar.js to your own.
* Change the deploy script in package.json to point to your webserver.
* Remove 'posts' submodule and add your own of the same name (you can copy the existing posts/new-post script).

#### posts/ directory structure
<pre>
posts/
├─ images/
│   ├─ post_1/
│   |   └─ image
│   ├─ post_2/
│   |   └─ image
│   ├─ post_3/
│   |   └─ image
│   └─ post_N/
│       └─ image
├─ post_1.md
├─ post_2.md
├─ post_3.md
└─ post_N.md
</pre>

#### post format
Every post.md file must be in the following format
<pre>
---
title: [your title]
tags:
  - [tag 1]
  - [tag 2]
  - [tag 3]
  - [tag N]
date: [MM-DD-YYYY]
summary: [article summary]
---

[post body]
</pre>
