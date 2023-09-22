import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailedPage from "../pages/DetailedPage";

const Index = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},

	{
		path: "detailed/:i",
		element: <DetailedPage />,
	},
]);

export default Index;
