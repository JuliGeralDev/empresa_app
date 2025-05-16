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
        model: "command",
        prompt: `Responde exclusivamente en español. Escribe una breve descripción natural y profesional para un producto llamado "${nombreProducto}". Usa máximo 50 palabras.`,
        max_tokens: 50,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    return data.generations?.[0]?.text?.trim() || "No se pudo generar.";
  } catch (error) {
    console.error("Error con Cohere:", error);
    return "Error al generar descripción.";
  }
};
