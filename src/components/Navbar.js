import React from 'react';

// Material UI components

import Button from '@material-ui/core/Button';

const Navbar = ({ user, logoutFunc }) => {
    return (
        <div style={{background: "lightgreen"}}>
            <p>User: {user.displayName}</p>
            <Button variant="contained" color="primary" onClick={() => logoutFunc()} className="navbar-logout">Logout</Button>
        </div>
    );
}

export default Navbar;