---
    layout: null
---

{% assign allposts = site.posts %}

const baseUrl = "{{site.baseurl}}";

const allPostUrls = [
    {% for post in allposts %}
    {"url": "{{post.url}}", "title": "{{post.title}}", "published": "{{post.published}}", "score": Levenshtein(location.pathname, "{{post.url}}").valueOf()}
{% unless forloop.last %},{% endunless %}
{% endfor %}
];

allPostUrls.sort((a, b) => ((a["score"] < b["score"]) ? -1 : ((a["score"] > b["score"]) ? 1 : 0)));

function createLink({url, title, published}) {
    return `<a href="${baseUrl}${url}" className="post-link">
        <h3 className="post-title">
            <i class="fas fa-pencil-alt post-icon" aria-hidden="true"></i>
            <span>${title}</span>
            ${published === "false" ? "(unpublished)" : ""}
        </h3>
    </a>`;
}


const suggestionsSection = document.getElementById("redirect-suggestions");
if (suggestionsSection) {
    suggestionsSection.innerHTML = createLink(allPostUrls[0]) + suggestionsSection.innerHTML;
}

