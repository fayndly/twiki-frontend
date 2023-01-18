<template>
  <div class="preload-mini-card-profile">
    <div class="preload-mini-card-profile__content">
      <div class="preload-mini-card-profile__photo" />
      <div class="preload-mini-card-profile__name-age-city" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PreloadMiniCardProfile",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/config.scss";

.preload-mini-card-profile {
  $width_container: calc(100vw - 32px);
  width: calc($width_container / 2 - 8px);
  min-height: calc($width_container / 2 * 1.3);

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  &__photo {
    overflow: hidden;
    position: relative;
    width: 100%;
    border-radius: 15px;
    flex-grow: 1;
    background-color: $tgColorSecondaryBg;
    box-shadow: $shadowCard;
  }
  &__name-age-city {
    overflow: hidden;
    position: relative;
    width: 140px;
    height: 20px;
    border-radius: 8px;
    background-color: $tgColorSecondaryBg;
  }
  &__photo::before,
  &__name-age-city::before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba($tgColorHint, 0.3) 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1);
    animation-iteration-count: infinite;
  }
}

@keyframes load {
  from {
    left: -150px;
  }
  to {
    left: 100%;
  }
}
</style>
