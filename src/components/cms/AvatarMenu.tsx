// Icons
import Logout from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

// Components
import MenuItem from "@mui/material/MenuItem";

import { Menu } from "@/components";

interface Props {
    avatarEl: HTMLElement | null;
    onClose: () => void;
}

const AvatarMenu = ({ avatarEl, onClose }: Props) => {
    return (
        <Menu
            anchorEl={avatarEl}
            onClose={onClose}
            PaperProps={{
                className: "mt-3",
            }}
        >
            <div>
                <MenuItem>
                    <ManageAccountsIcon className="mr-1 w-5 h-5" />
                    Profile
                </MenuItem>
                <MenuItem className="text-red-500">
                    <Logout className="mr-1 w-5 h-5" />
                    Sign Out
                </MenuItem>
            </div>
        </Menu>
    );
};

export default AvatarMenu;
