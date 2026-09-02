/* ============================================================
   MOComm MLS — hero search
   This is a client-side stub. There is no listings backend wired
   up yet, so submitting the search just validates the inputs and
   redirects to search-results.html with the chosen filters as
   query-string parameters (?location=...&type=...).

   To connect this to a real MLS/listings feed, replace the
   RESULTS_PAGE redirect below with a fetch() call to your search
   API, or point it at whatever results route your backend serves.
   ============================================================ */

(function () {
  var RESULTS_PAGE = 'search-results.html';

  document.addEventListener('DOMContentLoaded', function () {
    var searchBtn = document.querySelector('.search-btn');
    var locationInput = document.getElementById('loc');
    var propertyTypeSelect = document.getElementById('ptype');

    if (!searchBtn || !locationInput || !propertyTypeSelect) return;

    function clearError() {
      locationInput.style.borderColor = '';
    }

    function runSearch() {
      var location = locationInput.value.trim();
      var propertyType = propertyTypeSelect.value;

      // Require at least one filter before searching
      if (!location && !propertyType) {
        locationInput.style.borderColor = '#c0392b';
        locationInput.focus();
        return;
      }

      var params = new URLSearchParams();
      if (location) params.set('location', location);
      if (propertyType) params.set('type', propertyType);

      window.location.href = RESULTS_PAGE + '?' + params.toString();
    }

    searchBtn.addEventListener('click', runSearch);

    // Allow submitting with Enter from either field
    [locationInput, propertyTypeSelect].forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') runSearch();
      });
    });

    locationInput.addEventListener('input', clearError);
  });
})();