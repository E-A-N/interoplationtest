module.exports = (numbers) => {
    //Return value of the only number if there isn't list of numbers
    if (numbers.length < 2){
        return numbers[0];
    }

    let median;
    numbers = numbers.sort((a,b) => {
        return a - b;
    });

    const evenAmountOfNumbers = numbers.length % 2 === 0;

    if (evenAmountOfNumbers){
        const lowerMidNumber = numbers[(numbers.length/2) - 1]
        const higherMidNumber = numbers[(numbers.length/2)];

        median = (lowerMidNumber + higherMidNumber)/2;
    }
    else {
        median = numbers[((numbers.length+1) / 2) - 1];
    }

    return median;
}
