import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';

const DisplayTableFromJSON = ({ json_data }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [entriesPerPage, setEntriesPerPage] = useState(100);

	if (!json_data) return (<div>Error: No data received. Backend may not be running</div>)

	const totalRows = json_data.rows.length;
	const totalPages = Math.ceil(totalRows / entriesPerPage);
	const indexOfLastRow = currentPage * entriesPerPage;
	const indexOfFirstRow = indexOfLastRow - entriesPerPage;
	const currentRows = json_data.rows.slice(indexOfFirstRow, indexOfLastRow);

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const handleChangeEntriesPerPage = (event) => {
		setEntriesPerPage(parseInt(event.target.value));
		setCurrentPage(1); // Reset to first page when changing entries per page
	};

	return (
		<div style={{ overflowX: 'auto' }}>

			<div  className={styles.querybox}>
				<span>Page Settings: </span>
				<button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
				<button onClick={nextPage} disabled={indexOfLastRow >= totalRows}>Next</button>
				<span>Page {currentPage} of {totalPages}  </span>
				<select className={styles.tableDrop} value={entriesPerPage} onChange={handleChangeEntriesPerPage}>
					{[10, 20, 50, 100].map(value => (
						<option key={value} value={value}>{value}</option>
					))}
				</select>
			</div>


			<p> [ Tip: If Table Overflows Display use Arrow Keys to scroll left and right ]</p>
			<table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
				<thead>
					<tr style={{ backgroundColor: '#f2f2f2' }}>
						{json_data.fields.map(field => (
							<th key={field.name} style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{field.name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{currentRows.map((row, index) => (
						<tr key={index}>
							{json_data.fields.map(field => (
								<td key={`${index}-${field.name}`} style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{row[field.name]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

		</div>
	);

};

export default DisplayTableFromJSON;
