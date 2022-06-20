import styled from "styled-components";
import {
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

export const DatePickerContainer = styled.div`
  position: relative;
`;
// change color here 1
export const DatePickerFormGroup = styled(FormGroup)`
  display: flex;
  justify-content: space-between;
  position: relative;
  border: 2px solid #b03931;
  border-radius: 5px;
  overflow: hidden;
`;
// change color here 3
export const DatePickerLabel = styled(Label)`
  margin: 0;
  padding: 0 2rem;
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #b03931;
  border-right: 2px solid #b03931;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 102, 204, 0.05);
`;

export const DatePickerInput = styled(Input)`
  padding: 1rem 2rem;
  font-weight: 500;
  font-size: 1rem;
  color: #333;
  box-shadow: none;
  border: none;
  text-align: center;
  letter-spacing: 1px;
  width: 96%;
  background: white;
  display: flex;
  align-items: center;
  appearance: textfield;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  ::placeholder {
    color: #999;
    font-size: 0.9rem;
  }
`;

export const DatePickerDropdown = styled(Dropdown)`
  background: "red";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const DatePickerDropdownToggle = styled(DropdownToggle)`
  position: relative;
  width: 100%;
  height: 100%;
  background: trasparent;
  opacity: 0;
  filter: alpha(opacity=0);
`;

export const DatePickerDropdownMenu = styled(DropdownMenu)`
  width: 100%;
  background: white;
`;

//
// background: trasparent;
