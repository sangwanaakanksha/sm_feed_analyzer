console.log("Content script loaded");

function trackTweets() {
  const tweetSelector = 'article[data-testid="tweet"]';
  const tweetTextSelector = 'div[data-testid="tweetText"]';

  const tweets = document.querySelectorAll(tweetSelector);

  if (tweets.length === 0) {
    console.log("No tweets found with the selector:", tweetSelector);
  } else {
    console.log(`${tweets.length} tweets found.`);
  }

  tweets.forEach((tweet, index) => {
    const tweetTextElement = tweet.querySelector(tweetTextSelector);
    const tweetText = tweetTextElement ? tweetTextElement.innerText : "No text found";
    const tweetId = tweet.getAttribute('data-testid') + "-" + index; // Create a unique ID for demo purposes

    console.log(`Tweet ID: ${tweetId}, Tweet Text: ${tweetText}`);

    // Send the tweet data to the background script
    chrome.runtime.sendMessage({
      id: tweetId,
      text: tweetText
    });
  });
}

// Observe changes in the timeline
function attachObserver() {
  const timeline = document.querySelector('div[aria-label="Timeline: Your Home Timeline"]');
  if (timeline) {
    const observer = new MutationObserver(trackTweets);
    observer.observe(timeline, { childList: true, subtree: true });
    console.log("Observer attached to timeline");
  } else {
    console.log("Timeline element not found");
  }
}

// Initial track of tweets when the page loads
trackTweets();
attachObserver();

// Check for new tweets every 5 seconds
// setInterval(trackTweets, 5000);
