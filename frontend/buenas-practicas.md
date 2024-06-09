# Buenas prácticas para el Desarrollo Frontend
En esta sección y como viene siendo habitual, encontrarás algunas de las mejores prácticas para el desarrollo de frontend. De esta manera entenderás desde alto nivel todo aquello que ayuda a garantizar factores como rendimiento, velocidad, accesibilidad, usabilidad o seguridad en tus aplicaciones. A partir de esta semilla podrás investigar más a fondo a partir de los términos explicados.

## 1. Estructura del proyecto y mantenibilidad
Organización clara del código
Mantén una estructura de carpetas lógica y coherente. Por ejemplo, separa las vistas, componentes, utilidades, servicios y estilos en sus respectivas carpetas. Traer ejemplos.

Modularidad
Descompón el código en módulos o componentes pequeños y manejables que se puedan testear y mantener fácilmente.

Uso de patrones de diseño 
Implementa patrones de diseño apropiados para resolver problemas comunes, como el patrón singleton para servicios o el patrón factory para la creación de objetos.

## 2. Calidad del código
Linter y formateadores
Usa herramientas como ESLint y Prettier para asegurarte de que tu código siga las mejores prácticas y esté consistentemente formateado.

Comentarios y documentación
Documenta funciones complejas y decisiones de diseño no obvias. Los comentarios deben aclarar el "por qué" detrás del código, no solo el "qué" hace. Y mantenlos actualizados, sino no servirá de nada.

## 3. Rendimiento
Carga perezosa (Lazy Loading)
Implementa la carga perezosa para recursos y componentes pesados que no son necesarios de inmediato, bien porque no sean visibles, bien porque se requiere una acción del usuario (como un clic que abre un popup). Esto mejora significativamente el tiempo de carga inicial de la página.

Optimización de recursos
Minimiza y comprime archivos CSS y JavaScript. Utiliza imágenes optimizadas para la web y considera técnicas como sprites de imágenes para reducir las solicitudes HTTP.

Uso de CDN
Para bibliotecas externas o recursos estáticos, utiliza redes de entrega de contenido (CDN) para reducir la latencia y mejorar los tiempos de carga.

Informes de velocidad de carga
Hay algunas herramientas especializadas en medir la velocidad de carga de tu aplicación web, y proponer recomendaciones de mejora (la mayoría de ellas las encuentras en este tema):

GTMetrix: https://gtmetrix.com/

Google PageSpeed (gratis): https://pagespeed.web.dev/

Análisis de nextjs.org https://pagespeed.web.dev/analysis/https-nextjs-org

## 4. Seguridad
Sanitización de entrada
Asegúrate de que todas las entradas del usuario sean sanitizadas para evitar inyecciones de código, especialmente en aplicaciones que interactúan con bases de datos o APIs.

Uso de HTTPS 🔒
Utiliza siempre HTTPS para proteger los datos transmitidos entre el cliente y el servidor.

Validación de contenido de lado cliente y servidor
No confíes únicamente en las validaciones de lado cliente; asegúrate de validar y verificar todas las entradas en el servidor también.

Ofuscar codigo
Es una técnica utilizada para hacer que el código fuente o el código binario sea difícil de entender para los humanos. Esto puede ayudar a proteger la propiedad intelectual y a prevenir la ingeniería inversa. Sin embargo, es importante destacar que la ofuscación no es una medida de seguridad infalible.

## 5. Experiencia del usuario
Diseño responsivo
Asegúrate de que tu aplicación sea usable en dispositivos móviles, tablets y escritorios, adaptándose a diferentes tamaños de pantalla. Con el diseño responsivo, evitamos tener que crear diferentes diseños para diferentes tamaños. Son interfaces fluidas 

Mobile First
En su mayoría, las aplicaciones que desarrollamos recientemente están dirigidas a usuarios que acceden a través de dispositivos móviles, por lo que debemos dar una gran importancia a la visualización y experiencia de usuario de nuestra app en estos dispositivos.

Una buena explicación la encuentras en https://www.marketinhouse.es/mobile-first/

Navegación intuitiva
La navegación debe ser fácil de entender y usar para los usuarios, con enlaces claros y una jerarquía visible.

Feedback visual
Proporciona feedback visual para las interacciones del usuario, como efectos de hover, animaciones de carga y notificaciones para acciones completadas.

## 6. Mantente Simple (Keep It Simple, Stupid! aka KISS)
Uno de los mayores errores de los desarrolladores front-end principiantes es crear sitios web demasiado complejos con muchos gráficos, elementos y animaciones, lo que perjudica la experiencia del usuario. Es mejor mantener un diseño simple, usable y accesible para evitar una alta tasa de rebote.https://es.wikipedia.org/wiki/Principio_KISS

## 7. Librerías de componentes y frameworks
Acelera la creación de interfaces. No reinventes la rueda, aprovecha librerías y frameworks para tener componentes ya listos, con las mejores prácticas de frontend, las últimas tendencias en UX/UI, usabilidad, y accesibilidad.

El uso de librerías o frameworks que faciliten la implementación de componentes reutilizables en tu aplicación te ayudará a optimizar el tiempo de desarrollo y a mantener una apariencia consistente. Además, los frameworks suelen estar optimizados para producir un código limpio y eficiente al desplegar.

Frameworks:

NextJS para React
Angular
Nuxt para Vue
Librerías de componentes

Chakra UI https://v2.chakra-ui.com/
MUI: https://mui.com/
Flowbite: https://flowbite.com/

## 8. Internacionalización de los textos (i18n)
Es fundamental anticipar en el desarrollo de frontend si la web o app necesitará ser multi-idioma. Por si las moscas, es algo que se puede hacer de serie, ya que:

Las librerías i18n son estándar, están muy optimizadas y cubren muchísimos de los casos límite que nos podemos encontrar (verás que son muchos y muy variados en el enlace de recursos que encontrarás abajo)
Aunque no haya más que un idioma, usar i18n nos permitirá separar el contenido de la estructura de la página, mejorando enormemente su mantenibilidad
Una buena guía de Shopify con ejemplos reales:
https://shopify.engineering/internationalization-i18n-best-practices-front-end-developers