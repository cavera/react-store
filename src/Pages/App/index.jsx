import { useContext } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext } from "../../Context";

import Layout from "../../Components/Layout";
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../SignIn";
import Navbar from "../../Components/Navbar";
import CheckoutSideMenu from "../../Components/CheckoutSideMenu";

import "./App.css";

const AppRoutes = () => {
	const context = useContext(ShoppingCartContext);
	// account
	const account = localStorage.getItem("account");
	const parsedAccount = JSON.parse(account);
	// sing out
	const signOut = localStorage.getItem("sign-out");
	const parsedSignOut = JSON.parse(signOut);
	// has an account
	const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
	const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
	const hasAnUserAccount = !noAccountInLocalState || !noAccountInLocalStorage;
	const isUserSignOut = context.signOut || parsedSignOut;

	let routes = useRoutes([
		{
			path: "/",
			element:
				hasAnUserAccount && !isUserSignOut ? (
					<Home />
				) : (
					<Navigate
						replace
						to={"/sign-in"}
					/>
				),
		},
		{
			path: "/:category",
			element:
				hasAnUserAccount && !isUserSignOut ? (
					<Home />
				) : (
					<Navigate
						replace
						to={"/sign-in"}
					/>
				),
		},
		{ path: "/my-account", element: <MyAccount /> },
		{ path: "/my-order", element: <MyOrder /> },
		{ path: "/my-orders", element: <MyOrders /> },
		{ path: "/my-orders/:id", element: <MyOrder /> },
		{ path: "/my-orders/last", element: <MyOrder /> },
		{ path: "/sign-in", element: <SignIn /> },
		{ path: "*", element: <NotFound /> },
	]);

	return routes;
};

const App = () => {
	initializeLocalStorage();
	return (
		<ShoppingCartProvider>
			<BrowserRouter>
				<Layout>
					<AppRoutes />
					<CheckoutSideMenu />
				</Layout>
				<Navbar />
			</BrowserRouter>
		</ShoppingCartProvider>
	);
};

export default App;
