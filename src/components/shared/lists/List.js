import React from 'react'

const List = ({ data, renderItem, ...props }) => {
  return data.map(item => renderItem({ item, ...props }))
}

export default List
