import { Routes, Route, useLocation } from "react-router-dom";

import { PageViewing } from "@/pages/viewing";
import { PageLikes } from "@/pages/likes";
import { PageSympathy } from "@/pages/sympathy";
import { PageSettings } from "@/pages/settings";
import { PageProfileUpdate } from "@/pages/profile-update";
import { PageProfileCreate } from "@/pages/profile-create";
import { PageFilters } from "@/pages/filters";
import { PageNotFound } from "@/pages/not-found";
import { AnimatePageWrapper } from "../layouts/AnimatePageWrapper";
import { AnimatePresence } from "framer-motion";

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="viewing"
          element={
            <AnimatePageWrapper>
              <PageViewing />
            </AnimatePageWrapper>
          }
        />
        <Route
          path="likes"
          element={
            <AnimatePageWrapper>
              <PageLikes />
            </AnimatePageWrapper>
          }
        />
        <Route
          path="sympathy"
          element={
            <AnimatePageWrapper>
              <PageSympathy />
            </AnimatePageWrapper>
          }
        />
        <Route
          path="settings"
          element={
            <AnimatePageWrapper>
              <PageSettings />
            </AnimatePageWrapper>
          }
        />
        <Route
          path="profile/update"
          element={
            <AnimatePageWrapper>
              <PageProfileUpdate />
            </AnimatePageWrapper>
          }
        />
        <Route
          path="profile/create"
          element={
            <AnimatePageWrapper>
              <PageProfileCreate />
            </AnimatePageWrapper>
          }
        />
        <Route
          path="filters"
          element={
            <AnimatePageWrapper>
              <PageFilters />
            </AnimatePageWrapper>
          }
        />
        <Route
          path="*"
          element={
            <AnimatePageWrapper>
              <PageNotFound />
            </AnimatePageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
