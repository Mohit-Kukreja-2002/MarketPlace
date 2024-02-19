// import toast from "react-hot-toast";

const useIsLoggedIn = () => {
	const findStatus = async () => {
		try {
			const res = await fetch("/api/v1/isLoggedIn", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			return data;

		} catch (error) {
			console.log(error);
		}
	};

	return { findStatus };
};
export default useIsLoggedIn;