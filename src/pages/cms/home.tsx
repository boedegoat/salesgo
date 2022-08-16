import { Needs } from "@/components";
import { Role } from "@prisma/client";

const services = {
    auth: {
        role: Role.Manager,
    },
};

const CMSHome = Needs(services, () => {
    return <div>CMSHome</div>;
});

export default CMSHome;
