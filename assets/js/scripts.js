(function(window, document)
{

  var module = {}

  module.init = function() {
    document.querySelector('.js-search').addEventListener('input', _onSearch);
  };

  var _onSearch = function(evt) {
    var search = evt.currentTarget.value.toLowerCase()
    var items = document.querySelectorAll('.js-item');
    [].forEach.call(items, function(item) {
      var itemValue = item.getAttribute('data-search');
      item.style.display = itemValue.search(search) > -1 ? 'block' : 'none';
    });
  };

  window.App = module;

})(window, document)
