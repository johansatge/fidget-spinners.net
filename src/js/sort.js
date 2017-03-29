export const sortBy = (type, items) => {
  if (sortHelpers[type]) {
    return items.sort(sortHelpers[type])
  }
  return items
}

const sortHelpers = {
  brand : (a, b) => {
    const aBrand = a.getAttribute('data-Brand')
    const bBrand = b.getAttribute('data-Brand')
    if (aBrand === bBrand) {
      return sortHelpers.name_az(a, b)
    }
    return aBrand > bBrand ? 1 : (aBrand < bBrand ? -1 : 0)
  },
  price_asc : (a, b) => {
    const aPrice = parseInt(a.getAttribute('data-price'))
    const bPrice = parseInt(b.getAttribute('data-price'))
    if (aPrice === bPrice) {
      return sortHelpers.name_az(a, b)
    }
    return aPrice > bPrice || aPrice === -1 ? 1 : (aPrice < bPrice || bPrice === -1 ? -1 : 0)
  },
  price_desc : (a, b) => {
    const aPrice = parseInt(a.getAttribute('data-price'))
    const bPrice = parseInt(b.getAttribute('data-price'))
    if (aPrice === bPrice) {
      return sortHelpers.name_az(a, b)
    }
    return aPrice < bPrice || aPrice === -1 ? 1 : (aPrice > bPrice || bPrice === -1 ? -1 : 0)
  },
  name_az : (a, b) => {
    const aName = a.getAttribute('data-name')
    const bName = b.getAttribute('data-name')
    return aName > bName ? 1 : (aName < bName ? -1 : 0)
  },
  name_za : (a, b) => {
    const aName = a.getAttribute('data-name')
    const bName = b.getAttribute('data-name')
    return aName > bName ? -1 : (aName < bName ? 1 : 0)
  },
  added_newest : (a, b) => {
    const aAdded = a.getAttribute('data-added')
    const bAdded = b.getAttribute('data-added')
    if (aAdded === bAdded) {
      return sortHelpers.name_az(a, b)
    }
    return aAdded < bAdded ? 1 : (aAdded > bAdded ? -1 : 0)
  },
  added_oldest : (a, b) => {
    const aAdded = a.getAttribute('data-added')
    const bAdded = b.getAttribute('data-added')
    if (aAdded === bAdded) {
      return sortHelpers.name_az(a, b)
    }
    return aAdded > bAdded ? 1 : (aAdded < bAdded ? -1 : 0)
  },
}
