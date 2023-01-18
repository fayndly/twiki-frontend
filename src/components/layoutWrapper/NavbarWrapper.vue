<template>
    <div class="navbar--wrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "NavbarWrapper",
};
</script>

<style scoped lang="scss">
.navbar--wrapper {
  width: 100%;
  padding: 16px;
  padding-top: 0;
  box-sizing: border-box;
}
</style>