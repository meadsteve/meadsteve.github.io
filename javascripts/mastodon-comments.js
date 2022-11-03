---
    layout: null
---

function loadComments(host, postId) {
    const commentSection = document.getElementById('mastodon-comments');
    const purifySettings = { ALLOWED_TAGS: ['b', 'p', 'a'] };
    fetch(`https://${host}/api/v1/statuses/${postId}/context`)
        .then(function(response) {
            return response.json();
        }).then(function (data) {
        if(data['descendants'] && Array.isArray(data['descendants']) && data['descendants'].length > 0) {
            data['descendants'].forEach(function(comment) {
                console.log(comment);
                const contentText = DOMPurify.sanitize(comment.content, purifySettings);
                const contentSection = `<div class="comment-content">${contentText}</div>`;
                const author = comment.account;
                const authorSection = `<a class="comment-author" href="${author.url}"><img src="${author.avatar_static}" alt="${author.username} avatar">${author.display_name}</a>`;
                commentSection.innerHTML += `<div class="mastodon-comment">${authorSection}${contentSection}</div>`;
            });
        } else {
            commentSection.innerHTML += "<p><i class=\"fas fa-user-clock\"></i>No comments yet...</p>";
        }
    });
}