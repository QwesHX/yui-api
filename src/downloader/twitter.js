const got = require('got');
const cheerio = require('cheerio');

function twt(url) {
  const requestData = {
    id: url,
    locale: 'id',
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'HX-Request': 'true',
      'HX-Target': 'target',
      'HX-Current-URL': 'https://ssstwitter.com/id',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.98 Mobile Safari/537.36',
    }
  };

  return new Promise((resolve, reject) => {
    got.post('https://ssstwitter.com/id', {
      form: requestData,
      headers: config.headers,
    }).then(response => {
      const responseData = typeof response.body === 'string' ? response.body : response.body.toString();
      const $ = cheerio.load(responseData);
      const filter1 = $('.result_overlay');
      const mp4_360 = filter1.find('a:eq(0)').attr('href');
      const mp4_480 = filter1.find('a:eq(3)').attr('href');
      const mp4_720 = filter1.find('a:eq(1)').attr('href');
      const mp3 = filter1.find('a:eq(4)').attr('href');
      // Handle response here
      console.log({ mp4_360, mp4_480, mp4_720, mp3 });
      resolve({ mp4_360, mp4_480, mp4_720, mp3 }); // Align resolved values with console.log
    }).catch(error => {
      // Handle error here
      console.error(error);
      reject(error);
    });
  });
}

module.exports = {
  twt // export the function with the new name
};
