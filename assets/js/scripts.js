(function(window, document)
{

  var module = {}

  module.init = function() {
    var search = document.querySelector('.js-search');
    search.addEventListener('input', _onSearch);
    document.querySelector('.js-sort-select').addEventListener('change', _onSort);

    _onSort();
    search.focus();
  };

  var _onSearch = function(evt) {
    var search = evt.currentTarget.value.toLowerCase()
    var items = document.querySelectorAll('.js-item');
    [].forEach.call(items, function(item) {
      var itemValue = item.getAttribute('data-search');
      item.style.display = search.length === 0 || itemValue.search(search) > -1 ? 'block' : 'none';
    });
  };

  var _onSort = function() {
    var select = document.querySelector('.js-sort-select');
    var label = document.querySelector('.js-sort-label');
    label.innerHTML = select.options[select.selectedIndex].innerHTML;
  }

  window.App = module;

})(window, document)
