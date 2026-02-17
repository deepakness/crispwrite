---
title: Home
layout: layouts/base.njk
description: Crispwrite is a clean Eleventy + Tailwind starter for open-source blogs and personal publishing.
---

## Write fast. Publish clean.

Crispwrite is an open-source blog starter designed for developers, creators, and indie builders who want a polished writing site without heavy tooling.

- ✅ Minimal, readable layout
- ✅ RSS feed, sitemap, and SEO metadata out of the box
- ✅ Content-first structure with all public pages inside `src/`
- ✅ Built-in tags, search, and draft workflow for scalable publishing

<a class="font-semibold" href="https://github.com/deepakness/crispwrite">Get started on GitHub</a>

## Latest posts

<ul class="list-none pl-0">
{% for post in collections.posts | reverse %}
{% if loop.index <= 3 %}
  <li class="mb-4 pb-4 border-b border-gray-200">
    <a class="font-semibold text-blue-700 hover:text-blue-800" href="{{ post.url }}">{{ post.data.title }}</a>
    <p class="text-sm text-gray-600 mt-1">{{ post.date | readableDate }} · {{ post.templateContent | readingTime }}</p>
    {% if post.data.description %}<p class="text-gray-700 mt-1">{{ post.data.description }}</p>{% endif %}
  </li>
{% endif %}
{% else %}
  <li>No posts yet — create your first post in <code>src/blog/</code>.</li>
{% endfor %}
</ul>

[Browse all posts →](/blog)
