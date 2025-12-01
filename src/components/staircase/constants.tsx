import { HomePlatform } from "../home-platform";
import { AboutPlatform } from "../about-platform";
import type { ReactNode } from "react";

type Platform = {
  title: string;
  content: ReactNode;
}

export const PLATFORMS: Platform[] = [
  {
    title: '/',
    content: <HomePlatform />,
  },
  {
    title: '/about',
    content: <AboutPlatform />,
  },
]
