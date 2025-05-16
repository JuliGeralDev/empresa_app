import { useSelector, useDispatch } from "react-redux";
import {
  agregarEmpresa,
  editarEmpresa,
  eliminarEmpresa,
} from "../features/empresa/empresaSlice";

/**
 * Hook personalizado para manejar las empresas desde Redux.
 * Proporciona acceso a la lista y funciones de agregar, editar y eliminar.
 */
const useEmpresas = () => {
  const empresas = useSelector((state) => state.empresa.lista);
  const dispatch = useDispatch();

  const crear = (empresa) => dispatch(agregarEmpresa(empresa));
  const actualizar = (empresa) => dispatch(editarEmpresa(empresa));
  const eliminar = (id) => dispatch(eliminarEmpresa(id));

  return { empresas, crear, actualizar, eliminar };
};

export default useEmpresas;
