import React from 'react';
import './DemographicBox.css';

const DemographicBox = () => {
  return ( 
    <div id="demographic-box">
      <div id="demographic-box-container">
        <div class="demographic-item">
          <h3>School *</h3>
          <select name="school" class="select">
            <option value="" disabled selected hidden className="hidden">Select one</option>
           <option class="test" value="rhhs">Rock Hill High School</option>
           <option class="test" value="fmhs">Fort Mill High School</option>
           <option class="test" value="nafo">Nation Ford High School</option>
          </select>
        </div>
        <div class="demographic-item">
          <h3>Desired Career Field</h3>
          <select name="dField" class="select">
            <option value="" disabled selected hidden class="hidden">Select one</option>
           <option value="finance">Finance</option>
           <option value="medcare">Medical Care</option>
           <option value="compsci">Computer Science</option>
           <option value="bio">Biology</option>
           <option value="bsiness">Business</option>
          </select>
        </div>
        <div class="demographic-item">
          <h3>Grade *</h3>
          <select name="grade" class="select">
          <option value="" disabled selected hidden class="hidden">Select one</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="10">10</option>
           <option value="11">11</option>
           <option value="12">12</option>
          </select>
        </div>
        <div class="demographic-item">
          <h3>Age</h3>
          <input type="number" class="select" name="fname" placeholder='Please input your age here'></input>
        </div>
      </div>


      <a href="/cluster" id="submit-button">Submit</a>
    </div>
  );
};

export default DemographicBox;

//<button class="submit-button">Submit</button>