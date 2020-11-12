const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('query');

window.addEventListener('DOMContentLoaded', (_event) => {
    const searchInput = document.getElementById('search-input');
    const searchStuff = document.getElementById('search-stuff');
    const searchPlaceholder = document.getElementById('search-placeholder');
    const searchResultsContainer = document.getElementById('results-container');

    fetch("/search.json")
        .then(r => r.json())
        .then(searchData => {
            const search = SimpleJekyllSearch({
                searchInput: searchInput,
                resultsContainer: searchResultsContainer,
                json: searchData,
                searchResultTemplate: '<li><a href="{{ site.url }}{url}">{title}</a></li>'
            });
            searchStuff.style.display = "inline";
            searchPlaceholder.style.display = "none";
            if (searchTerm) {
                searchInput.value = searchTerm;
                search.search(searchTerm);
                let resultCount = searchResultsContainer.children.length;
                if (resultCount === 1) {
                    let luckyLink = searchResultsContainer.firstChild.firstChild.href;
                    window.location.replace(luckyLink);
                }
            }
        })
        .catch(_err => {
            searchPlaceholder.innerHTML = "Search unavailable"
        });
});