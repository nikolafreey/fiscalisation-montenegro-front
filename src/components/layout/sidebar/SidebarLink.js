import React from 'react'
import { Link } from 'react-router-dom'

const SidebarLink = ({label, ImageSource, num, ...props}) => {
  return (
    <li className="item">
      <ImageSource stroke="currentColor" className="sidebar-icon mr-m"/>
      <Link className="link" {...props}>{label}</Link>
      {num && <span className="">{num}</span>}
    </li>
  )
}

export default SidebarLink
