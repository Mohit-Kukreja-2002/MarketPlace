import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () => {
	return useContext(ProductContext);
};

// eslint-disable-next-line react/prop-types
export const ProductContextProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	return <ProductContext.Provider value={{ products, setProducts }}>{children}</ProductContext.Provider>;
};