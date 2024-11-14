import React from 'react'
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { resources, User } from '../../types';
interface navBarProps{
    user:resources
}
const NavBar: React.FC<navBarProps> = ({ user }) => {
    
  return (
    <div>
        <button>{`${user.name} ${user.amount}`}</button>

    </div>
  )
}

export default NavBar