import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarLink = ({ label, ImageSource, num, ...props }) => {
  const location = useLocation();

  return (
    <Link {...props}>
      <li className={props.to === location.pathname ? 'item active' : 'item'}>
        <ImageSource stroke="currentColor" className="sidebar-icon mr-m" />
        <p className="link" {...props}>
          {label}
        </p>
        {num && <span className="">{num}</span>}
      </li>
    </Link>
  );
};

export default SidebarLink;
