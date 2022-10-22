const submitBtn = document.querySelector("#submit-btn");
const inputWindow = document.querySelector("#number-input");
const warningModal = document.querySelector(".warning-message");
const successModal = document.querySelector(".success-message");
const successMessage = document.querySelector(".message");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validCC(Number(inputWindow.value));
  setTimeout(() => {
    if (!successMessage.classList.contains("hidden")) {
      successModal.classList.add("hidden");
    } else if (!warningModal.classList.contains("hidden")) {
      warningModal.classList.add("hidden");
    }
  }, 3000);
  inputWindow.value = "";
});

const displayModal = (cardType) => {
  successModal.classList.remove("hidden");
  successMessage.innerHTML = `VALID: ${cardType}`;
};

const displayWarning = () => {
  warningModal.classList.remove("hidden");
};

const validCC = (digits) => {
  let stringDigits = digits.toString();
  let digitsArray = [];
  let digitsArrayMulti = [];
  let sumMulti = 0;
  let sumRemain = 0;

  // Luhn's Algorithm for CC

  // Convert String of Input Numbers into array of numbers.
  for (let i = 0; i < stringDigits.length; i++) {
    digitsArray.push(Number(stringDigits[i]));
  }
  // Starting with second to last and skipping every other number, add each number to a separate array.
  for (let i = digitsArray.length - 2; i >= 0; i = i - 2) {
    digitsArrayMulti.push(digitsArray[i]);
  }
  // Mutating original array to leave remaining numbers to then sum up.
  for (let i = digitsArray.length - 2; i >= 0; i = i - 2) {
    digitsArray.splice(i, 1);
  }
  // Summing up remaining numbers and adding to sumRemain variable.
  for (let i = 0; i < digitsArray.length; i++) {
    sumRemain += digitsArray[i];
  }
  // Mapping through and multiplying each number by 2 and returning new array then converting to string.
  let digitMulti = digitsArrayMulti.map((d) => d * 2).join("");

  // Clearing multi-factor array
  digitsArrayMulti = [];

  // Looping through multiplied digit string and casting back to number and back to digits array multi.
  for (let h = 0; h < digitMulti.length; h++) {
    digitsArrayMulti.push(Number(digitMulti[h]));
  }
  //Looping through digits array multi and adding them to sumMulti variable.
  for (let i = 0; i < digitsArrayMulti.length; i++) {
    sumMulti += digitsArrayMulti[i];
  }
  // Creating sumTotal string to use with conditional.
  let sumTotal = String(sumRemain + sumMulti);

  if (sumTotal[sumTotal.length - 1] === "0") {
    if (stringDigits.length === 15 && stringDigits[0] === "3") {
      if (stringDigits[1] === ("4" || "7")) {
        console.log("VALID: AMEX");
        displayModal("amex");
      } else {
        console.log("INVALID CC");
        displayWarning();
      }
    } else if (stringDigits.length === 16 && stringDigits[0] === "5") {
      if (
        stringDigits[1] === "1" ||
        stringDigits[1] === "2" ||
        stringDigits[1] === "3" ||
        stringDigits[1] === "4" ||
        stringDigits[1] === "5"
      ) {
        console.log("VALID: MASTERCARD");
        displayModal("mastercard");
      } else {
        console.log("INVALID CC");
        displayWarning();
      }
    } else if (
      (stringDigits.length === 13 || stringDigits.length === 16) &&
      stringDigits[0] === "4"
    ) {
      console.log("VALID: VISA");
      displayModal("visa");
    }
  } else {
    console.log("INVALID CC");
    displayWarning();
  }
  console.log(sumTotal);
};
