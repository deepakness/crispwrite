#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const rawTitle = process.argv.slice(2).join(' ').trim();
if (!rawTitle) {
  console.error('Usage: npm run new:post -- "Your post title"');
  process.exit(1);
}

const slug = slugify(rawTitle);
const date = new Date().toISOString().slice(0, 10);
const outputPath = path.join(process.cwd(), 'src', 'blog', `${slug}.md`);

if (fs.existsSync(outputPath)) {
  console.error(`Post already exists: ${outputPath}`);
  process.exit(1);
}

const template = `---
title: "${rawTitle}"
description: "Add a short summary for this post."
date: ${date}
tags:
  - writing
draft: true
image: "/assets/images/sample.jpg"
---

Start writing your post here.
`;

fs.writeFileSync(outputPath, template);
console.log(`Created: ${outputPath}`);
