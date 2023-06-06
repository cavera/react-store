import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

import ShoppingCart from "../ShoppingCart";

const NavEl = ({ name, to, onClick }) => {
	const activeStyle = "underline underline-offset-4";
	const navStyle = isActive => {
		const myStyle = isActive ? activeStyle : "";
		return myStyle;
	};

	return (
		<NavLink
			to={to}
			className={({ isActive }) => navStyle(isActive)}
			onClick={onClick}>
			{name}
		</NavLink>
	);
};

const Navbar = () => {
	const context = useContext(ShoppingCartContext);

	// SingOut
	const signOut = localStorage.getItem("sign-out");
	const parsedSignOut = JSON.parse(signOut);
	const isUserSignOut = context.signOut || parsedSignOut;

	// account
	const account = localStorage.getItem("account");
	const parsedAccount = JSON.parse(account);
	// has Account
	const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
	const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
	const hasAnUserAccount = !noAccountInLocalState || !noAccountInLocalStorage;

	const handleSignOut = () => {
		const stringifiedSignOut = JSON.stringify(true);
		localStorage.setItem("sign-out", stringifiedSignOut);
		context.setSingOut(true);
	};
	console.log("hasAnUserAccount:", hasAnUserAccount, "isUserSignOut:", isUserSignOut);

	const renderView = () => {
		if (hasAnUserAccount && !isUserSignOut) {
			return (
				<>
					<li className='opacity-60'>{parsedAccount?.email}</li>
					<li>
						<NavEl
							name={"My Orders"}
							to={"/my-orders"}
						/>
					</li>
					<li>
						<NavEl
							name={"My Account"}
							to={"/my-account"}
						/>
					</li>
					<li>
						<NavEl
							name={"Sign out"}
							to={"/sign-in"}
							onClick={() => handleSignOut()}
						/>
					</li>
					<li>
						<ShoppingCart />
					</li>
				</>
			);
		} else {
			return (
				<li>
					<NavEl
						name={"sign-in"}
						to={"/sign-in"}
					/>
				</li>
			);
		}
	};

	return (
		<nav className='flex justify-between fixed top-0 left-0 right-0 z-10 w-full items-center h-12 py-5 px-8 text-sm font-light bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-black dark:border-white/60'>
			<ul className='flex items-center gap-3'>
				<li className='font-semibold text-lg'>
					<NavLink to={isUserSignOut ? "/sign-in" : "/"}>Shopi</NavLink>
				</li>
				<li>
					<NavEl
						name={"All"}
						to={"/"}
					/>
				</li>

				{context.categoriesList.map((cat, index) => (
					<li key={`${cat}${index}`}>
						<NavEl
							name={cat}
							to={`/${cat.toLowerCase()}`}
						/>
					</li>
				))}
			</ul>
			<ul className='flex items-center gap-3'>{renderView()}</ul>
		</nav>
	);
};

export default Navbar;
export { NavEl };
