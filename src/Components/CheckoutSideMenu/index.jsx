import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import "./styles.css";

const CheckoutSideMenu = () => {
	const context = useContext(ShoppingCartContext);
	const sideMenuClases = `${context.isCheckoutSideMenuOpen ? "flex" : "hidden"} checkout-side-menu flex-col fixed right-0 top-12 bottom-2 bg-white border border-black rounded-md p-6 overflow-y-auto`;

	const { title, price, description, images } = context.productSelected;
	return (
		<aside className={sideMenuClases}>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-medium'>My Order</h2>
				<XMarkIcon
					className='w-6 h-6 text-black'
					onClick={context.closeCheckoutSideMenu}
				/>
			</div>
		</aside>
	);
};

export default CheckoutSideMenu;
