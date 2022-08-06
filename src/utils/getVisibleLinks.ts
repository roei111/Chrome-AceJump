import { Link } from "../types/Link";
import { isHidden } from "./isHidden";
import { isInViewport } from "./isInViewport";

export function getVisibleLinks() {
  return Array.from(document.links)
    .reduce<Link[]>((links, currentLink) => {
      if (isInViewport(currentLink) && !isHidden(currentLink)) {
        return [...links, currentLink];
      }

      return links;
    }, []);
}
