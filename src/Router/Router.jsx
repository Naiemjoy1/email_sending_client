import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import EmailForm from "../Pages/EmailForm/EmailForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <EmailForm></EmailForm>,
      },
    ],
  },
]);
