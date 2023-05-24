import { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

const Home = () => {
	const { category } = useParams();

	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search") || "";
	console.log(search);
	const handleChange = event => {
		const { value } = event.target;
		context.setSearchByTitle(value);
		setSearchParams({ search: value });
	};

	useEffect(() => {
		if (search?.length > 0) {
			context.setSearchByTitle(search);
		}
	}, [search]);

	let isCategoryView = category?.length > 0;

	const context = useContext(ShoppingCartContext);
	const renderView = () => {
		if (isCategoryView) {
			context.setSearchByCategory(category);
			if (context.filteredItems?.length > 0) {
				return context.filteredItems?.map(item => (
					<Card
						key={item.id}
						data={item}
					/>
				));
			} else {
				return <h2>There are no articles by the catogory: {category} 🥲</h2>;
			}
		} else if (context.searchByTitle?.length > 0) {
			if (context.filteredItems?.length > 0) {
				return context.filteredItems?.map(item => (
					<Card
						key={item.id}
						data={item}
					/>
				));
			} else {
				return <h2>There are no articles by that name 🥲</h2>;
			}
		} else {
			return context.items?.map(item => (
				<Card
					key={item.id}
					data={item}
				/>
			));
		}
	};

	return (
		<>
			<div className='w-80 flex flex-col gap-3 p-6 items-center'>
				<h1 className='font-medium text-xl'>Exclusive Articles</h1>

				{!isCategoryView && (
					<input
						type='text'
						value={search || ""}
						placeholder='Search your article'
						className='border border-black dark:border-white/60 bg-transparent rounded-lg w-full p-4 focus:outline-none'
						onChange={event => handleChange(event)}
					/>
				)}
			</div>
			<div className='grid gap-4 grid-cols-4 w-full lg:max-w-screen-lg md:max-w-screen-md'>{renderView()}</div>
			<ProductDetail />
		</>
	);
};

export default Home;
