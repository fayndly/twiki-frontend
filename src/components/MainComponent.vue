<template>
  <main class="main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: "MainComponent",
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  justify-content: space-between;

  gap: 8px;
}
</style>
