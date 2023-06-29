import React, { useEffect, useState } from 'react'
import ImageUpload from './SubirFotos'
import { useSelector, useDispatch } from "react-redux"
import { get_All_Provincias, get_All_Propiedad } from '../Redux/actions'

const Publicar = () => {

  const provincias = useSelector((state) => state.provincias);
  const Propiedad = useSelector((state) => state.propiedad);
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    superficie: "",
    antiguedad: "",
    ubicacion: "",
    operacion: ""
  });
  const [selectProvincia,setSelectProvincia]= useState('')
  const [selectPropiedad,setSelectPropiedad]= useState('')
  const [selectImg,setSelectImg]= useState([])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  useEffect(() => {
    dispatch(get_All_Provincias());
    dispatch(get_All_Propiedad());
   
  }, []);

  return (
    <div >
      <h3 className='text-center p-3'>Formulario de publicacion</h3>
      {console.log(selectImg)}
      <form className='container p-3 ' style={{ width: '600px' }}>
        <div className="mb-3">
          <label for="" className="form-label">Titulo</label>
          <input type="text" className="form-control" name='titulo' value={formData.titulo} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="" className="form-label">Descripcion</label>
          <textarea type="text" className="form-control" id="floatingTextarea" name='descripcion' value={formData.descripcion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="" className="form-label">Ubicacion/Localidad</label>
          <input type="text" className="form-control" name='ubicacion' value={formData.ubicacion} onChange={handleChange} />
        </div>
        <div className="dropdown m-1">
          <select onChange={(e)=> setSelectProvincia(e.target.value)}>
            <option className="dropdown-menu" value="">
              --Seleccione la Provincia
            </option>

            {provincias?.map((el) => (
              <option key={el.id} value={el.nombre_prov}>
                {el.nombre_prov}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label for="" className="form-label">Superficie m2</label>
          <input type="number" className="form-control" name='superficie' value={formData.superficie}  onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label for="" className="form-label">Precio USD</label>
          <input type="number" min="0" className="form-control" name='precio' value={formData.precio}  onChange={handleChange} />
        </div>
        <div className="dropdown m-1">
          <select onChange={(e)=>setSelectPropiedad(e.target.value)}>
            <option className="dropdown-menu" value="">
              --Seleccione la propiedad
            </option>

            {Propiedad?.map((el) => (
              <option key={el.id} value={el.nombre}>
                {el.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown m-1">
          <select name='operacion' value={formData.operacion}  onChange={handleChange}>
            <option className="dropdown-menu">
              --Seleccione el tipo de operacion
            </option>

            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>
        <div className="mb-3">
          <label for="" className="form-label">Antiguedad</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <ImageUpload  selected={setSelectImg}/>
        </div>
        <button type="submit" className="btn btn-info">Publicar</button>
      </form>

    </div>
  )
}

export default Publicar