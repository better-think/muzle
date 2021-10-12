import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import axios from "axios";
import { usePage } from '@inertiajs/inertia-react';

const UserMenu = () => {

  const { user } = usePage().props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post('/logout').then(function (response) {
      window.location.href = '/'
    });
  };

  return (
    <React.Fragment>
      <button
        className="px-4 h-10 rounded-md flex items-center justify-center focus:outline-none hover:bg-yellow-800 active:bg-gray-200 cursor-pointer"
        onClick={handleClick}
      >
        {user.name}
      </button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>Iziet</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserMenu;