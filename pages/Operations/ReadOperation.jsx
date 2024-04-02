// ReadOperation
import { useState, useEffect } from 'react';
// import styles from '../../styles/Home.module.css';


export default function ReadOperation(data) {

	const [json_from_database, setJSON] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	
	

	useEffect(() => {
		const fetchData = async (tableName) => {
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
	}, []);

	if (loading) {
		return <div>
			<DebugInfo component_name="QueryDisplay" />

			<p>Loading...</p>;
		</div>
	}

	if (error) {
		return <div>
			<DebugInfo component_name="QueryDisplay" />

			<p>Error: {error.message}</p>;
		</div>
	}

	return (
		<div>

			<DebugInfo component_name="QueryDisplay" />

			<h2>57938579834987347983495873</h2>

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


const DisplayTableFromJSON = ({ json_data }) => {
	return (
		<table>
			<thead>
				<tr>
					{json_data.fields.map(field => (
						<th key={field.name}>{field.name}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{json_data.rows.map((row, index) => (
					<tr key={index}>
						{json_data.fields.map(field => (
							<td key={`${index}-${field.name}`}>{row[field.name]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
