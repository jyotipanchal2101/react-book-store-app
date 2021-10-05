const Routes = [
    {
      name: "signup",
      path: "/signup",
      compPath: "Auth/SignUp/SignUp",
      component: "Register",
      authRoute: false,
      isExact: false,
    },
    {
      name: "signin",
      path: "/signin",
      compPath: "Auth/SignIn/SignIn",
      component: "Login",
      authRoute: false,
      isExact: false,
    },
    {
      name: "home",
      path: "/",
      compPath: "Home/Home",
      component: "Home",
      authRoute: false,
      isExact: true,
    },
    {
      name: "logout",
      path: "/logout",
      compPath: "Auth/Logout/Logout",
      component: "Logout",
      authRoute: true,
      isExact: false,
    },
    {
      name: "booklist",
      path: "/admin/booklist",
      compPath: "BookList/BookList",
      component: "Booklist",
      authRoute: true,
      isExact: false,
    },
  ];
  
  export default Routes;
  