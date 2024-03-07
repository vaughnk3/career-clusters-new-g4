import './ManagementCluster.css';
import { useState } from 'react';
import { getAuth } from "firebase/auth";
import app from "../../login_components/FirebaseConfig"

const EditImageSubCluster = ({ID}) => {
   
    const [isOpen, setIsOpen] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [openError, setOpenError] = useState(false);

    const auth = getAuth(app);

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
            const user = auth.currentUser;
            if(user) {
                const token = await user.getIdToken();
                const dbResponse = await fetch ('http://localhost:3001/subimage-replace', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
        
                });
        
                if (dbResponse.ok) {
                    console.log('SubCluster name updated successfully');
                    refreshPage();
                } else {
                    console.error('Failed to update subcluster name');
                    setIsOpen(false);
                    setOpenError(true);        
               } 
            }
        } catch (error) {
            console.log("Error", error);
            setIsOpen(false);
            setOpenError(true);
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
    }


    const closeError = () => {
        setOpenError(false);
        refreshPage();
    }

    return (
        <div className="Image">
            <button className="editImage" onClick={openPopup}>Edit Image</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">  
                        <label for="img" className='standard-popup'>Replace Image</label>
                        <br/><br/>
                        <input type="file" id="img" name="img" accept="image/*" className='standardIn-popup' onChange={handleFileInputChange}></input>
                        <br/>
                        <div class="replacebuttonrow">
                        <button onClick={closePopup} className="standard-cancelButton">Cancel</button>
                        <button id="standard-submitImg" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}

            {openError && (
                <div className="popup">
                    <div className="popup-content">
                        <h1>Error</h1>
                        <p>Error updating SubCluster image.</p>
                        <button onClick={closeError}>Acknowledge and Refresh</button>
                    </div>
                </div>
            )}
        </div>

    )
}


export default EditImageSubCluster;