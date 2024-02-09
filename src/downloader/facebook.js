const got = require('got');
const cheerio = require('cheerio');

function fb(url) {
  const requestData = {
    id: url,
  };

  const config = {
    headers: {
      'HX-Request': 'true',
      'HX-Trigger': 'form',
      'HX-Target': 'target',
      'HX-Current-URL': 'https://getmyfb.com/id',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.98 Mobile Safari/537.36',
    }
  };

  return new Promise((resolve, reject) => {
    got.post('https://getmyfb.com/process', {
      form: requestData,
      headers: config.headers,
    }).then(response => {
      // Make sure the response is a string
      const responseData = typeof response.body === 'string' ? response.body : response.body.toString();

      const $ = cheerio.load(responseData);
      const filter1 = $('.results-download ul.results-list li.results-list-item');

      // ... continue with your code

      const data = filter1.find('a').attr('href');
      console.log(data);
      resolve(data); // or adjust as needed
    }).catch(error => {
      // Handle error here
      console.error(error);
      reject(error); // or adjust as needed
    });
  });
}

module.exports = { fb };
