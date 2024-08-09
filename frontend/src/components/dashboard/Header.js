import '../../assets/styles/header.css';
import headerLogo from '../../assets/images/spicysmiles.png';
import Button from "@mui/material/Button";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'; // Updated icon
import { useNavigate } from 'react-router-dom';
import logout from '../../services/Logout/Logout';
import { useState } from 'react';


const Header = () => {
    const name = localStorage.getItem("name");
    const [fullName, setFullName] = useState(name);
    console.log("fullName",fullName);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); // Call the logout service
        navigate('/'); // Ensure the user is redirected to the login page
      };

    return (
        <div className='headerContainer'>
            <div className='headerMenuArea'>
                <div className='logoContainer'>
                <img src={headerLogo} alt="SpicySmiles Logo" className='headerLogo'/>
                <span className='appName'>SpicySmiles</span> 
                </div>
                <div className='rightMenu'>
                    <h2>Welcome {fullName}</h2>
                    <Button
                        variant="contained"
                        className="logoutButton"
                        startIcon={<PowerSettingsNewIcon />} 
                        onClick={handleLogout}
                    >
                        LogOut
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Header;
