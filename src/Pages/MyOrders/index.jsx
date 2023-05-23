import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

import OrdersCard from "../../Components/OrdersCard";

const MyOrders = () => {
	const context = useContext(ShoppingCartContext);
	console.log(context.order);
	return (
		<div className='w-80 relative'>
			<div className='flex justify-center'>
				<h1>My Orders</h1>
			</div>
			{context.order.map((orderItem, index) => {
				return (
					<Link
						to={`/my-orders/${index}`}
						key={`${index}`}>
						<OrdersCard
							date={orderItem.date}
							totalProducts={orderItem.totalProducts}
							totalPrice={orderItem.totalPrice}
						/>
					</Link>
				);
			})}
		</div>
	);
};

export default MyOrders;
