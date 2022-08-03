const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    proxy: {
        '/api': {
            target: `http://127.0.0.1:8000/api`,  // 跨域地址
            changeOrigin: true, // 是否跨域
            pathRewrite: {
                '^/api': '' // 跨域重写
            }
        }
    }
}
});
