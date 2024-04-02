import React, { useState } from 'react';
import QueryDisplay from './QueryDisplay';
import CreateOperation from './Operations/CreateOperation';
import UpdateOperation from './Operations/UpdateOperation';
import ReadOperation from './Operations/ReadOperation';
import DeleteOperation from './Operations/DeleteOperation';
const PageDetailingHomePage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedOperation, setselectedOperation] = useState('Create');

  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOperation = (event) => {
    setselectedOperation(event.target.value);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const h3Styles = {
    textAlign: 'center'
  };

  const buttonStyle = {
    marginRight: '10px' // Adjust this value as needed for the desired spacing
  };

  

  return (
    <div>
      <header>
      <img src={"http://localhost:3000/logo.webp"} alt="Logo" style={{ float: 'right', width: '100px', height: '100px' }}/> {/*Logo image */}
        <h3 style={h3Styles}>Select a query to run</h3>
      </header>
      <div>
        <aside>
          <div>
            <label>Select a query to run: </label>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="">Select Table</option>
              <option value="table1">Aircraft Types</option>
              <option value="table2">Airports</option>
              <option value="table3">Routes</option>
              <option value="table4">Aircraft Status</option>
              <option value="table5">Airlines</option>
              <option value="table6">flights</option>
            </select>
          </div>
          <br></br>
          <div>
            <button>Run</button>
          </div>
          <br></br>
        </aside>
        <main>
        <div>
            <label>Operations: </label>
            <button style={buttonStyle} value="Create" onClick={handleOperation} >Create</button>
             {/* hyper links */}
            <button style={buttonStyle} value="Read" onClick={handleOperation}>Read</button>
            {/* hyper links */}
            <button style={buttonStyle} value="Update" onClick={handleOperation}>Update</button>
            {/* hyper links */}
            <button style={buttonStyle} value="Delete" onClick={handleOperation}>Delete</button>
            {/* hyper links */}
          </div>
          <br></br>
          <div>
            <label>User Input</label>
            <input type="text" value={textInput} onChange={handleTextInputChange} />
          </div>

          
          {selectedOperation == "create" && <CreateOperation />}
          {selectedOperation == "read" && <ReadOperation />}
          {selectedOperation == "update" && <UpdateOperation />}
          {selectedOperation == "delete" && <DeleteOperation />}
          
          {/* <QueryDisplay></QueryDisplay> */}
          
        </main>
      </div>
    </div>
  );
};

export default PageDetailingHomePage;