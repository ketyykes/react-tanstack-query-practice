import { createBrowserRouter, Outlet } from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import Layout from "../layout/Layout";
import TanstackPage from "../pages/TanstackPage/TanstackPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Layout>
				<Outlet />
			</Layout>
		),
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "about",
				element: <AboutPage />,
			},
			{
				path: "tanstack",
				element: <TanstackPage />,
			},
		],
	},
]);

export default router;
