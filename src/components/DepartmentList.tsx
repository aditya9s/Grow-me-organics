import React, { useState, useEffect } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './DepartmentList.css'; // Import the CSS file

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: number;
  name: string;
}

const DepartmentList: React.FC<{ data: Department[] }> = ({ data }) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);

  const handleExpand = (id: number) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  const handleDepartmentSelect = (id: number) => {
    if (selectedDepartments.includes(id)) {
      // Deselect the department and its sub-departments
      setSelectedDepartments(selectedDepartments.filter((deptId) => deptId !== id));
    } else {
      // Select the department and its sub-departments
      setSelectedDepartments((prevSelected) => {
        const allSubDepartments = getAllSubDepartments(id);
        return [...prevSelected, id, ...allSubDepartments];
      });
    }
  };

  const isDepartmentSelected = (id: number) => {
    return selectedDepartments.includes(id);
  };

  const getAllSubDepartments = (departmentId: number): number[] => {
    const subDepartments: number[] = [];
    const department = data.find((dept) => dept.id === departmentId);
    if (department) {
      department.subDepartments.forEach((subDepartment) => {
        subDepartments.push(subDepartment.id);
        subDepartments.push(...getAllSubDepartments(subDepartment.id));
      });
    }
    return subDepartments;
  };

  useEffect(() => {
    // If a sub-department is selected, select its parent department
    selectedDepartments.forEach((deptId) => {
      const parentDepartment = data.find((department) =>
        department.subDepartments.some((subDept) => subDept.id === deptId)
      );
      if (parentDepartment && !isDepartmentSelected(parentDepartment.id)) {
        handleDepartmentSelect(parentDepartment.id);
      }
    });
  }, [selectedDepartments, data]);

  return (
    <div className="department-list-container">
      <List>
        {data.map((department) => (
          <div key={department.id}>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  checked={isDepartmentSelected(department.id)}
                  onChange={() => handleDepartmentSelect(department.id)}
                />
              </ListItemIcon>
              <ListItemText primary={department.name} />
              <IconButton
                className="expand-button"
                onClick={() => handleExpand(department.id)}
              >
                {expanded === department.id ? (
                  <ExpandMoreIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </ListItem>
            <Collapse
              in={expanded === department.id}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {department.subDepartments.map((subDepartment) => (
                  <ListItem
                    key={subDepartment.id}
                    style={{ paddingLeft: 32 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={isDepartmentSelected(subDepartment.id)}
                        onChange={() =>
                          handleDepartmentSelect(subDepartment.id)
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDepartment.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default DepartmentList;
