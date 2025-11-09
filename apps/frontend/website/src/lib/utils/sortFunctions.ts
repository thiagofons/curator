/**
 * Sorts posts/items descending by `data.date` field (newest first).
 */
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort(
    (a: any, b: any) =>
      new Date(b.data.date && b.data.date).valueOf() -
      new Date(a.data.date && a.data.date).valueOf(),
  )
  return sortedArray
}

/**
 * Sorts items by ascending `data.weight` keeping unweighted items after.
 */
export const sortByWeight = (array: any[]) => {
  const withWeight = array.filter(
    (item: {
      data: {
        weight: any
      }
    }) => item.data.weight,
  )
  const withoutWeight = array.filter(
    (item: {
      data: {
        weight: any
      }
    }) => !item.data.weight,
  )
  const sortedWeightedArray = withWeight.sort(
    (
      a: {
        data: {
          weight: number
        }
      },
      b: {
        data: {
          weight: number
        }
      },
    ) => a.data.weight - b.data.weight,
  )
  const sortedArray = [
    ...new Set([
      ...sortedWeightedArray,
      ...withoutWeight,
    ]),
  ]
  return sortedArray
}
