# Our Little Story — guía rápida

Estética: **Romantic Coquette Scrapbook** (crema, rosa bebé, rosa
empolvado, acentos cereza y dorado champagne, con toques Y2K como
sparkles y microanimaciones).

Todo lo que necesitas personalizar está en **un solo archivo**:

```
js/config.js
```

Ahí editas: nombres, las dos fechas válidas de entrada, la línea de
tiempo horizontal, las 9 fotos del álbum, las 30 razones, el texto de
la carta (y las iniciales del sello), los 3 regalos con su adivinanza
correspondiente, la canción, el video, y los textos de la sección
final.

## Cómo probarla

Abre `index.html` haciendo doble clic — funciona directo en el
navegador. Si tu navegador restringe archivos locales, sirve la
carpeta con:

```
python3 -m http.server 8000
```

y abre `http://localhost:8000`.

## La contraseña de entrada

Ya no se escribe a mano: ella elige una fecha en un calendario. Dos
fechas distintas desbloquean la página por igual — configúralas en
`fechasValidas` dentro de `config.js` (solo importan día y mes, no
el año). No se revela cuál de las dos escogió.

## Estructura de páginas (10 en total)

1. Introducción
2. Línea de tiempo (horizontal)
3. Álbum de fotos (estilo polaroid)
4. 30 razones (todas disponibles desde el inicio, se revelan al
   tocarlas — la razón 30 tiene su propia tarjeta en forma de corazón)
5. Carta (el sobre mismo se abre y se cierra al tocarlo)
6. Regalos + adivinanzas (cada regalo se relaciona con su propia
   adivinanza y aparece al resolverla)
7. Misterio (video)
8. Si pudiera volver al primer día
9. Razones por las que te quiero
10. Pregunta final

## Dónde poner tus archivos

- **Fotos** → `assets/images/` — luego escribe la ruta en `config.js`,
  por ejemplo `foto: "assets/images/nosotros-1.jpg"`.
- **Canción** → `assets/audio/` — actualiza `musica.archivo`.
- **Video del misterio** → `assets/video/` — actualiza `video.archivo`.

Si dejas una foto o el video sin reemplazar, la página muestra un
marcador de posición elegante en su lugar — nunca se rompe.

## El progreso se guarda solo

La página usa `localStorage` del navegador para recordar en qué
página se quedó, las adivinanzas resueltas, las razones abiertas y
los easter eggs encontrados — todo persiste si ella cierra y vuelve a
abrir la página **en el mismo navegador y dispositivo**.

## Publicarla para que ella la vea

Sube la carpeta completa a un servicio gratuito como Netlify, Vercel
o GitHub Pages, y envíale el enlace.
