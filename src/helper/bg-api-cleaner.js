export const cleanSearch = (searches) => {
  return searches.elements[0].elements.map( search => {
    const id = search.attributes.id;
    const name = search.elements[0].attributes.value;
    return {id, name}
  })
}