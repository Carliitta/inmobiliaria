import React from 'react'
import { useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import {BsEmojiWink} from "react-icons/bs"
import {sendEmail} from "../Redux/actions"

import Swal from 'sweetalert2'

    const ContactoForm = ({idInmueble}) => {

    const [form, setForm]= useState({
        nombre:'',
        telefono:'',
        correo:'',
        mensaje:''
    })
   const dispatch = useDispatch()
    const handleChangeForm=(e)=>{
        setForm({...form ,[e.target.name]: e.target.value });
    }

    const handleOnSubmit=(e)=>{
    e.preventDefault()
    try {
        
        if(!form.nombre || !form.correo || !form.telefono || !form.mensaje){
          Swal.fire({
           title:'Error',
           text:'Debe compretar todos los campos',
           icon:'error'
          })
        }else{
          dispatch(sendEmail(idInmueble,form))
          Swal.fire({
           title:'Su mensaje fue enviado con exito',
           text:'El vendedor se contactara con usted',
           icon:'success'
          })
          setForm({
            nombre:'',
            correo:'',
            telefono:'',
            mensaje:''
          })
        }
        } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: error.Message,
            });
        }   
     
    }
    return (
        <form style={{display:'flex', justifyContent:'center' }} onSubmit={handleOnSubmit}>
            <div style={{padding:'10px', width:'700px'}}>
             <legend>Envia un mensaje al vendedor para mas información <BsEmojiWink/></legend>
            
                <label htmlFor="" className="form-label">Nombre</label>
                <input type="text" className="form-control " name='nombre' value={form.nombre} onChange={handleChangeForm}/>
           
                <label htmlFor="" className="form-label">Telefono/Cel</label>
                <input type="number" className="form-control" id="" name='telefono' value={form.telefono} onChange={handleChangeForm}/>

                <label htmlFor="" className="form-label">Correo</label>
                <input type="email" className="form-control" id=" "
                 name='correo' value={form.correo} placeholder="name@example.com"onChange={handleChangeForm} />
          
                <label htmlFor="" className="form-label" >Mensaje</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" name='mensaje' value={form.mensaje} onChange={handleChangeForm} rows="3"></textarea>
            
                <button style={{marginTop:'10px'}} type="submit" className="btn btn-primary">Contactar</button>

            </div>
        </form>
    )
}

export default ContactoForm