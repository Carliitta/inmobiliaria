
import Footer from "../../components/Footer";
import error from "../../components/img/error.jpg"
import { Navbar } from "../Navbar";
export default function NotFound() {
  return (
    <div  className="card">
   
< Navbar></Navbar>
      <section className="flex items-center">
	      <div className="container flex flex-col items-center justify-center ">
		      <div className=" text-center">
			      <h2 className="mt-3 ">
				      <span className="text-danger fs-1">Error 404</span>
			      </h2>
                  <img src={error} alt="imagen" style={{width:'350px'}} />
			      <p >Lo sentimos, No pudimos encontrar esta página.</p>

			      <a rel="noopener noreferrer" href="/" >Volver al Inicio</a>
		      </div>
	      </div>
      </section>

      <Footer />
    </div>
  );
}
