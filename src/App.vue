<template>
  <main-component v-if="openWebApp">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <navbar-wrapper>
      <navbar-component />
    </navbar-wrapper>
  </main-component>
  <page-erroror v-else :data="errorParams"/>
</template>

<script>
import PageErroror from "./views/PageErroror.vue";

export default {
  name: "app",
  components: {
    PageErroror,
  },
  data() {
    return {
      config: {
        supportedVersion: 6.2,
        supportedPlatforms: ["android", "ios", "webz", "unknown", "tdesktop"],
        notSupportedPlatforms: [],
      },
      tgParams: {
        platform: null,
        version: null,
      },
      errorParams: {
        pathSticker: null,
        text: "",
      },
      openWebApp: false,
      notFound: null,
    };
  },
  beforeMount() {
    const tg = window.Telegram.WebApp;
    this.tgParams.platform = tg.platform;
    this.tgParams.version = tg.version;

    tg.expand();
    // tg.enableClosingConfirmation()
    // if (!tg.isExpanded) {
    // }
    if (
      this.config.supportedPlatforms.includes(this.tgParams.platform) &
      !this.config.notSupportedPlatforms.includes(this.tgParams.platform)
    ) {
      if (tg.isVersionAtLeast(parseFloat(this.config.supportedVersion))) {
        // if (parseFloat(this.config.supportedVersion) < this.tgParams.version) {
        this.openWebApp = true;
      } else {
        this.errorParams.pathSticker = require("@/assets/emoji/json/PinkFlamingo looking at phone.json");
        this.errorParams.text = `Ваша версия WebBotApi(${tg.version}) не поддерживается ботом, обновите приложение телеграм`;
      }
    } else {
      this.errorParams.pathSticker = require("@/assets/emoji/json/WhiteDuck hitting pc.json");
      this.errorParams.text = `Ваша платформа пока не поддерживается ботом`;
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/config.scss";
* {
  margin: 0;
  padding: 0;
}
body {
  width: 100vw;
  height: 100vh;

  overflow: hidden;
  font-family: $fontFamily;

  box-sizing: border-box;
  background-color: $tgColorBg;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
// video router
// .route-enter-from {
//   opacity: 0;
//   transform: translateX(100px);
// }
// .route-enter-active {
//   transition: ass 0.3s ease-in-out;
// }
// .route-leave-to {
//   opacity: 0;
//   transform: translateX(-100px);
// }
// .route-leave-active {
//   transition: all 0.3s ease-in-out;
// }

// my router
.route-enter-active {
  transition: opacity 0.3s ease;

}
.route-leave-active {
  transition: opacity 0.3s ease;
}

.route-enter-from {
  opacity: 0;

}
.route-leave-to {
  opacity: 0;
}

// .route-enter-active {
//   transition: all 0.3s ease-in-out;

// }
// .route-leave-active {
//   transition: opacity 0.1s ease;
// }

// .route-enter-from {
//   opacity: 0;
//   transform: translateX(100%);

// }
// .route-leave-to {
//   opacity: 0;
//   transform: translateX(-100%);
// }
</style>
