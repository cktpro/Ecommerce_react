import React from 'react';
import { LOCATIONS } from 'constants/index';

import Layouts from 'components/layout';
import Main from 'components/main';
import ProductsPage from 'pages/productsPage';
import LoginPage from 'pages/loginPage';
import Details from 'pages/productsPage/details';
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
  { path: LOCATIONS.LOGIN, name: "Login Page", element: <LoginPage/> }
//   { path: LOCATIONS.COUNTER, name: "Counter", element: <CounterApp /> },
//   { path: LOCATIONS.TODO, name: "Todo", element: <TodoApp /> },
//   { path: LOCATIONS.PRODUCTS_PAGE, name: "Products", element: <ProductsPage2 /> },
//   { path: LOCATIONS.PRODUCTS_DETAIL_PAGE, name: "Products Detail", element: <ProductsDetail /> },
//   { path: "*", element: <NotFoundPage /> },
];

export const unAuthRouter = [
  { path: LOCATIONS.LOGIN, name: "Login Page", element: <LoginPage/> },
];