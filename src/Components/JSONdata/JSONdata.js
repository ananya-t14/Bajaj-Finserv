import React, { useState, useEffect } from 'react';

const JsonData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('');

  useEffect(() => {
    fetchJsonData();
  }, []);
  
  console.log(data)
  const fetchJsonData = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json');
      const jsonData = await response.json();
      setData(jsonData.employees);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  const [search, setSearch] = React.useState("");

  const searchFunction = (name) => {
    let tempData = data.filter((item) => {
      return item.name;
    });
    console.log(tempData);
    let temp = tempData.filter((item) => {
      console.log(item.name, name);
      return item.name.toLowerCase().includes(name.toLowerCase());
    });
    // setFilteredData(temp);
    console.log(temp);
    return temp;
  };

  const [filteredData, setFilteredData] = React.useState(data);

  const handleSearch = (e) => {
    setFilteredData(searchFunction(search));
  };

  const clearSearch = () => {
    setFilteredData(data);
  };

  useEffect(() => {
    if(data){

        setFilteredData(data);
    }
  }, [data]);

  const [designation, setDesignation] = React.useState("");
  const [skills, setSkills] = React.useState("");

  const [dataDesignations, setDataDesignations] = React.useState([]);
  const [dataSkills, setDataSkills] = React.useState(["Python", "Java"]);

  const handleDesignationFilter = (e) => {
    if (designation == "All") {
      setFilteredData(data);
      return;
    } else {
      let tempData = data.filter((item) => {
        return item.designation;
      });
      console.log(tempData);
      let temp = tempData.filter((item) => {
        console.log(item.designation, designation);
        return item.designation
          .toLowerCase()
          .includes(designation.toLowerCase());
      });
      setFilteredData(temp);
    }
  };

  useEffect(()=>{
    if(designation){
        handleDesignationFilter();
    }
  },[designation])
  useEffect(() => {
    if(data){
    let tempData = data.filter((item) => {
      return item.designation;
    });
    let temp = tempData.map((item) => {
      return item.designation;
    });
    setDataDesignations([...new Set(temp)]);
}
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="searchName" className="font-medium">Search by Name:</label>
              <input
                id="searchName"
                type="text"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
                className="border border-gray-300 px-2 py-1 rounded"
              />
              <div onClick={handleSearch} className='cursor-pointer'>Search</div>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="filterDesignation" className="font-medium">Filter by Designation:</label>
              <select
                id="filterDesignation"
                value={designation}
                onChange={(e)=>{setDesignation(e.target.value)}}
                className="border border-gray-300 px-2 py-1 rounded"
              >
                  <option defaultChecked>All</option>
                {dataDesignations&&dataDesignations.map((item, idx) => {
                return <option key={idx}>{item}</option>;
              })}
              </select>
              <div onClick={()=>{setFilteredData(data);setDesignation("All")}} className='cursor-pointer'>Clear</div>

            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredData &&
            filteredData.map((item,idx)=>{
                return (<div className='flex flex-col'>
                    <div>

                    {item.name}
                    </div>
                    <div>

                    {item.id}
                    </div>
                    <div>
                    {item.designation}
                    </div>
                    <div>
                        {item.skills && (
          <div className="rounded-xl  px-5 py-2 h-max w-max">
            <div className="font-bold">Skills</div>
            {item?.skills?.map((item, idx) => {
              return <div>{item}</div>;
            })}
          </div>)}
                        </div>
                        <div>
                        {item?.projects && (
          <div className="rounded-xl  px-5 py-2">
            <div className="font-bold">Projects</div>
            {item?.projects?.map((item, idx) => {
              return (
                <div className="flex flex-col text-center border-2 border-black gap-y-2 rounded-2xl my-5">
                  {item?.name}
                  <div>{item?.description}</div>
                  <div>
                    {item?.tasks && (
                      <div>
                        Tasks
                        <table className="border-2 border-black mx-auto mb-5">
                          <thead>
                            <tr>
                              <td className="px-4">ID</td>
                              <td className="px-4">Name</td>
                              <td className="text-center px-4">Status</td>
                            </tr>
                          </thead>
                          <tbody>
                            {item.tasks.map((item, idx) => {
                              return (
                                <tr>
                                  <td className="px-4">{item.id}</td>
                                  <td className="px-4">{item.name}</td>
                                  <td className="text-center px-4">
                                    {item.status}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  <div>
                    {item?.team && (
                      <div>
                        Team
                        <table className="border-2 border-black mx-auto mb-5">
                          <thead>
                            <tr>
                              <td className="px-4">Name</td>
                              <td className="text-center px-4">Role</td>
                            </tr>
                          </thead>
                          <tbody>
                            {item.team.map((item, idx) => {
                              return (
                                <tr>
                                  <td className="px-4">{item.name}</td>
                                  <td className="px-4">{item.role}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
                            </div>
                </div>)
            })
        }
          </div>
          {/* <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Projects Table</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Project Name</th>
                  <th className="px-4 py-2 border-b">Team Size</th>
                  <th className="px-4 py-2 border-b">Completed Tasks</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  Object.entries(data).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="px-4 py-2">{key}</td>
                      <td className="px-4 py-2">{value.team_size}</td>
                      <td className="px-4 py-2">{value.completed_tasks}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default JsonData;
