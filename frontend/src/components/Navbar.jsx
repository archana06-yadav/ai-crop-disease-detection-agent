import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Globe } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Diagnosis', path: '/' },
        { name: 'History', path: '/history_page' },
        { name: 'Tools', path: '/tools' },
        { name: 'User Guide', path: '/user_guide' },
    ];

    return (
        <nav className="navbar glass-panel">
            <div className="nav-container container">
                <Link to="/" className="nav-logo flex-center">
                    <Leaf className="logo-icon text-gradient" size={28} />
                    <span className="logo-text heading-2">AI Crop Doctor</span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-links desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className="lang-btn flex-center">
                        <Globe size={18} />
                        EN
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="mobile-nav animate-fade-in">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
