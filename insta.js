const got = require('got');
const cheerio = require('cheerio');

function ig(url) {
  const requestData = {
    q: q,
    // lain sesuai kebutuhan
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
    got.post('https://snapinsta.to/api/ajaxSearch', {
      form: requestData,
      headers: config.headers,
    }).then(response => {
      const x = JSON.parse(response.body).data;
      const $ = cheerio.load(x);
      const filter1 = $('.download-items .download-items__btn').map((index, item) => {
        const dataS = $(item).find('a').attr('href');
        return dataS;
      }).get();

      console.log('Filtered Data:', filter1);
      resolve(filter1);
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  });
}

function igS(username) {
  const requestData = {
    q: `https://www.instagram.com/stories/${q}`, // sesuaikan dengan kebutuhan
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
    got.post('https://snapinsta.to/api/ajaxSearch', {
      form: requestData,
      headers: config.headers,
    }).then(response => {
      const x = JSON.parse(response.body).data;
      const $ = cheerio.load(x);

      const filter1 = $('.download-items .download-items__btn').map((index, item) => {
        const dataS = $(item).find('a').attr('href');
        return dataS;
      }).get();

      if (filter1.length > 1) {
        console.log('Filtered Data:', filter1);
        resolve(filter1);
      } else if (filter1.length === 1) {
        console.log('Filtered Data:', filter1[0]);
        resolve(filter1[0]);
      } else {
        console.log('No Data Founded');
        resolve(null);
      }
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  });
}

const zu = "https://www.instagram.com/p/CP9pXGqhPny/?igsh=b3FqYWJ4Z3lhbWth";

// Contoh penggunaan fungsi dengan nilai 'q'
getInsta(zu);
