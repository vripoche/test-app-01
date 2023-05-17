import {
	createBrowserRouter,
	createRoutesFromElements,
	useRouteError,
	isRouteErrorResponse,
	Route,
	RouterProvider,
} from "react-router-dom";

import "./App.css";

import Order from "./pages/Order";
import Tracker from "./pages/Tracker";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Order />} errorElement={<ErrorBoundary />} />
			<Route path="/tracker/:tracking_number" element={<Tracker />} />
		</>
	)
);

function ErrorBoundary() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-boundary">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				{isRouteErrorResponse(error) &&
					(error.statusText || error.error?.message)}
			</p>
		</div>
	);
}

function App() {
	return (
		<>
			<h1>Hello Word</h1>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
