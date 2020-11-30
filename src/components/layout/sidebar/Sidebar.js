import React from 'react'
import { FIZICKA_LICA, USLUGE } from '../../../constants/routes'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
  return (
    <div style={{backgroundColor: 'gray'}}>
      <h3>Sidebar</h3>
      <SidebarLink label='Fizicka lica' to={FIZICKA_LICA.INDEX}/>
      <SidebarLink label='Usluge' to={USLUGE.INDEX}/>
    </div>
  )
}

export default Sidebar
