import { twMerge } from "tailwind-merge";

const dummyNotif = [
    {
        type: "check-in",
        salesman: "Mang Ujang",
        store: "Toko Udin",
        read: false,
        time: "5 detik yang lalu",
    },
    {
        type: "check-in",
        salesman: "Pak Thrio",
        store: "Toko Asep",
        read: true,
        time: "2 menit yang lalu",
    },
    {
        type: "check-in",
        salesman: "Kang Otong",
        store: "Toko Budi Berkah",
        read: true,
        time: "4 menit yang lalu",
    },
];

const NotificationMenu = () => {
    return (
        <>
            <div className="p-4 flex justify-between">
                <h3 className="font-bold">Notifikasi</h3>
                <button className="text-sm font-medium text-slate-600 hover:text-teal-500">
                    Lihat semua
                </button>
            </div>
            <div className="text-sm">
                {dummyNotif.map((notif, index) => (
                    <div
                        key={index}
                        className={twMerge(
                            "flex flex-col items-start p-4 rounded-lg",
                            !notif.read && "bg-teal-100/60"
                        )}
                    >
                        <div className="font-medium">
                            <span className="font-semibold text-black">
                                {notif.salesman}
                            </span>{" "}
                            <span>baru saja check in di</span>{" "}
                            <span className="font-semibold text-black">
                                {notif.store}
                            </span>
                        </div>
                        <div className="text-xs text-slate-500">
                            {notif.time}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NotificationMenu;
