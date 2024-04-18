import React, { useState } from 'react';
import QueryDisplay from '../QueryDisplay';
import CreateOperation from '../Operations/CreateOperation';
import UpdateOperation from '../Operations/UpdateOperation';
import ReadOperation from '../Operations/ReadOperation';
import DeleteOperation from '../Operations/DeleteOperation';
import ConsoleApp from '../components/ConsoleApp';
import Header from '../components/header';


import styles from '../styles/Home.module.css';
import Advanced from '../Operations/Advanced';

const PageDetailingHomePage = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedOperation, setselectedOperation] = useState('Create');


  let aaaaa = new ConsoleApp();

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
    <Header />

    <div>
      <aside>
        <div>
          <label style={TextStyles}>Select a query to run: </label>
          <select value={selectedOption} onChange={handleOptionChange}>
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
          {/* <button>Run</button> (Dose nothing currently) */}
        </div>
        <br></br>
      </aside>
      <main>
        <div>
          <label style={TextStyles}>Operations: </label>
          <button style={buttonStyle} value="Create" onClick={handleOperation} >Create</button>
          <button style={buttonStyle} value="Read" onClick={handleOperation}>Read</button>
          <button style={buttonStyle} value="Update" onClick={handleOperation}>Update</button>
          <button style={buttonStyle} value="Delete" onClick={handleOperation}>Delete</button>
          <button style={buttonStyle} value="Advanced" onClick={handleOperation}>Advanced</button>
        </div>
        <br></br>
        <div>
          <label style={TextStyles}>User Input: </label>
          {/* <input type="text" value={textInput} onChange={handleTextInputChange} />
          (Dose nothing currently) */}
        </div>

        <div className={styles.myboxborder}>
          {selectedOperation == "Create" && <CreateOperation table={selectedOption} />}
          {selectedOperation == "Read" && <ReadOperation table={selectedOption} />}
          {selectedOperation == "Update" && <UpdateOperation table={selectedOption} />}
          {selectedOperation == "Delete" && <DeleteOperation table={selectedOption} />}
          {selectedOperation == "Advanced" && <Advanced table={selectedOption} />}
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

export default PageDetailingHomePage;