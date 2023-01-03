<template>
  <div class="card">
    <div class="card__content">
      <img
        class="card__user-image"
        src="https://superstarsbio.com/wp-content/uploads/2019/10/lana-rhoades-4.jpg"
        alt=""
      />
      <div class="card__complaint"></div>
      <div class="description card__description">
        <div class="card__row_1">
          <div class="description__info">
            <div class="main-info"></div>
            <div class="side-info"></div>
          </div>
          <div class="description__reaction"></div>
        </div>
        <div class="card__row_2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class card extends Vue {}
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
}
.card {
  padding: 4px;

  // position: absolute;

  background-color: #25222e;
  border-radius: 20px;

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__user-image {
    display: block;
    width: 100%;
    height: calc(100% + 4px);

    object-fit: cover;
    object-position: center;

    border-radius: 15px;
    position: relative;
  }
  &__complaint {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  &__description {
    display: flex;
    flex-direction: column;
    position: absolute;

    bottom: 0px;
    left: 0px;
  }
  &__row {
    &_1 {
      display: flex;
    }
    &_2 {
    }
  }
  &__info {
  }
  &__reaction {
  }
}

.description {
  display: flex;
  flex-direction: column;
}

.main-info {
}

.side-info {
  // align-self: stretch;
  // align-self: initial;
  overflow: hidden;
  text-overflow: ellipsis;
  // height: 33px;
}
</style>
