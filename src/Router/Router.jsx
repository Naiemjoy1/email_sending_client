import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import EmailForm from "../Pages/EmailForm/EmailForm";
import SendMessage from "../Pages/SendMessage/SendMessage";
import SeatBook from "../Pages/seatBook/SeatBook";
import DetailsPage from "../Pages/seatBook/DetailsPage";
import Chat from "../Pages/Chat/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <EmailForm />,
      },
      {
        path: "/sms",
        element: <SendMessage />,
      },
      {
        path: "/seat",
        element: <SeatBook />,
      },
      {
        path: "/details/:groupName",
        element: <DetailsPage />, // Add this route for the details page
      },
      {
        path: "/chat",
        element: <Chat></Chat>,
      },
    ],
  },
]);
