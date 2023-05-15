/**
 * This function calculates total proce of an order
 * @param {Array} products cartProducts:Array of Objects
 * @returns {Number} Total price
 */

export const totalPrice = products => products.reduce((total, product) => total + product.price, 0);

export const orderDate = () => {
	let date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	if (month < 10) {
		return `${day}-0${month}-${year}`;
	} else {
		return `${day}-${month}-${year}`;
	}
};
