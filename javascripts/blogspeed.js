---
    layout: null
---


{% assign allposts = site.posts | where_exp: "post", "post.published != false" | sort: 'date' | reverse %}
{% assign oldest = allposts | last %}


const oldest = Date.parse("{{oldest.date}}".replace(" +0000", ""));
const n5post = Date.parse("{{allposts[4].date}}".replace(" +0000", ""));
const count = {{site.posts.size}};

// Blog posts per year
const lifetimeSpeed = (count / ((Date.now() - oldest) / 1000 / 60 / 60 / 24 / 365.25)).toFixed(2);
const recentSpeed =  (5 / ((Date.now() - n5post) / 1000 / 60 / 60 / 24 / 365.25)).toFixed(2);

console.log(`Current blog speed is ${recentSpeed} posts per year (The lifetime average is ${lifetimeSpeed})`);

const speedSection = document.getElementById("blogspeed");
speedSection.innerHTML = (`<p>Currently blogging at ${recentSpeed} posts per year</p>`)
