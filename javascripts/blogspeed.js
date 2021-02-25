---
    layout: null
---


{% assign allposts = site.posts | where_exp: "post", "post.published != false" | sort: 'date' | reverse %}
{% assign oldest = allposts | last %}


let oldest = Date.parse("{{oldest.date}}".replace(" +0000", ""));
let n5post = Date.parse("{{allposts[4].date}}".replace(" +0000", ""));
let count = {{site.posts.size}};

// Blog posts per year
let lifetimeSpeed = (count / ((Date.now() - oldest) / 1000 / 60 / 60 / 24 / 365.25)).toFixed(2);
let recentSpeed =  (5 / ((Date.now() - n5post) / 1000 / 60 / 60 / 24 / 365.25)).toFixed(2);

console.log(`Current blog speed is ${recentSpeed} posts per year (The lifetime average is ${lifetimeSpeed})`);
