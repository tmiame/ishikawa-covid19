import { getCaseDataLastUpdateTime } from '@/plugins/caseData';

const siteMetadata = {
  title: '新型コロナウイルス石川県の感染状況',
  description: `更新: ${getCaseDataLastUpdateTime().format(
    'M月D日(ddd)',
  )} 当サイトは石川県の新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するために、個人が開設したものです。`,
  author: '@ishikawacovid19',
};

export default siteMetadata;
