const cheerio = require('cheerio');
const axios = require('axios');
const puppeteer = require('puppeteer');

async function sdHome() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get('https://sektedoujin.cc');
            const $ = cheerio.load(res.data);
            const popularToday = [];
            const newUpdate = [];
            const listChap = [];

            $('.bs .bsx').each((i, e) => {
                popularToday.push({
                    index: i + 1,
                    title: $(e).find('a').attr('title'),
                    image: $(e).find('a .limit img').attr('src'),
                    chapter: $(e).find('a .bigor .adds .epxs').text(),
                    link: $(e).find('a').attr('href'),
                    colored: $(e).find('a .limit span.colored').text(),
                    type: $(e).find('a .limit span.type').attr('class').replace('type', ''),
                });
            });

            $('.listupd .utao .uta').each((i, eu) => {
                newUpdate.push({
                    index: i + 1,
                    title: $(eu).find('.imgu a').attr('title'),
                    image: $(eu).find('.imgu a img').attr('src'),
                    series: $(eu).find('.imgu a').attr('href'),
                });
            });

            $('.luf ul li').each((i, ed) => {
              listChap.push({
                title : $(ed).find('a').attr('href').replace('https://sektedoujin.cc/', '').replace(/-/g, ' ').replace(/\//g, ''),
                chap : $(ed).find('a').text(),
                date : $(ed).find('span').text(),
                link : $(ed).find('a').attr('href'),
              });
            });

            console.log({ popularToday, newUpdate, listChap });
            return({ popularToday, newUpdate, listChap});
        } catch (error) {
            reject(error);
        }
    });
}

async function sdSrc(q, page) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`https://sektedoujin.cc/page/${page}/?s=${q}`);
      const $ = cheerio.load(res.data);
      const lstUpd = [];
      $('.bs .bsx').each((i, e) => {
        lstUpd.push({
          index : i+1,
          title : $(e).find('a').attr('title'),
          image : $(e).find('a .limit img').attr('src'),
          chapter : $(e).find('.epxs').text(),
          link : $(e).find('a').attr('href'),
          colored : $(e).find('span.colored').text(),
          type : $(e).find('span.type').attr('class').replace('type', ''),
          status : $(e).find('span.status').text(),
          score : $(e).find('.numscore').text(),
        });
      });

      console.log(lstUpd);
      return(lstUpd);
    } catch(error) {
      reject(error);
    }
  });
}

async function sdDetail(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);
      const title = $('h1.entry-title').text();
      const score = $('.num').text();
      const status = $('.imptdt:eq(0) i').text();
      const type = $('.imptdt:eq(1) a').text();
      const author = $('.imptdt:eq(2) i').text();
      const artist = $('.imptdt:eq(3) i').text();
      const postedOn = $('.imptdt:eq(5) i time').text();
      const updatedOn = $('.imptdt:eq(6) i time').text();
      const views = $('.imptdt:eq(7) i span').text();
      const genre = $('span.mgen a').map((i, e) => {
        const name = $(e).text();
        const link = $(e).attr('href');
        return { name, link };
      }).get();
      const sinop = $('.entry-content.entry-content-single p');
      const listChap = $('.chapterlist ul li').map((i, e) => {
        const chap = $(e).find('span.chapternum').text();
        const date = $(e).find('span.chapterdate').text();
        const link = $(e).find('a').attr('href');
        return { chap, date, link };
      }).get();

      console.log({ title, score, status, type, author, artist, postedOn, updatedOn, views, genre, sinop, listChap });
      return({ title, score, status, type, author, artist, postedOn, updatedOn, views, genre, sinop, listChap });
    } catch(error) {
      reject(error);
    }
  });
}

async function sdRead(url) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector('h1.entry-title');
    await page.waitForSelector('img.ts-main-image.lazy');

    const img = await page.$$eval('img.ts-main-image.lazy', imgs => imgs.map((img, index) => index === 0 ? img.getAttribute('src') : img.getAttribute('data-src')));
    const title = await page.$eval('h1.entry-title', titleElement => titleElement.textContent);
    console.log({ img, title });

    await browser.close();

    return { img, title };
  } catch (error) {
    console.error('Error in run function:', error);
    throw error;
  }
}

module.exports = {
    sdHome,
    sdSrc,
    sdDetail,
    sdRead
}
