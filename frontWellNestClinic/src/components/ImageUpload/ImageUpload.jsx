import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from "../../redux/action/actions";
import axios from 'axios';
import style from "./ImageUpload.module.css";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.imageUrl);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', import.meta.env.VITE_PRESET);

    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    
    axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        console.log(imageUrl)
        dispatch(uploadImage(imageUrl));
      })
      .catch((error) => {
        console.error('Error al subir la imagen a Cloudinary:', error);
      });
  };

  return (
    <div className={style.uploadContainer}>
      <input type="file" onChange={handleFileChange}  />
      <button onClick={handleUpload} className={style.uploadButton}>
        Subir Imagen
      </button>
      {imageUrl && <img className={style.previewImage} src={imageUrl} alt="Imagen subida" />}
    </div>
  );
};

export default ImageUpload;
