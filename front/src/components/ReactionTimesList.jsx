import React from 'react'

function ReactionTimesList({ reactionTimes }) {
  const bestTime =
    reactionTimes.length > 0
      ? Math.min(...reactionTimes.map((entry) => entry.time))
      : null

  return (
    <ul>
      {reactionTimes.map((entry, index) => (
        <li
          key={index}
          style={
            entry.time === bestTime
              ? { fontWeight: 'bold', color: 'green' }
              : {}
          }
        >
          {entry.time === bestTime ? 'Best Time: ' : 'Time: '}
          {entry.time} ms
        </li>
      ))}
    </ul>
  )
}

export default ReactionTimesList
