// import logo from './logo.svg';
import './App.css';
import logo from "./Assets/MainLogo.png"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

// import CustomWidthTooltip from '@mui/material/CustomWidthTooltip';
import { useState, useEffect } from "react";
// import API from "./Services/axios";
import axios from "axios";
function App() {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json"
      )
      .then((data) => {
        setData(data.data.employees);
      });
  }, []);

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  console.log(data)
  return (
    <div>
      <div className='bg-[#0072bc] w-screen'>
        <div className="w-[20vw]">
          <img src={logo} className='object-contain'/>
        </div>
      </div>
      <div className="flex justify-center items-center pt-[5vw]">
          <div className="flex space-x-1">
              <input
                  type="text"
                  className="block w-full px-4 py-2 text-[#0072bc] bg-white border rounded-full focus:border-[#0072bc] focus:ring-[#0072bc] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search Employee"
              />
              <button className="px-4 text-white bg-[#0072bc] rounded-full ">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                  </svg>
              </button>
        </div>
      </div>
      <div>
        {data&&data.map((item,idx)=>{
          return (
          <div className="pl-10">
            <CustomWidthTooltip title={item.designation}>
              <Button sx={{ m: 1 }}>{item.name}</Button>
            </CustomWidthTooltip>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
