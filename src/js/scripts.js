(function(window, document) {

  var module = {}
  var isLazyLoadDone = false

  module.init = function() {
    var search = document.querySelector('.js-search');
    search.addEventListener('input', _onSearch);
    document.querySelector('.js-sort-select').addEventListener('change', _onSort);
    window.addEventListener('scroll', _onLazyLoad);
    window.addEventListener('resize', _onLazyLoad);

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
    var sortedItems = [];
    [].forEach.call(document.querySelectorAll('.js-item'), function(item) {
      sortedItems.push(item)
    })
    if (select.value === 'price_asc') {
      sortedItems = sortedItems.sort(_sortByPriceAsc);
    }
    if (select.value === 'price_desc') {
      sortedItems = sortedItems.sort(_sortByPriceDesc);
    }
    if (select.value === 'name_az') {
      sortedItems = sortedItems.sort(_sortByNameAZ);
    }
    if (select.value === 'name_za') {
      sortedItems = sortedItems.sort(_sortByNameZA);
    }
    if (select.value === 'added_newest') {
      sortedItems = sortedItems.sort(_sortByAddedNewest);
    }
    if (select.value === 'added_oldest') {
      sortedItems = sortedItems.sort(_sortByAddedOldest);
    }
    var items = document.querySelector('.js-items');
    sortedItems.map(function(item) {
      items.appendChild(item);
    });
    if (!isLazyLoadDone) {
      _onLazyLoad()
    }
  };

  var _sortByPriceAsc = function(a, b) {
    var aPrice = parseInt(a.getAttribute('data-price'));
    var bPrice = parseInt(b.getAttribute('data-price'));
    if (aPrice === bPrice) {
      return _sortByNameAZ(a, b);
    }
    return aPrice > bPrice || aPrice === -1 ? 1 : (aPrice < bPrice || bPrice === -1 ? -1 : 0);
  }

  var _sortByPriceDesc = function(a, b) {
    var aPrice = parseInt(a.getAttribute('data-price'));
    var bPrice = parseInt(b.getAttribute('data-price'));
    if (aPrice === bPrice) {
      return _sortByNameAZ(a, b);
    }
    return aPrice < bPrice || aPrice === -1 ? 1 : (aPrice > bPrice || bPrice === -1 ? -1 : 0);
  }

  var _sortByNameAZ = function(a, b) {
    var aName = a.getAttribute('data-name');
    var bName = b.getAttribute('data-name');
    return aName > bName ? 1 : (aName < bName ? -1 : 0);
  }

  var _sortByNameZA = function(a, b) {
    var aName = a.getAttribute('data-name');
    var bName = b.getAttribute('data-name');
    return aName > bName ? -1 : (aName < bName ? 1 : 0);
  }

  var _sortByAddedNewest = function(a, b) {
    var aAdded = a.getAttribute('data-added');
    var bAdded = b.getAttribute('data-added');
    if (aAdded === bAdded) {
      return _sortByNameAZ(a, b);
    }
    return aAdded < bAdded ? 1 : (aAdded > bAdded ? -1 : 0);
  }

  var _sortByAddedOldest = function(a, b) {
    var aAdded = a.getAttribute('data-added');
    var bAdded = b.getAttribute('data-added');
    if (aAdded === bAdded) {
      return _sortByNameAZ(a, b);
    }
    return aAdded > bAdded ? 1 : (aAdded < bAdded ? -1 : 0);
  }

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
