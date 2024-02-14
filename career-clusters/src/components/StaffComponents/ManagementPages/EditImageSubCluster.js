import './ManagementCluster.css';
import { useState } from 'react';

const EditImageSubCluster = ({ID}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const openPopup = () => {
        setIsOpen(true);
    }

    const closePopup = () => {
        setIsOpen(false);
    }
   
    const refreshPage = () => {
        window.location.reload();
    }


    const uploadFilePost = async (file, id) => {
        try {
            const formData = new FormData();
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
        <div className="Image">
            <button className="editImage" onClick={openPopup}>Edit Image</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">  
                        <h2>Replace Image</h2>
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


export default EditImageSubCluster;