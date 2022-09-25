import { useContext } from "react";
import { PodSdkContext } from "../../providers/PodSdk/PodSdkProvider";

const usePodSdk = () => {
	const sdkInstance = useContext(PodSdkContext);
	return sdkInstance;
};

export default usePodSdk;
