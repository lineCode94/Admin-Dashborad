import {
  FiTruck,
  FiCloud,
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiUser,
  FiCompass,
  FiGift,
  FiList,
  FiSettings,
  FiSlack,
  FiPlus,
} from "react-icons/fi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import { BsCash } from "react-icons/bs";
import { MdOutlineLanguage } from "react-icons/md";
import { TbError404, TbRocket } from "react-icons/tb";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/products",
    icon: FiShoppingBag,
    name: "Products",
    routes: [
      // submenu
      {
        path: "/products",
        icon: TbListDetails,
        name: "All Products ",
      },
      {
        icon: HiOutlineColorSwatch,
        path: "/variants",
        name: "Variants",
      },
      {
        icon: FiPlus,
        path: "/addons",
        name: "Addons",
      },
    ],
  },
  {
    path: "/category",
    icon: FiList,
    name: "Category",
  },
  {
    path: "/customers",
    icon: FiUsers,
    name: "Customers",
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Orders",
  },
  {
    path: "/coupons",
    icon: FiGift,
    name: "Coupons",
  },
  {
    path: "/our-staff",
    icon: FiUser,
    name: "Our Staff",
  },
  {
    path: "/setting",
    icon: FiSettings,
    name: "Setting",
  },

  {
    icon: FiSlack,
    name: "Pages",
    routes: [
      // submenu

      {
        path: "/404",
        name: "404",
      },
      {
        path: "/coming-soon",
        name: "Coming Soon",
      },
    ],
  },
];

export default sidebar;
