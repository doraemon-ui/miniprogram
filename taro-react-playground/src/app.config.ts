export default defineAppConfig({
  pages: ["pages/index/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  usingComponents: {
    "demo-page": "miniprogram_npm/@doraemon-ui/miniprogram.demo-page/index",
    "demo-block": "miniprogram_npm/@doraemon-ui/miniprogram.demo-block/index",
    "dora-button": "miniprogram_npm/@doraemon-ui/miniprogram.button/index",
  },
});
