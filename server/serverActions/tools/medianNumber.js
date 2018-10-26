module.export = (numbers) => {
    let median;
    if (numbers.length < 2){
        return numbers[0];
    }
    numbers = numbers.sort((a,b) => {
        return a - b;
    });

    const isEvenNumber = numbers.length % 2 === 0;

    if (isEvenNumber){
        const central1 = numbers[(numbers.length/2) - 1]
        const central2 = numbers[(numbers.length/2)];

        median = (central1 + central2)/2;
    }
    else {
        median = numbers[((numbers.length+1) / 2) - 1];
    }

    return median;
}
