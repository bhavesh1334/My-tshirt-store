/** @format */

import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';

const UserDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const userSide = () => {
    return (
      <div className='card mb-4 '>
        <h2 className='card-header text-center text-secondary'>User Information</h2>
        <ul className='list-group'>
          <li className='list-group-item'>
            <span className='badge badge-success mr-4 p-2'>Name :</span>
            {name}
          </li>
          <li className='list-group-item'>
            <span className='badge badge-success mr-2 p-2'>Email :</span>
            {email}
          </li>

          <li className='list-group-item text-center'>
            <span className='badge badge-info mr-2 p-2'>User Panel</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base title='UserDashboard' description='User Account' className='container bg-info  p-4'>
      <div className='row '>
        <div className='col-12 '>{userSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
