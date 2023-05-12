import { Container, SimpleGrid, Box, Heading } from "@chakra-ui/react"

import styles from "../styles/Home.module.css"
import Layout from "./components/layout/Layout"
import CreateEmployee from "./components/createEmployee"
import EmployeeDataList from "./components/EmployeeDataList"
import EmployeeAttendance from "./components/EmployeeAttendance"

import { useEmployeePortal } from "./Utils"

export default function Home() {
  const {
    allEmpList,
    handleAddNewEmployee,
    handleModifyEmployee,
    handleDeleteNewEmployee,
    handleUpdateEmpStatus,
  } = useEmployeePortal()

  const tableHeadingFirst = [
    "Emp ID",
    "Emp Name",
    "Join Date",
    "Update",
    "Delete",
  ]

  const tableHeadingSecond = ["Emp ID", "Emp Name", "Join Date", "Status"]
  const empAttendanceTableHeading = ["Emp Name", "Emp ID", "Status"]

  const filteredData1 = allEmpList.map((item) => {
    return {
      ...item,
      canChangeStatus: false,
      canModify: true,
      canDelete: true,
    }
  })

  const filteredData2 = allEmpList.map((item) => {
    return {
      ...item,
      canChangeStatus: true,
      canModify: false,
      canDelete: false,
    }
  })

  const filteredData3 = allEmpList.map((item) => {
    return {
      ...item,
      canChangeStatus: true,
      canModify: false,
      canDelete: false,
    }
  })

  const attendanceData = allEmpList.filter((item) => !!item.status)
  console.log({ attendanceData })

  return (
    <div className={styles.container}>
      <Layout>
        <Container maxW="1xl">
          <SimpleGrid columns={2} spacing={5}>
            <Box padding="4" bg="#f6f6f6" color="black">
              <EmployeeDataList
                allEmpList={filteredData2}
                handleModifyEmployee={handleModifyEmployee}
                deleteEmployee={handleDeleteNewEmployee}
                handleUpdateEmpStatus={handleUpdateEmpStatus}
                tableHeading={tableHeadingSecond}
              />
            </Box>

            <Box bg="#f6f6f6" p={10}>
              <CreateEmployee handleAddEmp={handleAddNewEmployee} />
              <EmployeeDataList
                allEmpList={filteredData1}
                handleModifyEmployee={handleModifyEmployee}
                deleteEmployee={handleDeleteNewEmployee}
                tableHeading={tableHeadingFirst}
              />
            </Box>
            <Box padding="4" bg="#f6f6f6" color="black">
              <Heading as="h3" size="lg">
                Employee Attendance
              </Heading>
              <EmployeeAttendance
                allEmpList={attendanceData}
                tableHeading={empAttendanceTableHeading}
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Layout>
    </div>
  )
}
