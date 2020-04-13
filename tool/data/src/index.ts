import path = require('path');
import puppeteer = require('puppeteer');
import { promises as fs } from 'fs';
import { formatData } from './modules/formatData';
import { formatSummary } from './modules/formatSummary';

interface ConditionList {
  date: string;
  list: {
    name: string;
    total: number;
    hospitalized: number;
    discharged: number;
  }[];
}

interface ConditionContent {
  lastUpdateDateTime: string;
  items: ConditionList[];
}

const getFileCondition = async (filePath = '') => {
  try {
    await fs.access(filePath);
    const fileCondition: ConditionContent = JSON.parse(await fs.readFile(filePath, 'utf8'));
    return fileCondition;
  } catch {
    return null;
  }
};

const runPuppeteer = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--unhandled-rejections=strict'] });

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (req) => {
    if (['image', 'stylesheet', 'font', 'script'].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto('https://www.pref.ishikawa.lg.jp/kansen/coronakennai.html');

  const selector = '#tmp_contents > *';

  const datas = await page.evaluate((selector) => {
    const contents: Element[] = Array.from(document.querySelectorAll(selector));

    const conditionContent = contents.find((el) => {
      el.parentNode?.removeChild(el);
      return el.tagName === 'TABLE';
    });

    const mainContent: Element[] = Array.from(document.querySelectorAll(selector));

    const caseContent = mainContent.reduce<Element[]>((acc, current) => {
      return current.tagName === 'DIV' ? [...acc, ...current.children] : [...acc, current];
    }, []);

    return {
      summary: conditionContent?.textContent?.split(/\n/) ?? [],
      caseList: caseContent.map((caseItem) => ({
        tagName: caseItem.tagName,
        textContent: (caseItem.textContent || '').replace(/\n+/g, '<br>').replace(/\s+/g, ''),
      })),
    };
  }, selector);

  await browser.close();

  const summary = formatSummary(datas.summary);
  const caseList = formatData(datas.caseList);

  const toJsonData = {
    lastUpdateDateTime: caseList[0].date,
    items: caseList,
  };

  const toJsonConditionData = {
    lastUpdateDateTime: caseList[0].date,
    items: summary,
  };

  try {
    const dirPath = path.join(__dirname, '/data');
    const filePath = path.join(dirPath, '/list.json');
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(toJsonData, null, 2));

    const filePathCondition = path.join(dirPath, '/conditions.json');
    const fileCondition = await getFileCondition(filePathCondition);
    if (!fileCondition) {
      await fs.writeFile(filePathCondition, JSON.stringify(toJsonConditionData, null, 2));
      return;
    }
    if (fileCondition.lastUpdateDateTime === toJsonConditionData.lastUpdateDateTime) {
      return 'No Update Page';
    }
    fileCondition.lastUpdateDateTime = toJsonConditionData.lastUpdateDateTime;
    fileCondition.items = [
      { date: toJsonConditionData.lastUpdateDateTime, list: toJsonConditionData.items },
      ...fileCondition.items,
    ];
    await fs.writeFile(filePathCondition, JSON.stringify(fileCondition, null, 2));
  } catch (err) {
    console.error(err);
  }

  return datas;
};

runPuppeteer();
