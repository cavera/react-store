import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";

const Card = ({ data }) => {
	const context = useContext(ShoppingCartContext);

	const showProduct = productDetail => {
		context.setProductSelected(productDetail);
		context.openProductDetail();
	};

	const addProductsToCart = (event, productData) => {
		event.stopPropagation();
		context.setCartProducts([...context.cartProducts, productData]);
		context.closeProductDetail();
		context.openCheckoutSideMenu();
	};

	const renderIcon = id => {
		const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;
		const iconClasses = "absolute top-0 right-0 grid place-items-center rounded-full w-6 h-6 m-1";

		if (isInCart) {
			return (
				<div className={`${iconClasses} bg-black/60`}>
					<CheckIcon className={`w-4 h-4 text-white`} />
				</div>
			);
		} else {
			return (
				<div
					className={`${iconClasses} bg-white`}
					onClick={event => addProductsToCart(event, data)}>
					<PlusIcon className={`w-4 h-4 text-slate-800`} />
				</div>
			);
		}
	};

	return (
		<div className={`rounded-lg transition-all ${context.isProductDetailOpen || context.isCheckoutSideMenuOpen ? "w-44 lg:w-44 h-44 lg:h-44" : "w-44 lg:w-56 h-56 lg:h-60"}`}>
			<figure
				onClick={() => showProduct(data)}
				className='relative mb-2 w-full h-4/5 overflow-hidden cursor-pointer'>
				<span className='absolute bottom-0 left-0 bg-white/80 rounded-lg text-black font-medium text-xs m-2 px-3 py-0.5'>{data?.category.name}</span>
				<img
					className='w-full h-full object-cover rounded-2xl '
					src={data?.images[0]}
					alt={data?.title}
				/>
				{renderIcon(data.id)}
			</figure>
			<p className='flex justify-between items-center'>
				<span className='text-sm font-light'>{data.title}</span>
				<span className='text-lg font-medium'>{`$${data.price}`}</span>
			</p>
		</div>
	);
};

export default Card;
