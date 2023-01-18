<template>
  <main-component>
    <cards-wrapper>
      <preload-card-profile />
    </cards-wrapper>
    <navbar-wrapper>
      <navbar-component />
    </navbar-wrapper>
  </main-component>
</template>

<script>
export default {
  name: "PagePreview",
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
  img {
    width: 50vw;
    height: 50vw;
  }

  .text {
    margin-top: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    text-align: center;
    color: $tgColorHint;
  }
}

.duck {
  width: 150px;
  height: 150px;
}
</style>
