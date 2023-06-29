
import React, { useState } from 'react';
import {BsFillTrashFill} from "react-icons/bs"
const ImageUpload = ({selected}) => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (event) => {
   
    const files = event.target.files;
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        images.push(e.target.result);
        if (images.length === files.length) {
          setPreviewImages(images);
        }
      };

      reader.readAsDataURL(files[i]);
    }
    selected(files)
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

