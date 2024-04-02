import React, { useState } from 'react';

const PageDetailingHomePage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [textInput, setTextInput] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const h4Styles = {
    textAlign: 'center'
  };

  const buttonStyle = {
    marginRight: '10px' // Adjust this value as needed for the desired spacing
  };

  

  return (
    <div>
      <header>
        <h4 style={h4Styles}>Select a query to run</h4>
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
            <button style={buttonStyle}>Create</button>
             {/* hyper links */}
            <button style={buttonStyle}>Read</button>
            {/* hyper links */}
            <button style={buttonStyle}>Update</button>
            {/* hyper links */}
            <button style={buttonStyle}>Delete</button>
            {/* hyper links */}
          </div>
          <br></br>
          <div>
            <label>User Input</label>
            <input type="text" value={textInput} onChange={handleTextInputChange} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageDetailingHomePage;