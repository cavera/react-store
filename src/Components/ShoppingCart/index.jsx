import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const ShoppingCart = () => {
	const context = useContext(ShoppingCartContext);
	return (
		<div
			className='flex items-center gap-2 cursor-pointer'
			onClick={() => context.openCheckoutSideMenu()}>
			<ShoppingCartIcon className='w-4 h-4' />
			{context.count}
		</div>
	);
};

export default ShoppingCart;
