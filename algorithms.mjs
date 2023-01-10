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

export function selectionSort(array) {
  let moves = []
  for (let i = 0; i < array.length; i++) {
    let lowest = i
    for (let j = i + 1; j < array.length; j++) {
      moves.push({ indeces: [i, lowest], j, type: 'comp' })
      if (array[lowest] > array[j]) {
        lowest = j
        moves.push({ indeces: [i, lowest], j, type: 'comp' })
      }
    }

    if (i !== lowest) {
      moves.push({ indeces: [i, lowest], type: 'swap' })
      ;[array[i], array[lowest]] = [array[lowest], array[i]]
    }
  }

  return moves
}

export function insertionSort(arr) {
  let moves = []
  let currentVal
  for (let i = 1; i < arr.length; i++) {
    currentVal = arr[i]
    let j = i - 1
    moves.push({ indeces: [j, i], type: 'comp' })

    while (j >= 0 && arr[j] > currentVal) {
      moves.push({ indeces: [j + 1, j], type: 'swap' })
      ;[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      j--
    }
  }
  return moves
}
