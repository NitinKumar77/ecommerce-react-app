import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ProductDescription from "./components/ProductDescription";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "/products",
				element: <Product />,
			},
			{
				path: "/products/:id",
				element: <ProductDescription />,
			},
			{ path: "/cart", element: <Cart /> },
			{ path: "/contact", element: <Contact /> },
		],
	},
]);
function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
