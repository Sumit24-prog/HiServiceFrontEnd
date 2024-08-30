import React, { useState } from 'react';
import { MountainIcon, BellIcon, SettingsIcon, UserIcon } from 'lucide-react'; // Import additional icons from lucide-react
import navbarStyle from '../styles/Navbar.module.css';
import LogoutButton from "./LogoutButton.tsx";

const Navbar: React.FC = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest(`.${navbarStyle.icon_container}`)) {
            setDropdownVisible(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <nav className={navbarStyle.navbar}>
            <div className={navbarStyle.navbar_container}>
                <div className={navbarStyle.logo}>
                    <MountainIcon className={navbarStyle.logoIcon} size={38} />
                    <div className={navbarStyle.headerContent}>Service Management</div>
                </div>
                <div className={navbarStyle.hamburger_lines}>
                    <span className={`${navbarStyle.line} ${navbarStyle.line1}`}></span>
                    <span className={`${navbarStyle.line} ${navbarStyle.line2}`}></span>
                    <span className={`${navbarStyle.line} ${navbarStyle.line3}`}></span>
                </div>
                <ul className={navbarStyle.menu_items}>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="#">Category</a></li>
                    <li><a href="#">Menu</a></li>
                    <li><a href="#">Testimonial</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <div className={navbarStyle.icon_container}>
                    <BellIcon className={navbarStyle.icon} />
                    <SettingsIcon className={navbarStyle.icon} />
                    <UserIcon className={navbarStyle.icon} onClick={toggleDropdown} />
                    {dropdownVisible && (
                        <div className={navbarStyle.dropdownMenu}>
                            <a href="/profile" className={navbarStyle.dropdownItem}>Profile Details</a>
                            <a href="/settings" className={navbarStyle.dropdownItem}>Settings</a>
                            <a href="/signout" className={navbarStyle.dropdownItem}>Sign Out</a>
                            <a href="/service-requested" className={navbarStyle.dropdownItem}>Service Requested</a>
                            <a href="/help" className={navbarStyle.dropdownItem}>Help</a>
                        </div>
                    )}
                </div>
                <div className={navbarStyle.logout_button}>
                    <LogoutButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
