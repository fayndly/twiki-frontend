<template>
  <div>
    PageLikes
    <card />
    <miniCard />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import card from "@/components/card.vue";
import miniCard from "@/components/miniCard.vue";

@Options({
  components: {
    card,
    miniCard,
  },
})
export default class PageLikes extends Vue {}
</script>
