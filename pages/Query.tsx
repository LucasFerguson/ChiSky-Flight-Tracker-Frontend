import React, { useState } from 'react';
import QueryDisplay from './QueryDisplay';
import CreateOperation from './Operations/CreateOperation';
import UpdateOperation from './Operations/UpdateOperation';
import ReadOperation from './Operations/ReadOperation';
import DeleteOperation from './Operations/DeleteOperation';
import RankComponent from './Operations/RankComponent';
import RollupComponent from './Operations/RollupComponent';
import CubeComponent from './Operations/CubeComponent';
import DenseRankComponent from './Operations/DenseRankComponent';
import NtileComponent from './Operations/NtileComponent';
import FirstValueComponent from './Operations/FirstValueComponent';
import UnboundedPrecedingComponent from './Operations/UnboundedPrecedingComponent';
import RecursiveComponent from './Operations/RecursiveComponent';
import ViewComponent from './Operations/ViewComponent';

import ConsoleApp from './components/ConsoleApp';
// import Header from './components/header';


import styles from '../styles/Home.module.css';
import Advanced from './Operations/Advanced';

const QueryPage = (props) => {

	const [selectedOption, setSelectedOption] = useState('');
	const [textInput, setTextInput] = useState('');
	const [selectedOperation, setselectedOperation] = useState('Create');


	let aaaaa = new ConsoleApp(props);

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleOperation = (event) => {
		setselectedOperation(event.target.value);

	};

	const handleTextInputChange = (event) => {
		setTextInput(event.target.value);
	};

	const TextStyles = {
		textAlign: 'center',
		fontFamily: 'Arial, sans-serif'
	};

	const buttonStyle = {
		marginRight: '10px' // Adjust this value as needed for the desired spacing
	};



	return <div className={styles.homepage}>

		{/*	<Header /> */}

		<div className={styles.querypg}>
			<aside>
				<div>
					<label>Select a query to run: </label>
					<select className={styles.tableDrop} value={selectedOption} onChange={handleOptionChange}>
						<option value="">Select Table</option>
						<option value="aircraft_types">Aircraft Types</option>
						<option value="airports">Airports</option>
						<option value="routes">Routes</option>
						<option value="aircraft_status">Aircraft Status</option>
						<option value="airlines">Airlines</option>
						<option value="flights">Flights</option>
					</select>
				</div>
				<br></br>
				<div>
					{/* <button>Run</button> (Does nothing currently) */}
				</div>
				<br></br>
			</aside>
			<main>
				<div>
					<label>Operations: </label>
					<button value="Create" onClick={handleOperation} >Create Row</button>
					<button value="Read" onClick={handleOperation}>Read Table</button>
					<button value="Update" onClick={handleOperation}>Update Table</button>
					<button value="Delete" onClick={handleOperation}>Delete Row</button>
					<button value="Advanced" onClick={handleOperation}>Advanced Ops</button>
				</div>
				<div>
					<label>OLAP Queries: </label>
					<button value="Rollup" onClick={handleOperation}>Rollup</button>
					<button value="CubeComponent" onClick={handleOperation}>Cube</button>
					<button value="RankComponent" onClick={handleOperation}>Rank</button>
					<button value="DenseRankComponent" onClick={handleOperation}>Dense Rank</button>
					<button value="NtileComponent" onClick={handleOperation}>Ntile</button>
					<button value="FirstValueComponent" onClick={handleOperation}>First Value</button>
					<button value="UnboundedPrecedingComponent" onClick={handleOperation}>Unbounded Preceding</button>
					<button value="RecursiveComponent" onClick={handleOperation}>Recursive</button>
					<button value="ViewComponent" onClick={handleOperation}>View</button>
				</div>
				<br></br>
				<div>
					{/* <label>User Input: </label>  */}
					{/* <input type="text" value={textInput} onChange={handleTextInputChange} />
          			(Does nothing currently) */}
				</div>

				<div className={styles.myboxborder}>
					{selectedOperation == "Create" && <CreateOperation table={selectedOption} />}
					{selectedOperation == "Read" && <ReadOperation table={selectedOption} />}
					{selectedOperation == "Update" && <UpdateOperation table={selectedOption} />}
					{selectedOperation == "Delete" && <DeleteOperation table={selectedOption} />}
					{selectedOperation == "Advanced" && <Advanced table={selectedOption} />}
					{selectedOperation == "Rollup" && <RollupComponent table={selectedOption} />}
					{selectedOperation == "CubeComponent" && <CubeComponent table={selectedOption} />}
					{selectedOperation == "RankComponent" && <RankComponent table={selectedOption} />}
					{selectedOperation == "DenseRankComponent" && <DenseRankComponent table={selectedOption} />}
					{selectedOperation == "NtileComponent" && <NtileComponent table={selectedOption} />}
					{selectedOperation == "FirstValueComponent" && <FirstValueComponent table={selectedOption} />}
					{selectedOperation == "UnboundedPrecedingComponent" && <UnboundedPrecedingComponent table={selectedOption} />}
					{selectedOperation == "RecursiveComponent" && <RecursiveComponent table={selectedOption} />}
					{selectedOperation == "ViewComponent" && <ViewComponent table={selectedOption} />}
				</div>

				{/* <QueryDisplay></QueryDisplay> */}
				{/* {ConsoleApp.render()} */}
				<p></p>
				<p></p>
				<p></p>
				<p></p>
				<div className={styles.myboxborder}>
					<h3>Console</h3>
					<ConsoleApp />
				</div>

			</main>
		</div>
	</div>;
};

export default QueryPage;