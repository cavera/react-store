import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const MyOrder = () => {
	const context = useContext(ShoppingCartContext);
	const currentPath = window.location.pathname;

	const { id } = useParams();

	// let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
	let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
	let myOrder = {};

	if (index === "last") {
		myOrder = context.order[context.order.length - 1];
	} else {
		myOrder = context.order[index];
	}

	let areOrders = context.order.length > 0;

	console.log("areOrders", areOrders);

	return (
		<div className='w-80 relative flex flex-col gap-2'>
			<div className='flex justify-center'>
				<Link
					to={"/my-orders"}
					className='absolute left-0'>
					<ChevronLeftIcon className='w-6 h-6' />
				</Link>
				<h1>My Order</h1>
			</div>
			{areOrders && (
				<>
					<p className='w-full flex justify-between items-center'>
						<span>Date:</span>
						<span>{myOrder.date}</span>
					</p>
					<div className='w-full flex flex-col gap-2 overflow-y-auto flex-1'>
						{myOrder.products.map(product => (
							<OrderCard
								id={product.id}
								key={product.id}
								title={product.title}
								price={product.price}
								imageUrl={product.images}
							/>
						))}
					</div>
					<p className='w-full flex justify-between items-center'>
						<span>Total price:</span>
						<span>${myOrder.totalPrice}</span>
					</p>
					<p className='w-full flex justify-between items-center'>
						<span>Total products: </span>
						<span>{myOrder.totalProducts}</span>
					</p>
				</>
			)}
		</div>
	);
};

export default MyOrder;
