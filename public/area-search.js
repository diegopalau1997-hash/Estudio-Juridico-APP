// Buscador por palabra clave, reusado en el Home ("Áreas de práctica") y en el selector de
// WhatsApp por tema. Cada [data-search-scope] contiene un input, ítems [data-searchable] con
// su [data-search-index] ya normalizado (ver searchIndex() en src/lib/whatsapp.ts) y,
// opcionalmente, un mensaje [data-search-empty] para "sin resultados".
(function () {
  function normalizar(s) {
    return (s || '')
      .toLowerCase()
      .replace(/[áàâã]/g, 'a')
      .replace(/[éèê]/g, 'e')
      .replace(/[íìî]/g, 'i')
      .replace(/[óòôõ]/g, 'o')
      .replace(/[úùû]/g, 'u')
      .replace(/ñ/g, 'n');
  }

  function wire(scope) {
    var input = scope.querySelector('[data-area-search-input]');
    var items = scope.querySelectorAll('[data-searchable]');
    var empty = scope.querySelector('[data-search-empty]');
    if (!input || !items.length) return;

    input.addEventListener('input', function () {
      var q = normalizar(input.value.trim());
      var anyVisible = false;
      items.forEach(function (item) {
        var idx = normalizar(item.getAttribute('data-search-index') || item.textContent);
        var match = !q || idx.indexOf(q) !== -1;
        item.hidden = !match;
        if (match) anyVisible = true;
      });
      if (empty) empty.hidden = anyVisible || !q;
    });
  }

  document.querySelectorAll('[data-search-scope]').forEach(wire);
})();
