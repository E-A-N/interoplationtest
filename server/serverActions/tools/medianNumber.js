module.export = (numbers) => {
    let median;
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
        median = (numbers.length +1)/2;
    }

    return median;
}
