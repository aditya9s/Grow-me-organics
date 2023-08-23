import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DepartmentList from './DepartmentList'; // Import the DepartmentList component
import { departmentData } from './departmentData'; // Import departmentData
import './DataGridPage.css';

interface MyData {
  id: number;
  title: string;
  body: string;
}

const DataGridPage: React.FC = () => {
  const [data, setData] = useState<MyData[]>([]);
  const [showDepartmentList, setShowDepartmentList] = useState(false);

  useEffect(() => {
    // Fetch data from your API (replace 'your-api-url' with the actual URL)
    fetch('http://adi82988.pythonanywhere.com/api/posts')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];

  const toggleDepartmentList = () => {
    setShowDepartmentList(!showDepartmentList);
  };

  return (
    <div className="data-grid-page-container">
      <div  className="data-grid" >
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          checkboxSelection
        />
      </div>
      <Button className="toggle-button" onClick={toggleDepartmentList} style={{ backgroundColor: '#556B2F', color: 'black', marginTop:'20px' }}>Toggle Department List</Button>

      {showDepartmentList && (
        <DepartmentList data={departmentData} />
      )}
    </div>
  );
};

export default DataGridPage;

