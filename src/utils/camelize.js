const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
      return word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export default camelize
