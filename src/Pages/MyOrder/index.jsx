import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";

const handleDelete = () => {};

const MyOrder = () => {
	const context = useContext(ShoppingCartContext);
	const lastOrder = context.order?.slice(-1)[0];
	return (
		<div className='w-full max-w-screen-md'>
			<h1>My Latest Order</h1>
			<p className='w-full flex justify-between items-center px-6'>
				<span>Date:</span>
				<span>{lastOrder.date}</span>
			</p>
			<div className='w-full flex flex-col gap-2 p-6 overflow-y-auto flex-1'>
				{lastOrder.products.map(product => (
					<OrderCard
						id={product.id}
						key={product.id}
						title={product.title}
						price={product.price}
						imageUrl={product.images}
					/>
				))}
			</div>
			<p className='w-full flex justify-between items-center px-6'>
				<span>Total price:</span>
				<span>${lastOrder.totalPrice}</span>
			</p>
			<p className='w-full flex justify-between items-center px-6'>
				<span>Total products:</span>
				<span>{lastOrder.totalProducts}</span>
			</p>
		</div>
	);
};

export default MyOrder;
