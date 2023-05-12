import { Table, Thead, Tbody, Tr, Td, TableContainer } from "@chakra-ui/react"

function EmployeeAttendance({ tableHeading, allEmpList }) {
  const BG_COLOR = {
    present: "#1293de",
    absent: "#d63a54",
    halfDay: "#ede851",
  }
  return (
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
            return (
              <Tr key={index}>
                <Td>{item.employeeName}</Td>
                <Td>{item.empId}</Td>
                <Td bg={BG_COLOR[item.status]}>{item.status}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default EmployeeAttendance
