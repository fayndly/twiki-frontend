import { Routes, Route } from "react-router-dom";

import { PageViewing } from "@/pages/viewing";
import { PageLikes } from "@/pages/likes";
import { PageSympathy } from "@/pages/sympathy";
import { PageSettings } from "@/pages/settings";
import { PageProfileUpdate } from "@/pages/profile-update";
import { PageProfileCreate } from "@/pages/profile-create";
import { PageFilters } from "@/pages/filters";
import { PageNotFound } from "@/pages/not-found";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="viewing" element={<PageViewing />} />
      <Route path="likes" element={<PageLikes />} />
      <Route path="sympathy" element={<PageSympathy />} />
      <Route path="settings" element={<PageSettings />} />
      <Route path="profile/update" element={<PageProfileUpdate />} />
      <Route path="profile/create" element={<PageProfileCreate />} />
      <Route path="filters" element={<PageFilters />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
