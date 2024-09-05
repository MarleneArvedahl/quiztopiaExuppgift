import 'leaflet/dist/leaflet.css';
import './LeafletMap.css';
import leaflet, { LatLng, Map } from 'leaflet';
import { useState, useEffect } from 'react';
import { Location, Question } from '../ShowQuiz/CreateQuizQuestion';


type Props = {
    onClickMap: (loc:Location) => void
    questions: Question[]
}


function LeafletMap(props: Props) {
  const [position, setPosition] = useState<GeolocationCoordinates>();
  const [map, setMap] = useState<Map>();
  const [clickPosition, setClickPosition] = useState<LatLng | null>(null);
const {questions} = props //samma sak som att skriva questions = props.questions (man använder då samma namn)

  function getPosition() {
    if ('geolocation' in navigator && !position?.latitude) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position)
        setPosition(position.coords);
      });
    }
  }
  
  function onClick(event:any) {
    console.log('clicked on map', event)
    props.onClickMap(event.latlng)
    setClickPosition(event.latlng)
    
  }

  useEffect(() => {
    if (!position?.latitude) {
      getPosition();
    }
  }, []);
  
  useEffect(() => {
    if (position?.latitude && !map) {
      const myMap = leaflet
        .map('map') //lägg kartan i div 'map'
        .setView([position?.latitude, position?.longitude], 15) //vart den skall zooma in
        .on('click', onClick)
      setMap(myMap);
    }
  }, [position]);

  useEffect(() => {
    if (map && position) {
      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);
    }
  }, [map]);

    useEffect(() => {
        if(!map) return;
        if (clickPosition) {
            leaflet.marker([clickPosition.lat, clickPosition.lng]).addTo(map)
        }
        //testade att hårdkoda först för att sen gör den mer beroende på.
        // leaflet.marker([58,12]).addTo(map).bindPopup('hej')
        questions.forEach(question => {
            const {longitude, latitude} = question.location
            //+ gör att den konverterar sträng till siffra
            leaflet.marker([+latitude, +longitude]).addTo(map).bindPopup(question.question)
        })
    }, [questions, map, clickPosition])


  return (
    <>
      <section id='map'></section>
    </>
  );
}

export default LeafletMap;