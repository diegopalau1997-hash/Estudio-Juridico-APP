// Dispara el evento GA4 "consulta_enviada" cuando alguien toca cualquier botón de WhatsApp del
// sitio (delegado en document, así funciona con enlaces agregados dinámicamente por el
// round-robin de "Otra consulta"). Requiere que gtag() ya esté cargado (ver BaseLayout.astro).
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me/"]');
    if (!a || typeof window.gtag !== 'function') return;
    window.gtag('event', 'consulta_enviada', {
      tema_consulta: a.getAttribute('data-tema') || 'no especificado',
      responsable: a.getAttribute('data-responsable') || 'no especificado',
    });
  });
})();
