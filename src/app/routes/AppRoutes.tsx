import { Routes, Route, useNavigate } from "react-router-dom";
import { settingsButton } from "@tma.js/sdk-react";

import { PageViewing } from "@/pages/viewing";
import { PageLikes } from "@/pages/likes";
import { PageSympathy } from "@/pages/sympathy";
import { PageSettings } from "@/pages/settings";

export function AppRoutes() {
  const navigate = useNavigate();

  settingsButton.onClick(() => {
    navigate("/settings");
  });

  return (
    <Routes>
      <Route path="/viewing" element={<PageViewing />} />
      <Route path="/likes" element={<PageLikes />} />
      <Route path="/sympathy" element={<PageSympathy />} />
      <Route path="/settings" element={<PageSettings />} />
    </Routes>
  );
}
