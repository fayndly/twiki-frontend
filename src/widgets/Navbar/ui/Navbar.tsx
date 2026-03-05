import styles from "./NavBar.module.scss";
import type { PropsNavbar } from "../types";

import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { supportHapticFeedback } from "@/shared/helpers";
import { Tab } from "./Tab";
import { useLikesCards } from "@/app/store/useLikesCards";

const tabs = [
  {
    name: "sympathy",
    pathTo: "/sympathy",
    Icon() {
      return (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.33 8.96983H9.18431C7.47656 8.96983 6.09216 10.2995 6.09216 11.9397V21.1797C6.09216 22.6279 7.17963 23.8649 8.66609 24.1076L26.2962 26.9861C28.3307 27.3183 30.1266 25.6797 29.8854 23.7113L28.401 11.5927C28.2178 10.097 26.898 8.96983 25.33 8.96983ZM9.18431 6C5.76881 6 3 8.65928 3 11.9397V21.1797C3 24.076 5.17495 26.55 8.14785 27.0354L25.778 29.9139C29.8469 30.5783 33.4386 27.3011 32.9564 23.3643L31.472 11.2457C31.1056 8.25438 28.466 6 25.33 6H9.18431Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.18431 13.4246C9.18431 12.6045 9.87652 11.9397 10.7304 11.9397H23.099C23.9529 11.9397 24.6451 12.6045 24.6451 13.4246C24.6451 14.2447 23.9529 14.9095 23.099 14.9095H10.7304C9.87652 14.9095 9.18431 14.2447 9.18431 13.4246Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.8225 19.3643C13.8225 18.5442 14.5148 17.8793 15.3686 17.8793H23.099C23.9529 17.8793 24.6451 18.5442 24.6451 19.3643C24.6451 20.1843 23.9529 20.8492 23.099 20.8492H15.3686C14.5148 20.8492 13.8225 20.1843 13.8225 19.3643Z"
          />
          <path d="M12.2765 19.3643C12.2765 20.1843 11.5843 20.8492 10.7304 20.8492C9.87652 20.8492 9.18431 20.1843 9.18431 19.3643C9.18431 18.5442 9.87652 17.8793 10.7304 17.8793C11.5843 17.8793 12.2765 18.5442 12.2765 19.3643Z" />
        </svg>
      );
    },
  },
  {
    name: "likes",
    pathTo: "/likes",
    Icon() {
      return (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.8743 24.3267C28.1004 21.7362 29.5057 18.4945 29.8811 16.0247C30.4285 12.4243 29.0188 9.66095 27.2643 8.37368C26.3963 7.73683 25.4517 7.45262 24.5249 7.50649C23.6111 7.55959 22.4943 7.95456 21.2994 9.05834C19.4486 10.768 16.5514 10.768 14.7006 9.05834C13.5057 7.95456 12.3889 7.55959 11.4751 7.50648C10.5483 7.45262 9.60366 7.73683 8.73567 8.37367C6.9812 9.66095 5.57149 12.4243 6.11886 16.0247C6.4854 18.4357 7.88834 21.6802 10.1231 24.2904C12.348 26.8893 15.0687 28.5 18 28.5C20.9429 28.5 23.6595 26.9042 25.8743 24.3267ZM18 31.5C26.1998 31.5 31.917 22.5933 32.8471 16.4756C34.2404 7.31071 25.8267 0.792245 19.2638 6.85466C18.5624 7.50259 17.4376 7.50259 16.7362 6.85466C10.1733 0.792244 1.75959 7.31071 3.15294 16.4756C4.0666 22.4854 9.80019 31.5 18 31.5Z"
          />
        </svg>
      );
    },
  },
  {
    name: "viewing",
    pathTo: "/viewing",
    Icon() {
      return (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.5 6.48977H10.5C9.67157 6.48977 9 7.16134 9 7.98976V28.9898C9 29.8182 9.67157 30.4898 10.5 30.4898H19.5C20.3284 30.4898 21 29.8182 21 28.9898V7.98977C21 7.16134 20.3284 6.48977 19.5 6.48977ZM10.5 3.48977C8.01472 3.48977 6 5.50448 6 7.98976V28.9898C6 31.475 8.01472 33.4898 10.5 33.4898H19.5C21.9853 33.4898 24 31.475 24 28.9898V7.98977C24 5.50448 21.9853 3.48977 19.5 3.48977H10.5Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.3348 4.55223L26.0281 6.8816C26.8283 7.09601 27.3032 7.91852 27.0888 8.71872L21.6536 29.0032C21.5513 29.3849 21.3106 29.6926 21 29.8867V30.4898H9.90579C10.0487 30.5441 10.1958 30.5918 10.3467 30.6322L19.04 32.9616C21.4406 33.6048 23.9081 32.1802 24.5514 29.7796L29.9866 9.49518C30.6298 7.09458 29.2052 4.62706 26.8046 3.98382L18.1112 1.65445C15.7106 1.01121 13.2431 2.43583 12.5999 4.83643L12.1569 6.48977H15.2627L15.4977 5.61289C15.7121 4.81269 16.5346 4.33782 17.3348 4.55223ZM8.99999 18.2714L7.16469 25.1209C6.65362 27.0282 7.44794 28.9778 8.99999 30.0211V18.2714Z"
          />
        </svg>
      );
    },
  },
];

const variants = {
  hidden: {
    y: 84,
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

export function Navbar({ show }: PropsNavbar) {
  const navigate = useNavigate();
  const location = useLocation();

  const likesCards = useLikesCards(false);

  const clickHandler = (pathTo: string) => {
    supportHapticFeedback("soft");
    navigate(pathTo);
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.nav
          animate={show ? "visible" : "hidden"}
          className={`${styles.navbar} `}
          variants={variants}
          initial="hidden"
          exit="hidden"
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className={styles.tabs_wrapper}>
            {tabs.map(({ name, pathTo, Icon }) => (
              <Tab
                key={name}
                icon={Icon}
                isActive={location.pathname === pathTo}
                onClick={() => clickHandler(pathTo)}
                hasBadge={name === "likes"}
                badgeCount={name === "likes" ? likesCards.data?.length : 0}
              />
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
