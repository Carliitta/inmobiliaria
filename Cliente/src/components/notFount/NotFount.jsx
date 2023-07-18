
import Footer from "../../components/Footer";
import error from "../../components/img/error.jpg"
import { Navbar } from "../Navbar";
export default function NotFound() {
  return (
    <div>
   
<Navbar></Navbar>
      <section className="flex items-center">
	      <div className="container flex flex-col items-center justify-center ">
		      <div className=" text-center">
			      <h2 className="mt-3 ">
				      <span className="text-danger fs-1">Error 404</span>
			      </h2>
                  <img src={error} alt="imagen" style={{width:'300px'}} />
			      <p className="text-2xl font-semibold md:text-3xl">Lo sentimos, No pudimos encontrar esta página.</p>

			      <a rel="noopener noreferrer" href="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Volver al Inicio</a>
		      </div>
	      </div>
      </section>

      <Footer />
    </div>
  );
}
