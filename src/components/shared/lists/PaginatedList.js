import React from 'react'
import List from './List'
import PaginationControls from './PaginationControls'

const PaginatedList = ({ paginatedData, onPageChange }) => {
  return (
    <div>
      <List data={paginatedData.data} />
      <PaginationControls paginatedData={paginatedData} onPageChange={onPageChange} />
    </div>
  )
}

export default PaginatedList
