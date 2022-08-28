import useGlobalState from "./useGlobalState";

const useEmployee = () => {
    const { state, dispatch } = useGlobalState();
    const { employee, status } = state.auth;

    return { employee, status, dispatch };
};

export default useEmployee;
