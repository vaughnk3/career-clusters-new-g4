import './ManagementCluster.css';
import React, { useState, useEffect } from "react";


const ReplaceImageButton = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }
   

    const uploadFilePost = async (file, id) => {
        try {
            const formData = new FormData();
            console.log(file);
            console.log("ID: ", id)
            formData.append('image', file);
            formData.append('id', id);
            
            const dbResponse = await fetch ('http://localhost:3001/imag-cluster-replace', {
            method: 'POST',

            body: formData,
        });

        //const data = await dbResponse.json();
        //console.log('Sucess image post', data);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const refreshPage = () => {
        window.location.reload();
      }


    const handleFileInputChange = (e) => 
    {
        console.log("HFC: ", e.target.files[0])
        setNewImage(e.target.files[0]);
    }


    const handleSubmit = () => {
        uploadFilePost(newImage, ID);
        closePopup();
        refreshPage();
    }


    return (
        <div id="replace">
            <button onClick={openPopup} id="replace_Image">Replace Image</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">  
                        <h2>Test Replace</h2>
                        <input type="file" id="img" name="img" accept="image/*" onChange={handleFileInputChange}></input>
                        <div class="replacebuttonrow">
                        <button onClick={closePopup} className="cancelButton">Cancel</button>
                        <button id="submitImg" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}



export default ReplaceImageButton;

//<input type="file" id="imgN" name="imgN" accept="image/*" onChange={handleFileInputChange}></input>


