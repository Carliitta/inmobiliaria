import React, { useEffect, useState } from 'react'
import ImageUpload from './SubirFotos'
import {  Link , useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { get_All_Provincias, get_All_Propiedad, publicar_Inmueble, deleteFoto } from '../Redux/actions'
import Swal from 'sweetalert2';
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import Footer from './Footer';
const Publicar = () => {

  const provincias = useSelector((state) => state.provincias);
  const Propiedad = useSelector((state) => state.propiedad);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    superficie: "",
    antiguedad: "",
    ubicacion: "",
    operacion: "",
    ambientes:""
  });

  const [filtroProv, setFiltroprov] = useState('--Seleccione una Provincia');
  const [filtroOpe, setFiltroOpe] = useState('--Seleccione tipo de Operacion');
  const [filtroProp, setFiltroprop] = useState('--Seleccione tipo de Propiedad');
  const storedUserData = localStorage.getItem("user-log");
  const userData = JSON.parse(storedUserData);
  const [selectProvincia, setSelectProvincia] = useState('')
  const [selectPropiedad, setSelectPropiedad] = useState('')
  const [selectImg, setSelectImg] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
  useEffect(() => {
    dispatch(get_All_Provincias());
    dispatch(get_All_Propiedad());
  }, []);

  useEffect(() => {
    // Esta función se ejecutará cada vez que selectImg se actualice en ImageUpload
   // console.log('selectImg actualizado en Publicar:', selectImg);
  }, [selectImg]);
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      
      if (!formData.titulo || !formData.descripcion || !formData.operacion 
        || !formData.antiguedad
        || !formData.precio
        || !formData.ubicacion
        || !formData.superficie
        || !formData.ambientes
        || !selectProvincia
        || selectImg.length === 0 
        || !selectPropiedad) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Complete todos los campos',
        });
      } else {
        const updateFormData={
          ...formData,
          fotos:selectImg,
          propiedadId:selectPropiedad,
          provinciaId:selectProvincia,
          usuarioId:userData.id
        }
        await dispatch(publicar_Inmueble(updateFormData));
        Swal.fire({
          icon: 'success',
          title: '¡Perfecto!',
          text: 'Publicado correctamente',
        });
       // console.log(formData, console.log(selectImg));
        setFiltroprov(filtroProv)
        setFiltroOpe(filtroOpe)
        setFiltroprop(filtroProp)
        setSelectImg([]);
        setFormData({
          titulo: '',
          descripcion: '',
          operacion: '',
          precio: '',
          superficie: '',
          ubicacion: '',
          antiguedad: '',
          ambientes:''
        });
      }
   navigate('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: error.message,
      });
    }
  }

  return (
    <>
  
    <div className="d-flex flex-column min-vh-100" style={{ justifyContent: 'center', alignItems: 'center'}} >
        <Link to={"/"}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginLeft:'15%' , marginTop:'5px',color:'#80808096'}}/>
    </Link>
     {/*  {console.log(selectImg)} */}
      <form className='publicar container p-3  mt-3 mb-3 ' style={{ width: '700px', borderRadius:'20px', backgroundColor:'rgb(255 210 7 / 52%)' }} onSubmit={submitForm}>
      <h3 className='text-center p-1 '>Formulario de publicacion</h3>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Titulo</label>
          <input type="text" className="form-control" name='titulo' value={formData.titulo} onChange={handleChange} />
        </div>
        <div className="mb-3">
        <ImageUpload selected={setSelectImg} onDelete={deleteFoto} fotos={selectImg} inmuebleId={formData.id} />

        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Descripcion</label>
          <textarea type="text" className="form-control" id="floatingTextarea" name='descripcion' value={formData.descripcion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Ubicacion/Localidad</label>
          <input type="text" className="form-control" name='ubicacion' value={formData.ubicacion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Cant. Ambientes</label>
          <input type="number" min="0" className="form-control" name='ambientes' value={formData.ambientes} onChange={handleChange} />
        </div>
        <div className="dropdown m-1">
          <select onChange={(e) => setSelectProvincia(e.target.value)}>
            <option className="dropdown-menu" value="">
            {filtroProv}
            </option>

            {provincias?.map((el) => (
              <option key={el.id} value={el.id}>
                {el.nombre_prov}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor=""className="form-label">Superficie m2</label>
          <input type="number" min='0' className="form-control" name='superficie' value={formData.superficie} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Precio USD</label>
          <input type="number" min="0" className="form-control" name='precio' value={formData.precio} onChange={handleChange} />
        </div>
        <div className="dropdown m-1">
          <select onChange={(e) => setSelectPropiedad(e.target.value)}>
            <option className="dropdown-menu" value="">
              {filtroProp}
            </option>

            {Propiedad?.map((el) => (
              <option key={el.id} value={el.id}>
                {el.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown m-1">
          <select name='operacion' value={formData.operacion} onChange={handleChange}>
            <option className="dropdown-menu">
              {filtroOpe}
            </option>

            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Antiguedad (Meses/Años/a estrenar..)</label>
          <input name='antiguedad' type="text" className="form-control" value={formData.antiguedad} onChange={handleChange} />
        </div>
      
        <div className="d-grid gap-2">
        <button id='submit' type="submit" className="btn btn-info btn-lg " style={{backgroundColor:'#3b3a37', color:"white"}}>Publicar Inmueble</button>
       </div>    
      </form>
    </div>
<Footer />
    </>
  )
}

export default Publicar