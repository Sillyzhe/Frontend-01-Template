function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c)
  }
  return state === end;
}


function start(c) {
  if (c == "a") {
    // foundA(c)
    return foundA01
  } else {
    return start
  }
}


function foundA01(c) {
  if (c == "b") {
    // if(countA==3&&countB==3){
    // console.log(countA)
    // console.log(countB)
    return foundB01
    // }
  } else {
    return start(c)
  }
}

function foundB01(c) {
  if (c == "a") {
    return foundA02
  } else {
    return start(c)
  }
}

function foundA02(c) {
  if (c == "b") {
    return foundB02
  } else {
    return start(c)
  }
}

function foundB02(c) {
  if (c == "a") {
    return foundA03
  } else {
    return start(c)
  }
}

function foundA03(c) {
  if (c == "b") {
    return foundX
  } else {
    return start(c)
  }
}
// function foundB(c) {
//     if (c == "b") {
//         return foundX
//     } else {
//         return start
//     }
// }

function foundX(c) {
  if (c == "x") {
    return end
  } else {
    return start(c)
  }
}

function end(c) {
  return end
}

console.log(match('abababx')) //true
console.log(match('abbababx')) //false
console.log(match('aabababx')) //true
console.log(match('bababx')) //false