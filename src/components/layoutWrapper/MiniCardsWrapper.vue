<template>
  <div class="mini-cards__wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MiniCardsWrapper",
};
</script>

<style scoped lang="scss">
.mini-cards__wrapper {
  display: flex;
  flex-wrap: wrap;
  // flex-grow: 1;
  max-height: 100%;
  // align-items: baseline;
  justify-content: flex-start;
  overflow-y: scroll;
  gap: 16px;

  padding: 16px;
  padding-bottom: 0;
}

.mini-cards__wrapper::-webkit-scrollbar {
  display: none;
}
</style>
