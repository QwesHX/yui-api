const fs = requrie('fs');
const { sdHome, sdSrc, sdDetail, sdRead } = require('./sekte');
const { toPdf } = require(process.cwd() + '/routes/util');

async function skReader(req, res) {
    const url = req.query.url;
    let obj = await sdRead(url);
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, intial-scale=1.0">
    <link href="/static/profile.jpg" rel="icon">
    <title>${obj.title}</title>
    <style>
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    body {
        background-color: #1A202C;
        background-color: rgba(26,32, 44, 1);
    }

    @media (min-width: 576px) {
        img {
            width: auto;
            max-width: 100%;
            height: auto;
        }
    }
    </style>
    </head>

    <body>\n`
    for(let url of obj.img) {
        html += `<img src=${url}>\n`
    }
    html += `\n</body> 
    
    </html>`
    res.send(html);
}

async function skDetail(req, res) {
    const url = req.query.url;
    if(!url) return res.json('Input Parameter url');
    let obj = await sdDetail(url);
    res.json(obj);
}

async function skHome(req, res) {
    let obj = await sdHome();
    res.json(obj);
}

async function skSrc(req, res) {
    const page = req.query.page;
    const q = req.query.q;
    if(!page) {
        const page = 1;
    }
    if(!q) return res.json('Input Parameter q');
    let obj = await sdSrc(q, page);
    res.json(obj); 
}

async function skDl(req, res) {
    const url = req.query.url;
    let obj = await sdRead(url);
    let pages = obj.img.map(su => 'https://external-content.duckduckgo.com/iu/?u' + su);
    let imgToPdf = await toPdf(pages);
    await fs.writeFileSync(process.cwd() + `/${url}.pdf`, imgToPdf);
    await res.download(process.cwd() + `/${url}.pdf`, `${obj.title}.pdf`);
}

module.exports = {
    skReader,
    skDetail,
    skHome,
    skSrc,
    skDl
}
