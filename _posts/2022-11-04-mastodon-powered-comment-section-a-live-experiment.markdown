---
layout: post
published: false
live_experiment: true
title:  "Mastodon powered comment section: a live experiment"
date:   2022-11-04 10:00:00
categories: tools
summary: "Experimenting adding a comments section to my blog using mastodon"
icon: fab fa-mastodon
tags:
    - mastodon
    - comments
    - blog
    - javascript
comments:
  mastodon:
    host: mastodon.green
    id: 109284718794831683
---

I read a blog post titled ["Adding comments to your static blog with Mastodon"](https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/)
and it sounded like quite a fun idea. I liked the idea that it means I can have comments on my site without writing a
backend (this blog is a statically generated site). I could probably build a similar thing with a twitter api or some other
service but what I liked about [mastodon](https://docs.joinmastodon.org/) was the federation. With the way mastodon
works the replies to my post (called a toot apparently) can come from any service that's part of the fediverse 
(TODO: explain this). This means I'm not requiring people to make the same choice as me. As long as they have an account
on a fediverse service they can join the conversation.

## On with the experiment
This code loads on the bottom of each of my posts if a mastodon toot's details are added to the blogpost's frontmatter:
```javascript
function loadComments(host, postId) {
    const commentSection = document.getElementById('mastodon-comments');
    const purifySettings = { ALLOWED_TAGS: ['b', 'p', 'a'] };
    fetch(`https://${host}/api/v1/statuses/${postId}/context`)
        .then((response) => response.json())
        .then((data) => {
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
```

## Try out the discussion

Hopefully if I've still got this code deployed you should see a comment section below this paragraph. With a link
to take you to a page to join in the conversation.