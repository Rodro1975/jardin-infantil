const getBaseUrl = () => {
    let url =
      process.env.NEXT_PUBLIC_SITE_URL || // URL en producción.
      process.env.NEXT_PUBLIC_VERCEL_URL || // URL configurada por Vercel.
      "http://localhost:3000"; // URL por defecto en desarrollo.
  
    
    url = url.startsWith("http") ? url : `https://${url}`;
  
    // Asegúrate de que termine con `/`.
    return url.endsWith("/") ? url : `${url}/`;
  };
  
  export default getBaseUrl;
  