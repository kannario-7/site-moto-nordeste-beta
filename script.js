/* ============================================================
   ARQUIVO: script.js
   SITE: Moto Nordeste BA — Edição Copa do Mundo 2026
   ============================================================
   Funcionalidades:
   1. Contagem regressiva até a final da Copa do Mundo 2026
   2. Animação dos números de estatísticas (hero-stats)
   3. Sombra no header ao rolar a página
   ============================================================ */

console.log("Script Copa do Mundo carregado com sucesso! ⚽");

document.addEventListener("DOMContentLoaded", () => {

  /* ── 1. CONTAGEM REGRESSIVA — FINAL DA COPA 2026 ───────────────
     Data oficial da final: 19 de julho de 2026, 16h (horário de Brasília)
     Para alterar a data, edite a linha abaixo.
  ──────────────────────────────────────────────────────────── */
  const dataFinal = new Date("2026-07-19T16:00:00-03:00").getTime();

  const elDias  = document.getElementById("cd-dias");
  const elHoras = document.getElementById("cd-horas");
  const elMin   = document.getElementById("cd-min");
  const elSeg   = document.getElementById("cd-seg");
  const elLabel = document.querySelector(".countdown-label");

  function atualizarContagem() {
    const agora = new Date().getTime();
    const diferenca = dataFinal - agora;

    if (diferenca <= 0) {
      if (elLabel) elLabel.textContent = "🏆 A grande final já começou!";
      if (elDias)  elDias.textContent  = "00";
      if (elHoras) elHoras.textContent = "00";
      if (elMin)   elMin.textContent   = "00";
      if (elSeg)   elSeg.textContent   = "00";
      clearInterval(intervaloContagem);
      return;
    }

    const dias  = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const min   = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const seg   = Math.floor((diferenca % (1000 * 60)) / 1000);

    if (elDias)  elDias.textContent  = String(dias).padStart(2, "0");
    if (elHoras) elHoras.textContent = String(horas).padStart(2, "0");
    if (elMin)   elMin.textContent   = String(min).padStart(2, "0");
    if (elSeg)   elSeg.textContent   = String(seg).padStart(2, "0");
  }

  // Só inicia se os elementos da contagem existirem na página
  let intervaloContagem;
  if (elDias && elHoras && elMin && elSeg) {
    atualizarContagem();
    intervaloContagem = setInterval(atualizarContagem, 1000);
  }


  /* ── 2. ANIMAÇÃO DOS NÚMEROS (HERO-STATS) ───────────────────────
     Os cards com atributo data-count="..." sobem animados de 0
     até o valor final quando entram na tela.
  ──────────────────────────────────────────────────────────── */
  const statCards = document.querySelectorAll(".stat-card strong[data-count]");

  function animarNumero(el) {
    const alvo = parseInt(el.getAttribute("data-count"), 10);
    const textoOriginal = el.textContent.trim();
    const prefixo = textoOriginal.startsWith("+") ? "+" : "";
    const sufixo  = textoOriginal.includes("%") ? "%"
                  : textoOriginal.toUpperCase().includes("K") ? "K"
                  : "";

    const duracao = 1200; // ms
    const inicio = performance.now();

    function passo(agora) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const valorAtual = Math.floor(progresso * alvo);
      el.textContent = `${prefixo}${valorAtual}${sufixo}`;
      if (progresso < 1) {
        requestAnimationFrame(passo);
      } else {
        el.textContent = `${prefixo}${alvo}${sufixo}`;
      }
    }
    requestAnimationFrame(passo);
  }

  if (statCards.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          animarNumero(entrada.target);
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.4 });

    statCards.forEach((card) => observer.observe(card));
  }


  /* ── 3. SOMBRA NO HEADER AO ROLAR ────────────────────────────── */
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

});