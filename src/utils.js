const CHUNK = parseInt(process.env.CHUNK, 10)
let tries

const makeChunks = (array) => {
  let i, j
  let output = []
  for (i = 0, j = array.length; i < j; i += CHUNK) {
    output.push(array.slice(i, i + CHUNK))
  }
  return output
}

const makeSequentialArray = (size) => {
  return Array
    .apply(null, {length: size})
    .map(Number.call, Number)
    .map((i) => i + 1)
}

const runTasksInBatchesWithRetry = async (params, task) => {
  tries = 3
  const paramsInChunks = makeChunks(params)
  let i, j
  for (i = 0, j = paramsInChunks.length; i < j; i++) {
    console.log('  - batch %s of %s', i + 1, j)
    try {
      await task(paramsInChunks[i])
    } catch(e) {
      if (tries) {
        console.log('  ** retrying **')
        i--
        tries--
      } else {
        throw e
      }
    }
  }
}

module.exports = {
  makeChunks,
  makeSequentialArray,
  runTasksInBatchesWithRetry
}
