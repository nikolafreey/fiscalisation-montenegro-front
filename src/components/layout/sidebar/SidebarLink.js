import React from 'react'
import { Link } from 'react-router-dom'
import '../../../main.scss';

const SidebarLink = ({label, imageSource, num, ...props}) => {
  return (
    <li className="item">
      <img src={imageSource} alt={label} />
      <Link className="link" {...props}>{label}</Link>
      {num && <span className="">{num}</span>}
    </li>
  )
}

export default SidebarLink
