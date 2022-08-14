import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

const useGlobalState = () => {
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();
    return { state, dispatch };
};

export default useGlobalState;
