(function(window, document) {

  var module = {}
  var isLazyLoadDone = false

  module.init = function() {
    var search = document.querySelector('.js-search');
    search.addEventListener('input', _onSearch);
    document.querySelector('.js-sort-select').addEventListener('change', _onSort);
    window.addEventListener('scroll', _onLazyLoad);
    window.addEventListener('resize', _onLazyLoad);

    _onSort();
    _onLazyLoad();
    search.focus();
  };

  var _onSearch = function(evt) {
    var search = evt.currentTarget.value.toLowerCase();
    var noResults = document.querySelector('.js-items-noresults');
    var visibleItems = 0;
    [].forEach.call(document.querySelectorAll('.js-item'), function(item) {
      var itemValue = item.getAttribute('data-search');
      if (search.length === 0 || itemValue.search(search) > -1) {
        item.style.display = 'inline-block';
        visibleItems += 1;
      }
      else {
        item.style.display = 'none';
      }
    });
    noResults.style.display = visibleItems === 0 ? 'block' : 'none';
    if (!isLazyLoadDone) {
      _onLazyLoad()
    }
  };

  var _onSort = function() {
    var select = document.querySelector('.js-sort-select');
    var label = document.querySelector('.js-sort-label');
    label.innerHTML = select.options[select.selectedIndex].innerHTML;
    if (!isLazyLoadDone) {
      _onLazyLoad()
    }
  };

  var _onLazyLoad = function() {
    var images = document.querySelectorAll('.js-lazy[data-src-lazy]');
    if (images.length === 0) {
      isLazyLoadDone = true
      window.removeEventListener('scroll', _onLazyLoad);
      window.removeEventListener('resize', _onLazyLoad);
      return;
    }
    var windowHeight = window.innerHeight;
    [].forEach.call(images, function(image) {
      var boundings = image.getBoundingClientRect();
      var needsLazyLoad = false;
      if (boundings.top > 0 && boundings.top < windowHeight) {
        needsLazyLoad = true
      }
      if (boundings.top + boundings.height > 0 && boundings.top + boundings.height < windowHeight) {
        needsLazyLoad = true
      }
      if (needsLazyLoad) {
        image.addEventListener('load', _onLazyLoaded);
        image.src = image.getAttribute('data-src-lazy')
        image.removeAttribute('data-src-lazy')
      }
    });
  }

  var _onLazyLoaded = function() {
    this.classList.remove('js-lazy-hidden');
    this.removeEventListener('load', _onLazyLoaded);
  }

  window.App = module;

})(window, document)
