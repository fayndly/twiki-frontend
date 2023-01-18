<template>
  <div class="card__wrapper">
    <p>colorScheme: {{ colorScheme }}</p>
    <p>version: {{ version }}</p>
    <p>platform: {{ platform }}</p>
    <p>isExpanded: {{ isExpanded }}</p>
    <p>viewportHeight: {{ viewportHeight }}</p>
    <p>viewportStableHeight: {{ viewportStableHeight }}</p>
    <p>headerColor: {{ headerColor }}</p>
    <p>backgroundColor: {{ backgroundColor }}</p>
    <p>isClosingConfirmationEnabled: {{ isClosingConfirmationEnabled }}</p>
    <p>BackButton: {{ BackButton }}</p>
    <p>MainButton: {{ MainButton }}</p>
    <p>HapticFeedback: {{ HapticFeedback }}</p>
  </div>
</template>

<script>
export default {
  name: "TestView",
  data() {
    return {
      colorScheme: "",
      version: "",
      platform: "",
      isExpanded: "",
      viewportHeight: "",
      viewportStableHeight: "",
    };
  },
  beforeMount() {
    const tg = window.Telegram.WebApp;
    if (!tg.isExpanded) {
      tg.expand();
    }
    this.colorScheme = tg.colorScheme;
    this.version = tg.version;
    this.platform = tg.platform;
    this.isExpanded = tg.isExpanded;
    this.viewportHeight = tg.viewportHeight;
    this.viewportStableHeight = tg.viewportStableHeight;
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/config.scss";

.card__wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;
  padding-bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.duck {
  width: 150px;
  height: 150px;
}
</style>
