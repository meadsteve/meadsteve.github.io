---
    layout: null
---

function loadComments(host, postId) {
    const commentSection = document.getElementById('mastodon-comments');
    const replySection = document.getElementById('mastodon-comments-reply');
    const purifySettings = { ALLOWED_TAGS: ['b', 'p', 'a'] };
    fetch(`https://${host}/api/v1/statuses/${postId}/context`)
        .then((response) => response.json())
        .then((data) => {
        if(data['descendants'] && Array.isArray(data['descendants']) && data['descendants'].length > 0) {
            data['descendants'].forEach(function(comment) {
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
    fetch(`https://${host}/api/v1/statuses/${postId}`)
        .then((response) => response.json())
        .then((data) => {
        if(data['url']) {
            replySection.innerHTML = `<p class="mastodon-reply"><a class="button" href="${data['url']}">Click here to reply</a></p>`;
        }
    });

}