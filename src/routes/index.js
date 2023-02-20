import { lazy } from "react";
// use lazy for better code splitting
const Test = lazy(() => import("./test"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Products = lazy(() => import("../pages/product/Products"));
const CreateProduct = lazy(() => import("../pages/product/CreateProductPage"));
const SingleProduct = lazy(() => import("../pages/product/SingleProduct"));
const Addons = lazy(() => import("../pages/Addons"));
const EditAddon = lazy(() => import("../pages/EditAddon"));
const AddNewAddon = lazy(() => import("../pages/AddNewAddon"));
const Variants = lazy(() => import("../pages/Variants"));
const EditVariant = lazy(() => import("../pages/EditVariant"));
const AddNewVariants = lazy(() => import("../pages/AddNewVariants"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Staff = lazy(() => import("../pages/Staff"));
const Customers = lazy(() => import("../pages/Customers"));
const CustomerOrder = lazy(() => import("../pages/CustomerOrder"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderInvoice = lazy(() => import("../pages/OrderInvoice"));
const Coupons = lazy(() => import("../pages/Coupons"));
const Page404 = lazy(() => import("../pages/404"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
// Category/Sub-Category
const AddNewCategory = lazy(() => import("../pages/category/AddNewCategory"));
const AddNewSubCategory = lazy(() =>
  import("../pages/category/AddNewSubCategory")
);
const SingleCategory = lazy(() =>
  import("../pages/category/SingleCategoryPage")
);
const Category = lazy(() => import("../pages/category/Category"));
const EditCategory = lazy(() => import("../pages/category/EditCategoryPage"));
const SubCategory = lazy(() => import("../pages/category/SubCategoryPage"));
// Branch Location
const LocationsPage = lazy(() => import("../pages/location/Locations"));
const CreateLocationPage = lazy(() =>
  import("../pages/location/CreateLocationsPage")
);
const EditLocationPage = lazy(() =>
  import("../pages/location/EditLocationPage")
);

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  { path: "/test", component: Test },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/products/add-new-product",
    component: CreateProduct,
  },
  {
    path: "/products/productDetalis/:id",
    component: SingleProduct,
  },
  {
    path: "/addons",
    component: Addons,
  },
  {
    path: "/addons/add-new-addon",
    component: AddNewAddon,
  },
  {
    path: "/addon/edit/:addonId",
    component: EditAddon,
  },
  {
    path: "/variants",
    component: Variants,
  },
  {
    path: "/variants/add-new-variant",
    component: AddNewVariants,
  },
  {
    path: "/variants/edit/:id",
    component: EditVariant,
  },
  {
    path: "/product/:id",
    component: SingleProduct,
  },
  {
    path: "/product/singleProduct/:id",
    component: ProductDetails,
  },
  // Category and Sub-Category Pages
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/category/add-new-category",
    component: AddNewCategory,
  },
  {
    path: "/category/edit/:categoryId",
    component: EditCategory,
  },
  {
    path: "/category/:id/add-sub-category",
    component: AddNewSubCategory,
  },
  // {
  //   path: "/category/:id/edit/:subCategoryId",
  //   component: EditSubCategory,
  // },
  {
    path: "/category/subCategory/:id",
    component: SubCategory,
  },
  {
    path: "/category/:id",
    component: SingleCategory,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/our-staff",
    component: Staff,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/order/:id",
    component: OrderInvoice,
  },
  {
    path: "/coupons",
    component: Coupons,
  },
  { path: "/setting", component: EditProfile },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/coming-soon",
    component: ComingSoon,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
  // Branch Locations pages
  {
    path: "/locations",
    component: LocationsPage,
  },
  {
    path: "/locations/new-location",
    component: CreateLocationPage,
  },
  {
    path: "/locations/edit/:id",
    component: EditLocationPage,
  },
];

export default routes;
