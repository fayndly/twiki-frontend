import { Routes, Route, BrowserRouter } from "react-router-dom";

import { PageViewing } from "@/pages/viewing";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/viewing" element={<PageViewing />} />
      </Routes>
    </BrowserRouter>
  );
}
