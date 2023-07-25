import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { get_Inmueble, deleteFoto } from "../Redux/actions";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const ImageUpload = ({ selected, onDelete, fotos, inmuebleId }) => {
  const [previewImages, setPreviewImages] = useState(fotos || []);
  const dispatch = useDispatch();
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    setPreviewImages(fotos || []);
  }, [fotos]);

  const handleImageChange = async (event) => {
    const files = event.target.files;
    const images = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'inmuebles');
  
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload',
        data
      );
      const imageUrl = response.data.secure_url;
  
      const newImage = {
        id: idCounter + i,
        url: imageUrl,
      };
      
      images.push(newImage);
    }
 
    setIdCounter(idCounter + files.length);
    setPreviewImages((prevImages) => [...prevImages, ...images]);
    selected(images.map(img => img.url));
   /*  console.log(images); */
  };
  

  const handleImageDelete = (index, fotoId) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);

    // Llamar a la acción deleteFoto para eliminar la foto del inmueble
    dispatch(deleteFoto(inmuebleId, fotoId));

    onDelete(index); 
  };

  return (
    <div className="mb-3">
      <label htmlFor="formFileMultiple" className="form-label">
        Seleccione las imágenes
      </label>
      <input
        className="form-control"
        type="file"
        id="formFileMultiple"
        multiple
        onChange={handleImageChange}
      />
      <div id="preview" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', marginTop:'5px'}}>
        {previewImages.map((image, index) => (
          <div key={index} style={{ display: 'flex' }}>
            <img
              src={image.url || image}
              alt={`Preview ${index + 1}`}
              style={{
                maxWidth: '100px',
                maxHeight: '100px',
                border: 'solid',
                borderColor: 'beige',
                borderWidth: '1px',
                scroll:'auto'
              }}
            />
            <button className="btneliminar"
              style={{ border: 'none', background: 'none' }}
              onClick={() => handleImageDelete(index, fotos[index].id)}
            >
              <BsFillTrashFill style={{ fontSize: '20px' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;






