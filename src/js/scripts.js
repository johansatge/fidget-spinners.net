(function(window, document)
{

  var module = {}

  module.init = function() {
    var search = document.querySelector('.js-search');
    search.addEventListener('input', _onSearch);
    document.querySelector('.js-sort-select').addEventListener('change', _onSort);
    document.addEventListener('scroll', _onScroll);

    _onSort();
    _onScroll();
    search.focus();
  };

  var _onSearch = function(evt) {
    var search = evt.currentTarget.value.toLowerCase();
    [].forEach.call(document.querySelectorAll('.js-item'), function(item) {
      var itemValue = item.getAttribute('data-search');
      item.style.display = search.length === 0 || itemValue.search(search) > -1 ? 'inline-block' : 'none';
    });
  };

  var _onSort = function() {
    var select = document.querySelector('.js-sort-select');
    var label = document.querySelector('.js-sort-label');
    label.innerHTML = select.options[select.selectedIndex].innerHTML;
  }

  var _onScroll = function(evt) {
    var windowHeight = window.innerHeight;
    var images = document.querySelectorAll('.js-lazy[data-src-lazy]');
    if (images.length === 0) {
      document.removeEventListener('scroll', _onScroll);
      return;
    }
    [].forEach.call(images, function(image) {
      var boundings = image.getBoundingClientRect();
      if (boundings.top >= 0 && boundings.top < windowHeight) {
        image.src = image.getAttribute('data-src-lazy')
        image.removeAttribute('data-src-lazy')
      }
    });
  }

  window.App = module;

})(window, document)
