import React, { useEffect, useState } from 'react'
import ImageUpload from './SubirFotos'
import {  Link, useParams , useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { get_All_Provincias, get_All_Propiedad, get_Inmueble, update_Post } from '../Redux/actions'
import Swal from 'sweetalert2';
import {BsFillArrowLeftSquareFill} from "react-icons/bs"
import Footer from './Footer';

const Actualizar = () => {
    const navegate= useNavigate();
  const provincias = useSelector((state) => state.provincias);
  const Propiedad = useSelector((state) => state.propiedad);
  const inmueble = useSelector(state => state.detalle)
  const { id } = useParams();


  
  useEffect(() => {
    dispatch(get_Inmueble(id))
  //  return () => {dispatch(cleanDetail())}
  }, []);


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
  const storedUserData = localStorage.getItem("loggedInUser");
  const userData = JSON.parse(storedUserData);
  const [selectProvincia, setSelectProvincia] = useState(null)
  const [selectPropiedad, setSelectPropiedad] = useState(null)
  const [selectImg, setSelectImg] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
  useEffect(() => {
    setFormData({
    titulo:inmueble?.titulo,
    descripcion:inmueble?.descripcion,
    precio: inmueble?.precio,
    superficie: inmueble?.superficie,
    antiguedad: inmueble?.antiguedad,
    ubicacion: inmueble?.ubicacion,
    operacion: inmueble?.operacion,
    ambientes:inmueble?.ambientes
    })
  
    setSelectProvincia(inmueble.provinciaId )
    setSelectPropiedad(inmueble.propiedadId)
  console.log(inmueble);
  }, [inmueble])

  
  const submitForm = async (e) => {
    e.preventDefault()
    try {
      
        const ambientes = parseInt(formData.ambientes);
        const propiedadId = parseInt(selectPropiedad);
        const provinciaId = parseInt(selectProvincia);
        const usuarioId = parseInt(userData.id);
        
        if (isNaN(ambientes) || isNaN(propiedadId) || isNaN(provinciaId) || isNaN(usuarioId)) {
          // Manejo del error: alguno de los campos convertidos no es un número válido
          throw new Error('Los campos numéricos no contienen valores válidos');
        }
        
        const updateFormData = {
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          precio: formData.precio,
          superficie: formData.superficie,
          antiguedad: formData.antiguedad,
          ubicacion: formData.ubicacion,
          operacion: formData.operacion,
          ambientes: ambientes,
          fotos: selectImg,
          propiedadId: propiedadId,
          provinciaId: provinciaId,
          usuarioId: usuarioId
        };
        
        await dispatch(update_Post(id,updateFormData));
        console.log(updateFormData);
        Swal.fire({
          icon: 'success',
          title: '¡Perfecto!',
          text: 'Actualizado correctamente',
        });
       
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
        navegate('/mis_publicaciones');
   
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: error.Message,
      });
    }
  }
  useEffect(() => {
    dispatch(get_All_Propiedad());
    dispatch(get_All_Provincias());
   
  }, [dispatch]);
  return (
    <>
  
    <div className="d-flex flex-column min-vh-100" style={{ justifyContent: 'center', alignItems: 'center'}} >
        <Link to={"/"}>
        <BsFillArrowLeftSquareFill style={{fontSize:'35px', marginLeft:'15%' , marginTop:'5px',color:'#80808096'}}/>
    </Link>
      {console.log(selectImg)}
      <form className='container p-3  mt-3 mb-3 ' style={{ width: '700px', borderRadius:'20px', backgroundColor:'#ffe307cf' }} onSubmit={submitForm}>
      <h3 className='text-center p-1 '>Formulario de publicacion</h3>
        <div className="mb-3">
          <label htmlFor="" className="form-label">Titulo</label>
          <input type="text" className="form-control" name='titulo' value={formData.titulo} onChange={handleChange} />
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
        <div className="mb-3">
          <ImageUpload selected={setSelectImg} />
        </div>
        <div class="d-grid gap-2">
        <button type="submit" className="btn btn-info btn-lg " style={{backgroundColor:'black', color:"white"}}>Actualizar Inmueble</button>
       </div>    
      </form>
    </div>
<Footer />
    </>
  )
}

export default Actualizar