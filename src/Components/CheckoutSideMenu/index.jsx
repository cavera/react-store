import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { orderDate, totalPrice } from "../../utils";
import "./styles.css";

const CheckoutSideMenu = () => {
	const context = useContext(ShoppingCartContext);
	const sideMenuClases = `${context.isCheckoutSideMenuOpen ? "flex" : "hidden"} flex checkout-side-menu flex-col fixed right-0 top-12 bottom-2 bg-white dark:bg-slate-800 border border-black dark:border-slate-200 rounded-md`;

	const handleDelete = id => {
		const filteredProducts = context.cartProducts.filter(product => product.id !== id);
		context.setCartProducts(filteredProducts);
	};

	const handleCheckout = () => {
		const orderToAdd = {
			date: orderDate(),
			products: context.cartProducts,
			totalProducts: context.count,
			totalPrice: totalPrice(context.cartProducts),
		};
		context.setOrder([...context.order, orderToAdd]);
		context.setCartProducts([]);
		context.closeCheckoutSideMenu();
	};

	const checkoutProducts = context.cartProducts;
	return (
		<aside className={sideMenuClases}>
			<div className='flex justify-between items-center p-6'>
				<h2 className='text-xl font-medium'>My Order</h2>
				<XMarkIcon
					className='w-6 h-6  cursor-pointer'
					onClick={context.closeCheckoutSideMenu}
				/>
			</div>
			<div className='flex flex-col gap-2 p-6 overflow-y-auto flex-1'>
				{checkoutProducts.map(product => (
					<OrderCard
						id={product.id}
						key={product.id}
						title={product.title}
						price={product.price}
						imageUrl={product.images}
						handleDelete={handleDelete}
					/>
				))}
			</div>
			<div className='px-6 py-3 border-t border-gray'>
				<p className='flex justify-between items-center mb-2'>
					<span className='font-light'>Total</span>
					<span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
				</p>
				<Link to='/my-orders/last'>
					<button
						onClick={() => handleCheckout()}
						className='bg-black dark:bg-slate-100 text-white dark:text-slate-800 w-full px-6 py-3 rounded-lg font-medium text-xl'>
						Checkout
					</button>
				</Link>
			</div>
		</aside>
	);
};

export default CheckoutSideMenu;
