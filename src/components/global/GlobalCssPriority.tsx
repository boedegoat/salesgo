import { StyledEngineProvider } from "@mui/material/styles";

interface Props {
    children: React.ReactNode;
}

const GlobalCssPriority = ({ children }: Props) => {
    return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
};

export default GlobalCssPriority;
