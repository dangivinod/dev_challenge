import { useEffect, useState } from "react"

export function useEmployeePortal() {
  const [createNewEmp, setCreateNewEmp] = useState()
  const [allEmpList, setAllEmpList] = useState([])

  function handleAddNewEmployee(empData) {
    const data = [empData, ...allEmpList]
    setAllEmpList(data)
    setStorage(data)
  }

  function handleModifyEmployee(data, onClose) {
    const modifiedData = allEmpList.map((item) =>
      item.empId === data.empId ? data : item
    )
    setAllEmpList(modifiedData)
    setStorage(modifiedData)
    onClose()
  }

  function handleUpdateEmpStatus(id, value) {
    const currentDate = new Date().toJSON().slice(0, 10)

    const data = allEmpList.map((item, index) =>
      item.empId === id
        ? { ...item, status: value, attendanceDate: currentDate }
        : item
    )
    setAllEmpList(data)
    setStorage(data)
  }

  function handleDeleteNewEmployee(id) {
    const filtered = allEmpList.filter(function (item) {
      return item.empId !== id
    })
    setAllEmpList(filtered)
    setStorage(filtered)
  }

  useEffect(() => {
    const data = JSON.parse(getStorage())
    const storedData = !!data?.length ? data : []
    setAllEmpList(storedData)
  }, [])

  return {
    createNewEmp,
    allEmpList,
    handleAddNewEmployee,
    handleModifyEmployee,
    handleDeleteNewEmployee,
    handleUpdateEmpStatus,
  }
}

export function setStorage(data) {
  localStorage.setItem("empData", JSON.stringify(data))
}
export function getStorage(data) {
  return localStorage.getItem("empData")
}
