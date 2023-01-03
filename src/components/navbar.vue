<template>
  <nav class="navbar"></nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class navbar extends Vue {}
</script>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 55px;
}
</style>
