// implements bubble-sort algorithm
export function bubbleSort(array) {
  const moves = []
  let noSwaps

  for (let i = array.length; i > 0; i--) {
    noSwaps = true

    for (let j = 0; j < i - 1; j++) {
      moves.push({ indeces: [j, j + 1], type: 'comp' })

      if (array[j] > array[j + 1]) {
        moves.push({ indeces: [j, j + 1], type: 'swap' })
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        noSwaps = false
      }
    }

    if (noSwaps) break
  }

  return moves
}

// implements selection-sort algorithm
export function selectionSort(array) {
  let moves = []

  for (let i = 0; i < array.length; i++) {
    let lowest = i

    for (let j = i + 1; j < array.length; j++) {
      moves.push({ indeces: [i, lowest], j, type: 'comp' })

      if (array[lowest] > array[j]) {
        lowest = j
      }
    }

    if (i !== lowest) {
      moves.push({ indeces: [i, lowest], type: 'swap' })
      ;[array[i], array[lowest]] = [array[lowest], array[i]]
    }
  }

  return moves
}

// implements insertion-sort algorithms
export function insertionSort(array) {
  let moves = []
  let currentVal

  for (let i = 1; i < array.length; i++) {
    currentVal = array[i]
    let j = i - 1
    moves.push({ indeces: [j, i], type: 'comp' })

    while (j >= 0 && array[j] > currentVal) {
      moves.push({ indeces: [j, j + 1], type: 'comp' })
      moves.push({ indeces: [j + 1, j], type: 'swap' })
      ;[array[j + 1], array[j]] = [array[j], array[j + 1]]
      j--
    }
  }

  return moves
}

// implements merge-sort algorithms
export function mergeSort(array, moves_m = []) {
  if (array.length <= 0) return array
  let auxiliaryArray = [...array]

  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, moves_m)
  return moves_m
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, moves_m) {
  if (startIdx === endIdx) return
  let middleIdx = startIdx + Math.floor((endIdx - startIdx) / 2)

  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, moves_m)
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, moves_m)
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, moves_m)
}

// merge-sort helper function - sorts array in place given start/end indeces using auxilliary array
function merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, moves_m) {
  let replace = []
  let k = startIdx
  let i = startIdx
  let j = middleIdx + 1

  while (i <= middleIdx && j <= endIdx) {
    moves_m.push({ indeces: [i, j], type: 'comp' })

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      mainArray[k] = auxiliaryArray[i]

      replace.push({ indeces: [k], newVal: auxiliaryArray[i], type: 'replace' })
      i++
    } else {
      mainArray[k] = auxiliaryArray[j]

      replace.push({ indeces: [k], newVal: auxiliaryArray[j], type: 'replace' })
      j++
    }

    k++
  }

  while (i <= middleIdx) {
    mainArray[k] = auxiliaryArray[i]
    replace.push({ indeces: [k], newVal: auxiliaryArray[i], type: 'replace' })
    i++
    k++
  }

  while (j <= endIdx) {
    mainArray[k] = auxiliaryArray[j]
    replace.push({ indeces: [k], newVal: auxiliaryArray[j], type: 'replace' })
    j++
    k++
  }

  moves_m.push(...replace)
}

// quick-sort helper function - places first array item in correct (sorted) place and returns the index
function pivot(arr, start = 0, end = arr.length - 1, moves_q) {
  let swapIdx = start

  for (let i = start + 1; i <= end; i++) {
    moves_q.push({ indeces: [start, i, swapIdx], start, swapIdx, type: 'comp' })

    if (arr[i] < arr[start]) {
      swapIdx++
      ;[arr[swapIdx], arr[i]] = [arr[i], arr[swapIdx]]

      moves_q.push({ indeces: [swapIdx, i], start, swapIdx, type: 'swap', finalSwap: false })
    }
  }

  ;[arr[start], arr[swapIdx]] = [arr[swapIdx], arr[start]]
  moves_q.push({ indeces: [swapIdx, start], start, swapIdx, type: 'swap', finalSwap: true })
  return swapIdx
}

// implements quick-sort algorithm
export function quickSort(arr, left = 0, right = arr.length - 1, moves_q = []) {
  if (left >= right) return
  let pivotIdx = pivot(arr, left, right, moves_q)

  quickSort(arr, left, pivotIdx - 1, moves_q)
  quickSort(arr, pivotIdx + 1, right, moves_q)
  return moves_q
}
