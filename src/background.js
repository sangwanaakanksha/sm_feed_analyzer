chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes('https://twitter.com/')) {
    chrome.tabs.sendMessage(details.tabId, { action: 'getTweetData' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      const tweetData = response.tweetData;
      // Process the tweet data here or send it to the server for further processing
      console.log(tweetData);
    });
  }
}, { url: [{ urlMatches: ['https://twitter.com/', 'https://x.com/home'] }] });