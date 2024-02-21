export function removeIdFromArray(arr, idToRemove) {
    const indexToRemove = arr.findIndex(obj => obj.id === idToRemove);
  
    if (indexToRemove !== -1) {
      arr.splice(indexToRemove, 1);
    }

    return arr;
  }