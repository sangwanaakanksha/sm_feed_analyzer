// background.js
let tweets = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message);

  tweets.push({
    id: message.id,
    text: message.text,
    timestamp: new Date().toISOString()
  });

  console.log(`Tracked Tweet: ${message.text}`);
});
