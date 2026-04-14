import { paths } from "./paths";

import { PageProfileCardsView } from "@/pages/profile-cards-view";
import { PageLikesProfileCardsView } from "@/pages/likes-profile-cards-view";
import { PageSympathyProfileCardsView } from "@/pages/sympathy-profile-cards-view";
import { PageSettings } from "@/pages/settings";
import { PageProfileCardEdit } from "@/pages/profile-card-edit";
import { PageProfileCardCreate } from "@/pages/profile-card-create";
import { PageFiltersEdit } from "@/pages/filters-edit";
import { PageNotFound } from "@/pages/not-found";

export const routes = [
  {
    path: paths.pageProfileCardsView,
    element: PageProfileCardsView,
  },
  {
    path: paths.pageLikesProfileCardsView,
    element: PageLikesProfileCardsView,
  },
  {
    path: paths.pageSympathyProfileCardsView,
    element: PageSympathyProfileCardsView,
  },
  {
    path: paths.pageSettings,
    element: PageSettings,
  },
  {
    path: paths.pageProfileCardEdit,
    element: PageProfileCardEdit,
  },
  {
    path: paths.pageProfileCardCreate,
    element: PageProfileCardCreate,
  },
  {
    path: paths.pageFiltersEdit,
    element: PageFiltersEdit,
  },
  {
    path: paths.pageNotFound,
    element: PageNotFound,
  },
];
