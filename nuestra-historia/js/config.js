/* =====================================================================
   CONFIGURACIÓN — EDITA SOLO ESTE ARCHIVO
   Aquí vive todo el contenido personal: fechas, textos, fotos, frases…
   No necesitas tocar ningún otro archivo para personalizar la página.
   ===================================================================== */

window.SITE_CONFIG = {

  /* ---------- NOMBRES ---------- */
  nombreElla: "[Nombre de tu pareja]",
  nombreTuyo: "[Tu nombre]",

  /* ---------- 0. PANTALLA DE DESBLOQUEO ----------
     Ella elige la fecha con un calendario — el año no importa,
     solo día y mes. Cualquiera de estas dos fechas es válida
     y no se revela cuál escogió. */
  fechasValidas: [
    { dia: 28, mes: 6 },  // 28 de junio
    { dia: 11, mes: 7 }   // 11 de julio
  ],
  mensajeBienvenida: "Bienvenida a nuestra historia.",
  mensajeError: "Casi… piensa en nuestro comienzo ❤️",

  /* ---------- 2. LÍNEA DE TIEMPO (horizontal) ----------
     El 20 de septiembre se deja intencionalmente misterioso. */
  lineaDeTiempo: [
    { fecha: "28 DE JUNIO", titulo: "Primer mensaje", texto: "El primer mensaje que nos cruzamos.", icono: "💌" },
    { fecha: "11 DE JULIO", titulo: "La primera vez que nos vimos", texto: "[Cuenta cómo fue verse por primera vez.]", icono: "♡" },
    { fecha: "14 DE JULIO", titulo: "Nuestra primera salida", texto: "Nuestra primera salida solos y nuestro primer beso.", icono: "🎀" },
    { fecha: "4 DE AGOSTO", titulo: "Nuestra foto juntos", texto: "[Cuenta la historia detrás de esa foto.]", icono: "📸" },
    { fecha: "29 DE AGOSTO", titulo: "Uno de los momentos más lindos", texto: "Uno de los momentos más lindos que compartimos, y la primera vez que te publiqué.", icono: "🌷" },
    { fecha: "5 DE SEPTIEMBRE", titulo: "Nuestra primera cita planeada", texto: "[Cuenta cómo la planeaste y cómo salió.]", icono: "♡" },
    { fecha: "20 DE SEPTIEMBRE", titulo: "???", texto: "", icono: "✨" }
  ],

  /* ---------- 3. ÁLBUM DE RECUERDOS (9 fotos, sin fechas) ---------- */
  recuerdos: [
    { titulo: "Nuestro primer momento", foto: null, frase: "En ese momento todavía no sabía cuánto ibas a llegar a significar para mí." },
    { titulo: "Esa risa que no olvido", foto: null, frase: "[Frase personalizada para esta foto.]" },
    { titulo: "Un día cualquiera, especial", foto: null, frase: "[Frase personalizada para esta foto.]" },
    { titulo: "La primera vez que...", foto: null, frase: "[Frase personalizada para esta foto.]" },
    { titulo: "Ese viaje pequeño", foto: null, frase: "[Frase personalizada para esta foto.]" },
    { titulo: "Cuando todo fue silencio y calma", foto: null, frase: "[Frase personalizada para esta foto.]" },
    { titulo: "Esa noche que no quería que terminara", foto: null, frase: "[Frase personalizada para esta foto.]" },
    { titulo: "Nosotros, tal cual somos", foto: null, frase: "[Frase personalizada para esta foto.]" },
    { titulo: "Uno más para el camino", foto: null, frase: "[Frase personalizada para esta foto.]" }
  ],

  /* ---------- 5. 30 RAZONES ----------
     Todas están disponibles desde el inicio — cada una se
     revela al tocarla. */
  treintaRazones: [
    "Me encanta la forma en que puedes hacerme sonreír sin siquiera intentarlo.",
    "[Razón 2 — reemplázala]",
    "[Razón 3 — reemplázala]",
    "[Razón 4 — reemplázala]",
    "[Razón 5 — reemplázala]",
    "[Razón 6 — reemplázala]",
    "[Razón 7 — reemplázala]",
    "[Razón 8 — reemplázala]",
    "[Razón 9 — reemplázala]",
    "[Razón 10 — reemplázala]",
    "[Razón 11 — reemplázala]",
    "[Razón 12 — reemplázala]",
    "[Razón 13 — reemplázala]",
    "[Razón 14 — reemplázala]",
    "[Razón 15 — reemplázala]",
    "[Razón 16 — reemplázala]",
    "[Razón 17 — reemplázala]",
    "[Razón 18 — reemplázala]",
    "[Razón 19 — reemplázala]",
    "[Razón 20 — reemplázala]",
    "[Razón 21 — reemplázala]",
    "[Razón 22 — reemplázala]",
    "[Razón 23 — reemplázala]",
    "[Razón 24 — reemplázala]",
    "[Razón 25 — reemplázala]",
    "[Razón 26 — reemplázala]",
    "[Razón 27 — reemplázala]",
    "[Razón 28 — reemplázala]",
    "[Razón 29 — reemplázala]",
    "[Razón 30, la más importante — reemplázala]"
  ],

  /* ---------- 6. CARTA DIGITAL ----------
     El sobre mismo es el botón: se abre y se cierra al tocarlo.
     Puedes usar saltos de línea normales; se respetan como párrafos. */
  selloIniciales: "H",
  carta: `[Aquí va tu carta. No hace falta que sea larga — que sea honesta.

Escribe lo que quieras que ella lea en este momento, con tus propias palabras.]

— ${"[Tu nombre]"}`,

  /* ---------- 7. REGALOS + ADIVINANZAS (fusionados) ----------
     Cada regalo se relaciona con su propia adivinanza: aparecen de
     a uno, y al resolver la adivinanza correspondiente, ese regalo
     se abre. "respuestas" acepta varias formas válidas, en
     minúsculas y sin tildes. */
  regalos: [
    {
      icono: "🧸",
      nombre: "Peluche",
      pregunta: "[Escribe una adivinanza que lleve a pensar en un peluche.]",
      pista: "[Pista opcional]",
      respuestas: ["peluche", "oso", "osito"],
      descripcion: "Un pequeño compañero para los días en que no pueda estar cerca.",
      mensaje: "Este sí puedes encontrarlo fuera de esta pantalla."
    },
    {
      icono: "💌",
      nombre: "Carta",
      pregunta: "[Escribe una adivinanza que lleve a pensar en una carta.]",
      pista: "[Pista opcional]",
      respuestas: ["carta", "letra"],
      descripcion: "Palabras que quise escribir con calma, no con prisa.",
      mensaje: "Ya la leíste arriba — pero también hay una copia esperándote."
    },
    {
      icono: "🌷",
      nombre: "Flores",
      pregunta: "[Escribe una adivinanza que lleve a pensar en flores.]",
      pista: "[Pista opcional]",
      respuestas: ["flores", "flor", "tulipanes", "rosas", "rosa"],
      descripcion: "Algo que dura poco, para recordar que hay que disfrutar lo que dura poco.",
      mensaje: "Estas sí se marchitan. Las nuestras, espero que no."
    }
  ],

  /* ---------- 9. MÚSICA ---------- */
  musica: {
    archivo: "assets/audio/cancion.mp3", // reemplaza con tu archivo
    nombre: "[Nombre de la canción — Artista]"
  },

  /* ---------- MISTERIO (video) ---------- */
  video: {
    archivo: "assets/video/mensaje.mp4" // reemplaza con tu archivo
  },

  /* ---------- SI PUDIERA VOLVER AL PRIMER DÍA ---------- */
  fechaPrimerDia: "28 de junio",
  textoPrimerDia: "Si pudiera volver a ese día sabiendo todo lo que iba a pasar después, volvería a elegir conocerte.",

  /* ---------- RAZONES POR LAS QUE TE QUIERO ---------- */
  razonesPorLasQueTeQuiero: [
    "Tu sonrisa.",
    "Tu forma de ser.",
    "Cómo me haces sentir.",
    "Los pequeños detalles.",
    "La tranquilidad que siento contigo.",
    "[Agrega más razones aquí.]"
  ],

  /* ---------- FINAL ---------- */
  finalLinea1: "Y ahora me toca hablar a mí.",
  finalLinea2: "Hay algo que quiero decirte…",
  botonFinal: "¿Quieres escuchar?",
  mensajeFinalRevelado: "[Aquí puedes escribir lo último que quieres que lea o escuche — una nota final, o dónde encontrar ese último mensaje.]"
};
