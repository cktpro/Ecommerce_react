import React from 'react';
import { LOCATIONS } from 'constants/index';

import Layouts from 'components/layout';
import Main from 'components/main';
import ProductsPage from 'pages/productsPage';
import LoginPage from 'pages/loginPage';
import Details from 'pages/productsPage/details';
import AdminPage from 'pages/adminPage';
import Dashboard from 'components/admin';
import Category from 'components/admin/category';
import Product from 'components/admin/product';
import Supplier from 'components/admin/supplier';
import Customer from 'components/admin/customer';
export const routers = [
//   { path: LOCATIONS.LOGIN, name: "Login Page", element: <Login /> },
  {
    path: LOCATIONS.HOME_PAGE,
    name: "Layout",
    element: <Layouts />,
    children: [
      { isRoot: true, name: "Home", element: <Main/> },
    //   { path: LOCATIONS.PLAY_LIST, name: "Play List", element: <PlayList /> },
    //   { path: LOCATIONS.FORM, name: "Form Register", element: <FormPage /> },
    //   { path: LOCATIONS.TAB, name: "Tab", element: <TabPage /> },
    //   { path: LOCATIONS.SLIDE, name: "Slider", element: <SliderPage /> },
      { path: LOCATIONS.PRODUCTS, name: "Product Page", element: <ProductsPage/> },
      { path: LOCATIONS.PRODUCT_DETAILS, name: "Product Details", element:<Details/> },
    //   { path: LOCATIONS.MY_PROFILE, name: "My Profile", element: <Profile /> },
    ]
  },
  {
    path: LOCATIONS.ADMIN,
    name: "Layout",
    element: <AdminPage />,
    children: [
      { isRoot: true, name: "Home", element: <Dashboard/> },
      { path: LOCATIONS.AD_PRODUCTS, name: "Admin Products", element: <Product/>},
      { path: LOCATIONS.AD_CATEGORY, name: "Admin Category", element: <Category/> },
      { path: LOCATIONS.AD_SUPPLIER, name: "Admin Supplier", element: <Supplier/> },
      { path: LOCATIONS.AD_CUSTOMER, name: "Admin Supplier", element: <Customer/> },
    //   { path: LOCATIONS.SLIDE, name: "Slider", element: <SliderPage /> },

    //   { path: LOCATIONS.MY_PROFILE, name: "My Profile", element: <Profile /> },
    ]
  },
//   { path: LOCATIONS.COUNTER, name: "Counter", element: <CounterApp /> },
//   { path: LOCATIONS.TODO, name: "Todo", element: <TodoApp /> },
//   { path: LOCATIONS.PRODUCTS_PAGE, name: "Products", element: <ProductsPage2 /> },
//   { path: LOCATIONS.PRODUCTS_DETAIL_PAGE, name: "Products Detail", element: <ProductsDetail /> },
//   { path: "*", element: <NotFoundPage /> },
];

export const unAuthRouter = [
  { path: LOCATIONS.LOGIN, name: "Login Page", element: <LoginPage/> },
];