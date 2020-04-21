import path = require('path');
import puppeteer = require('puppeteer');
import { promises as fs } from 'fs';
import { formatData } from './modules/formatData';
import { formatCondition } from './modules/formatSummary';
import { getTime } from './modules/utils';
import { writeCondition } from './modules/writeCondition';
import { writeCaseList } from './modules/writeCaseList';

const runPuppeteer = async () => {
  const browserOptions = { args: ['--no-sandbox', '--unhandled-rejections=strict'] };
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (['image', 'stylesheet', 'font', 'script'].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const options = {
    selector: '#tmp_contents > *',
    url: 'https://www.pref.ishikawa.lg.jp/kansen/coronakennai.html',
  };

  await page.goto(options.url);

  const datas = await page.evaluate(({ selector }) => {
    const contents: Element[] = Array.from(document.querySelectorAll(selector));

    const conditionContent = contents.find((el) => {
      el.parentNode?.removeChild(el);
      return el.tagName === 'TABLE';
    });

    const mainContent: Element[] = Array.from(document.querySelectorAll(selector));

    const excludeContentIndex = mainContent.findIndex(
      (el) => el.textContent === '石川県における新型コロナウイルス感染症情報',
    );

    const caseContent = mainContent.slice(0, excludeContentIndex).reduce<Element[]>((acc, current) => {
      return current.tagName === 'DIV' ? [...acc, ...current.children] : [...acc, current];
    }, []);

    return {
      condition: conditionContent?.textContent?.split(/\n/) ?? [],
      caseList: caseContent.map((caseItem) => ({
        tagName: caseItem.tagName,
        textContent: (caseItem.textContent || '').replace(/\n+/g, '<br>').replace(/\s+/g, ''),
      })),
    };
  }, options);

  await browser.close();

  const updateTime = getTime();
  const caseList = formatData(datas.caseList);
  const condition = formatCondition(datas.condition);

  try {
    const dirPath = path.join(__dirname, '/data');
    await fs.mkdir(dirPath, { recursive: true });

    const listPath = path.join(dirPath, '/list.json');
    await writeCaseList(listPath, updateTime, caseList);

    const conditionPath = path.join(dirPath, '/condition.json');
    const conditionData = {
      date: updateTime,
      ...condition,
    };
    await writeCondition(conditionPath, conditionData);
  } catch (err) {
    console.error(err);
  }

  return datas;
};

runPuppeteer();
