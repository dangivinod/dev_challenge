import { useEffect, useState } from "react"
import originalImage from "./images/ny_original.jpg"
import styles from "./puzzle.module.css"
import Image from "next/image"

function Puzzle() {
  const [puzzleState, setPuzzleState] = useState({
    pieces: [],
    shuffled: [],
    solved: [],
  })
  const [dragItem, setDragItem] = useState("")

  useEffect(() => {
    const pieces = [...Array(40)].map((_, i) => ({
      img: `ny_${("0" + (i + 1)).substr(-2)}.jpg`,
      order: i,
      board: "shuffled",
    }))
    setPuzzleState({
      pieces,
      shuffled: shufflePieces(pieces),
      solved: [...Array(40)],
    })
  }, [])

  function shufflePieces(pieces) {
    const shuffled = [...pieces]

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
  }

  function handleDragStart(e, order) {
    e.dataTransfer.setData("text/plain", order)
    setDragItem(order)
  }

  function handleDrop(e, index, targetName) {
    e.preventDefault()
    let target = puzzleState[targetName]

    const pieceOrder = e.dataTransfer.getData("text")

    const pieceData = target.find((p) => p.order === dragItem)
    const origin = puzzleState[pieceData.board]

    const lastData = target.find((p) => p.order === index)
    // console.log("lastData - ", lastData)

    // if (targetName === pieceData.board) target = origin
    // origin[origin.indexOf(pieceData)] = undefined
    // target[index] = pieceData
    // target[dragItem] = lastData
    // pieceData.board = targetName

    const updateData = target.map((item) =>
      item.order === index ? pieceData : item
    )
    const updateData2 = updateData.map((item) =>
      item.order === dragItem ? lastData : item
    )

    setPuzzleState({ ...puzzleState, [targetName]: updateData2 })
  }

  function renderPieceContainer(piece, index, boardName) {
    return (
      <li key={index} id={piece.order}>
        {piece && (
          <Image
            draggable
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, piece.order, boardName)}
            onDragStart={(e) => handleDragStart(e, piece.order)}
            src={require(`./images/${piece.img}`)}
            alt="test"
          />
        )}
      </li>
    )
  }

  // console.log("puzzleState---- ", puzzleState)
  return (
    <div className={styles.puzzle}>
      <ul className={styles.puzzle__shuffled_board}>
        {puzzleState.shuffled.map((piece, i) =>
          renderPieceContainer(piece, i, "shuffled")
        )}
      </ul>
    </div>
  )
}

export default Puzzle
