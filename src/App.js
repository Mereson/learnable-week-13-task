import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [value, setvalue] = useState("")
  const [emojiArray, setemojiArray] = useState([])
  const [emojiList, setemojiList] = useState([])
  const [randomWord, setRandomWord] = useState("")

  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    fetch(apiKey).then((response) => {
      const res = response.json()
      res.then((data) => {
        setemojiList(data)
      })
    })
  }, [apiKey])

  useEffect(() => {
    const updateRandomWord = () => {
      const randomIndex = Math.floor(Math.random() * emojiList.length)
      const randomItem = emojiList[randomIndex].unicodeName.split(" ")[1]
      setRandomWord(randomItem)
    }

    const interval = setInterval(updateRandomWord, 12000)

    return () => clearInterval(interval)
  }, [emojiList])

  const handleInput = ({ target }) => {
    setvalue(target.value)

    const newEmojiList = [...emojiList].filter((item) =>
      item.unicodeName.includes(value.toLowerCase())
    )

    setemojiArray(newEmojiList)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setvalue(value)
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="emojiForm">
          <input
            type="text"
            className="textBox"
            onInput={handleInput}
            value={value}
            placeholder="Find Emoji"
          />
          <button type="submit">Search</button>
        </form>
        {value === "" ? (
          <div className="detail">
            {" "}
            <b>Search for an Emoji by Keyword:</b>{" "}
            <span className="keyword">
              {" "}
              {!randomWord ? "Smiling" : randomWord}
            </span>
          </div>
        ) : (
          <div className="emojiContainer">
            {emojiArray.map((item, index) => (
              <div
                className="emojis"
                key={index}
                title={item.unicodeName.slice(4, emojiList.length)}
              >
                {item.character}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App
