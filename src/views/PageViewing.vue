<template>
  <cards-wrapper>
    <load-cards-wrapper v-if="userCards">
      <card-profile
        @clickButtonComplaint="reportdCard"
        @clickButtonLike="likedCard"
        @clickButtonDisLike="disLikedCard"
        v-for="card in userCards"
        :key="card.id"
        :userProfileData="card"
      />
    </load-cards-wrapper>
    <transition name="preloadCardProfile">
      <preload-card-profile v-if="loadingCards" />
    </transition>
  </cards-wrapper>
</template>

<script>
export default {
  name: "PageViewing",
  data() {
    return {
      haveCards: true,
      loadingCards: false,
      userCards: null,
      numCards: 0,
    };
  },
  methods: {
    getCards(value) {
      const resultCards = [
        {
          id: 123,
          photo_url:
            "https://superstarsbio.com/wp-content/uploads/2019/10/lana-rhoades-4.jpg",
          name: "Лана",
          age: 30,
          city: "Москва",
          description:
            "Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные тексты. Сих путь своего приставка! Рукопись пустился одна что но инициал.",
        },
        {
          id: 1234,
          photo_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjGT0Ouo7pCgPDW9I_RiZt82Y_LVsTPHQck6xwSY3x6t_z8r7AX_4pVXVpBmUJBX3VqKI&usqp=CAU",
          name: "Мария",
          age: 19,
          city: "Вологда",
          description:
            "Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Приставка парадигматическая одна путь щеке ipsum, несколько взгляд за предупреждал но пор они грустный скатился.",
        },
        {
          id: 12345,
          photo_url:
            "https://i.pinimg.com/564x/73/7c/1f/737c1f5385c9d874e3082a058b8db94e.jpg",
          name: "Анжелика",
          age: 18,
          city: "Саранск",
          description:
            "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Коварный страну дороге осталось диких от всех залетают жизни, рукопись своих повстречался запятой! Дорогу вопроса однажды продолжил всеми рыбными, собрал строчка!",
        },
      ];
      const resultError = "error";
      const resultNotCards = null;
      if (value === "cards") {
        return resultCards;
      } else if (value === "error") {
        throw resultError;
      } else if (value === "notCards") {
        return resultNotCards;
      } else if (value === "random") {
        var rand = Math.floor(Math.random() * 3);
        if (rand === 0) {
          return resultCards;
        } else if (rand === 1) {
          throw resultError;
        } else if (rand === 2) {
          return resultNotCards;
        }
      }
    },
    showPopapTgError(numError) {
      const tg = window.Telegram.WebApp;
      tg.showPopup(
        {
          title: "Ошибка",
          message: `Не удалось загрузить анкеты, обновите приложение или возвращайтесь позже, код ошибки(${numError})`,
          buttons: [
            { id: "send", type: "default", text: "Обновить" },
            { id: "close", type: "default", text: "Закрыть" },
          ],
        },
        function (button_id) {
          if (button_id === "send") {
            location.reload();
          } else if (button_id === "close") {
            tg.close();
          }
        }
      );
    },
    getProfileLikes() {
      this.loadingCards = true;
      setTimeout(() => {
        try {
          const data = this.getCards("cards");
          if (data) {
            this.userCards = data;
          } else {
            this.showPopapTgError(404);
          }
        } catch (e) {
          this.showPopapTgError(e);
        } finally {
          this.loadingCards = false;
        }
      }, 3000);
    },
  },
  mounted() {
    console.log("PageViewing");
    this.getProfileLikes();
  },
};
</script>

<style scoped lang="scss">
.preloadCardProfile-enter-active,
.preloadCardProfile-leave-active {
  transition: opacity 0.3s ease;
}

.preloadCardProfile-enter-from,
.preloadCardProfile-leave-to {
  opacity: 0;
}
</style>
