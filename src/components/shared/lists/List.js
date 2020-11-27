import React from 'react'

const List = ({ data, renderItem }) => {
  return data.map(item => renderItem({ item }))
}

export default List
