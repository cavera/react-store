import { useState, useEffect } from "react";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";

const Home = () => {
	const API = "https://api.escuelajs.co/api/v1/products";
	const [items, setItems] = useState(null);

	useEffect(() => {
		fetch(API)
			.then((response) => response.json())
			.then((data) => setItems(data));
	}, []);

	return (
		<>
			<h1>Home</h1>
			<div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
				{items?.map((item) => (
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
