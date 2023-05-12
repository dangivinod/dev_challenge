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
  }

  function handleDrop(e, index, targetName) {
    let target = puzzleState[targetName]
    if (target[index]) return

    const pieceOrder = e.dataTransfer.getData("text")
    const pieceData = puzzleState.pieces.find((p) => p.order === +pieceOrder)
    const origin = puzzleState[pieceData.board]

    if (targetName === pieceData.board) target = origin
    origin[origin.indexOf(pieceData)] = undefined
    target[index] = pieceData
    pieceData.board = targetName
    setPuzzleState({ [pieceData.board]: origin, [targetName]: target })
  }

  function renderPieceContainer(piece, index, boardName) {
    return (
      <li key={index}>
        {piece && (
          <Image
            draggable
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index, boardName)}
            onDragStart={(e) => handleDragStart(e, piece.order)}
            src={require(`./images/${piece.img}`)}
            alt="test"
          />
        )}
      </li>
    )
  }

  return (
    <div className={styles.jigsaw}>
      <ul className={styles.jigsaw__shuffled_board}>
        {puzzleState.shuffled.map((piece, i) =>
          renderPieceContainer(piece, i, "shuffled")
        )}
      </ul>
      <ol
        className={styles.jigsaw__solved_board}
        style={{ backgroundImage: `url(${originalImage})` }}
      >
        {puzzleState.solved.map((piece, i) =>
          renderPieceContainer(piece, i, "solved")
        )}
      </ol>
    </div>
  )
}

export default Puzzle
