import { ChevronRightIcon } from "@heroicons/react/24/outline";

const OrdersCard = props => {
	const { date, totalPrice, totalProducts } = props;

	return (
		<div className='flex justify-between items-center border border-black dark:border-white/60 p-4 rounded-lg '>
			<p className='flex-grow-1 flex flex-col gap-0'>
				<span className='text-sm font-light'>{date}</span>
				<span className='text-sm font-light font-semibold'>{totalProducts} articles</span>
			</p>
			<p className='flex gap-3 items-center'>
				<span className='text-2xl font-medium'>${totalPrice}</span>
				<ChevronRightIcon className='w-6 h-6' />
			</p>
		</div>
	);
};

export default OrdersCard;
