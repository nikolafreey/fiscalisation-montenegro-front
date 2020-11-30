import React from 'react';
import Sidebar from './Sidebar';
import SidebarRouter from '../../../routes/SidebarRouter';

const SidebarLayout = () => {
  return (
    <div>
      <Sidebar/>
      <SidebarRouter/>
    </div>
  )
}

export default SidebarLayout
