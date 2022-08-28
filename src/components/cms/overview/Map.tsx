import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const Map = () => {
    const [pos, setPos] = useState<LatLngExpression | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPos([position.coords.latitude, position.coords.longitude]);
        });

        setTimeout(() => {
            setPos([-6.245502078217963, 106.67102022218026]);
        }, 3000);
    }, []);

    if (!pos) {
        return null;
    }

    return (
        <div className="rounded-xl w-full h-full overflow-hidden">
            <MapContainer
                center={pos}
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={pos}>
                    <Popup>Mang Udin</Popup>
                </Marker>
                <Marker position={[-6.2402893050739365, 106.67560063413517]}>
                    <Popup>Mang Otong</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
