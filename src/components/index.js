import ErrorComponent from "@/components/ErrorComponent";
import MainComponent from "@/components/MainComponent";
import NavbarComponent from "@/components/NavbarComponent";

import layoutWrapper from "@/components/layoutWrapper";
import cards from "@/components/cards";

const components = [];
const rootComponents = [ErrorComponent, MainComponent, NavbarComponent];
components.push(...layoutWrapper);
components.push(...cards);
components.push(...rootComponents);

export default components;
