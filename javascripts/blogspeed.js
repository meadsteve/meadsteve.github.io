---
    layout: null
---


{% assign allposts = site.posts | where_exp: "post", "post.published != false" | sort: 'date'%}


const allPostDates = [
    {% for post in allposts %}
    Date.parse("{{post.date}}".replace(" +0000", ""))
    {% unless forloop.last %},{% endunless %}
    {% endfor %}
];

const oldest = allPostDates[0];
const count = allPostDates.length;
const threeishMonths = 1000 * 60 * 60 * 24 * 30 * 3;
const oneYear = 1000 * 60 * 60 * 24 * 365.25;


// Returns the posts per year for the last 3 months
function recentAverage(postDates, atDate, samplePeriod) {
    const cutOff = atDate - samplePeriod;
    const postsInThePeriod = postDates.filter(d => d >= cutOff)
        .filter(d => d <= atDate);
    return (postsInThePeriod.length * (oneYear / samplePeriod)).toFixed(1);
}

// Blog posts per year
const lifetimeSpeed = (count / ((Date.now() - oldest) / oneYear)).toFixed(1);
const recentSpeed =  recentAverage(allPostDates, Date.now(), threeishMonths);

console.log(`Current blog speed is ${recentSpeed} posts per year (The lifetime average is ${lifetimeSpeed})`);
const speedSection = document.getElementById("blogspeed");
if (speedSection) {
    speedSection.innerHTML = (`<p><a href="/speed"><i class="fas fa-tachometer-alt"></i>Currently blogging at ${recentSpeed} posts per year</a></p>`);
}