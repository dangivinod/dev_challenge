import { useState } from "react"
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react"

function EmployeeDataList({
  allEmpList,
  handleModifyEmployee,
  handleUpdateEmpStatus,
  deleteEmployee,
  tableHeading,
}) {
  const [modifyEmp, setModifyEmp] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleChangeModifyEmp(event) {
    const data = { ...modifyEmp, employeeName: event.target.value }
    setModifyEmp(data)
  }

  function handleCloseModify() {
    handleModifyEmployee(modifyEmp, onClose)
  }

  const currentDate = new Date().toJSON().slice(0, 10)

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Employee Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              size="lg"
              placeholder="Employee Name"
              name="employeeName"
              onChange={handleChangeModifyEmp}
              value={modifyEmp?.employeeName}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModify}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {tableHeading.map((item, index) => {
                return <th key={index}>{item}</th>
              })}
            </Tr>
          </Thead>
          <Tbody>
            {allEmpList.map((item, index) => {
              function handleStatus(e) {
                handleUpdateEmpStatus?.(item.empId, e.target.value)
              }

              function handleModifyInfo(e) {
                setModifyEmp?.(item)
                onOpen?.()
              }

              function handleDeleteEmp(e) {
                deleteEmployee?.(item.empId)
              }

              return (
                <Tr key={index}>
                  <Td>{item.empId}</Td>
                  <Td>{item.employeeName}</Td>
                  <Td>{item.joinDate}</Td>
                  {item?.canChangeStatus && (
                    <Td>
                      <Select
                        variant="outline"
                        placeholder="Please select option"
                        value={item.status}
                        id="dropdown"
                        onChange={handleStatus}
                        disabled={
                          !!item.status && currentDate === item.attendanceDate
                        }
                      >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="halfDay">Half Day</option>
                      </Select>
                    </Td>
                  )}
                  {item?.canModify && (
                    <Td>
                      <button onClick={handleModifyInfo}>Edit</button>
                    </Td>
                  )}
                  {item?.canDelete && (
                    <Td>
                      <button onClick={handleDeleteEmp}>Delete</button>
                    </Td>
                  )}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default EmployeeDataList
