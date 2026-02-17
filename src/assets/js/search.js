const input = document.getElementById('search-input');
const resultsEl = document.getElementById('search-results');
const emptyEl = document.getElementById('search-empty');

if (input && resultsEl && emptyEl) {
  let index = [];

  const fmtDate = (value) =>
    new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  fetch('/search.json')
    .then((res) => res.json())
    .then((data) => {
      index = data;
    });

  const render = (results) => {
    resultsEl.innerHTML = results
      .map(
        (post) => `
      <li class="border-b border-gray-200 pb-5">
        <a class="text-xl font-semibold text-blue-700 hover:text-blue-800" href="${post.url}">${post.title}</a>
        <p class="text-sm text-gray-600 mt-1">${fmtDate(post.date)}</p>
        <p class="text-gray-700 mt-2">${post.description || ''}</p>
      </li>
    `
      )
      .join('');

    emptyEl.classList.toggle('hidden', results.length > 0 || input.value.trim().length === 0);
  };

  input.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();

    if (!query) {
      resultsEl.innerHTML = '';
      emptyEl.classList.add('hidden');
      return;
    }

    const matches = index
      .filter((post) => {
        const haystack = [post.title, post.description, (post.tags || []).join(' '), post.content]
          .join(' ')
          .toLowerCase();
        return haystack.includes(query);
      })
      .slice(0, 20);

    render(matches);
  });
}
