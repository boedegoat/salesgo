import MuiMenu, { MenuProps } from "@mui/material/Menu";
import classNames from "classnames";

interface Props extends Omit<MenuProps, "open"> {}

const Menu = ({ ...menuProps }: Props) => {
    return (
        <MuiMenu
            {...menuProps}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
                ...menuProps.anchorOrigin,
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
                ...menuProps.transformOrigin,
            }}
            PaperProps={{
                className: classNames(
                    "shadow-md shadow-slate-200/50 rounded-xl",
                    menuProps.PaperProps?.className
                ),
            }}
            MenuListProps={{
                className: classNames(
                    "py-0",
                    menuProps.MenuListProps?.className
                ),
            }}
            open={Boolean(menuProps.anchorEl)}
        >
            {menuProps.children}
        </MuiMenu>
    );
};

export default Menu;
