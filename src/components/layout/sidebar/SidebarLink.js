import React from 'react'
import { Link } from 'react-router-dom'

const SidebarLink = ({label, ImageSource, num, ...props}) => {
  return (
    <Link {...props} >
    <li className="item">
      <ImageSource stroke="currentColor" className="sidebar-icon mr-m"/>
      <p className="link" {...props}>{label}</p>
      {num && <span className="">{num}</span>}
    </li>
    </Link>
  )
}

export default SidebarLink
