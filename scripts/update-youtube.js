const axios = require('axios');
const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

async function run() {

  const rssUrl =
    'https://www.youtube.com/feeds/videos.xml?channel_id=UCoUmBpvYQTj7g1tZUOYbMkQ';

  const response =
    await axios.get(rssUrl);

  const parser =
    new XMLParser({
      ignoreAttributes: false
    });

  const data =
    parser.parse(response.data);

  const latest =
    data.feed.entry[0];

  const videoId =
    latest['yt:videoId'];

  const result = {

    title:
      latest.title,

    videoId:
      videoId,

    thumbnail:
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,

    url:
      `https://www.youtube.com/watch?v=${videoId}`

  };

  fs.writeFileSync(
    'latest-video.json',
    JSON.stringify(result, null, 2)
  );

  console.log('updated');
}

run();
