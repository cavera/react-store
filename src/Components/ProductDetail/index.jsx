import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import "./styles.css";

const ProductDetail = () => {
	const context = useContext(ShoppingCartContext);

	const { title, price, description, images } = context.productSelected;
	return (
		<aside className={`${context.isProductDetailOpen ? "flex" : "hidden"} product-detail flex-col fixed right-0 top-12 bottom-2 bg-white dark:bg-slate-800 border border-black dark:border-slate-400 rounded-md p-6 overflow-y-auto`}>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-medium'>Details</h2>
				<XMarkIcon
					className='w-6 h-6'
					onClick={context.closeProductDetail}
				/>
			</div>
			<figure>
				<img
					src={images[0]}
					alt={title}
					className='w-full h-full rounded-lg'
				/>
			</figure>
			<p className='flex flex-col'>
				<span className='font-medium text-2xl mb-2'>${price}</span>
				<span className='font-medium text-md'>{title}</span>
				<span className='font-light text-sm'>{description}</span>
			</p>
		</aside>
	);
};

export default ProductDetail;
