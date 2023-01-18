<template>
  <nav class="navbar">
    <svg
      @click="openPage('sympathy')"
      :class="{ 'navbar__button--active': this.$route.name === 'sympathy' }"
      class="navbar__button"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.8867 5.97989H6.12288C4.98437 5.97989 4.06144 6.86631 4.06144 7.95978V14.1198C4.06144 15.0852 4.78642 15.9099 5.77739 16.0717L17.5308 17.9907C18.8871 18.2122 20.0844 17.1198 19.9236 15.8075L18.934 7.72845C18.8119 6.73135 17.932 5.97989 16.8867 5.97989ZM6.12288 4C3.84587 4 2 5.77285 2 7.95978V14.1198C2 16.0507 3.44997 17.7 5.4319 18.0236L17.1853 19.9426C19.8979 20.3855 22.2924 18.2008 21.9709 15.5762L20.9813 7.49711C20.737 5.50292 18.9773 4 16.8867 4H6.12288Z"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.12288 8.94972C6.12288 8.40299 6.58434 7.95978 7.15359 7.95978H15.3993C15.9686 7.95978 16.4301 8.40299 16.4301 8.94972C16.4301 9.49645 15.9686 9.93967 15.3993 9.93967H7.15359C6.58434 9.93967 6.12288 9.49645 6.12288 8.94972Z"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.21503 12.9095C9.21503 12.3628 9.6765 11.9196 10.2458 11.9196H15.3993C15.9686 11.9196 16.4301 12.3628 16.4301 12.9095C16.4301 13.4562 15.9686 13.8994 15.3993 13.8994H10.2458C9.6765 13.8994 9.21503 13.4562 9.21503 12.9095Z"
      />
      <path
        d="M8.18431 12.9095C8.18431 13.4562 7.72285 13.8994 7.15359 13.8994C6.58434 13.8994 6.12288 13.4562 6.12288 12.9095C6.12288 12.3628 6.58434 11.9196 7.15359 11.9196C7.72285 11.9196 8.18431 12.3628 8.18431 12.9095Z"
      />
    </svg>
    <svg
      @click="openPage('likes')"
      :class="{ 'navbar__button--active': this.$route.name === 'likes' }"
      class="navbar__button"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.2496 16.2178C18.7336 14.4908 19.6704 12.3297 19.9208 10.6831C20.2857 8.28289 19.3459 6.44064 18.1762 5.58245C17.5976 5.15788 16.9678 4.96841 16.3499 5.00432C15.7408 5.03973 14.9962 5.30304 14.1996 6.0389C12.9657 7.17869 11.0343 7.17869 9.80039 6.03889C9.00379 5.30304 8.25925 5.03973 7.65007 5.00432C7.03218 4.96841 6.40244 5.15788 5.82378 5.58245C4.65413 6.44064 3.71433 8.28289 4.07924 10.6831C4.3236 12.2905 5.25889 14.4534 6.74871 16.1936C8.23203 17.9262 10.0458 19 12 19C13.962 19 15.773 17.9362 17.2496 16.2178ZM12 21C17.4665 21 21.278 15.0622 21.898 10.9838C22.8269 4.87381 17.2178 0.528163 12.8425 4.56977C12.3749 5.00173 11.6251 5.00173 11.1575 4.56977C6.78222 0.528163 1.17306 4.87381 2.10196 10.9838C2.71107 14.9903 6.53346 21 12 21Z"
      />
    </svg>
    <svg
      @click="openPage('viewing')"

      :class="{ 'navbar__button--active': this.$route.name === 'viewing' }"
      class="navbar__button"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 4.32651H7C6.44771 4.32651 6 4.77423 6 5.32651V19.3265C6 19.8788 6.44772 20.3265 7 20.3265H13C13.5523 20.3265 14 19.8788 14 19.3265V5.32651C14 4.77423 13.5523 4.32651 13 4.32651ZM7 2.32651C5.34315 2.32651 4 3.66966 4 5.32651V19.3265C4 20.9834 5.34315 22.3265 7 22.3265H13C14.6569 22.3265 16 20.9834 16 19.3265V5.32651C16 3.66966 14.6569 2.32651 13 2.32651H7Z"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.5565 3.03482L17.3521 4.58773C17.8855 4.73068 18.2021 5.27901 18.0592 5.81248L14.4357 19.3354C14.3675 19.5899 14.2071 19.7951 14 19.9245V20.3265H6.60386C6.69914 20.3628 6.79718 20.3945 6.89778 20.4215L12.6933 21.9744C14.2937 22.4032 15.9387 21.4535 16.3676 19.8531L19.991 6.33012C20.4199 4.72972 19.4701 3.08471 17.8697 2.65588L12.0742 1.10297C10.4738 0.674142 8.82875 1.62389 8.39993 3.22429L8.10459 4.32651H10.1751L10.3318 3.74193C10.4747 3.20846 11.0231 2.89188 11.5565 3.03482ZM5.99999 12.181L4.77646 16.7473C4.43575 18.0188 4.96529 19.3185 5.99999 20.014V12.181Z"
      />
    </svg>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {};
  },
  methods: {
    openPage(name) {
      if (this.$route.params.id) {
        this.$router.push({
          name: name,
          params: { id: this.$route.params.id },
        })
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/config.scss";

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 55px;

  &__button {
    fill: #686868;
    transition: all 0.3s ease;

    width: 35px;
    height: 35px;
  }
}

.navbar {
  &__button--active {
    transform: scale(1.2);
    fill: $tgColorButton;
    // animation-name: clickNavbarButton;
    // animation-duration: 0.3s;
    // animation-timing-function: ease-in-out;
    // animation-iteration-count: 1;
    // animation-fill-mode: forwards;
  }
}

@keyframes clickNavbarButton {
  from {
    transform: scale(1);
  }
  40% {
    transform: scale(0.9);
    fill: $tgColorButton;
  }
  to {
    transform: scale(1.2);
    fill: $tgColorButton;

  }
}
</style>
