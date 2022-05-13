import React from 'react'

export default function Inputoutput(props) {
  let data = (props.name)
  const listitems = data.map((tag) => <>{tag}</>);

  return (
    <div>
        <h1>
            listitems
        </h1>
    </div>
  )
}
