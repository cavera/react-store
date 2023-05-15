import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
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
