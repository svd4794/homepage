const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser();

async function run() {

  const feed = await parser.parseURL(
    'https://www.youtube.com/feeds/videos.xml?channel_id=UCoUmBpvYQTj7g1tZUOYbMkQ'
  );

  const latest = feed.items[0];

  const videoId =
    latest.link.match(/v=([^&]+)/)[1];

  const result = {
    title: latest.title,
    url: latest.link,
    published: latest.pubDate,
    videoId: videoId
  };

  fs.writeFileSync(
    'latest-video.json',
    JSON.stringify(result, null, 2)
  );
}

run();
