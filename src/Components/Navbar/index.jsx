import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const activeStyle = "underline underline-offset-4";
const navStyle = isActive => {
	const myStyle = isActive ? activeStyle : "";
	return myStyle;
};

const NavEl = ({ name, to }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => navStyle(isActive)}>
			{name}
		</NavLink>
	);
};

const Navbar = () => {
	const context = useContext(ShoppingCartContext);

	return (
		<nav className='flex justify-between fixed top-0 left-0 right-0 z-10 w-full items-center h-12 py-5 px-8 text-sm font-light bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-black dark:border-white/60'>
			<ul className='flex items-center gap-3'>
				<li className='font-semibold text-lg'>
					<NavLink to='/'>Shopi</NavLink>
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
			<ul className='flex items-center gap-3'>
				<li>
					<NavEl
						name={"My Orders"}
						to={"/my-orders"}
					/>
				</li>
				{/* <li>
					<NavEl
						name={"My Account"}
						to={"/my-account"}
					/>
				</li>
				<li>
					<NavEl
						name={"Sign in"}
						to={"/sign-in"}
						
					/>
				</li> */}
				<li
					className='flex items-center gap-2 cursor-pointer'
					onClick={() => context.openCheckoutSideMenu()}>
					<ShoppingCartIcon className='w-4 h-4' />
					{context.count}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
export { NavEl };
