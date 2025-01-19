import { IUser_info_to_chatGpt } from "../interface/message_chatgpt_interface/user_info_to_chatgpt";
import { IRead } from "../interface/read_interfaces/read_interface";

export const getTemplateMessage = (user: IUser_info_to_chatGpt, palma: IRead) =>
  `Hazme un informe de quiromancia sobre 
     esta persona cuyos datos adicionales además de la palma son: 
     ${user.gender} nacido en ${user.birthdate}, 
     saca el signo por la fecha de nacimiento,
      su Número de Destino en Numerología es ${user.numerology}. 
      Haz un informe de quiromancia 
      sobre su ${palma.lines_options.map(
        (palm) => `${palm.line} dentro de una categoria de ${palm.category}
       haciendo hincapié en este aspecto de ${palm.category}: ${palm.description}. 
       `
      )} Que el informe sea de unas 500 o mas palabras por categoria
  
  organiza el contenido por subtítulos, usando un lenguaje normal (español de España). 
  NO incluyas una sección final de “Conclusiones” ya que eso denota el uso de IA, 
  y no quiero se vea uso de AI, 
  el informe ha de parecer como hecho por una persona y hablame en 2da persona del singular.
  Tampoco incluyas el típico título inicial “Introducción” que también denota uso de IA,
  hazlo Resumen , pero no incluyas ningun encabezado, ni la palabra resumen tampoco 
    solo devuelve la respuesta y listo
  o parecido.No incluyas referencias al signo zodiacal en el informe, ni 
  el Número del Destino, esos parámetros los utilizamos sin decirle al usuario, y dar la 
  impresión que solamente se ha usado la palma para el análisis. En el informe, no te refieras
   a las características de la línea que hemos mencionado: corta/larga, continua/discontinua.
    Tómalo en cuenta, pero sin mencionarlo. Emite directamente el informe sin referirte a las 
    características, dí directamente qué significa eso refiriéndote, por ejemplo con frases 
    como: “tu palma refleja que eres….”, “el análisis de tu palama denota…” y frases similares. 
    La persona debe ver el informe como si un experto en quiromancia le ha mirado la palma, 
    de ahí que no debemos repetir mucho las características de la línea, si no enfocándonos 
    más en el significado. `;
