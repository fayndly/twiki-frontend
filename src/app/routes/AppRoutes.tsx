import { Routes, Route } from "react-router-dom";

import { PageViewing } from "@/pages/viewing";
import { PageLikes } from "@/pages/likes";
import { PageSympathy } from "@/pages/sympathy";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/viewing" element={<PageViewing />} />
      <Route path="/likes" element={<PageLikes />} />
      <Route path="/sympathy" element={<PageSympathy />} />
    </Routes>
  );
}
