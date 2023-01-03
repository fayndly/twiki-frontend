<template>
  <main>
    <card />
    <navbar />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import card from "@/components/card.vue";
import navbar from "@/components/navbar.vue";

@Options({
  components: {
    card,
    navbar,
  },
})
export default class PageViewing extends Vue {}
</script>
