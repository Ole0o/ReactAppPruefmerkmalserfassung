import React, { useEffect } from "react";
import { variables } from "../variables";

export function DepartmentDetails(props) {
  return <div>Details zu {props.selectedDepartment.DepartmentName}</div>;
}
export default DepartmentDetails;
