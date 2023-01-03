const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // publicPath: process.env.NODE_ENV === "production" ? "/twiki-frontend/" : "/",
  publicPath: "/twiki-frontend/",
  transpileDependencies: true,
});
