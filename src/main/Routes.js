import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { AboutMe } from "./AboutMe";
import { Articles } from "./Articles";
import { Photos } from "./Photos";
import { RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <AboutMe />
      },
      {
        path: "articles",
        element: <Articles />
      },
      {
        path: "photos",
        element: <Photos />
      }
    ]
  }
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
