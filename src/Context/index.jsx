import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
	//get Products
	const API = "https://api.escuelajs.co/api/v1/products";
	const [items, setItems] = useState(null);
	const [filteredItems, setFilteredItems] = useState(null);
	const [categoriesList, setCategoriesList] = useState([]);

	useEffect(() => {
		fetch(API)
			.then(response => response.json())
			.then(data => {
				setItems(data);
				const catList = data
					.map(item => {
						return item.category.name;
					})
					.reduce((prev, next) => {
						prev = prev.includes(next) ? prev : [...prev, next];
						return prev;
					}, []);

				setCategoriesList(catList);
			});
	}, []);

	// Search by title
	const [searchByTitle, setSearchByTitle] = useState("");
	// Serach by category
	const [searchByCategory, setSearchByCategory] = useState("");

	useEffect(() => {
		const filterItems = () => {
			return items
				?.filter(item => {
					return item.category.name.toLowerCase().includes(searchByCategory.toLowerCase());
				})
				.filter(item => {
					return item.title.toLowerCase().includes(searchByTitle.toLowerCase());
				});
		};

		if (searchByCategory || searchByTitle) {
			setFilteredItems(filterItems());
		}
	}, [items, searchByCategory, searchByTitle]);

	//shopping cart count
	const [count, setCount] = useState(0);
	//product detail open/close
	const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
	const openProductDetail = () => setIsProductDetailOpen(true);
	const closeProductDetail = () => setIsProductDetailOpen(false);

	//checkout open/close
	const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
	const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
	const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

	//prodct detail
	const [productSelected, setProductSelected] = useState({ images: [] });

	// cart products
	const [cartProducts, setCartProducts] = useState([]);

	// Shopping cart:order
	const [order, setOrder] = useState([]);

	useEffect(() => {
		setCount(cartProducts.length);
	}, [cartProducts]);

	return (
		<ShoppingCartContext.Provider
			value={{
				items,
				setItems,
				categoriesList,
				setCategoriesList,
				searchByTitle,
				setSearchByTitle,
				searchByCategory,
				setSearchByCategory,
				filteredItems,
				setFilteredItems,
				count,
				setCount,
				isProductDetailOpen,
				openProductDetail,
				closeProductDetail,
				productSelected,
				setProductSelected,
				cartProducts,
				setCartProducts,
				isCheckoutSideMenuOpen,
				openCheckoutSideMenu,
				closeCheckoutSideMenu,
				order,
				setOrder,
			}}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
