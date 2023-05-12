import { useRef, useState } from "react"

import {
  Container,
  InputRightElement,
  Box,
  InputGroup,
  Input,
  Button,
} from "@chakra-ui/react"

import styles from "../../../styles/Home.module.css"

function CreateEmployee({ handleAddEmp }) {
  const [newEmployee, setNewEmployee] = useState("")
  const employeeRef = useRef()

  function handleChange(event) {
    const { value } = event.target

    setNewEmployee(value)
  }

  function handleAddEmployee() {
    const splittedName = newEmployee.split(" ")
    const empId =
      splittedName.length > 1
        ? `${splittedName[1]}-${Math.floor(10 + Math.random() * 100)}`
        : `${splittedName[0]}-${Math.floor(10 + Math.random() * 100)}`
    const currentDate = new Date().toJSON().slice(0, 10)
    console.log(newEmployee, empId)
    const empData = {
      employeeName: newEmployee,
      empId: empId,
      joinDate: currentDate,
      status: "",
    }
    handleAddEmp(empData)
    setNewEmployee("")
    employeeRef.current.value = ""
    employeeRef.current.focus()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Box pb={10}>
      <form onSubmit={handleSubmit}>
        <InputGroup size="md">
          <Input
            size="lg"
            ref={employeeRef}
            placeholder="Employee Name"
            name="employeeName"
            onChange={handleChange}
            value={newEmployee}
          />
          <InputRightElement width="4.5rem" pt={2}>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              onClick={handleAddEmployee}
            >
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  )
}

export default CreateEmployee
