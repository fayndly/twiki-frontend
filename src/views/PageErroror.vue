<template>
  <main-component>
    <error-component :pathSticker="data.pathSticker" :text="data.text" />
  </main-component>
</template>

<script>
export default {
  name: "PageErroror",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      requared: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/config.scss";
</style>
