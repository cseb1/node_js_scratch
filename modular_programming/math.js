function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    // if (a > b) {
    //     return a - b;
    // } else {
    //     return b - a;
    // }
    return Math.abs(a - b);
}

// export the function
module.exports = {
    add,
    subtract,
};


// annonomus function

// exports.add1 = (a, b) => a + b;

// exports.sub1 = (a, b) => Math.abs(a - b);