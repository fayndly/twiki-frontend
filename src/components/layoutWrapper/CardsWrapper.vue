<template>
  <div class="cards--wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CardsWrapper",
};
</script>

<style scoped lang="scss">
.cards--wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 16px;
  padding-bottom: 0;
  position: relative;
}
</style>
