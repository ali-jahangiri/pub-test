import { useContext } from "react";
import { StoreContext } from "../../providers/Store/Store";

const useStore = () => {
	const { store, setStore } = useContext(StoreContext);
	return [store, setStore];
};

export default useStore;
