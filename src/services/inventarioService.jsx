export const enviarInventarioPorCorreo = async (datos) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exito = true;
      if (exito) {
        console.log("Simulación de envío exitosa");
        resolve(true);
      } else {
        console.error("Error simulado en el envío");
        resolve(false);
      }
    }, 2000); 
  });
};