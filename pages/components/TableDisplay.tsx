import React from 'react';

const DisplayTableFromJSON = ({ json_data }) => {
	return (
		<div style={{ overflowX: 'auto' }}>
			<p> [ Tip: If Table Overflows Display Use Arrow Keys to scroll right and left ]</p>
			<table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
				<thead>
					<tr style={{ backgroundColor: '#f2f2f2' }}>
						{json_data.fields.map(field => (
							<th key={field.name} style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{field.name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{json_data.rows.map((row, index) => (
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
