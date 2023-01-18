<template>
  <div class="preload-card-profile">
    <div class="preload-card-profile__content">
      <div class="preload-card-profile__photo" />
      <div class="preload-card-profile__complaint">
        <div class="preload-card-profile__complaint-button" />
      </div>
      <div class="preload-card-profile__menu">
        <div class="preload-card-profile__menu-features">
          <div class="preload-card-profile__info">
            <div class="preload-card-profile__name-age-city" />
            <div class="preload-card-profile__description" />
          </div>
          <div class="preload-card-profile__reaction">
            <div class="preload-card-profile__reaction-button" />
            <div class="preload-card-profile__reaction-button" />
          </div>
        </div>
        <div class="preload-card-profile__menu-more">
          <div class="preload-card-profile__more-button" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreloadCardProfile",
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/config.scss";

.preload-card-profile {
  box-sizing: border-box;
  width: calc(100% - 32px);
  height: calc(100% - 16px);
  padding: 4px;

  position: absolute;

  background-color: $tgColorSecondaryBg;
  border-radius: 20px;

  overflow: hidden;
  box-shadow: $shadowCard;
  &__content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__photo {
    width: 100%;
    height: 100%;

    border-radius: 15px;
    position: relative;
    background-color: $tgColorBg;
  }

  &__complaint {
    position: absolute;
    top: 0;
    right: 0;

    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__complaint-button {
    overflow: hidden;
    position: relative;

    width: 24px;
    height: 24px;

    // background-color: $tgColorSecondaryBg;
    border-radius: 50%;
  }

  &__menu {
    display: flex;
    flex-direction: column;

    position: absolute;
    bottom: 0px;
    right: 0px;

    width: 100%;
  }

  &__menu-features {
    width: 100%;

    display: flex;
    align-items: flex-end;
  }

  &__info {
    width: 80%;
    height: 100%;

    padding: 4px 0px 4px 12px;
    gap: 8px;
    display: flex;
    flex-direction: column;
  }

  &__name-age-city {
    overflow: hidden;
    position: relative;

    width: 140px;
    height: 20px;

    background-color: $tgColorSecondaryBg;
    border-radius: 8px;
  }

  &__description {
    overflow: hidden;
    position: relative;

    height: 34px;
    width: 100%;

    background-color: $tgColorSecondaryBg;
    border-radius: 8px;
  }

  &__reaction {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    padding: 4px 16px;
    gap: 16px;
  }

  &__reaction-button {
    overflow: hidden;
    position: relative;

    width: 45px;
    height: 45px;

    // background-color: $tgColorSecondaryBg;
    border-radius: 50%;
  }

  &__menu-more {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__more-button {
    overflow: hidden;
    position: relative;

    width: 16px;
    height: 16px;

    // background-color: $tgColorSecondaryBg;
    border-radius: 50%;
  }

  // &__more-button::before,
  &__name-age-city::before, 
  &__description::before, 
  // &__complaint-button::before, 
  // &__reaction-button::before,
  &::before {
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
