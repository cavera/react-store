import { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

const Home = () => {
	const context = useContext(ShoppingCartContext);
	const { category } = useParams();

	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search") || "";

	const handleChange = event => {
		const { value } = event.target;
		context.setSearchByTitle(value);
		setSearchParams({ search: value });
	};

	let isCategoryView = category?.length > 0;

	let itemsResult = [];

	useEffect(() => {
		context.setSearchByTitle(search);
		if (isCategoryView) {
			context.setSearchByCategory(category);
		} else {
			context.setSearchByCategory("");
		}
	}, [search, context, category, isCategoryView]);

	if (isCategoryView) {
		if (context.filteredItems?.length > 0) {
			itemsResult = context.filteredItems;
		} else {
			itemsResult = [];
		}
	} else if (context.searchByTitle?.length > 0) {
		if (context.filteredItems?.length > 0) {
			itemsResult = context.filteredItems;
		} else {
			itemsResult = [];
		}
	} else {
		itemsResult = context.items;
	}

	return (
		<>
			<div className='w-3/4 flex flex-col gap-3 p-6 items-center'>
				<h1 className='font-medium text-xl'>Exclusive Articles</h1>

				<input
					type='text'
					value={search || ""}
					placeholder='Search your article'
					className='border border-black dark:border-white/60 bg-transparent rounded-lg w-full p-4 focus:outline-none'
					onChange={event => handleChange(event)}
				/>
			</div>
			<div className='grid gap-4 grid-cols-4 w-full lg:max-w-screen-lg md:max-w-screen-md'>
				{itemsResult?.map(item => (
					<Card
						key={item.id}
						data={item}
					/>
				))}
			</div>
			<ProductDetail />
		</>
	);
};

export default Home;
