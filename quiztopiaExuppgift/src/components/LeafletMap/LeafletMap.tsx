import 'leaflet/dist/leaflet.css';
import './LeafletMap.css';
import leaflet, { LatLng, Map } from 'leaflet';
import { useState, useEffect } from 'react';
import { Question } from '../ShowQuiz/CreateQuizQuestion';

type Props = {
    onClickMap?: (loc: LatLng) => void;
    questions: Question[];
};

function LeafletMap(props: Props) {
    const [myPosition, setMyPosition] = useState<LatLng | null>(null);
    const [map, setMap] = useState<Map>();
    const [clickPosition, setClickPosition] = useState<LatLng | null>(null);
    const { questions } = props; //samma sak som att skriva questions = props.questions (man använder då samma namn)

    function getPosition() {
        if ('geolocation' in navigator && !myPosition) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('position', position);
                setMyPosition(
                    new LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    )
                );
            });
        }
    }

    function onClick(event: any) {
        console.log('clicked on map', event);
        if (props.onClickMap) {
            props.onClickMap(event.latlng);
            setClickPosition(event.latlng);
        }
    }

    useEffect(() => {
        if (myPosition && map) {
            console.log('setview', myPosition);
            map.flyTo(myPosition, 12, {duration: 1.5}); //vart den skall zooma in
        }
    }, [myPosition, map]); //kör detta ifall variablerna inom hakparantesen ändras.

    useEffect(() => {
        if (map) return;
        console.log('create map');
        const myMap = leaflet
            .map('map') //lägg kartan i div 'map'
            .setView([0, 0], 1)
            .on('click', onClick);

        leaflet
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            })
            .addTo(myMap);
        setMap(myMap);
        getPosition();
        return () => {
            myMap.off();
            myMap.remove();
            setMap(undefined);
            console.log('removed map');
        };
    }, []);


    useEffect(() => {
        if (!map) return;
        const markers = leaflet.layerGroup().addTo(map);
        if (clickPosition) {
            const marker = leaflet.marker([
                clickPosition.lat,
                clickPosition.lng,
            ]);
            markers.addLayer(marker);
        }

        if (myPosition) {
            const marker = leaflet.marker(myPosition);
            markers.addLayer(marker);
        }
        //testade att hårdkoda först för att sen gör den mer beroende på.
        // leaflet.marker([58,12]).addTo(map).bindPopup('hej')
        questions.forEach((question) => {
            const { longitude, latitude } = question.location;
            //+ gör att den konverterar sträng till siffra
            const m = leaflet
                .marker([+latitude, +longitude])
                .addTo(map)
                .bindPopup(question.question);
            markers.addLayer(m);
        });
        return () => {
            markers.clearLayers();
            markers.removeFrom(map);
        };
    }, [questions, map, clickPosition, myPosition]);

    return (
        <>
            <section id='map'></section>
        </>
    );
}

export default LeafletMap;
