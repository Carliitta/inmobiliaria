import React from 'react'
import {BsEmojiWink} from "react-icons/bs"
const ContactoForm = () => {
    return (
        <form style={{display:'flex', justifyContent:'center' }}>
            <div style={{padding:'10px', width:'700px'}}>
             <legend>Envia un mensaje al vendedor para mas información <BsEmojiWink/></legend>
            
                <label for="exampleFormControlInput1" class="form-label">Nombre</label>
                <input type="text" class="form-control "  />
           
                <label for="exampleFormControlInput1" class="form-label">Telefono/Cel</label>
                <input type="number" class="form-control" id="exampleFormControlInput1"  />

                <label for="exampleFormControlInput1" class="form-label">Correo</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          
           
                <label for="exampleFormControlTextarea1" class="form-label">Mensaje</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            
                <button style={{marginTop:'10px'}} type="submit" class="btn btn-primary">Contactar</button>

            </div>
        </form>
    )
}

export default ContactoForm