import { useEffect, useState } from "react"
import styles from "./puzzle.module.css"
import Image from "next/image"

function Puzzle() {
  const [puzzleState, setPuzzleState] = useState({
    pieces: [],
    shuffled: [],
    solved: [],
  })
  const [dragItem, setDragItem] = useState({})
  const [showOriginal, setShowOriginal] = useState(false)

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

  function handleDragStart(e, order, index) {
    e.dataTransfer.setData("text/plain", order)
    setDragItem({ index: index, order })
  }

  function handleDrop(e, order, index) {
    e.preventDefault()
    let target = puzzleState["shuffled"]

    const dragItems = target.find((p) => p.order === dragItem?.order)
    const dropItems = target.find((p) => p.order === order)
    target[index] = dragItems
    target[dragItem?.index] = dropItems

    setPuzzleState({ ...puzzleState, shuffled: target })
  }

  function renderPieceContainer(piece, index, boardName) {
    return (
      <>
        <li key={index} id={piece.order}>
          {piece && (
            <Image
              draggable
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, piece.order, index)}
              onDragStart={(e) => handleDragStart(e, piece.order, index)}
              src={require(`./images/${piece.img}`)}
              alt="img"
            />
          )}
        </li>
      </>
    )
  }

  function handleShowOriginal() {
    setShowOriginal(!showOriginal)
  }

  return (
    <>
      <button onClick={handleShowOriginal}>Original Image</button>
      <div className={styles.puzzle}>
        {showOriginal ? (
          <Image src={require(`./images/ny_original.jpg`)} alt="original" />
        ) : (
          <ul className={styles.puzzle__shuffled_board}>
            {puzzleState.shuffled.map((piece, i) =>
              renderPieceContainer(piece, i, "shuffled")
            )}
          </ul>
        )}
      </div>
    </>
  )
}

export default Puzzle
