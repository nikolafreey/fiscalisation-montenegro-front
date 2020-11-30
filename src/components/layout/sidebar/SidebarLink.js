import React from 'react'
import { Link } from 'react-router-dom'

const SidebarLink = ({label, ...props}) => {
  return (
    <div>
      <Link {...props}>{label}</Link>
    </div>
  )
}

export default SidebarLink
