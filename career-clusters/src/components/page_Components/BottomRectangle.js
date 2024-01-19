import React from 'react';
import './BottomRectangle.css';

const BottomRectangle = () => {
    return (
        <div id="bottom-rectangle">
          <div id="bottom-rectangle-container">
            <img src={require('./YCRCLogo.png')} alt="YCRC Logo"/>
            <div id="text-container">
              <h1>GET IN TOUCH</h1>
              <p>York County Regional Chamber of Commerce</p>
              <p>116 E Main St. / PO Box 590</p>
              <p>Rock Hill, SC, 29731</p>
              <p>803-324-7500</p>
            </div>
            <img src={require('./Accredit.png')} alt="Accredited Logo"/>
          </div>
        </div>
      );
};

export default BottomRectangle;