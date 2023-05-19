import logo from './Assets/MainLogo.png';
import './App.css';
import React from 'react';
import JsonData from './Components/JSONdata/JSONdata';

const App = () => {
  return (
    <div>
      <div className='bg-[#0072bc] w-screen'>
        <div className="w-[20vw]">
          <img src={logo} className='object-contain'/>
        </div>
      </div>
      <JsonData />
    </div>
  );
};

export default App;
