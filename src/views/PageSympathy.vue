<template>
  <div>
    PageSympathy
    <miniCard />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import miniCard from "@/components/miniCard.vue";

@Options({
  components: {
    miniCard,
  },
})
export default class PageSympathy extends Vue {}
</script>
