const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const metadata = require("./src/_data/metadata");

const EXCLUDED_TAGS = new Set(["all", "nav", "post", "posts"]);

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function validateMetadata() {
  const issues = [];
  if (!metadata.url || /example\.com/.test(metadata.url)) {
    issues.push("metadata.url is still a placeholder. Set your production site URL in src/_data/metadata.js");
  }
  if (!metadata.author?.name || metadata.author.name === "Your Name") {
    issues.push("metadata.author.name is still a placeholder. Set your real author/site name in src/_data/metadata.js");
  }

  if (issues.length > 0) {
    const message = `\n[crispwrite] Metadata validation warnings:\n- ${issues.join("\n- ")}\n`;
    if (process.env.CI || process.env.STRICT_METADATA === "true") {
      throw new Error(message);
    }
    console.warn(message);
  }
}

module.exports = function(eleventyConfig) {
  validateMetadata();

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.addWatchTarget("./src/assets/css/tailwind.css");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("dateToRfc3339", (date) => {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("readingTime", (content = "") => {
    const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  });

  eleventyConfig.addFilter("slugify", slugify);

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").filter((item) => !item.data.draft);
  });

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tags = new Set();

    collectionApi.getFilteredByTag("posts").forEach((item) => {
      if (item.data.draft) return;
      (item.data.tags || []).forEach((tag) => {
        if (!EXCLUDED_TAGS.has(tag)) tags.add(tag);
      });
    });

    return [...tags].sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addCollection("publicPages", function(collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.url)
      .filter((item) => item.url !== "/404.html")
      .filter((item) => !item.data.draft)
      .filter((item) => !item.data.eleventyExcludeFromCollections)
      .filter((item) => !item.url.endsWith(".json") && !item.url.endsWith(".xml") && !item.url.endsWith(".txt"));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
