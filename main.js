// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 0]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 1]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 6]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 7]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 9]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// New card numbers to check here:
const newCard1 = '5128239953649548';
const newCard2 = 40816545377101;
const newCard3 = undefined;
const newCard4 = [6, 0, 1, 1, 5, 1, 2, 7, 1, 8, 1, 2, 1, 1, 2, 0];
const newCard5 = '5018814274776312';
const newCard6 = 3784678584070066;
const newCard7 = '3528170165610333249';
const newCard8 = '6011081842853165825';
const newCard9 = [3, 6, 8, 7, 8, 8, 3, 6, 5, 4, 6, 9, 9, 1];
const newCard10 = '30128356375355';
const newCard11 = undefined;
const newCard12 = '53124792627105644';
const newCard13 = [6, 0, 1, 1, 0, 1, 9, 3, 9, 3, 9, 3, 3, 0, 1, 9];
const newCard14 = '37213946424230502';
const newCard15 = '491733458525306070';

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]
const newBatch = [newCard1, newCard2, newCard3, newCard4, newCard5, newCard6, newCard7, newCard8, newCard9, newCard10, newCard11, newCard12, newCard13, newCard14, newCard15]


// Add your functions below:
const stringsToArraysIfNeeded = nestedArrayToVerify => {
    for (let i = 0; i < nestedArrayToVerify.length; i++) {
        let arrayInArray = [];
        if (typeof nestedArrayToVerify[i] === 'string') {
            for (let j = 0; j < nestedArrayToVerify[i].length; j++){
                arrayInArray.push(parseInt(nestedArrayToVerify[i][j], 10));
            }            
        } else if (typeof nestedArrayToVerify[i] === 'number') {
            let numberToString = nestedArrayToVerify[i].toString(10);
            for (j = 0; j < numberToString.length; j++) {
                arrayInArray.push(parseInt(numberToString[j], 10));
            }
        } else if (typeof nestedArrayToVerify[i] === 'undefined') {
            arrayInArray = undefined;
        } else {
            arrayInArray = nestedArrayToVerify[i];
        };
        nestedArrayToVerify.splice(i, 1, arrayInArray);
    }
};


const luhnModulo = cardNo => {
    let luhnDigit = [];
    let luhnDigitSum = 0;    
    for (let i = cardNo.length - 1; i >= 0; i--) {
        if ((cardNo.length - i) % 2 === 0) {
            if (2 * cardNo[i] > 9) {
                luhnDigit.push((2 * cardNo[i]) - 9);
            } else {
                luhnDigit.push(2 * cardNo[i]);
            }
        } else {
            luhnDigit.push(cardNo[i]);
        }
    };
    for (let i = 0; i < luhnDigit.length; i++) {
        luhnDigitSum = luhnDigitSum + luhnDigit[i];
    };
    return (luhnDigitSum % 10);
};

const validateCred = cardNumber => {
    if ((cardNumber === undefined) || (luhnModulo(cardNumber) === 0)) {
        return true;
    } else {
        return false;        
    }
};

const invalidCards = [];
const invalidCardsModulo = [];

const findInvalidCards = cardNumbersArray => {
    stringsToArraysIfNeeded(cardNumbersArray);
    for (let i = 0; i < cardNumbersArray.length; i++) {
        let validOrInvalid = validateCred(cardNumbersArray[i]);
        if (validOrInvalid === false) {
            invalidCards.push(cardNumbersArray[i].join(''));
            invalidCardsModulo.push(luhnModulo(cardNumbersArray[i]));
        }
    }
};

const invalidCardCompanies = [];

const idInvalidCardCompanies = someInvalidCards => {
    for (let i = 0; i < someInvalidCards.length; i++) {
        let cardCompany = someInvalidCards[i][0];
        switch (cardCompany) {
            case '3':
                if (invalidCardCompanies.indexOf('Amex (American Express)') > -1 ){
                    break;
                } else {
                    invalidCardCompanies.push('Amex (American Express)');
                    break;
                }                
            case '4':
                if (invalidCardCompanies.indexOf('Visa') > -1) {
                    break;
                } else {
                    invalidCardCompanies.push('Visa');
                    break;
                }                
            case '5':
                if (invalidCardCompanies.indexOf('Mastercard') > -1) {
                    break;
                } else {
                    invalidCardCompanies.push('Mastercard');
                    break;
                }                
            case '6':
                if (invalidCardCompanies.indexOf('Discover') > -1) {
                    break;
                } else {
                    invalidCardCompanies.push('Discover');
                    break;
                }                
            default:
                invalidCardCompanies.push('Company not found');
        }
    }
};

const repairedCardNumbers = [];

const fixTheNumbers = (numbersToFix, fixingModulo) => {
    stringsToArraysIfNeeded(numbersToFix);
    for (let i = 0; i < numbersToFix.length; i++) {
        let a = numbersToFix[i][numbersToFix[i].length - 1];
        let b = fixingModulo[i];
        if (a >= b) {
            let lastDigit = a - b;
            let c = numbersToFix[i].length - 1;
            numbersToFix[i].splice(c, 1, lastDigit);
            repairedCardNumbers.push(numbersToFix[i].join(''));
        } else {
            let lastDigit = 10 + a - b;
            let c = numbersToFix[i].length - 1;
            numbersToFix[i].splice(c, 1, lastDigit);
            repairedCardNumbers.push(numbersToFix[i].join(''));
        };
    }
};

const finalCheckAndSolution = batchOfNumbers => {
    findInvalidCards(batchOfNumbers);
    idInvalidCardCompanies(invalidCards);    
    console.log(`List of invalid card numbers: ${invalidCards.join(', ')}.`);
    console.log(`Credit card companies that issued faulty numbers: ${invalidCardCompanies.join(', ')}.`);
    fixTheNumbers(invalidCards, invalidCardsModulo);
    console.log(`Repaired numbers are: ${repairedCardNumbers.join(', ')}.`);
};

finalCheckAndSolution(newBatch);
