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

    const mainContent: Element[] = Array.from(document.querySelectorAll(selector));

    const formatContent = [...mainContent].reduce<Element[]>((acc, current) => {
      if (current.tagName === 'DIV') {
        for (const childrenEl of current.children) {
          acc.push(childrenEl);
        }
        return acc;
      }

      acc.push(current);
      return acc;
    }, []);

    return formatContent.map((caseItem) => ({
      tagName: caseItem.tagName,
      textContent: (caseItem.textContent || '').replace(/\n+/g, '<br>').replace(/\s+/g, ''),
    }));
  }, selector);

  await browser.close();

  const result = formatData(datas);

  const toJsonData = {
    test: Date.now(),
    lastUpdateDateTime: result[0].date,
    items: result,
  };

  try {
    const dirPath = path.join(__dirname, '/data');
    const filePath = path.join(dirPath, '/list.json');
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(toJsonData, null, 2));
  } catch (err) {
    console.error(err);
  }

  return datas;
};

runPuppeteer();
