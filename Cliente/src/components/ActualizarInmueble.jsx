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
 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_Inmueble(id))
  }, [dispatch, id]);



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
     if (inmueble) {
      setFormData({
        titulo: inmueble?.titulo || '',
        descripcion: inmueble?.descripcion || '',
        precio: inmueble?.precio || '',
        superficie: inmueble?.superficie || '',
        antiguedad: inmueble?.antiguedad || '',
        ubicacion: inmueble?.ubicacion || '',
        operacion: inmueble?.operacion || '',
        ambientes: inmueble?.ambientes || '',
      });
    }
    setSelectProvincia(inmueble.provinciaId )
    setSelectPropiedad(inmueble.propiedadId)
    setSelectImg(inmueble?.fotos?.map((foto) => ({ id: foto.id, url: foto.url })) || []);

  //console.log(inmueble);
  }, [inmueble])

  const handleDeleteImage = (index) => {
    setSelectImg((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const submitForm = async (e) => {

    e.preventDefault()
    try {  
    const updateFormData = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      precio: formData.precio,
      superficie: formData.superficie,
      antiguedad: formData.antiguedad,
      ubicacion: formData.ubicacion,
      operacion: formData.operacion,
      ambientes:formData.ambientes,
      fotos: selectImg,
      propiedadId: selectPropiedad,
      provinciaId: selectProvincia,
      usuarioId: userData.id,
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
          <select value={selectProvincia} onChange={(e) => setSelectProvincia(e.target.value)}>
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
          <select value={selectPropiedad} onChange={(e) => setSelectPropiedad(e.target.value)}>
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
          <ImageUpload selected={setSelectImg} onDelete={handleDeleteImage} fotos={selectImg} inmuebleId={inmueble.id} />
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