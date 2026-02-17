class SearchIndex {
  data() {
    return {
      permalink: '/search.json',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const posts = (data.collections.posts || []).map((post) => ({
      title: post.data.title,
      description: post.data.description || '',
      url: post.url,
      date: post.date,
      tags: post.data.tags || [],
      content: (post.templateContent || '').replace(/<[^>]*>/g, ' '),
    }));

    return JSON.stringify(posts);
  }
}

module.exports = SearchIndex;
