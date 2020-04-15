import path = require('path');
import puppeteer = require('puppeteer');
import moment = require('moment');
import { promises as fs } from 'fs';
import { formatData } from './modules/formatData';
import { formatCondition } from './modules/formatSummary';
import { getTime } from './modules/utils';
import { ConditionContent } from './types';

const getConditionFile = async (filePath = ''): Promise<ConditionContent | null> => {
  try {
    await fs.access(filePath);
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
};

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

  const updateTime = getTime();
  const caseList = formatData(datas.caseList);
  const { total, hospitalized, discharged, list } = formatCondition(datas.summary);

  const toJsonData = {
    lastUpdateDateTime: updateTime,
    items: caseList,
  };

  const toJsonConditionData = {
    lastUpdateDateTime: updateTime,
    total,
    hospitalized,
    discharged,
    list,
  };

  try {
    const dirPath = path.join(__dirname, '/data');
    const filePath = path.join(dirPath, '/list.json');
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(toJsonData, null, 2));

    const filePathCondition = path.join(dirPath, '/conditions.json');
    let fileCondition = await getConditionFile(filePathCondition);
    if (!fileCondition) {
      fileCondition = {
        lastUpdateDateTime: toJsonConditionData.lastUpdateDateTime,
        items: [{ date: toJsonConditionData.lastUpdateDateTime, total, hospitalized, discharged, list }],
      };
      await fs.writeFile(filePathCondition, JSON.stringify(fileCondition, null, 2));
      return;
    }
    if (moment(fileCondition.lastUpdateDateTime).isSame(moment(toJsonConditionData.lastUpdateDateTime), 'day')) {
      return 'No Update Page';
    }

    fileCondition.lastUpdateDateTime = toJsonConditionData.lastUpdateDateTime;
    fileCondition.items = [
      { date: toJsonConditionData.lastUpdateDateTime, total, hospitalized, discharged, list },
      ...fileCondition.items,
    ];
    await fs.writeFile(filePathCondition, JSON.stringify(fileCondition, null, 2));
  } catch (err) {
    console.error(err);
  }

  return datas;
};

runPuppeteer();
