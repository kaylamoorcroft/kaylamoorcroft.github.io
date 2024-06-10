const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputContainer = document.getElementById("output");
const dic = {
            1: 'I',
            4: 'IV',
            5: 'V',
            9: 'IX',
            10: 'X',
            40: 'XL',
            50: 'L',
            90: 'XC',
            100: 'C',
            400: 'CD',
            500: 'D',
            900: 'CM',
            1000: 'M'
        };
    
function convert(num) {
  let roman = "";
  while (num > 0) {
    const subtract = maxRomanValue(num);
    roman += dic[subtract];
    num -= subtract;
  }
  return roman;
}
const maxRomanValue = (num) => {
  let maxVal = 0;
  for (const val in dic) {
    if (num - val >= 0) { maxVal = val; }
    else { break; }
  }
  return maxVal;
}

function checkUserInput() {
  const num = parseInt(number.value)
  if (!num) {
    outputContainer.innerText = "Please enter a valid number"; 
  }
  else if (num < 1) {
    outputContainer.innerText = "Please enter a number greater than or equal to 1"; 
  }
  else if (num > 3999) {
    outputContainer.innerText = "Please enter a number less than or equal to 3999";
  }
  else {
    outputContainer.innerText = convert(num);
  }
  number.value = "";
  outputContainer.classList.remove("hide");
}

convertBtn.addEventListener("click", checkUserInput);
number.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
