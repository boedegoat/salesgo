import { Role } from "@prisma/client";

interface Props {
    role?: Role;
    children: React.ReactNode;
}

// TODO: handle roles color
const RoleBadge = ({ role, children }: Props) => {
    return (
        <span className="bg-orange-500 text-white font-semibold px-1 py-0.5 rounded-md border-b-4 border-b-orange-700">
            {children}
        </span>
    );
};

export default RoleBadge;
