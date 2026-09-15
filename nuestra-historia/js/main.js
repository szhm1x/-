/* =====================================================================
   OUR LITTLE STORY — lógica de la experiencia
   Todo el contenido personal vive en js/config.js — este archivo no
   necesita editarse para personalizar la página.
   ===================================================================== */
(function(){
  "use strict";
  const CFG = window.SITE_CONFIG;

  /* ---------------------------------------------------------------
     ESTADO PERSISTENTE (localStorage)
  --------------------------------------------------------------- */
  const STORAGE_KEY = "nuestra-historia-progreso";
  const defaultState = {
    unlocked: false,
    currentPage: 0,
    riddlesSolved: [false, false, false],
    mysteryOpened: false,
    eggsFound: { hero:false, timeline:false, final:false },
    daysOpened: {},
    musicWasPlaying: false
  };
  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return structuredCloneSafe(defaultState);
      return Object.assign(structuredCloneSafe(defaultState), JSON.parse(raw));
    }catch(e){ return structuredCloneSafe(defaultState); }
  }
  function structuredCloneSafe(o){ return JSON.parse(JSON.stringify(o)); }
  let state = loadState();
  function saveState(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
  }

  /* ---------------------------------------------------------------
     PARTÍCULAS DECORATIVAS
  --------------------------------------------------------------- */
  function initParticles(){
    const wrap = document.getElementById("particles");
    const glyphs = ["♡","✦","·","✿","❀"];
    for(let i=0;i<12;i++){
      const s = document.createElement("span");
      s.textContent = glyphs[i % glyphs.length];
      s.style.left = (Math.random()*100)+"vw";
      s.style.animationDuration = (8+Math.random()*8)+"s";
      s.style.animationDelay = (Math.random()*10)+"s";
      s.style.fontSize = (10+Math.random()*10)+"px";
      wrap.appendChild(s);
    }
  }
  function sparkleBurst(){
    const wrap = document.getElementById("particles");
    for(let i=0;i<10;i++){
      const s = document.createElement("span");
      s.textContent = "✨";
      s.style.left = (40+Math.random()*20)+"vw";
      s.style.bottom = "35vh";
      s.style.animationDuration = (2+Math.random()*1.5)+"s";
      s.style.animationDelay = (Math.random()*0.4)+"s";
      s.style.fontSize = (12+Math.random()*8)+"px";
      wrap.appendChild(s);
      setTimeout(()=> s.remove(), 4000);
    }
  }

  /* ---------------------------------------------------------------
     PUERTA DE ENTRADA (calendario romántico)
  --------------------------------------------------------------- */
  function initGate(){
    const gate = document.getElementById("gate");
    const bow = document.getElementById("gate-bow");
    const form = document.getElementById("gate-form");
    const input = document.getElementById("gate-input");
    const msg = document.getElementById("gate-msg");
    const unlockingMsg = document.getElementById("gate-unlocking");

    if(state.unlocked){
      gate.classList.add("hidden");
      gate.style.display = "none";
      startMusicIfWasPlaying();
      return;
    }

    form.addEventListener("submit", function(e){
      e.preventDefault();
      if(!input.value){
        msg.textContent = "Elige una fecha en el calendario primero.";
        return;
      }
      const parts = input.value.split("-"); // AAAA-MM-DD
      const mes = parseInt(parts[1],10);
      const dia = parseInt(parts[2],10);
      const ok = CFG.fechasValidas.some(f => f.dia === dia && f.mes === mes);
      if(ok){
        bow.classList.add("untie");
        sparkleBurst();
        unlockingMsg.textContent = CFG.mensajeBienvenida;
        unlockingMsg.classList.add("show");
        msg.textContent = "";
        form.style.display = "none";
        setTimeout(()=>{
          state.unlocked = true; saveState();
          gate.classList.add("hidden");
          setTimeout(()=>{ gate.style.display = "none"; }, 1200);
          tryAutoplayMusic();
        }, 1400);
      }else{
        msg.textContent = CFG.mensajeError;
        input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
      }
    });
  }

  /* ---------------------------------------------------------------
     NAVEGACIÓN POR PÁGINAS
  --------------------------------------------------------------- */
  let sections = [];
  let currentIndex = 0;
  let dots = [];
  let wheelLocked = false;

  function triggerReveal(section){
    const items = section.querySelectorAll(".reveal");
    items.forEach((el,i)=>{
      el.classList.remove("in");
      void el.offsetWidth;
      setTimeout(()=> el.classList.add("in"), 60 + i*70);
    });
  }

  function updateNavButtons(){
    document.getElementById("nav-prev").disabled = currentIndex === 0;
    document.getElementById("nav-next").disabled = currentIndex === sections.length-1;
  }

  function gateIsOpen(){
    const gate = document.getElementById("gate");
    return gate.style.display !== "none" && !gate.classList.contains("hidden");
  }

  function goTo(index){
    index = Math.max(0, Math.min(sections.length-1, index));
    if(index === currentIndex && sections[currentIndex].classList.contains("active")) return;
    sections[currentIndex].classList.remove("active");
    currentIndex = index;
    const target = sections[currentIndex];
    target.classList.add("active");
    target.scrollTop = 0;
    triggerReveal(target);
    dots.forEach((d,i)=> d.classList.toggle("active", i===currentIndex));
    document.getElementById("top-indicator").textContent =
      String(currentIndex+1).padStart(2,"0") + " / " + String(sections.length).padStart(2,"0");
    updateNavButtons();
    state.currentPage = currentIndex; saveState();
    target.dispatchEvent(new CustomEvent("page:activated"));
  }

  function initNav(){
    sections = Array.from(document.querySelectorAll(".section[data-section]"));
    const rail = document.getElementById("progress-rail");
    const indicator = document.getElementById("top-indicator");

    sections.forEach((sec,i)=>{
      const dot = document.createElement("button");
      dot.className = "rail-dot";
      dot.setAttribute("aria-label","Ir a sección "+(i+1));
      dot.addEventListener("click", ()=> goTo(i));
      rail.appendChild(dot);
    });
    dots = Array.from(rail.children);

    rail.classList.add("visible");
    indicator.classList.add("visible");
    document.getElementById("page-nav").classList.add("visible");

    document.getElementById("nav-prev").addEventListener("click", ()=> goTo(currentIndex-1));
    document.getElementById("nav-next").addEventListener("click", ()=> goTo(currentIndex+1));

    document.addEventListener("keydown", (e)=>{
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      if(tag === "INPUT" || tag === "TEXTAREA") return;
      if(gateIsOpen()) return;
      if(e.key === "ArrowRight" || e.key === "ArrowDown"){ e.preventDefault(); goTo(currentIndex+1); }
      if(e.key === "ArrowLeft" || e.key === "ArrowUp"){ e.preventDefault(); goTo(currentIndex-1); }
    });

    const mainEl = document.getElementById("main");
    mainEl.addEventListener("wheel", (e)=>{
      if(wheelLocked || gateIsOpen()) return;
      const sec = sections[currentIndex];
      const atTop = sec.scrollTop <= 2;
      const atBottom = sec.scrollTop + sec.clientHeight >= sec.scrollHeight - 2;
      if(e.deltaY > 12 && atBottom){ wheelLocked = true; goTo(currentIndex+1); setTimeout(()=> wheelLocked=false, 700); }
      else if(e.deltaY < -12 && atTop){ wheelLocked = true; goTo(currentIndex-1); setTimeout(()=> wheelLocked=false, 700); }
    }, {passive:true});

    let touchStartY = null;
    mainEl.addEventListener("touchstart", (e)=>{ touchStartY = e.touches[0].clientY; }, {passive:true});
    mainEl.addEventListener("touchend", (e)=>{
      if(touchStartY === null || gateIsOpen()) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      const sec = sections[currentIndex];
      const atTop = sec.scrollTop <= 2;
      const atBottom = sec.scrollTop + sec.clientHeight >= sec.scrollHeight - 2;
      if(Math.abs(dy) > 60){
        if(dy > 0 && atBottom) goTo(currentIndex+1);
        else if(dy < 0 && atTop) goTo(currentIndex-1);
      }
      touchStartY = null;
    }, {passive:true});

    const startIndex = (state.currentPage && state.currentPage < sections.length) ? state.currentPage : 0;
    currentIndex = startIndex;
    sections[startIndex].classList.add("active");
    dots.forEach((d,i)=> d.classList.toggle("active", i===currentIndex));
    indicator.textContent = String(currentIndex+1).padStart(2,"0") + " / " + String(sections.length).padStart(2,"0");
    updateNavButtons();
    triggerReveal(sections[currentIndex]);
    sections[currentIndex].dispatchEvent(new CustomEvent("page:activated"));
  }

  /* ---------------------------------------------------------------
     2. LÍNEA DE TIEMPO (horizontal)
  --------------------------------------------------------------- */
  function renderTimeline(){
    const wrap = document.getElementById("timeline");
    CFG.lineaDeTiempo.forEach((item, i)=>{
      const el = document.createElement("div");
      const isMystery = item.titulo === "???";
      el.className = "tlh-item reveal" + (isMystery ? " tlh-mystery" : "");
      el.innerHTML = `
        <div class="tlh-dot">${item.icono || "♡"}</div>
        <div class="tlh-date">${item.fecha}</div>
        <div class="tlh-card glass">
          <h3 class="tlh-title">${item.titulo}</h3>
          ${item.texto ? `<p class="tlh-text">${item.texto}</p>` : ""}
        </div>
      `;
      if(i === 1){
        el.querySelector(".tlh-date").addEventListener("dblclick", ()=> foundEgg("timeline","Encontraste un recuerdo escondido en nuestra línea de tiempo."));
        el.querySelector(".tlh-date").style.cursor = "pointer";
      }
      wrap.appendChild(el);
    });
  }

  /* ---------------------------------------------------------------
     3. ÁLBUM DE FOTOS (polaroid)
  --------------------------------------------------------------- */
  function renderAlbum(){
    const wrap = document.getElementById("album");
    const decorPool = ["📎","🎀","🌷",null,null];
    CFG.recuerdos.forEach((m, i)=>{
      const card = document.createElement("div");
      card.className = "flip-card";
      const bgStyle = m.foto ? `style="background-image:url('${m.foto}')"` : "";
      const decor = decorPool[i % decorPool.length];
      let decorHtml = "";
      if(decor === "📎") decorHtml = `<span class="flip-deco dc-clip">📎</span>`;
      if(decor === "🎀") decorHtml = `<span class="flip-deco dc-tape">🎀</span>`;
      if(decor === "🌷") decorHtml = `<span class="flip-deco dc-flower">🌷</span>`;
      card.innerHTML = `
        ${decorHtml}
        <div class="flip-inner">
          <div class="flip-face flip-front">
            <div class="ph-img" ${bgStyle}>${m.foto ? "" : "Foto"}</div>
            <div class="ph-cap">
              <div class="cap-title">${m.titulo}</div>
            </div>
          </div>
          <div class="flip-face flip-back">
            <p>${m.frase}</p>
            <span class="heart">♡</span>
          </div>
        </div>
      `;
      card.addEventListener("click", ()=> card.classList.toggle("flipped"));
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------
     5. 30 RAZONES (todas disponibles desde el inicio)
  --------------------------------------------------------------- */
  function renderDays(){
    const grid = document.getElementById("days-grid");
    const heartWrap = document.getElementById("day-30-wrap");
    const total = CFG.treintaRazones.length;

    CFG.treintaRazones.forEach((texto, i)=>{
      const num = i+1;
      if(num === total) return; // el último se renderiza aparte, como corazón
      const opened = !!state.daysOpened[num];
      const card = document.createElement("div");
      card.className = "day-card" + (opened ? " open":"");
      card.innerHTML = opened
        ? `<span class="day-text">${texto}</span>`
        : `<span class="day-num">${String(num).padStart(2,"0")}</span><span class="day-lock">♡</span>`;
      card.addEventListener("click", ()=>{
        if(state.daysOpened[num]) return;
        state.daysOpened[num] = true; saveState();
        card.classList.add("open");
        card.innerHTML = `<span class="day-text">${texto}</span>`;
      });
      grid.appendChild(card);
    });

    // día 30, con forma de corazón
    const lastText = CFG.treintaRazones[total-1];
    const openedLast = !!state.daysOpened[total];
    const heart = document.createElement("div");
    heart.className = "day-30-heart" + (openedLast ? " open" : "");
    heart.innerHTML = `
      <div class="day-30-inner">
        <span class="day-num">${total}</span>
        <span class="day-lock">♡</span>
        <span class="day-text">${lastText}</span>
      </div>
    `;
    heart.addEventListener("click", ()=>{
      if(state.daysOpened[total]) return;
      state.daysOpened[total] = true; saveState();
      heart.classList.add("open");
      sparkleBurst();
    });
    heartWrap.appendChild(heart);
  }

  /* ---------------------------------------------------------------
     6. CARTA — el sobre es el propio botón, abre y cierra
  --------------------------------------------------------------- */
  function initLetter(){
    const envelope = document.getElementById("envelope");
    const sheet = document.getElementById("letter-sheet");
    const seal = document.getElementById("env-seal");
    seal.textContent = CFG.selloIniciales + " ♡";
    let opened = false;
    let typedOnce = false;

    function open(){
      opened = true;
      envelope.classList.add("open");
      setTimeout(()=>{
        sheet.classList.add("show");
        if(!typedOnce){
          typedOnce = true;
          typeText(sheet, CFG.carta);
        }else{
          sheet.textContent = CFG.carta;
        }
      }, 450);
    }
    function close(){
      opened = false;
      envelope.classList.remove("open");
      sheet.classList.remove("show");
    }
    envelope.addEventListener("click", ()=> opened ? close() : open());
    sheet.addEventListener("click", close);
  }
  function typeText(el, text){
    el.textContent = "";
    let i = 0;
    const speed = 14;
    (function step(){
      if(i <= text.length){
        el.textContent = text.slice(0,i);
        i += 3;
        requestAnimationFrame(()=> setTimeout(step, speed));
      }
    })();
  }

  /* ---------------------------------------------------------------
     7. REGALOS + ADIVINANZAS (fusionados)
  --------------------------------------------------------------- */
  function normalizeAnswer(s){
    return s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  }
  function renderGiftsAndRiddles(){
    const teaserWrap = document.getElementById("gift-teasers");
    const riddleWrap = document.getElementById("riddles");

    // teasers: aparecen de a uno, y se "iluminan" al resolverse
    CFG.regalos.forEach((g,i)=>{
      const t = document.createElement("div");
      t.className = "gift-teaser" + (state.riddlesSolved[i] ? " opened" : "");
      t.textContent = g.icono;
      t.id = "gift-teaser-"+i;
      teaserWrap.appendChild(t);
    });
    // el desfile de aparición se dispara cuando la página se activa,
    // no en la carga inicial (que puede ocurrir mucho antes de que la vea)
    document.getElementById("gifts-section").addEventListener("page:activated", ()=>{
      CFG.regalos.forEach((g,i)=>{
        const t = document.getElementById("gift-teaser-"+i);
        t.classList.remove("show");
        void t.offsetWidth;
        setTimeout(()=> t.classList.add("show"), 300 + i*450);
      });
    });

    const firstUnsolved = state.riddlesSolved.findIndex(v=>!v);
    const showUpTo = firstUnsolved === -1 ? CFG.regalos.length-1 : firstUnsolved;

    CFG.regalos.forEach((g,i)=>{
      const card = document.createElement("div");
      card.className = "riddle-card glass reveal" + (state.riddlesSolved[i] ? " solved":"") + (i>showUpTo ? " hidden-riddle":"");
      card.innerHTML = `
        <p class="rq">${g.icono} ${g.pregunta}</p>
        <div class="riddle-input-row">
          <input type="text" placeholder="Tu respuesta" ${state.riddlesSolved[i] ? "disabled":""}>
          <button class="btn-secondary">Responder</button>
        </div>
        ${g.pista ? `<button class="riddle-hint-btn">¿Necesitas una pista?</button><p class="riddle-feedback hint-text" style="display:none;">${g.pista}</p>`:""}
        <p class="riddle-feedback"></p>
        <div class="riddle-gift-reveal ${state.riddlesSolved[i] ? "show":""}">
          <p class="g-name">${g.icono} ${g.nombre}</p>
          <p class="g-detail">${g.descripcion}</p>
          <p class="g-msg">${g.mensaje}</p>
        </div>
      `;
      const input = card.querySelector("input");
      const btn = card.querySelector(".btn-secondary");
      const feedback = card.querySelector(".rq").parentElement.querySelector(".riddle-feedback:not(.hint-text)");
      const hintBtn = card.querySelector(".riddle-hint-btn");
      const giftReveal = card.querySelector(".riddle-gift-reveal");
      if(hintBtn){
        hintBtn.addEventListener("click", ()=>{
          const hintText = card.querySelector(".hint-text");
          hintText.style.display = hintText.style.display === "none" ? "block":"none";
        });
      }
      function trySolve(){
        if(state.riddlesSolved[i]) return;
        const val = normalizeAnswer(input.value);
        const ok = g.respuestas.some(a=> normalizeAnswer(a) === val);
        if(ok){
          state.riddlesSolved[i] = true; saveState();
          card.classList.add("solved");
          input.disabled = true;
          giftReveal.classList.add("show");
          const teaser = document.getElementById("gift-teaser-"+i);
          if(teaser) teaser.classList.add("opened");
          sparkleBurst();
          const next = riddleWrap.children[i+1];
          if(next){
            next.classList.remove("hidden-riddle");
            requestAnimationFrame(()=> next.classList.add("in"));
          }
          checkAllComplete();
        }else{
          feedback.textContent = "No es eso… inténtalo de nuevo.";
          feedback.className = "riddle-feedback no";
          input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
        }
      }
      btn.addEventListener("click", trySolve);
      input.addEventListener("keydown", e=>{ if(e.key==="Enter"){ e.preventDefault(); trySolve(); }});
      riddleWrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------
     9. MÚSICA
  --------------------------------------------------------------- */
  const audio = document.getElementById("bg-audio");
  function initMusic(){
    const player = document.getElementById("music-player");
    const toggle = document.getElementById("music-toggle");
    const vol = document.getElementById("music-volume");
    const name = document.getElementById("music-name");
    audio.src = CFG.musica.archivo;
    audio.volume = parseFloat(vol.value);
    name.textContent = CFG.musica.nombre;
    player.classList.add("visible");

    toggle.addEventListener("click", ()=>{
      if(audio.paused){
        audio.play().then(()=>{
          toggle.textContent = "❚❚";
          player.classList.add("playing");
          state.musicWasPlaying = true; saveState();
        }).catch(()=>{});
      }else{
        audio.pause();
        toggle.textContent = "▶";
        player.classList.remove("playing");
        state.musicWasPlaying = false; saveState();
      }
    });
    vol.addEventListener("input", ()=> audio.volume = parseFloat(vol.value));
  }
  function tryAutoplayMusic(){
    audio.play().then(()=>{
      document.getElementById("music-toggle").textContent = "❚❚";
      document.getElementById("music-player").classList.add("playing");
      state.musicWasPlaying = true; saveState();
    }).catch(()=>{});
  }
  function startMusicIfWasPlaying(){
    if(state.musicWasPlaying){
      audio.play().then(()=>{
        document.getElementById("music-toggle").textContent = "❚❚";
        document.getElementById("music-player").classList.add("playing");
      }).catch(()=>{});
    }
  }
  function lowerMusicForFinal(){
    if(!audio.paused){
      const start = audio.volume;
      let t = 0;
      const fade = setInterval(()=>{
        t += 0.05;
        audio.volume = Math.max(0, start * (1-t));
        if(t>=1) clearInterval(fade);
      }, 120);
    }
  }

  /* ---------------------------------------------------------------
     9. MISTERIO (VIDEO)
  --------------------------------------------------------------- */
  function initMystery(){
    const trigger = document.getElementById("mystery-trigger");
    const wrap = document.getElementById("mystery-video-wrap");
    const video = document.getElementById("mystery-video");
    const placeholder = document.getElementById("video-placeholder");
    trigger.addEventListener("click", ()=>{
      wrap.classList.add("show");
      trigger.style.transform = "scale(0)";
      trigger.style.opacity = "0";
      state.mysteryOpened = true; saveState();
      checkAllComplete();
      video.src = CFG.video.archivo;
      video.addEventListener("error", ()=>{ placeholder.style.display="flex"; video.style.display="none"; }, {once:true});
      video.addEventListener("loadeddata", ()=>{ placeholder.style.display="none"; video.style.display="block"; }, {once:true});
    });
  }

  /* ---------------------------------------------------------------
     SI PUDIERA VOLVER
  --------------------------------------------------------------- */
  function initVolver(){
    document.getElementById("volver-date").textContent = CFG.fechaPrimerDia;
    const textEl = document.getElementById("volver-text");
    textEl.textContent = CFG.textoPrimerDia;
    let played = false;
    document.getElementById("volver").addEventListener("page:activated", ()=>{
      if(played) return;
      played = true;
      setTimeout(()=> textEl.classList.add("show"), 500);
    });
  }

  /* ---------------------------------------------------------------
     RAZONES POR LAS QUE TE QUIERO
  --------------------------------------------------------------- */
  function renderReasons(){
    const wrap = document.getElementById("reasons-grid");
    CFG.razonesPorLasQueTeQuiero.forEach((r)=>{
      const card = document.createElement("div");
      card.className = "reason-card glass reveal";
      card.textContent = r;
      wrap.appendChild(card);
    });
  }

  /* ---------------------------------------------------------------
     FINAL
  --------------------------------------------------------------- */
  function initFinal(){
    const l1 = document.getElementById("final-line-1");
    const l2 = document.getElementById("final-line-2");
    const actions = document.getElementById("final-actions");
    const response = document.getElementById("final-response");
    const yesBtn = document.getElementById("final-yes");
    l1.textContent = CFG.finalLinea1;
    l2.textContent = CFG.finalLinea2;
    yesBtn.textContent = "🎀 " + CFG.botonFinal;

    let played = false;
    document.getElementById("final").addEventListener("page:activated", ()=>{
      if(played) return;
      played = true;
      lowerMusicForFinal();
      setTimeout(()=> l1.classList.add("show"), 400);
      setTimeout(()=> l2.classList.add("show"), 2000);
      setTimeout(()=> actions.classList.add("show"), 3400);
    });

    yesBtn.addEventListener("click", ()=>{
      response.textContent = CFG.mensajeFinalRevelado;
      sparkleBurst();
      foundEgg("final","Encontraste el último secreto: gracias por llegar hasta aquí.");
    });
  }

  /* ---------------------------------------------------------------
     EASTER EGGS
  --------------------------------------------------------------- */
  function foundEgg(key, message){
    if(state.eggsFound[key]) return;
    state.eggsFound[key] = true; saveState();
    showEggToast(message);
  }
  function showEggToast(message){
    const toast = document.getElementById("egg-toast");
    toast.textContent = "✦ " + message;
    toast.classList.add("show");
    setTimeout(()=> toast.classList.remove("show"), 4200);
  }
  function initEggHero(){
    document.getElementById("egg-hero-heart").addEventListener("click", ()=>{
      foundEgg("hero","Encontraste un corazón escondido. Hay más por descubrir.");
    });
  }
  function checkAllComplete(){
    const allRiddles = state.riddlesSolved.every(Boolean);
    if(allRiddles && state.mysteryOpened){
      showEggToast("Completaste toda la experiencia. Eso dice mucho de nosotros ❤️");
    }
  }

  /* ---------------------------------------------------------------
     INICIO
  --------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function(){
    initParticles();
    renderTimeline();
    renderAlbum();
    renderDays();
    initLetter();
    renderGiftsAndRiddles();
    initMusic();
    initMystery();
    initVolver();
    renderReasons();
    initFinal();
    initEggHero();
    initNav();
    initGate();
  });

})();
