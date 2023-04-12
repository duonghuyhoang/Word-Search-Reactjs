import Homonym from "../pages/Homonym";
import Opposite from "../pages/Opposite";
import Synonymous from "../pages/Synonymous";

const publicRoutes = [
  { part: "/", component: Homonym },
  { part: "/opposite", component: Opposite },
  { part: "/synonymous", component: Synonymous },
];
export { publicRoutes };
