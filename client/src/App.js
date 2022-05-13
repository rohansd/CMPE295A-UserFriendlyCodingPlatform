import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/question").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  let obj = JSON. parse(JSON.stringify(data.tags['0']));

  return (
    <>
      <p>{data.content}</p>
      <p>{data.difficultylevel}</p>
      <p>{data.title}</p>
      <p>{obj.topic}</p>
      <p>{obj.subtopic}</p>
      {/* <p>{typeof (data.tags)}</p> */}
    </>
  )

}

export default App