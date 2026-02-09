import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { PageViewing } from "@/pages/viewing";
import { PageLikes } from "@/pages/likes";
import { PageSympathy } from "@/pages/sympathy";
import { PageSettings } from "@/pages/settings";
import { PageProfileUpdate } from "@/pages/profile-update";
import { PageNotFound } from "@/pages/not-found";
import { PageProfileCreate } from "@/pages/profile-create";
import { PageFilters } from "@/pages/filters";

import { useEffect } from "react";
import { hapticFeedback, mainButton, settingsButton } from "@tma.js/sdk-react";

const mainButtonPaths = ["/profile/create", "/profile/update", "/filters"];
const settingsButtonPathsHide = ["/profile/create"];

export function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!mainButtonPaths.includes(location.pathname)) mainButton.hide();
    !settingsButtonPathsHide.includes(location.pathname)
      ? settingsButton.show()
      : settingsButton.hide();
  }, [location]);

  useEffect(() => {
    const handler = () => {
      hapticFeedback.isSupported() && hapticFeedback.impactOccurred("light");
      navigate("/settings");
    };
    settingsButton.onClick(handler);

    return () => {
      settingsButton.offClick(handler);
    };
  });
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
