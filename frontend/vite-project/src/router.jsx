import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ForumPage from "./pages/ForumPage";
import PostPage from "./pages/PostPage";
import SignInPage from "./pages/SignInPage";
import UserPage from "./pages/UserPage";
import MessagePage from "./pages/MessagePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: 'forum/:forum_id',
        element: <ForumPage/>
      },
      {
        path: 'post/:post_id',
        element: <PostPage/>
      },
      {
        path: 'signin',
        element: <SignInPage/>
      },
      {
        path: 'user/:user_id',
        element: <UserPage/>
      },
      {
        path: 'message',
        element: <MessagePage/>
      },
      {
        path: 'about',
        element: <AboutPage/>
      }
    ],
  },
]);

export default router;