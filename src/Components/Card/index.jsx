import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { PlusIcon } from "@heroicons/react/24/outline";

const Card = (data) => {
	const context = useContext(ShoppingCartContext);

	const showProduct = (productDetail) => {
		context.setProductSelected(productDetail);
		context.openProductDetail();
	};

	const addProductsToCart = (event, productData) => {
		event.stopPropagation();
		context.setCartProducts([...context.cartProducts, productData]);
		context.setCount(context.cartProducts.length);
		context.closeProductDetail();
		context.openCheckoutSideMenu();
	};

	return (
		<div className='bg-white w-56 h-60 rounded-lg'>
			<figure
				onClick={() => showProduct(data.data)}
				className='relative mb-2 w-full h-4/5 overflow-hidden cursor-pointer'>
				<span className='absolute bottom-0 left-0 bg-white/80 rounded-lg text-black font-medium text-xs m-2 px-3 py-0.5'>{data.data.category.name}</span>
				<img
					className='w-full h-full object-cover rounded-lg '
					src={data.data.images[0]}
					alt={data.data.title}
				/>
				<div
					className='absolute top-0 right-0 grid place-items-center bg-white rounded-full w-6 h-6 m-2'
					onClick={(event) => addProductsToCart(event, data.data)}>
					<PlusIcon className='w-4 h-4 text-black' />
				</div>
			</figure>
			<p className='flex justify-between items-center'>
				<span className='text-sm font-light'>{data.data.title}</span>
				<span className='text-lg font-medium'>{`$${data.data.price}`}</span>
			</p>
		</div>
	);
};

export default Card;
