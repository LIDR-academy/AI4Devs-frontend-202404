Quiero que analices el código en el directorio backend para que comprendas correctamente el esquema de datos que manejamos usando prisma. Me gustaría que intentes explicarmelo para que tengamos la misma comprensión de este. Además revisar si ya tenemos un servicio que recibiendo un identificador de posiciones nos retorne los detalles de este ya que lo vamos a necesitar para nuestro desarollo posterior. Te agradecería crear un diagrama en foramto mermaid para comprender mejor la estructura de datos


Por favor revisa si también tenemos un servicio que nos retorne la infomación de las posiciones registradas, además explícame cual sería la mejor forma de implementar la carga de estas posiciones en el componente @Positions.tsx por favor ten en cuenta la legibilidad del código, la mantenibilidad y buenas prácticas.


Por favor revisa si hemos definido una ruta para poder recuperar las posiciones registradas en el sistema y en caso de no estar, corrígelo


Creé el archivo, pero no me está tomando los valores definidos en el archivo .env


VAmos muy bien, ahora quiero que al hacer clic en el boón Ver proceso el sistema navegue a una nueva vista que vamos a crear llamada Position.tsx, en esta vamos a poner por ahora el nombre de la posición, creo que deberíamos definirle una ruta /position/:id, y al cargar haremos una petición al back para traer los detalles de esta petición.


Quiero que mejoremos el componente @Position.ts usando la metodología kanban, donde creemos una tarjeta por cada paso del flujo del proceso y por dentro mostremos que candidatos están en dicho paso


Todo va perfecto, pero quiero que consideres el endpoint expuesto en la ruta /position/:id/candidates, que nos trae un array de candidatos con las propiedades: fullName,  currentInterviewStep y averageScore, este último es un número. para poder hacer esta petición también al cargar la página y poder mostrar los dcandidatos que están en cada paso del flujo enlazandolos por la propiedad currentInterviewStep


Vamos muy bien, ahora quiero que en una línea salga el nombre del candidato y en otra el averageScore, pero este último quiero que de acuerdo al valor, pongas este emoji 🟢 tantas veces como lo indique


Crees que podríamos agregar la capacidad de arrastrar y soltar los candidatos entre cada una de las tarjetas correspondientes a los pasos?


Por favor revisa el código ya que no está funcionando el arrastrar y soltar


Por favor revisa porque aún no me permite arrastrar y soltar, cuando reviso la consola me sale un mensaje que dice: 

console.js:273 react-beautiful-dndUnable to find draggable with id: candidate-9👷‍ This is a development only message. It will be removed in production builds.
