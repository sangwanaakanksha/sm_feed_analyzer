import { load } from 'cheerio';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTweetData') {
    const currentHTML = document.documentElement.outerHTML;
    const $ = load(currentHTML);

    const tweetData = [];

    $('div[data-testid="tweet"]').each((index, tweet) => {
      const $tweet = $(tweet);

      const username = $tweet.find('div[data-testid="User-Names"] > div:nth-child(1) > div > div > div[data-testid="userDisplayName"]').text().trim();
      const tweetContent = $tweet.find('div[data-testid="tweetText"]').text().trim();
      const hasImage = $tweet.find('img[alt="Image"]').length > 0;
      const likeCount = $tweet.find('div[data-testid="like"]').text().trim();
      const retweetCount = $tweet.find('div[data-testid="retweet"]').text().trim();
      const replyCount = $tweet.find('div[data-testid="reply"]').text().trim();

      tweetData.push({
        username,
        tweetContent,
        hasImage,
        likeCount,
        retweetCount,
        replyCount,
      });
    });

    sendResponse({ tweetData });
  }
});