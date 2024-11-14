import React from 'react'
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const user = useSelector((state: RootState) => state.user.user);
  return (
    <div>
        {user?.organization}
    </div>
  )
}

export default NavBar