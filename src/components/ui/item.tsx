import React from "react"

type Props = {
  array: string[],
  onDelete: (index: number) => void,
}

export const ItemList = (props: Props) => {
  const { array, onDelete } = props;
  return (
      <ul>
        {array.map((data, i) => (
          <React.Fragment key={`list_data_${i}`}>
            <li>{data}</li>
            <button onClick={() => onDelete(i)}>削除</button>
          </React.Fragment>
        ))}
      </ul>
  )
}