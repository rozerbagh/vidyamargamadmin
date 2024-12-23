import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import routes from '../routes';

// Define MenuItemType
type MenuItemType = {
  path: string;
  key: React.Key;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItemType[];
};
function getItem(
  label: React.ReactNode,
  path: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemType[],
): MenuItemType {
  return {
    path,
    label,
    key,
    icon,
    children,
  } as MenuItemType;
}
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside>
      <ul className="sidebar-nav-lists">
        {routes.map((route, idx)=>(
          <li className="sidebar-nav-list-item" key={idx}><Link to={route.ref}>{route.name}</Link></li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar