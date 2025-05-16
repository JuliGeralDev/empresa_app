const API_KEY = import.meta.env.VITE_COHERE_API_KEY;

export const generarDescripcion = async (nombreProducto) => {
  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "command", // También puedes usar "command-light" para una versión más ligera
        prompt: `Genera una breve y atractiva descripción para un producto llamado "${nombreProducto}".`,
        max_tokens: 50,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    return data.generations?.[0]?.text?.trim() || "No se pudo generar.";
  } catch (error) {
    console.error("Error con Cohere:", error);
    return "Error al generar descripción.";
  }
};
