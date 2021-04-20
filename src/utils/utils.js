/** @param {number} ms */
export const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
