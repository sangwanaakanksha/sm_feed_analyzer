document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.getBackgroundPage((backgroundPage) => {
      const tweets = backgroundPage.tweets;
      const tweetList = document.getElementById('tweetList');
  
      if (tweets.length === 0) {
        tweetList.textContent = "No tweets tracked.";
      }
  
      tweets.forEach(tweet => {
        const li = document.createElement('li');
        li.textContent = `Tweet: ${tweet.text} (Tracked at: ${tweet.timestamp})`;
        tweetList.appendChild(li);
      });
    });
  });
  