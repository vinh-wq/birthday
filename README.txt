GUIA RAPIDA - PAGINA DE CUMPLEANOS CON CAJAS FUERTES
====================================================

COMO ESTA ORGANIZADO
  sitio/     = lo UNICO que se publica en internet (index.html, pages, css, js, data, assets).
  privado/   = tu zona secreta: contenidos.js (claves y mensajes) y constructor.html.
               NUNCA subas la carpeta "privado" a internet.

1. COMO ABRIR Y PROBAR LA PAGINA
   - Descomprime el ZIP. Abre sitio/index.html con doble clic.
   - Claves de prueba: prueba01, prueba02 ... prueba12 (las ves en privado/contenidos.js).
   - Para probar fechas: abre sitio/js/config.js, escribe en fechaPrueba una fecha como
     "2026-11-18", guarda y recarga. Antes de publicar vuelve a dejarlo asi: fechaPrueba:""
   - Para borrar lo "desbloqueado" en tu navegador de prueba: borra los datos del sitio
     (o abre una ventana privada).

2. COMO CAMBIAR UNA CLAVE (un solo archivo)
   - Abre privado/contenidos.js con el Bloc de notas. Cada dia tiene: clave:"prueba01"
   - Cambia el texto entre comillas. No importan mayusculas ni acentos.
   - Usa claves de 2 o mas palabras (ej. "nuestro primer cafe"): son mas dificiles de adivinar.
   - Despues haz el PASO OBLIGATORIO de abajo ("APLICAR CAMBIOS").
   - Pistas opcionales: en sitio/js/config.js, en pistas:{1:"tu pista"}.

3. APLICAR CAMBIOS (paso obligatorio cada vez que cambies claves o mensajes)
   a) Abre privado/constructor.html con doble clic y pulsa "Generar vault.js".
   b) Se descarga un archivo vault.js. Copialo dentro de sitio/data/ y reemplaza el anterior.
   c) Si ya publicaste la pagina, vuelve a subir la carpeta sitio.

4. COMO SUBIR TUS FOTOGRAFIAS
   - Reducelas antes (ancho ~1200 px, .jpg, menos de 300 KB; squoosh.app es gratis).
   - Copialas a sitio/assets/photos con el nombre que espera la pagina:
     day-01-foto-1.jpg, day-01-foto-2.jpg, day-02-foto-1.jpg ...
   - Si falta una foto, se ve un recuadro punteado con el nombre que debe tener.

5. COMO CAMBIAR UNA FOTOGRAFIA
   - Guarda la nueva con el MISMO nombre y reemplaza la anterior en sitio/assets/photos.
   - O cambia el nombre en src="../assets/photos/..." dentro de privado/contenidos.js
     (y haz el paso 3).

6. COMO ANADIR, CAMBIAR O ELIMINAR TEXTO
   - Los mensajes estan en privado/contenidos.js, dentro de html:` ... `
   - Un parrafo es:  <p>Tu texto aqui.</p>
   - Anadir: copia una linea <p>...</p>, pegala y cambia el texto.
   - Eliminar: borra la linea completa desde <p> hasta </p>.
   - No uses el simbolo ` (comilla invertida) dentro del texto.
   - Despues haz el paso 3.

7. COMO MODIFICAR LOS TEXTOS DE CADA TARJETA
   - Abre sitio/index.html. Cambia lo que esta dentro de <span class="card-fecha">
     (fecha, arriba) y <span class="card-texto"> (frase grande).
   - La fecha pequena de arriba de cada dia esta en sitio/pages/day-XX.html (class="dia-fecha").
   - Las tarjetas 11 y 12 son las sorpresas especiales.

8. COMO CAMBIAR LAS FECHAS DE DESBLOQUEO
   - En sitio/js/config.js: la lista "desbloqueo" tiene 12 fechas en orden ("11-12" = 12 de noviembre).
     Las ultimas dos son las sorpresas especiales: cambialas como quieras.
   - anio y zona (America/El_Salvador) tambien estan ahi. "cumple" abre todo ese dia.
   - Una tarjeta ya abierta nunca se vuelve a cerrar durante la cuenta regresiva.

9. COMO CAMBIAR LOS COLORES
   - Abre sitio/css/styles.css. Al inicio esta la lista "COLORES". Cambia los codigos
     (#f6d5de, etc.), guarda y recarga.

10. COMO ANADIR O ELIMINAR FOTOGRAFIAS EN UN MENSAJE
   - Eliminar: borra desde <figure class="photo"> hasta </figure> (en contenidos.js).
   - Anadir: copia un <figure> completo y cambia el nombre. Ejemplo:
     <figure class="photo"><img src="../assets/photos/day-02-foto-2.jpg" alt="Nosotros" loading="lazy"></figure>
   - Posicion: al lado del texto = dentro de <div class="split"> junto a <div class="texto">
     (a la izquierda: <div class="split invertido">); entre parrafos = suelto entre dos <p>;
     seccion especial = dentro de <section class="galeria">; debajo = despues del ultimo <p>.
   - Despues haz el paso 3. En celulares las fotos se apilan solas.

11. COMO MODIFICAR LOS ENLACES DE NAVEGACION
   - Cada tarjeta de sitio/index.html apunta a su pagina: href="pages/day-01.html".
   - Anterior/Siguiente estan al final de cada pagina (class="dia-nav"); Inicio es href="../index.html".

12. COMO PUBLICARLA Y COMPARTIR UNA URL
   - Netlify Drop (gratis): entra a app.netlify.com/drop y arrastra SOLO la carpeta "sitio".
     Te da una URL que abre en cualquier celular. Si cambias algo, vuelve a arrastrarla.
   - GitHub Pages tambien sirve: sube solo el contenido de "sitio".
   - Publica con https (los dos lo dan): el cifrado lo necesita.

SEGURIDAD: QUE PROTEGE Y QUE NO
   Protege bien:
   - Los mensajes estan CIFRADOS (AES-256). En el codigo publico no existen las claves ni el texto:
     sin la clave correcta nadie puede leer el mensaje, ni mirando el codigo de la pagina.
   - Los mensajes de error no revelan la clave.
   Limites (una pagina estatica no puede evitarlos):
   - El bloqueo por FECHA es visual. En hosting con https la pagina usa la hora del servidor
     (no la del celular), asi que cambiar el reloj no basta. Pero alguien que modifique el codigo
     del navegador podria saltarse el aviso de fecha. Aun asi seguiria necesitando la clave.
   - Una clave facil (una palabra comun) puede ser adivinada con un programa. Usa frases largas.
   - Las fotos son archivos publicos: si alguien adivina la direccion exacta
     (assets/photos/day-05-foto-1.jpg) las veria. Para mas privacidad usa nombres dificiles de adivinar
     (ej. cafe-7391.jpg) y cambia tambien los src.
   - "Recordar desbloqueado" usa localStorage del dispositivo (guarda una llave derivada, no la clave).
     No decide las fechas: la fecha se vuelve a revisar siempre.
   - Para validacion REAL en servidor (la fecha y la clave se comprueban fuera del navegador y el
     contenido solo se entrega si todo es correcto) hace falta una funcion de servidor
     (Netlify Functions, Cloudflare Workers...). Se puede adaptar este proyecto a eso.
