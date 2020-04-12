import fs = require('fs');
import path = require('path');
import puppeteer = require('puppeteer');
import { formatData } from './modules/formatData';

const runPuppeteer = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--unhandled-rejections=strict'] });

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (req) => {
    if (req.resourceType() === 'image' || req.url().includes('ewbc/ptspk_loader.js')) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto('https://www.pref.ishikawa.lg.jp/kansen/coronakennai.html');

  //
  // 必要な要素のみ取得
  // - 改行コードは<br>タグに空白は削除
  //
  const selector = '#tmp_contents > *';
  const datas = await page.evaluate((selector) => {
    const contents = Array.from(document.querySelectorAll(selector));
    let tableAfter = false;

    for (let i = 0; i < contents.length; i++) {
      const el = contents[i];
      if (!tableAfter) el.parentNode.removeChild(el);
      if (el.tagName === 'TABLE') tableAfter = true;
    }

    const caseList: HTMLElement[] = Array.from(document.querySelectorAll(selector));

    return caseList.map((caseItem) => ({
      tagName: caseItem.tagName,
      textContent: (caseItem.textContent || '').replace(/\n+/g, '<br>').replace(/\s+/g, ''),
    }));
  }, selector);

  await browser.close();

  try {
    const dirPath = path.join(__dirname, '/data');
    const filePath = path.join(dirPath, '/list.json');
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(formatData(datas), null, 2));
  } catch (err) {
    console.error(err);
  }

  return datas;
};

runPuppeteer().then(console.log);
