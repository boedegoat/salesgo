import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const OfflineIndicator = () => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        if (!navigator.onLine) {
            setIsOffline(true);
        }
    }, []);

    return isOffline ? (
        <div className="px-5 py-3 flex items-center justify-center text-orange-700 bg-orange-100">
            <ExclamationCircleIcon className="w-5 h-5 mr-2" />
            <span className="font-medium text-lg">You are offline</span>
        </div>
    ) : null;
};

export default OfflineIndicator;
