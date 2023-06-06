import React from "react";

const Filtros = () => {
  return (
    <nav className="navbar justify-content-center">
      <div className="dropdown m-1">
        <button
          className="btn btn-info dropdown-toggle  opacity-75"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Provincia
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Opción 1
          </a>
          <a className="dropdown-item" href="#">
            Opción 2
          </a>
          <a className="dropdown-item" href="#">
            Opción 3
          </a>
        </div>
      </div>

      {/*  OPERACION */}
      <div className="dropdown m-2">
        <button
          className="btn btn-info dropdown-toggle  opacity-75"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Operacion
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Opción 1
          </a>
          <a className="dropdown-item" href="#">
            Opción 2
          </a>
          <a className="dropdown-item" href="#">
            Opción 3
          </a>
        </div>
      </div>
      {/* TIPO PROPIEDAD*/}
      <div className="dropdown m-2">
        <button
          className="btn btn-info dropdown-toggle  opacity-75"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Propiedad
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Opción 1
          </a>
          <a className="dropdown-item" href="#">
            Opción 2
          </a>
          <a className="dropdown-item" href="#">
            Opción 3
          </a>
        </div>
      </div>
      {/* precio*/}
      <div className="dropdown m-2">
        <button
          className="btn btn-info dropdown-toggle  opacity-75"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Precio
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Opción 1
          </a>
          <a className="dropdown-item" href="#">
            Opción 2
          </a>
          <a className="dropdown-item" href="#">
            Opción 3
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Filtros;
