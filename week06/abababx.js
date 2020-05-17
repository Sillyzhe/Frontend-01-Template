function match(string) {
    let state = start;
    for (let c of string) {
        state = state(c)
    }
    return state === end;
}

let countA = 0,
    countB = 0;

function start(c) {
    if (c == "a") {
        // foundA(c)
        ++countA
        return foundA
    } else {
        return start
    }
}


function foundA(c) {
    if (c == "b") {
        ++countB
        if(countA==3&&countB==3){
            return foundX
        }
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
    if(c=="x"){
    // if (c == "x") {
        return end
    } else {
        return start(c)
    }
}

function end(c) {
    return end
}

console.log(match('abababx'))