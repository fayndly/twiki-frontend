import { AnimatePageWrapper } from "../layouts/AnimatePageWrapper";
import { routes } from "./routes";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {routes.map((value) => {
          return (
            <Route
              key={value.path}
              path={value.path}
              element={
                <AnimatePageWrapper>
                  <value.element />
                </AnimatePageWrapper>
              }
            />
          );
        })}
      </Routes>
    </AnimatePresence>
  );
}
