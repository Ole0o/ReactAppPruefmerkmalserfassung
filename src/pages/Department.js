import React, { useEffect, useState } from "react";
import { variables } from "../variables";
import DepartmentDetails from "./DepartmentDetails";

export function Department() {
  const [departments, setDepartments] = React.useState([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState();

  useEffect(() => {
    refreshList();
  }, []);
  function refreshList() {
    fetch(variables.API_URL + "department")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      });
  }
  if (selectedDepartment) {
    return (
      <DepartmentDetails
        selectedDepartment={selectedDepartment}
      ></DepartmentDetails>
    );
  }

  return (
    <div>
      <table className="table department">
        <thead>
          <tr>
            <th>DepartmentID</th>
            <th>DepartmentName</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((xdepartment) => (
            <tr
              key={xdepartment.id}
              onClick={() => setSelectedDepartment(xdepartment)}
            >
              <td>{xdepartment.id}</td>
              <td>{xdepartment.DepartmentName}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {selectedDepartment &&
                            <DepartmentDetails selectedDepartment={selectedDepartment}></DepartmentDetails>
            } */}
    </div>
  );
}
export default Department;
