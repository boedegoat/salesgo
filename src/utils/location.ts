interface Coordinates {
    latitude: number;
    longitude: number;
}

interface GetDistance {
    current: Coordinates;
    destination: Coordinates;
    unit: "K" | "N";
}

const getDistance = ({ current, destination, unit }: GetDistance) => {
    const radlat1 = (Math.PI * current.latitude) / 180;
    const radlat2 = (Math.PI * destination.latitude) / 180;
    const theta = current.longitude - destination.longitude;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
        dist = dist * 1.609344;
    }
    if (unit == "N") {
        dist = dist * 0.8684;
    }
    return dist;
};

export const checkInHandler = ({
    destination,
}: {
    destination: Coordinates;
}) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // on success
            (position) => {
                const { latitude, longitude } = position.coords;

                const coords = {
                    current: {
                        latitude,
                        longitude,
                    },
                    destination,
                };

                const distanceKm = getDistance({
                    current: coords.current,
                    destination: coords.destination,
                    unit: "K", // km
                });

                const arrived = distanceKm <= 0.1; // less or equal to 0.1 km

                console.log({
                    distanceKm,
                    arrived,
                    current: coords.current,
                    destination: coords.destination,
                });

                alert(
                    arrived
                        ? "Check in berhasil"
                        : "Anda belum ada di tujuan toko"
                );
            },

            // on error
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Location hp nyalain dulu bro.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Data location tidak tersedia. Coba lagi bro.");
                        break;
                    case error.TIMEOUT:
                        alert("Request timeout. Coba lagi bro.");
                        break;
                    default:
                        alert("Ada error yang belum dikenal. Coba lagi bro.");
                        break;
                }
            },
            {
                enableHighAccuracy: true,
            }
        );
    } else {
        alert(
            "Maaf, hp/browser anda tidak support untuk memakai location. Coba pake browser terbaru (e.g. chrome, etc)"
        );
    }
};
