import styles from "./index.module.scss";
import type { PropsNavbar } from "../types";
import { tabs, variants } from "../config";
import { Tab } from "./Tab";
import { useScrollDirection } from "../model/useScrollDirection";

import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DynamicIcon } from "lucide-react/dynamic";

import { useLikesCards } from "@/app/store/useProfileCards";
import { supportHapticFeedback } from "@/shared/helpers";

export function Navbar({ show }: PropsNavbar) {
  const navigate = useNavigate();
  const location = useLocation();

  const likesCards = useLikesCards(false);

  const clickHandler = (pathTo: string) => {
    supportHapticFeedback("soft");
    navigate(pathTo);
  };

  const scrollDirection = useScrollDirection();
  const isVisible = show && scrollDirection;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.nav
          animate={isVisible ? "visible" : "hidden"}
          className={`${styles.navbar} `}
          variants={variants}
          initial="hidden"
          exit="hidden"
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className={styles.tabs_wrapper}>
            {tabs.map(({ name, pathTo, iconName }) => (
              <Tab
                key={name}
                isActive={location.pathname === pathTo}
                onClick={() => clickHandler(pathTo)}
                hasBadge={name === "likes"}
                badgeCount={name === "likes" ? likesCards.data?.length : 0}
              >
                <DynamicIcon
                  name={iconName}
                  color={
                    location.pathname === pathTo
                      ? "var(--tgui--accent_text_color)"
                      : "var(--tgui--hint_color)"
                  }
                  size={36}
                />
              </Tab>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
