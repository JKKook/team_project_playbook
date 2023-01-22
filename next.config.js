// phase: 설정이 세팅되는 환경 (배포용인지, 개발용인지)
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      reactStrictMode: true,
      swcMinify: true,
      env: {
        // 개발용 환경변수
        EXMAPLE_KEY: 'example-key',
      },
      /* basePath: '/docs', //도메인의 하위 경로 아래에 Next.js 애플리케이션을 배포하려면 basePath구성 옵션을 사용할 수 있습니다. */
    };
  }
  return {
    /* config options for all phases except development here */
    reactStrictMode: true,
    swcMinify: true,
  };
};
