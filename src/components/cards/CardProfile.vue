<template>
  <div
    class="card-profile"
    :class="{
      'card-profile--reaction-like': this.reactionLike,
      'card-profile--reaction-dislike': this.reactionDisLike,
      'card-profile--reaction-report': this.reactionReport,
    }"
  >
    <div class="card-profile__content">
      <img
        class="card-profile__photo"
        :src="userProfileData.photo_url"
        alt=""
      />
      <div
        class="card-profile__complaint"
        :class="{ 'card-profile__complaint--open': complaintIsOpen }"
      >
        <Transition name="complaint">
          <svg
            v-if="!complaintIsOpen"
            @click="clickButtonComplaint"
            class="card-profile__complaint-button"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            />
            <path
              d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
            />
            <path
              d="M11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V7Z"
            />
          </svg>
          <div
            v-else
            class="card-profile__wrapper-complaints wrapper-complaints"
          >
            <div class="wrapper-complaints__top">
              <div class="wrapper-complaints__header">Пожаловаться</div>
              <div class="wrapper-complaints__hide">
                <svg
                  @click="complaintIsOpen = !complaintIsOpen"
                  class="wrapper-complaints__hide"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2.0498"
                    y="0.635742"
                    width="16"
                    height="2"
                    rx="1"
                    transform="rotate(45 2.0498 0.635742)"
                    fill="#868493"
                  />
                  <rect
                    x="13.3633"
                    y="2.0498"
                    width="16"
                    height="2"
                    rx="1"
                    transform="rotate(135 13.3633 2.0498)"
                    fill="#868493"
                  />
                </svg>
              </div>
            </div>
            <div class="wrapper-complaints__body">
              <div class="wrapper-complaints__item">
                <svg
                  class="wrapper-complaints__item-icon"
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.02539 2.82828C5.02539 1.26627 6.29166 0 7.85368 0H9.73557C11.2976 0 12.5639 1.26627 12.5639 2.82828V3.00986C12.5639 3.33012 12.3042 3.58975 11.984 3.58975H11.8887C11.621 3.58975 11.4041 3.3728 11.4041 3.10518L-nan -nanL11.4041 3.10518C11.4041 2.11117 10.5983 1.30536 9.60428 1.30536H8.79462H7.98789C6.99227 1.30536 6.18515 2.11247 6.18515 3.1081L-nan -nanL6.18515 3.1081C6.18515 3.37411 5.96951 3.58975 5.70351 3.58975H5.60527C5.28501 3.58975 5.02539 3.33012 5.02539 3.00986V2.82828Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 3.76951C0 3.27387 0.401796 2.87207 0.897436 2.87207L16.6923 2.87207C17.188 2.87207 17.5898 3.27387 17.5898 3.76951C17.5898 4.26515 17.188 4.66694 16.6923 4.66694L0.897436 4.66694C0.401796 4.66694 0 4.26515 0 3.76951Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.05691 5.92813C2.54968 5.87485 2.99234 6.23114 3.04561 6.72391L4.30832 18.404C4.35758 18.8597 4.74226 19.205 5.20056 19.205L12.2088 19.205C12.6671 19.205 13.0517 18.8597 13.101 18.404L14.3637 6.72391C14.417 6.23114 14.8596 5.87485 15.3524 5.92813C15.8452 5.9814 16.2015 6.42405 16.1482 6.91682L14.8855 18.5969C14.7377 19.9639 13.5837 20.9999 12.2088 20.9999L5.20056 20.9999C3.82564 20.9999 2.67163 19.9639 2.52385 18.5969L1.26113 6.91682C1.20786 6.42405 1.56414 5.9814 2.05691 5.92813Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.64034 7.50422C7.13561 7.48517 7.55255 7.87123 7.5716 8.3665L7.86159 15.9063C7.88064 16.4016 7.49458 16.8185 6.99931 16.8376C6.50404 16.8566 6.08709 16.4705 6.06805 15.9753L5.77805 8.43548C5.759 7.94021 6.14506 7.52327 6.64034 7.50422Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.948 7.57293C11.4432 7.59198 11.8293 8.00892 11.8102 8.5042L11.5202 16.044C11.5012 16.5393 11.0843 16.9253 10.589 16.9063C10.0937 16.8872 9.70765 16.4703 9.7267 15.975L10.0167 8.43521C10.0357 7.93994 10.4527 7.55388 10.948 7.57293Z"
                    fill="#686868"
                  />
                </svg>
                <div class="wrapper-complaints__item-text">Спам</div>
              </div>
              <div class="wrapper-complaints__item">
                <svg
                  class="wrapper-complaints__item-icon"
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.02539 2.82828C5.02539 1.26627 6.29166 0 7.85368 0H9.73557C11.2976 0 12.5639 1.26627 12.5639 2.82828V3.00986C12.5639 3.33012 12.3042 3.58975 11.984 3.58975H11.8887C11.621 3.58975 11.4041 3.3728 11.4041 3.10518L-nan -nanL11.4041 3.10518C11.4041 2.11117 10.5983 1.30536 9.60428 1.30536H8.79462H7.98789C6.99227 1.30536 6.18515 2.11247 6.18515 3.1081L-nan -nanL6.18515 3.1081C6.18515 3.37411 5.96951 3.58975 5.70351 3.58975H5.60527C5.28501 3.58975 5.02539 3.33012 5.02539 3.00986V2.82828Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 3.76951C0 3.27387 0.401796 2.87207 0.897436 2.87207L16.6923 2.87207C17.188 2.87207 17.5898 3.27387 17.5898 3.76951C17.5898 4.26515 17.188 4.66694 16.6923 4.66694L0.897436 4.66694C0.401796 4.66694 0 4.26515 0 3.76951Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.05691 5.92813C2.54968 5.87485 2.99234 6.23114 3.04561 6.72391L4.30832 18.404C4.35758 18.8597 4.74226 19.205 5.20056 19.205L12.2088 19.205C12.6671 19.205 13.0517 18.8597 13.101 18.404L14.3637 6.72391C14.417 6.23114 14.8596 5.87485 15.3524 5.92813C15.8452 5.9814 16.2015 6.42405 16.1482 6.91682L14.8855 18.5969C14.7377 19.9639 13.5837 20.9999 12.2088 20.9999L5.20056 20.9999C3.82564 20.9999 2.67163 19.9639 2.52385 18.5969L1.26113 6.91682C1.20786 6.42405 1.56414 5.9814 2.05691 5.92813Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.64034 7.50422C7.13561 7.48517 7.55255 7.87123 7.5716 8.3665L7.86159 15.9063C7.88064 16.4016 7.49458 16.8185 6.99931 16.8376C6.50404 16.8566 6.08709 16.4705 6.06805 15.9753L5.77805 8.43548C5.759 7.94021 6.14506 7.52327 6.64034 7.50422Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.948 7.57293C11.4432 7.59198 11.8293 8.00892 11.8102 8.5042L11.5202 16.044C11.5012 16.5393 11.0843 16.9253 10.589 16.9063C10.0937 16.8872 9.70765 16.4703 9.7267 15.975L10.0167 8.43521C10.0357 7.93994 10.4527 7.55388 10.948 7.57293Z"
                    fill="#686868"
                  />
                </svg>
                <div class="wrapper-complaints__item-text">Спам</div>
              </div>
              <div class="wrapper-complaints__item">
                <svg
                  class="wrapper-complaints__item-icon"
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.02539 2.82828C5.02539 1.26627 6.29166 0 7.85368 0H9.73557C11.2976 0 12.5639 1.26627 12.5639 2.82828V3.00986C12.5639 3.33012 12.3042 3.58975 11.984 3.58975H11.8887C11.621 3.58975 11.4041 3.3728 11.4041 3.10518L-nan -nanL11.4041 3.10518C11.4041 2.11117 10.5983 1.30536 9.60428 1.30536H8.79462H7.98789C6.99227 1.30536 6.18515 2.11247 6.18515 3.1081L-nan -nanL6.18515 3.1081C6.18515 3.37411 5.96951 3.58975 5.70351 3.58975H5.60527C5.28501 3.58975 5.02539 3.33012 5.02539 3.00986V2.82828Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 3.76951C0 3.27387 0.401796 2.87207 0.897436 2.87207L16.6923 2.87207C17.188 2.87207 17.5898 3.27387 17.5898 3.76951C17.5898 4.26515 17.188 4.66694 16.6923 4.66694L0.897436 4.66694C0.401796 4.66694 0 4.26515 0 3.76951Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.05691 5.92813C2.54968 5.87485 2.99234 6.23114 3.04561 6.72391L4.30832 18.404C4.35758 18.8597 4.74226 19.205 5.20056 19.205L12.2088 19.205C12.6671 19.205 13.0517 18.8597 13.101 18.404L14.3637 6.72391C14.417 6.23114 14.8596 5.87485 15.3524 5.92813C15.8452 5.9814 16.2015 6.42405 16.1482 6.91682L14.8855 18.5969C14.7377 19.9639 13.5837 20.9999 12.2088 20.9999L5.20056 20.9999C3.82564 20.9999 2.67163 19.9639 2.52385 18.5969L1.26113 6.91682C1.20786 6.42405 1.56414 5.9814 2.05691 5.92813Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.64034 7.50422C7.13561 7.48517 7.55255 7.87123 7.5716 8.3665L7.86159 15.9063C7.88064 16.4016 7.49458 16.8185 6.99931 16.8376C6.50404 16.8566 6.08709 16.4705 6.06805 15.9753L5.77805 8.43548C5.759 7.94021 6.14506 7.52327 6.64034 7.50422Z"
                    fill="#686868"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.948 7.57293C11.4432 7.59198 11.8293 8.00892 11.8102 8.5042L11.5202 16.044C11.5012 16.5393 11.0843 16.9253 10.589 16.9063C10.0937 16.8872 9.70765 16.4703 9.7267 15.975L10.0167 8.43521C10.0357 7.93994 10.4527 7.55388 10.948 7.57293Z"
                    fill="#686868"
                  />
                </svg>
                <div class="wrapper-complaints__item-text">Спам</div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <div class="card-profile__menu">
        <div class="card-profile__menu-features">
          <div
            class="card-profile__info"
            :class="{ 'card-profile__info--show': this.showAllInfo }"
            @click="showDescription"
          >
            <div class="card-profile__name-age-city">
              <span class="name">{{ userProfileData.name }}</span
              >&nbsp;<span class="age">{{ userProfileData.age }}</span
              >&nbsp;<span class="city">{{ userProfileData.city }}</span>
            </div>
            <div
              class="card-profile__description"
              :class="{ 'card-profile__description--show': this.showAllInfo }"
              ref="card-profile__description"
            >
              {{ userProfileData.description }}
            </div>
          </div>
          <div class="card-profile__reaction">
            <svg
              @click="clickButtonLike()"
              class="card-profile__reaction-button"
              :class="{ 'card-profile__reaction-button--active': reactionLike }"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.8809 5.86376C14.8822 5.63545 14.8703 5.40698 14.8453 5.17952L14.8416 5.14587C14.7943 4.71604 14.6361 4.30635 14.3829 3.9579C14.1102 3.58256 13.7251 3.30621 13.2848 3.16988L13.0716 3.10385C12.7727 3.01129 12.4586 2.98015 12.1476 3.01225L12.1038 3.01676C11.568 3.07208 11.0682 3.31545 10.6911 3.70465L10.6158 3.78232C10.5179 3.88344 10.4349 3.99842 10.3696 4.12365L9.52721 5.73845L8.46869 7.95831H6.82996C4.16245 7.95831 2 10.1464 2 12.8456V16.1127C2 18.8119 4.16245 21 6.82996 21H16.0455C18.786 21 21.1116 18.9655 21.5075 16.2215L21.9522 13.1397C22.3464 10.408 20.2532 7.95831 17.5249 7.95831H14.6429C14.6387 7.95831 14.6355 7.95456 14.6361 7.95036L14.7694 6.98712L14.794 6.8449C14.8493 6.52499 14.8783 6.20138 14.8809 5.87741C14.8809 5.87286 14.8809 5.86831 14.8809 5.86376ZM11.3753 6.68274L9.76827 10.0529H6.82996C5.30567 10.0529 4.06998 11.3032 4.06998 12.8456V16.1127C4.06998 17.6551 5.30567 18.9055 6.82996 18.9055H16.0455C17.7583 18.9055 19.2118 17.6339 19.4593 15.9189L19.9039 12.8371C20.1157 11.3692 18.991 10.0529 17.5249 10.0529H14.6429C13.3813 10.0529 12.4111 8.92408 12.5861 7.65986L12.7243 6.66119L12.755 6.48373C12.8162 6.12969 12.8274 5.76863 12.788 5.41142L12.7843 5.37776C12.7772 5.31295 12.7534 5.25117 12.7152 5.19863C12.7062 5.1863 12.6936 5.17722 12.6791 5.17274L12.4659 5.10671C12.4309 5.09587 12.3941 5.09222 12.3577 5.09598L12.3139 5.1005C12.259 5.10616 12.2079 5.13108 12.1693 5.17092L12.1577 5.18284L11.3753 6.68274Z"
                fill="#1BCE13"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.86494 18.9055V10.0529H9.76827V18.9055H7.86494Z"
                fill="#1BCE13"
              />
            </svg>
            <svg
              @click="clickButtonDisLike()"
              class="card-profile__reaction-button"
              :class="{
                'card-profile__reaction-button--active': reactionDisLike,
              }"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.11905 18.1362C9.11778 18.3646 9.12965 18.593 9.15469 18.8205L9.1584 18.8541C9.20572 19.284 9.36391 19.6937 9.61709 20.0421C9.88982 20.4174 10.2749 20.6938 10.7152 20.8301L10.9284 20.8962C11.2273 20.9887 11.5414 21.0198 11.8524 20.9878L11.8962 20.9832C12.432 20.9279 12.9318 20.6846 13.3089 20.2953L13.3842 20.2177C13.4821 20.1166 13.5651 20.0016 13.6304 19.8764L14.4728 18.2616L15.5313 16.0417L17.17 16.0417C19.8376 16.0417 22 13.8536 22 11.1544L22 7.88728C22 5.18811 19.8375 3 17.17 3L7.95452 3C5.21398 3 2.88841 5.03454 2.49248 7.77852L2.04781 10.8603C1.65364 13.592 3.74677 16.0417 6.47513 16.0417L9.35711 16.0417C9.3613 16.0417 9.36452 16.0454 9.36394 16.0496L9.23063 17.0129L9.20603 17.1551C9.15068 17.475 9.12168 17.7986 9.11914 18.1226C9.11911 18.1271 9.11908 18.1317 9.11905 18.1362ZM12.6247 17.3173L14.2317 13.9471L17.17 13.9471C18.6943 13.9471 19.93 12.6968 19.93 11.1544L19.93 7.88728C19.93 6.3449 18.6943 5.09455 17.17 5.09455L7.95452 5.09455C6.24168 5.09455 4.7882 6.36614 4.54075 8.08112L4.09608 11.1629C3.88427 12.6308 5.00902 13.9471 6.47513 13.9471L9.35711 13.9471C10.6187 13.9471 11.5889 15.0759 11.4139 16.3401L11.2757 17.3388L11.245 17.5163C11.1838 17.8703 11.1726 18.2314 11.212 18.5886L11.2157 18.6222C11.2228 18.6871 11.2466 18.7488 11.2848 18.8014C11.2938 18.8137 11.3064 18.8228 11.3209 18.8273L11.5341 18.8933C11.5691 18.9041 11.6059 18.9078 11.6423 18.904L11.6861 18.8995C11.741 18.8938 11.7921 18.8689 11.8307 18.8291L11.8423 18.8172L12.6247 17.3173Z"
                fill="#CE4E13"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.1351 5.09455L16.1351 13.9471L14.2317 13.9471L14.2317 5.09455L16.1351 5.09455Z"
                fill="#CE4E13"
              />
            </svg>
          </div>
        </div>
        <div class="card-profile__menu-more">
          <svg
            @click="showDescription"
            class="card-profile__more-button"
            :class="{ 'card-profile__more-button--show': this.showAllInfo }"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.22229 8.48007C2.59047 7.94988 3.28691 7.84243 3.77783 8.24007L11.3333 14.36C11.7284 14.68 12.2716 14.68 12.6667 14.36L20.2222 8.24007C20.7131 7.84243 21.4095 7.94988 21.7777 8.48007C22.1459 9.01026 22.0464 9.76241 21.5555 10.1601L14 16.28C12.8148 17.24 11.1852 17.24 10 16.28L2.44451 10.1601C1.95359 9.76241 1.8541 9.01026 2.22229 8.48007Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProfile",
  props: {
    userProfileData: {
      type: Object,
      requared: true,
    },
  },
  data() {
    return {
      showAllInfo: false,
      reactionLike: false,
      reactionDisLike: false,
      reactionReport: false,
      complaintIsOpen: false,
    };
  },
  methods: {
    showDescription() {
      this.showAllInfo = !this.showAllInfo;
      const description = this.$refs["card-profile__description"];
      if (this.showAllInfo) {
        description.style = `height: ${description.scrollHeight}px;`;
      } else {
        description.style = `height: 34px;`;
      }
    },
    clickButtonComplaint() {
      this.complaintIsOpen = true;
      this.$emit("clickButtonComplaint", this.userProfileData.id);
      // this.reactionReport = true;
    },
    clickButtonLike() {
      this.$emit("clickButtonLike", this.userProfileData.id);
      this.reactionLike = true;
    },
    clickButtonDisLike() {
      this.$emit("clickButtonDisLike", this.userProfileData.id);
      this.reactionDisLike = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/config.scss";

.card-profile {
  box-sizing: border-box;
  width: calc(100% - 32px);
  height: calc(100% - 16px);
  padding: 4px;

  position: absolute;

  background-color: $tgColorSecondaryBg;
  border-radius: 20px;

  transition-duration: 0.8s;

  &--reaction-like {
    transform: translate(150%, 5%) rotate(30deg);
  }
  &--reaction-dislike {
    transform: translate(-150%, 5%) rotate(-30deg);
  }
  &--reaction-report {
    transform: translate(0%, -150%);
  }

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__photo {
    display: block;
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;

    border-radius: 15px;
    position: relative;
  }

  &__complaint {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;

    padding: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__complaint-button {
    width: 24px;
    height: 24px;

    fill: rgba(0, 0, 0, 0.3);
  }

  &__menu {
    display: flex;
    flex-direction: column;

    position: absolute;
    bottom: 0px;
    right: 0px;

    width: 100%;
    // min-height: 100px;

    border-radius: 0 0 14px 14px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 55%,
      #000000 100%
    );
  }

  &__menu-features {
    width: 100%;
    // height: 80px;

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

    transition: 0.3s;
  }

  &__info--show {
    .card-profile__description {
      display: block;
    }
  }

  &__name-age-city {
    overflow: hidden;
    color: #fff;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    .name {
    }
    .age {
    }
    span.city {
      color: #a0a0a0;
      font-size: 14px;
      line-height: 16px;
    }
  }

  &__description {
    transition: 0.3s;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    height: 34px;
    color: #a0a0a0;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
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
    width: 45px;
    height: 45px;
  }

  &__menu-more {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__more-button {
    transition: all 0.3s ease-in-out;
    width: 20px;
    height: 20px;

    fill: #686868;
  }

  &__more-button--show {
    transform: rotate(180deg);
  }

  &__reaction-button--active {
    animation-name: clickReactionButton;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

// .card-profile:first-child {
//   box-shadow: $shadowCard;
// }

.card-profile__complaint--open {
  width: 100%;
}
.wrapper-complaints {
  width: 100%;
  background-color: $tgColorSecondaryBg;
  border-radius: 15px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  &__top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__header {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: $tgColorButtonText;
  }
  &__hide {
    color: $tgColorHint;
  }
  &__body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__item {
    display: flex;
    align-items: center;
  }
  &__item-icon {
  }
  &__item-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-left: 22px;
    color: $tgColorButtonText;
  }
}

@keyframes clickReactionButton {
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

.complaint-enter-active,
.complaint-leave-active {
  transition: opacity 0.3s ease;
}

.complaint-enter-from,
.complaint-leave-to {
  opacity: 0;
}
</style>
