import { sortBy } from './sort.js'

const m = {}
let isLazyLoadDone = false

m.init = () => {
  const search = document.querySelector('.js-search')
  search.addEventListener('input', onSearch)
  document.querySelector('.js-sort-select').addEventListener('change', onSort)
  window.addEventListener('scroll', onLazyLoad)
  window.addEventListener('resize', onLazyLoad)
  window.addEventListener('load', onLazyLoad)

  search.focus()
}

const onSearch = (evt) => {
  const search = evt.currentTarget.value.toLowerCase()
  const noResults = document.querySelector('.js-items-noresults')
  const count = document.querySelector('.js-count')
  let visibleItems = 0
  forEach(document.querySelectorAll('.js-item'), (item) => {
    const itemValue = item.getAttribute('data-search')
    if (search.length === 0 || itemValue.search(search) > -1) {
      item.style.display = 'inline-block'
      visibleItems += 1
    }
    else {
      item.style.display = 'none'
    }
  })
  noResults.style.display = visibleItems === 0 ? 'block' : 'none'
  count.innerHTML = count.getAttribute('data-template').replace('$1', visibleItems)
  if (!isLazyLoadDone) {
    onLazyLoad()
  }
}

const onSort = () => {
  const select = document.querySelector('.js-sort-select')
  const label = document.querySelector('.js-sort-label')
  label.innerHTML = select.options[select.selectedIndex].innerHTML
  let sortedItems = []
  forEach(document.querySelectorAll('.js-item'), (item) => {
    sortedItems.push(item)
  })
  sortedItems = sortBy([select.value], sortedItems)
  const items = document.querySelector('.js-items')
  sortedItems.map((item) => {
    items.appendChild(item)
  })
  if (!isLazyLoadDone) {
    onLazyLoad()
  }
}

const onLazyLoad = () => {
  const images = document.querySelectorAll('.js-lazy[data-src-lazy]')
  if (images.length === 0) {
    isLazyLoadDone = true
    window.removeEventListener('scroll', onLazyLoad)
    window.removeEventListener('resize', onLazyLoad)
    return
  }
  const windowHeight = window.innerHeight
  const isRetina = window.retina || window.devicePixelRatio > 1
  forEach(images, (image) => {
    const boundings = image.getBoundingClientRect()
    let needsLazyLoad = false
    if (boundings.top > 0 && boundings.top < windowHeight) {
      needsLazyLoad = true
    }
    if (boundings.top + boundings.height > 0 && boundings.top + boundings.height < windowHeight) {
      needsLazyLoad = true
    }
    if (needsLazyLoad) {
      image.addEventListener('load', onLazyLoaded)
      image.src = image.getAttribute(isRetina ? 'data-src-lazy-2x' : 'data-src-lazy')
      image.removeAttribute('data-src-lazy')
      image.removeAttribute('data-src-lazy-2x')
    }
  })
}

const onLazyLoaded = (evt) => {
  evt.currentTarget.classList.remove('js-lazy-hidden')
  evt.currentTarget.removeEventListener('load', onLazyLoaded)
}

const forEach = (array, callback, scope) => {
  for (let index = 0; index < array.length; index += 1) {
    callback.call(scope, array[index])
  }
}

module.exports = m
