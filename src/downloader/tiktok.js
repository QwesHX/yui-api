const got = require('got');
const cheerio = require('cheerio');

function tt(url) {
  const requestData = {
    q: url,
    lang: 'id',
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.98 Mobile Safari/537.36',
    }
  };

  return new Promise((resolve, reject) => {
    got.post('https://tikdownloader.io/api/ajaxSearch', {
      form: requestData,
      headers: config.headers,
    }).then(response => {
      const x = JSON.parse(response.body).data;
      const $ = cheerio.load(x);
      const filter = $('.tik-right .dl-action');
      const mp4_1 = filter.find('p:eq(0) a').attr('href');
      const mp4_2 = filter.find('p:eq(1) a').attr('href');
      const HD = filter.find('p:eq(2) a').attr('href');
      const music = filter.find('p:eq(3) a').attr('href');
      console.log({ mp4_1, mp4_2, HD, music });
      resolve({ mp4_1, mp4_2, HD, music });
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  });
}

module.exports = {
  tt // export the function with the new name
};
	      
