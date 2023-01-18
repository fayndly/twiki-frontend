<template>
  <div class="error-wrapper">
    <lottie-animation
      class="error-wrapper__sticker"
      ref="anim"
      :animationData="pathSticker"
      :loop="true"
      :autoPlay="true"
      :speed="1"
    />
    <div class="error-wrapper__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "ErrorComponent",
  props: ["pathSticker", "text"],
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/config.scss";
.error-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;
  padding-bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__sticker {
    width: 150px;
    height: 150px;
  }
  &__text {
    margin-top: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    text-align: center;
    color: $tgColorHint;

    max-width: 80%;
  }
}
</style>
