import React from "react";
import './TopLeftLogo.css';
import { Link } from 'react-router-dom';

const TopLeftLogo = () => {
    return <Link to="/"><img src={require('./YorkLogo.png')} alt="YCRC Logo" className="top-left-image"></img></Link>
}

export default TopLeftLogo;