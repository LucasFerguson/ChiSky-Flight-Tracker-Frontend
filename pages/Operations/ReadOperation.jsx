// ReadOperation
import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import DisplayTableFromJSON from '../components/TableDisplay';


export default function ReadOperation(data) {

	const [json_from_database, setJSON] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		const fetchData = async (tableName) => {

			if (tableName == "") {
				console.log("Please Select Table!")
				return;
			}


			try {
				console.log("tableName= " + tableName)
				const response = await fetch(`http://localhost:3011/select/${tableName}`);
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await response.json();
				console.log('Data:', data);
				setJSON(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setError(error);
				setLoading(false);
			}
		};

		fetchData(data.table);
	}, [data.table]);

	if (loading) {
		return <div className={styles.querybox}>
			<DebugInfo component_name="QueryDisplay" />
			<p>Selected Table: {data.table}</p>
			<p>Loading...</p>
			<img src="https://media1.giphy.com/media/uIJBFZoOaifHf52MER/200w.gif?cid=6c09b9529ry67rkxriku5ai6omcaegqxtchadtx84q511l9p&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="" />
		</div>
	}

	if (error) {
		return <div className={styles.querybox}>
			<DebugInfo component_name="QueryDisplay" />
			<p>Selected Table: {data.table}</p>
			<p>Error: {error.message}</p>;
		</div>
	}

	return (
		<div className={styles.querybox}>

			<DebugInfo component_name="QueryDisplay" />
			<p>Selected Table: [ {data.table} ]</p>
			<h2>Read</h2>

			<DisplayTableFromJSON json_data={json_from_database} />
		</div>
	);

	// return <div><h2>Read Operation Page</h2></div>

}

// export default function QueryDisplay() {
// 	const [json_from_database, setJSON] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await fetch('http://localhost:3011/select/flights');
// 				if (!response.ok) {
// 					throw new Error('Failed to fetch data');
// 				}
// 				const data = await response.json();
// 				console.log('Data:', data);
// 				setJSON(data);
// 				setLoading(false);
// 			} catch (error) {
// 				console.error('Error fetching data:', error);
// 				setError(error);
// 				setLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	if (loading) {
// 		return <div className={styles.myboxborder}>
// 			<DebugInfo component_name="QueryDisplay" />

// 			<p>Loading...</p>;
// 		</div>
// 	}

// 	if (error) {
// 		return <div className={styles.myboxborder}>
// 			<DebugInfo component_name="QueryDisplay" />

// 			<p>Error: {error.message}</p>;
// 		</div>
// 	}

// 	return (
// 		<div className={styles.myboxborder}>
// 			<DebugInfo component_name="QueryDisplay" />

// 			<h2>Flight List</h2>

// 			<DisplayTableFromJSON json_data={json_from_database} />
// 		</div>
// 	);
// };



const DebugInfo = (data) => {
	return (
		<div>
			[DEBUG Info] React Component: {data.component_name}
		</div>

	);
};
