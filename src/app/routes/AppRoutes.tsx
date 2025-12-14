import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  type Location,
  type NavigateFunction,
} from "react-router-dom";
import { backButton, hapticFeedback, settingsButton } from "@tma.js/sdk-react";
import { useEffect } from "react";

import { PageViewing } from "@/pages/viewing";
import { PageLikes } from "@/pages/likes";
import { PageSympathy } from "@/pages/sympathy";
import { PageSettings } from "@/pages/settings";
import { PageProfileUpdate } from "@/pages/profile-update";
import { PageNotFound } from "@/pages/not-found";

const useBackButton = (location: Location, navigate: NavigateFunction) => {
  const goTo = (path: string) => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("medium");
    }
    navigate(path);
    backButton.hide();
  };

  useEffect(() => {
    if (location.pathname === "/settings") {
      backButton.show();
      backButton.onClick(() => {
        goTo("/viewing");
      });
    } else {
      backButton.hide();
    }
  }, [location]);
};

export function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useBackButton(location, navigate);

  settingsButton.onClick(() => {
    if (hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred("light");
    }
    navigate("/settings");
  });

  return (
    <Routes>
      <Route path="viewing" element={<PageViewing />} />
      <Route path="likes" element={<PageLikes />} />
      <Route path="sympathy" element={<PageSympathy />} />
      <Route path="settings" element={<PageSettings />} />
      <Route path="profile/update" element={<PageProfileUpdate />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
