import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
interface Position {
    lat: number;
    lng: number;
}
interface MapProps {
    onCoordinatesChange: (lat: string, lng: string) => void;
}

const Map: React.FC<MapProps> = ({ onCoordinatesChange }) => {

    const mapRef = React.useRef<HTMLDivElement>(null)
    const [newPosition, setNewPosition] = useState<Position | undefined>(undefined);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            });
            const { Map } = await loader.importLibrary('maps');
            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

            const position = {
                lat: -38.416097,
                lng: -63.616672
            }
            // opciones del map
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 5,
                mapId: 'DEMO_MAP_ID'
            }

            // establecer mapa
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            const marker = new Marker({
                map: map,
                position: position
            })

            map.addListener('click', (event: any) => {
                // Obtener las nuevas coordenadas de posición
                const newPosition = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                };

                // Mover el marcador a la nueva posición
                marker.setPosition(newPosition);
                setNewPosition(newPosition)
                onCoordinatesChange(newPosition.lat.toFixed(6), newPosition.lng.toFixed(6));
            });
        };


        initMap();
    }, [onCoordinatesChange])

    return (
        <>
            <div style={{ height: '600px' }} ref={mapRef} />
        </>
    )
}

export default Map;