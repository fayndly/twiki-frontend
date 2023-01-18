import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import components from "@/components";

const app = createApp(App);
app.config.devtools = true

import LottieAnimation from "lottie-web-vue";
app.use(LottieAnimation);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(store).use(router).mount("#app");
