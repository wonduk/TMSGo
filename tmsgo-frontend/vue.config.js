const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // npm run build 타겟 디렉토리
  outputDir: '../backend/src/main/resources/static',

  // npm run serve 개발 진행시에 포트가 다르기때문에 프록시 설정
  devServer: {
    proxy: 'http://localhost:8088'
  },
  configureWebpack: {
    devtool: 'source-map', // 소스 맵 활성화
    mode: 'development', // 개발 모드
  },
  productionSourceMap: true, // 프로덕션 빌드에서도 소스 맵 활성화
})

