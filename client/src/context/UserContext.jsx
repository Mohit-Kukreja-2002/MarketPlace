import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
	return useContext(UserContext);
};

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};