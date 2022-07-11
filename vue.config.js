const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const port = process.env.port || 8080;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true,
    open: {
      target: [`http://localhost:${port}`]
    },
    proxy: {
      'api': {
        target: 'https://apewisdom.io/api/v1.0/filter',
        pathRewrite: { '^/api': '' },
      },
      'snp500': {
        target: 'https://en.wikipedia.org/w/api.php?action=parse&prop=sections&page=List_of_S%26P_500_companies&section=1&prop=wikitext&format=json',
        pathRewrite: { '^/snp500': '' },
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@api', path.join(__dirname, './src/api/'));
    config.resolve.alias.set('@components', path.join(__dirname, './src/components/'));
    config.resolve.alias.set('@views', path.join(__dirname, './src/views/'));
  },
})
