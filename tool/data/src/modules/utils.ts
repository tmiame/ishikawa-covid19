export const parseNumber = (str = '') => parseInt(str.replace(/[^0-9\\.]/g, ''));

export const findContactRelations = (str = '') => {
  const match = str.match(/(?:感染者)(\d[、|,|と]?)+/g);

  if (!match) {
    return null;
  }

  const contacts = match[0].replace(/感染者/, '').split('、');
  const relation = str.replace(/(.*\d)(?=の)|(?=(として))(.*)/g, '');

  return contacts.map((item) => ({
    id: parseNumber(item),
    text: `${item}${relation}`,
  }));
};

export const getTime = () => {
  const updateTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Tokyo',
  });

  return new Date(updateTime).toJSON();
};
