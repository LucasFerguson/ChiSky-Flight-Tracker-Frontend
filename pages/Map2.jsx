/* global fetch, setTimeout, clearTimeout */
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Map } from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';

// import type { ScenegraphLayerProps } from '@deck.gl/mesh-layers';
// import type { PickingInfo, MapViewState } from '@deck.gl/core';

// Data provided by the OpenSky Network, http://www.opensky-network.org
// const DATA_URL = 'https://opensky-network.org/api/states/all';
// For local debugging
const DATA_URL = 'http://localhost:3011/select/aircraft_status';
const MODEL_URL =
	'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scenegraph-layer/airplane.glb';
const REFRESH_TIME_SECONDS = 60;
const DROP_IF_OLDER_THAN_SECONDS = 120;

const ANIMATIONS = {
	'*': { speed: 1 }
};

const INITIAL_VIEW_STATE = {
	latitude: 39.1,
	longitude: -94.57,
	zoom: 3.8,
	maxZoom: 16,
	pitch: 0,
	bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

// https://openskynetwork.github.io/opensky-api/rest.html#response
// type Aircraft = [
// 	uniqueId: string,
// 	callSign: string,
// 	originCountry: string,
// 	timePosition: number,
// 	lastContact: number,
// 	longitude: number | null,
// 	latitude: number | null,
// 	baroAltitude: number | null,
// 	onGround: boolean,
// 	velocity: number | null,
// 	trueAttack: number | null,
// 	verticalRate: number | null,
// 	sensors: number[],
// 	geoAltitude: number | null,
// 	positionSource: number[],
// 	category: number
// ];

const DATA_INDEX = {
	UNIQUE_ID: 0,
	CALL_SIGN: 1,
	ORIGIN_COUNTRY: 2,
	LAST_CONTACT: 4,
	LONGITUDE: 5,
	LATITUDE: 6,
	BARO_ALTITUDE: 7,
	VELOCITY: 9,
	TRUE_TRACK: 10,
	VERTICAL_RATE: 11,
	GEO_ALTITUDE: 13,
	CATEGORY: 17
};

async function fetchData() {
	const resp = await fetch(DATA_URL);
	console.log('fetchData', resp);

	let data_json = await resp.json();
	console.log('data_json', data_json);
	console.log('data_json one flight', data_json.rows[1]);

	let states = [];

	for (let i = 0; i < data_json.rows.length; i++) {

		// Convert the data to the format expected by the deck.gl layer
		// DeckGL Example
		// [
		// 	"e49407",
		// 	"",
		// 	"Brazil",
		// 	1699549708,
		// 	1699549708,
		// 	-46.7585,
		// 	-23.4154,
		// 	1234.44,
		// 	false,
		// 	75.17,
		// 	149.57,
		// 	0.98,
		// 	null,
		// 	1287.78,
		// 	null,
		// 	false,
		// 	0
		// ],

		// My data Example
		// {
		// 	"registrationid": "LFCY",
		// 	"altitude": "8000",
		// 	"altitude_change": "D",
		// 	"groundspeed": "341",
		// 	"heading": "360",
		// 	"latitude": "39.1802",
		// 	"longitude": "-84.4204",
		// 	"timestamp": "12:01 PM",
		// 	"typeid": "HR16 4844 9788 4540 2323 2"
		// }


		let flight = [];


		flight.push(data_json.rows[i].registrationid); // "4b1816",
		flight.push(data_json.rows[i].registrationid); // "SWR64C  ",
		flight.push(data_json.rows[i].registrationid); // "Switzerland",
		flight.push(data_json.rows[i].timestamp); // 1699549717,
		flight.push(data_json.rows[i].timestamp); // 1699549717,
		flight.push(parseInt(data_json.rows[i].longitude)); // 8.4297,
		flight.push(parseInt(data_json.rows[i].latitude)); // 47.4387,
		flight.push(parseInt(data_json.rows[i].altitude)); // 2148.84,
		flight.push(false); // false,
		flight.push(parseInt(data_json.rows[i].groundspeed)); // 113.21,
		flight.push(parseInt(data_json.rows[i].heading)); // 254.45,
		flight.push(parseInt(11.38)); // 11.38,
		flight.push([]); // null,
		flight.push(data_json.rows[i].altitude); // 2156.46,
		flight.push([]); // "1000",
		flight.push(false); // false,
		flight.push(0); // 0,


		// [
		// 	"KUKI",
		// 	"KUKI",
		// 	"KUKI",
		// 	"1:03 AM",
		// 	"1:03 AM",
		// 	-83,
		// 	39,
		// 	"3000",
		// 	false,
		// 	"180",
		// 	"030",
		// 	"C",
		// 	[],
		// 	"3000",
		// 	[],
		// 	0
		// ]

		states.push(flight);

	}

	console.log('states', states);


	// const { time, states } = (await resp.json());

	// console.log('fetchData', resp);

	// make lastContact timestamp relative to response time
	// for (const a of states) {
	// 	a[DATA_INDEX.LAST_CONTACT] -= time;
	// }
	return states;
}

function getTooltip({ object }) {
	return (
		object &&
		`\
    Call Sign: ${object[DATA_INDEX.CALL_SIGN] || ''}
    Country: ${object[DATA_INDEX.ORIGIN_COUNTRY] || ''}
    Vertical Rate: ${object[DATA_INDEX.VERTICAL_RATE] || 0} m/s
    Velocity: ${object[DATA_INDEX.VELOCITY] || 0} m/s
    Direction: ${object[DATA_INDEX.TRUE_TRACK] || 0}`
	);
}

export default function MapApp({
	sizeScale = 2050,
	onDataLoad,
	mapStyle = MAP_STYLE
}) {
	const [data, setData] = useState();

	useEffect(() => {
		async function fetchDataAndUpdateState() {
			try {
				const newData = await fetchData();
				setData(newData);
				if (onDataLoad) {
					onDataLoad(newData);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchDataAndUpdateState();

		// Optionally, you can use a timer to fetch data periodically
		const intervalId = setInterval(fetchDataAndUpdateState, REFRESH_TIME_SECONDS * 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [onDataLoad]); // Dependency array ensures useEffect runs only once on mount and when onDataLoad changes



	// useEffect(() => {
	// 	timer.id++;
	// 	fetchData()
	// 		.then(newData => {
	// 			if (timer.id === null) {
	// 				// Component has unmounted
	// 				return;
	// 			}
	// 			// In order to keep the animation smooth we need to always return the same
	// 			// object at a given index. This function will discard new objects
	// 			// and only update existing ones.
	// 			if (data) {
	// 				const dataById = {};
	// 				newData.forEach(entry => (dataById[entry[DATA_INDEX.UNIQUE_ID]] = entry));
	// 				newData = data.map(entry => dataById[entry[DATA_INDEX.UNIQUE_ID]] || entry);
	// 			}

	// 			setData(newData);

	// 			if (onDataLoad) {
	// 				onDataLoad(newData.length);
	// 			}
	// 		})
	// 		.finally(() => {
	// 			const timeoutId = setTimeout(() => setTimer({ id: timeoutId }), REFRESH_TIME_SECONDS * 1000);
	// 			timer.id = timeoutId;
	// 		});

	// 	return () => {
	// 		clearTimeout(timer.id);
	// 		timer.id = null;
	// 	};
	// }, [timer, data]);

	const layer = new ScenegraphLayer({
		id: 'scenegraph-layer',
		data,
		pickable: true,
		sizeScale,
		scenegraph: MODEL_URL,
		_animations: ANIMATIONS,
		sizeMinPixels: 0.1,
		sizeMaxPixels: 1.5,
		getPosition: d => [
			d[DATA_INDEX.LONGITUDE] ?? 0,
			d[DATA_INDEX.LATITUDE] ?? 0,
			d[DATA_INDEX.GEO_ALTITUDE] ?? 0
		],
		getOrientation: d => {
			const verticalRate = d[DATA_INDEX.VERTICAL_RATE] ?? 0;
			const velocity = d[DATA_INDEX.VELOCITY] ?? 0;
			// -90 looking up, +90 looking down
			const pitch = (-Math.atan2(verticalRate, velocity) * 180) / Math.PI;
			const yaw = -d[DATA_INDEX.TRUE_TRACK] ?? 0;
			return [pitch, yaw, 90];
		},
		getScale: d => {
			const lastContact = d[DATA_INDEX.LAST_CONTACT];
			return lastContact < -DROP_IF_OLDER_THAN_SECONDS ? [0, 0, 0] : [1, 1, 1];
		},
		transitions: {
			getPosition: REFRESH_TIME_SECONDS * 1000
		}
	});

	return (
		<div style={{ height: '90vh', width: '100%', position: 'fixed', backgroundColor: "lightblue" }} >
			<DeckGL
				layers={[layer]}
				initialViewState={INITIAL_VIEW_STATE}
				controller={true}
				getTooltip={getTooltip}
			>
				<Map reuseMaps mapStyle={mapStyle} />
			</DeckGL>
		</div >
	);
}

export function renderToDOM(container) {
	createRoot(container).render(<MapApp />);
}