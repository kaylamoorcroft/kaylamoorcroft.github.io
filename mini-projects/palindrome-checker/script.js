const textInput = document.getElementById("text-input");
const checkBtn =  document.getElementById("check-btn");
const result = document.getElementById("result");
let showResult = false;

function cleanInputString(str) {
  const regex = /[_\W]+/g;
  return str.replace(regex, '').toLowerCase();
}

function isPalindrome(word) {
  const cleanedUp = cleanInputString(word);
  for (let i = 0; i < cleanedUp.length/2; i++) {
    if (cleanedUp[i] !== cleanedUp[cleanedUp.length - i - 1]) {
      return `<strong>${word}</strong> is not a palindrome.`;
    }
  }
  return `<strong>${word}</strong> is a palindrome.`;
} 

function checkPalindrome() {
  if (!textInput.value) {
    alert("Please input a value");
    return;
  }
  console.log(isPalindrome(textInput.value));
  result.innerHTML = isPalindrome(textInput.value);
  if (!showResult) {
    showResult = true;
  }
    result.classList.remove("hide");
}

checkBtn.onclick = checkPalindrome;
textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkPalindrome();
    }
  });