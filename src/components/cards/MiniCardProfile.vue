<template>
  <a class="mini-card-profile" href="https://t.me/lifiij">
    <div class="mini-card-profile__content">
      <img
        class="mini-card-profile__photo"
        :src="userProfileData.photo_url"
        alt=""
      />
      <div class="mini-card-profile__name-age-city">
        <span class="name">{{ userProfileData.name }}</span
        >&nbsp;<span class="age">{{ userProfileData.age }}</span
        >&nbsp;<span class="city">{{ userProfileData.city }}</span>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "MiniCardProfile",
  props: {
    userProfileData: {
      type: Object,
      requared: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/config.scss";

.mini-card-profile {
  display: block;
  cursor: pointer;
  text-decoration: none;

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
    object-fit: cover;
    object-position: center;
    width: 100%;
    display: block;
    border-radius: 15px;
    flex-grow: 1;
    // box-shadow: $shadowCard;
  }
  &__name-age-city {
    color: $tgColorText;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    .name {
    }
    .age {
    }
    .city {
      color: #a0a0a0;
      font-size: 10px;
      line-height: 12px;
    }
  }
}
</style>
