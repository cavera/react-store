import { ArrowRightIcon } from "@heroicons/react/24/outline";

const OrdersCard = props => {
	const { date, totalPrice, totalProducts } = props;

	return (
		<div className='flex justify-between items-center border border-black'>
			<p className='flex-grow-1 w-full flex gap-3 items-center'>
				<span className='text-sm font-light'>{date}</span>
				<span className='text-sm font-light'>{totalProducts}</span>
				<span className='text-lg font-medium'>${totalPrice}</span>
			</p>

			<ArrowRightIcon className='w-6 h-6' />
		</div>
	);
};

export default OrdersCard;
