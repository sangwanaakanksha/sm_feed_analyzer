const cheerio = window.cheerio;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTweetData') {
    const currentHTML = document.documentElement.outerHTML;
    const $ = cheerio.load(currentHTML);

    const tweetData = [];

    $('div[data-testid="tweet"]').each((index, tweet) => {
      const $tweet = $(tweet);

      const username = $tweet.find('div[class="css-1dbjc4n r-1awozwy r-18u37iz r-1wbh5a2"]').text().trim();
      const tweetContent = $tweet.find('div[class="css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0"]').find('span').text().trim();
      const hasImage = $tweet.find('img[alt="Image"]').length > 0;
      const likeCount = $tweet.find('div[class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu"]').find('div[class="css-1dbjc4n r-1ta3fxp"] div:nth-child(3)').text().trim();
      const retweetCount = $tweet.find('div[class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu"]').find('div[class="css-1dbjc4n r-1ta3fxp"] div:nth-child(2)').text().trim();
      const replyCount = $tweet.find('div[class="css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu"]').find('div[class="css-1dbjc4n r-1ta3fxp"] div:nth-child(1)').text().trim();

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