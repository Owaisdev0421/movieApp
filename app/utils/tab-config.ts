import {
  HomeInActiveIcon,
  ProfileInActiveIcon,
  SettingInActiveIcon,
} from "@/assets/images/svgs";

import { Images } from "@/assets/images";
import HomeStack from "../navigators/app/HomeStack";
import MediaStack from "../navigators/app/MediaStack";
import MoreStack from "../navigators/app/MoreStack";
import WatchStack from "../navigators/app/WatchStack";

export const TAB_CONFIG = {
  HomeStack: {
    label: "Dashboard",
    component: HomeStack,
    activeIcon: Images.HomeIcon,
    inactiveIcon: HomeInActiveIcon,
  },
  WatchStack: {
    label: "Watch",
    component: WatchStack,
    activeIcon: Images.WatchIcon,
    inactiveIcon: SettingInActiveIcon,
  },
  MediaStack: {
    label: "Media Library",
    component: MediaStack,
    activeIcon: Images.MediaIcon,
    inactiveIcon: SettingInActiveIcon,
  },
  MoreStack: {
    label: "More",
    component: MoreStack,
    activeIcon: Images.MoreIcon,
    inactiveIcon: ProfileInActiveIcon,
  },
};
