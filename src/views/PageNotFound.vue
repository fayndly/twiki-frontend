<template>
  <error-component
    :pathSticker="require('@/assets/emoji/json/YellowDuck thinks.json')"
    :text="'Страница не найдена'"
  ></error-component>
</template>

<script>
export default {
  name: "PageNotFound",
  data() {
    return {
    };
  },
};
</script>
