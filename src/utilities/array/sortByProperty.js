const sortByProperty = ({ originalArray, property, direction = 'asc' }) => {
  if (!property) {
    return originalArray
  }

  const sortedArray = originalArray.toSorted((a, b) => a[property] - b[property])

  if (direction === 'desc') {
    return sortedArray.toReversed()
  }

  return sortedArray
};

export default sortByProperty
