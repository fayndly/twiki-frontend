import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  type Location,
  type NavigateFunction,
} from "react-router-dom";
import { backButton, settingsButton } from "@tma.js/sdk-react";

import { PageViewing } from "@/pages/viewing";
import { PageLikes } from "@/pages/likes";
import { PageSympathy } from "@/pages/sympathy";
import { PageSettings } from "@/pages/settings";
import { PageNotFound } from "@/pages/not-found";
import { useEffect } from "react";

const useBackButton = (location: Location, navigate: NavigateFunction) => {
  const goTo = (path: string) => {
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
    navigate("/settings");
  });

  return (
    <Routes>
      <Route path="viewing" element={<PageViewing />} />
      <Route path="likes" element={<PageLikes />} />
      <Route path="sympathy" element={<PageSympathy />} />
      <Route path="settings" element={<PageSettings />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
