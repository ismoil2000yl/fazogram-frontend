import { lazy } from "react";

const Registration = lazy(() => import("../pages/auth/register"));
const Login = lazy(() => import("../pages/auth/login"));
const Home = lazy(() => import("../pages/home"));
const Chat = lazy(() => import("../pages/chat"))
const Group = lazy(() => import("../pages/group"))
const Search = lazy(() => import("../pages/search"))
const Image = lazy(() => import("../pages/image"))
const Profil = lazy(() => import("../pages/profil"))
const Message = lazy(() => import("../pages/chat/chat"))
const Text = lazy(() => import("../pages/text"))
const OneUser = lazy(() => import("../pages/search/one-user"))

const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Registration />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [{}]
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/group",
    element: <Group />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/add-picture",
    element: <Image />
  },
  {
    path: "/add-text",
    element: <Text />
  },
  {
    path: "/accaunt",
    element: <Profil />
  },
  {
    path: "/message",
    element: <Message />
  },
  {
    path: "/user/:id",
    element: <OneUser />
  }
];

export { authRoutes, privateRoutes };
