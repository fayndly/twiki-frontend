"use strict";(self["webpackChunktwiki_frontend"]=self["webpackChunktwiki_frontend"]||[]).push([[252],{9252:function(e,r,t){t.r(r),t.d(r,{default:function(){return l}});var a=t(3396),o=t(9242);function s(e,r,s,i,d,n){const l=(0,a.up)("card-profile"),p=(0,a.up)("load-cards-wrapper"),u=(0,a.up)("preload-card-profile"),c=(0,a.up)("cards-wrapper"),f=(0,a.up)("ErrorComponent");return d.haveCards?((0,a.wg)(),(0,a.j4)(c,{key:0},{default:(0,a.w5)((()=>[d.userCards?((0,a.wg)(),(0,a.j4)(p,{key:0},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(d.userCards,(e=>((0,a.wg)(),(0,a.j4)(l,{key:e.id,userProfileData:e},null,8,["userProfileData"])))),128))])),_:1})):(0,a.kq)("",!0),(0,a.Wm)(o.uT,{name:"preloadCardProfile"},{default:(0,a.w5)((()=>[d.loadingCards?((0,a.wg)(),(0,a.j4)(u,{key:0})):(0,a.kq)("",!0)])),_:1})])),_:1})):d.haveCards?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(f,{key:1,pathSticker:t(3991),text:"Похоже что у вас нет лайков"},null,8,["pathSticker"]))}var i={name:"PageLikes",data(){return{haveCards:!0,loadingCards:!1,userCards:null}},methods:{getCards(e){const r=[{id:123,photo_url:"https://superstarsbio.com/wp-content/uploads/2019/10/lana-rhoades-4.jpg",name:"Лана",age:30,city:"Москва",description:"Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные тексты. Сих путь своего приставка! Рукопись пустился одна что но инициал."},{id:1234,photo_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjGT0Ouo7pCgPDW9I_RiZt82Y_LVsTPHQck6xwSY3x6t_z8r7AX_4pVXVpBmUJBX3VqKI&usqp=CAU",name:"Мария",age:19,city:"Вологда",description:"Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Приставка парадигматическая одна путь щеке ipsum, несколько взгляд за предупреждал но пор они грустный скатился."},{id:12345,photo_url:"https://i.pinimg.com/564x/73/7c/1f/737c1f5385c9d874e3082a058b8db94e.jpg",name:"Анжелика",age:18,city:"Саранск",description:"Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Коварный страну дороге осталось диких от всех залетают жизни, рукопись своих повстречался запятой! Дорогу вопроса однажды продолжил всеми рыбными, собрал строчка!"}],t="error",a=null;if("cards"===e)return r;if("error"===e)throw t;if("notCards"===e)return a;if("random"===e){var o=Math.floor(3*Math.random());if(0===o)return r;if(1===o)throw t;if(2===o)return a}},showPopapTgError(){const e=window.Telegram.WebApp;e.showPopup({title:"Ошибка",message:"Не удалось загрузить анкеты, обновите приложение или возвращайтесь позже",buttons:[{id:"send",type:"default",text:"Обновить"},{id:"close",type:"default",text:"Закрыть"}]},(function(r){"send"===r?location.reload():"close"===r&&e.close()}))},getProfileLikes(){this.loadingCards=!0,setTimeout((()=>{try{const e=this.getCards("cards");e?this.userCards=e:this.haveCards=!1}catch(e){console.log(e),this.showPopapTgError()}finally{this.loadingCards=!1}}),3e3)}},mounted(){console.log("PageLikes"),this.getProfileLikes()}},d=t(89);const n=(0,d.Z)(i,[["render",s],["__scopeId","data-v-4997e1a8"]]);var l=n}}]);
//# sourceMappingURL=252.9c59618e.js.map