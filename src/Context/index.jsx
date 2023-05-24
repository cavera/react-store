import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
	//get Products
	const API = "https://api.escuelajs.co/api/v1/products";
	const [items, setItems] = useState(null);
	const [filteredItems, setFilteredItems] = useState(null);

	useEffect(() => {
		fetch(API)
			.then(response => response.json())
			.then(data => setItems(data));
	}, []);

	// Search by title
	const [searchByTitle, setSearchByTitle] = useState("");
	// Serach by category
	const [searchByCategory, setSearchByCategory] = useState("");

	const filteredItemsByTitle = (items, searchByTitle) => {
		return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
	};
	const filteredItemsByCategory = (items, searchByCatergory) => {
		return items?.filter(item => item.category.name.toLowerCase().includes(searchByCatergory.toLowerCase()));
	};

	useEffect(() => {
		if (searchByTitle) {
			setFilteredItems(filteredItemsByTitle(items, searchByTitle));
		}
	}, [items, searchByTitle]);

	useEffect(() => {
		if (searchByCategory) {
			setFilteredItems(filteredItemsByCategory(items, searchByCategory));
		}
	}, [items, searchByCategory]);

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
	}, [cartProducts, count]);

	return (
		<ShoppingCartContext.Provider
			value={{
				items,
				setItems,
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
