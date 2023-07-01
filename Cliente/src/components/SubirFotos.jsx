
import React, { useState } from 'react';
import {BsFillTrashFill} from "react-icons/bs"
import axios from 'axios';
const ImageUpload = ({selected}) => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = async(event) => {
 
    const files = event.target.files;
  const images = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "inmuebles");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload",
      data
    );
    const imageUrl = response.data.secure_url;

    images.push(imageUrl);
  }

  setPreviewImages(images);
  selected(images); // Actualiza el estado selectImg con las URL de las imágenes
  
  
  };
 
  const handleImageDelete = (index) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);
  };
  return (
    <div className="mb-3">
        
      <label htmlFor="formFileMultiple" className="form-label">
        Seleccione las imagenes
      </label>
      <input
        className="form-control"
        type="file"
        id="formFileMultiple"
        multiple
        onChange={handleImageChange}
        
        
      />
      <div id="preview" >
        {previewImages.map((image, index) => (
          <div key={index} style={{ display: 'flex'}}>
          <img
            key={index}
            src={image}
            alt={`Preview ${index + 1}`}
            style={{ maxWidth: '100px', maxHeight: '100px', border:'solid', borderColor:'beige', borderWidth:'1px' }}
          />
           <button style={{border:'none', background:'none'}} onClick={() => handleImageDelete(index)}><BsFillTrashFill style={{fontSize:'20px'}}/></button>
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default ImageUpload;

