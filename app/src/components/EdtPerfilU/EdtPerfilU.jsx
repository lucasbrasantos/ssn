import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import { SelectedUserContext } from '../../context/SelectedUserContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Box, LinearProgress } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase';

const EdtPerfilU = () => {

    const {data} = useContext(SelectedUserContext)
    const {currentUser} = useContext(AuthContext);

    const [user, setUser] = useState();

    const [img, setImg] = useState(null)
    const [imgPreview, setImgPreview] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)

    useEffect(() => {
		fetchData();					
	}, []);

	const fetchData = async() => {
        
		await axios.get('http://localhost:3000/user_uid', {
            params: {
            uid: currentUser.uid,
        }})
        .then((res) => { setUser(res.data[0]) })
        .catch((err) => { console.error(err); });
	}

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const name = e.target[1].value;
        const username = e.target[2].value;
        const description = e.target[3].value;

		
        const storageRef = ref(storage, `${user.userid}_${user.firebase}/profilePics/_${img.name}`)
        
        
        uploadFileAndHandleError(storageRef, name, username, description);

    }

    function formatDateToYYYYMMDD(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
  		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${year}/${month}/${day} ${hours}:${minutes}`;
	}


    const uploadFileAndHandleError = async(storageRef, name, username, description) => {
      

        const uploadTask = uploadBytesResumable(storageRef, img);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Listener for monitoring the upload progress.
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`Upload is ${progress}% done`);
				setUploadProgress(progress)

				if (progress === 100) {
					// Upload is 100% complete
					console.log('aeaeae');
					
					getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
						console.log('File is available at: ', downloadURL);
	
	
						await axios.patch(`http://localhost:3000/users/${user.userid}`, {
							username: username,
                            name: name,
                            email: user.email,
                            photourl: downloadURL,
                            points: user.points,
                            timecreated: formatDateToYYYYMMDD(user.timecreated),
                            firebase: user.firebase,
                            description: description,
						})
						.then((res) => {
							console.log(res);
			
						})
						.catch((error) => {
							console.log(error);
							
						}); 
	
						setImg(null)

						window.location.reload();	
	
					}).catch((error) => {
						
						console.log(error);
						console.log(error.code);

						if (error.code == 'storage/object-not-found') {
							console.log("Retrying...");
							uploadFileAndHandleError(storageRef, name, username, description); // rerun the function
						}

					})

				}
			},
			(error) => {
				console.log(error);
			}
		)

	}

    const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const image = e.target.files[0];
			setImg(image);
			setImgPreview(URL.createObjectURL(image))
			// console.log(image);
		}
	};

    console.log(user);

    return(
        <div className="EdtUD">
            <form className='FormEdtU' action="" onSubmit={(e) => handleSubmit(e)} style={{position:'relative'}}>
                
                <Box sx={{ width: '100%', margin:'16px 0 50px 0' }}>
				    <LinearProgress variant="determinate" value={uploadProgress} />
			    </Box>
                <input style={{display:"none"}} type="file" accept='image/*' id="file"  onChange={(e) => handleImageChange(e) }/>
                <label htmlFor="file">
                    <img className='EdtAvatarUser' src={imgPreview ? imgPreview : user?.photourl } alt="" />
                    <span>Edit Avatar</span>
                </label>
                    {					
						imgPreview && (

							<span onClick={() => setImgPreview(null)} style={{background:'red', position:'absolute', top:'20%', left:'58%', cursor:'pointer', padding:'4px 8px', color:'white'}}>X</span>
						)
                    }

                
                <input className='inputEdtU' type="text" placeholder={user && user.name || "name"}/>
                <input className='inputEdtU' type="text" placeholder={user && user.username || "username"} />
                <textarea className='inputEdtU' placeholder={user && user.description || "Bio"} cols="30" rows="10"></textarea>

                <button className='BtnSaveEdtU' type='submit'>
                    Salvar
                </button>
            </form>            

        </div>
    )
}

export default EdtPerfilU;