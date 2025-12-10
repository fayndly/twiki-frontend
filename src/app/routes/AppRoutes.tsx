import { Routes, Route } from "react-router-dom";

import { PageViewing } from "@/pages/viewing";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/viewing" element={<PageViewing />} />
    </Routes>
  );
}
