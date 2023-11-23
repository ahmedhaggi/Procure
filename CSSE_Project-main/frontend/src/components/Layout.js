import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../layout.css';
import NavBar from './navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userMenu = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Requisition Request',
      path: '/requisition_request',
    },
    {
      name: 'Request Status',
      path: '/requisition_dash',
    },
    {
      name: 'Order requests',
      path: '/supplierpro',
    },
    {
      name: 'Suppliers',
      path: '/supplier_add',
    },
    {
      name: 'Item management',
      path: '/itemadd',
    },
  ];

  // Define the sidebar menu to be rendered
  const menuToBeRender = userMenu;

  return (
    <>
      <NavBar />
      <div className='main p-2'>
        <div
          className={`d-flex menu-item`}
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        ></div>
        <div className='d-flex layout'>
          <div className='sidebar'>
            <div className='menu'>
              {menuToBeRender.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='content'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
