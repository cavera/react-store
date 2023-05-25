import { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { NavEl } from "../../Components/Navbar";

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

	if (context.filteredItems?.length > 0) {
		itemsResult = context.filteredItems;
	} else {
		itemsResult = [];
	}

	return (
		<div className={`w-full transition-all ${context.isProductDetailOpen || context.isCheckoutSideMenuOpen ? "max-w-3xl self-start" : "max-w-5xl"}`}>
			<div className='w-full flex flex-col gap-3 p-6 items-center'>
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
			{itemsResult.length === 0 && (
				<div className='w-3/4 text-center'>
					<p className='font-medium text-2xl mb-3'>{`Oops! We couldn't find any products that match your search.`}</p>
					<p>{`But don't worry, our store is brimming with incredible goodies!`}</p>
					<p>{`Why not take a look at our diverse categories for some exciting finds?`}</p>
					<ul className='flex items-center gap-3 justify-center p-3 rounded-lg border border-black dark:border-white/60 mt-4'>
						{context.categoriesList.map((cat, index) => (
							<li key={`${cat}${index}`}>
								<NavEl
									name={cat}
									to={`/${cat.toLowerCase()}`}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
			<ProductDetail />
		</div>
	);
};

export default Home;
