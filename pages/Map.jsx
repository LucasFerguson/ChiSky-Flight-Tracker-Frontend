// Implementing a 3D maps in react to detect placement of planes in a specific area /
import Background from './Background';
import React, { useEffect, useRef } from 'react';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';

import MapApp from './Map2';
// READ ME!!!!! IF this line causes an error, you need to create a .env file in the root directory of the project and read the README.md file for instructions on how to set up the .env file
import { env } from '../env';
// :D   - Lucas 
const MAPBOX_ACCESS_TOKEN = env.MAPBOX_API_KEY;

// Set your initial map view state
const initialViewState = {
    longitude: -74.5,
    latitude: 40,
    zoom: 9,
    pitch: 0,
    bearing: 0
};

// Data for the scatterplot layer
const data = [{ position: [-74.5, 40], size: 100 }];

// Define the scatterplot layer
const scatterplotLayer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: data,
    getPosition: d => d.position,
    getRadius: d => d.size,
    getFillColor: [255, 0, 0], // Red color
    getLineColor: [255, 0, 0], // Red color
    opacity: 0.8,
    pickable: true
});

const Map = () => {




    // const fetchFlightStatusData = async () => {
    //     try {
    //         console.log("tableName= aircraft_status")
    //         const response = await fetch(`http://localhost:3011/select/aircraft_status`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }
    //         const data = await response.json();
    //         console.log('Data:', data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // fetchFlightStatusData();


    return (
        <div>
            {/* <p>Hi this is the map</p> */}
            <MapApp></MapApp>
            {/* <DeckGL
                initialViewState={initialViewState}
                controller={true}
                layers={[scatterplotLayer]}
            >
                <StaticMap
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                />
            </DeckGL> */}
        </div>
    );
};

export default Map;
