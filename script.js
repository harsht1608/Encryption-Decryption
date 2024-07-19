const textInput = document.querySelector("#textmsg");
const passwordInput = document.querySelector("#password");
const resultDiv = document.querySelector("#result");
const emojiMsgInput = document.querySelector("#emojimsg");
const finalPasswordInput = document.querySelector("#finalpassword");

let encryptedEmojis = "";
let decryptedText = "";

function encrypt() {
  const password = passwordInput.value.trim();
  const text = textInput.value.trim();

  if (!password || !text) {
    alert("Please enter both password and text to encrypt!");
    return;
  }

  encryptedEmojis = "";
  for (let char of text) {
    const shiftedCharCode = (char.charCodeAt(0) + (password.charCodeAt(0) % 26)) % 26;
    const emojiCode = 128000 + shiftedCharCode;
    encryptedEmojis += `&#${emojiCode}; `;
  }

  resultDiv.innerHTML = encryptedEmojis;
  storeData(password, text, encryptedEmojis);
}

function decrypt() {
  const finalPassword = finalPasswordInput.value.trim();
  const emojiMsg = emojiMsgInput.value.trim();

  if (!finalPassword || !emojiMsg) {
    alert("Please enter both password and emoji message to decrypt!");
    return;
  }

  decryptedText = "";
  const emojiCodes = emojiMsg.split(";");
  for (let code of emojiCodes) {
    if (code) {
      const charCode = parseInt(code.substring(2)) - 128000;
      const shiftedCharCode = (charCode - (finalPassword.charCodeAt(0) % 26) + 26) % 26;
      decryptedText += String.fromCharCode(shiftedCharCode);
    }
  }

  const storedData = retrieveData(finalPassword);
  if (storedData && storedData.encryptedEmojis === emojiMsg) {
    resultDiv.style.color = "#eee";
    resultDiv.innerHTML = decryptedText;
  } else {
    resultDiv.style.color = "red";
    resultDiv.innerHTML = "Wrong password!";
  }
}

function storeData(password, text, encryptedEmojis) {
  const existingData = JSON.parse(localStorage.getItem("data1")) || [];
  existingData.push({ password, text, encryptedEmojis });
  localStorage.setItem("data1", JSON.stringify(existingData));
}

function retrieveData(password) {
  const data = JSON.parse(localStorage.getItem("data1")) || [];
  return data.find((item) => item.password === password);
}

function handleButtonClicks() {
  document.querySelector("#encrypt-btn").addEventListener("click", encrypt);
  document.querySelector("#decrypt-btn").addEventListener("click", decrypt);

  document.querySelector("#dec-btn").addEventListener("click", function () {
    resultDiv.style.display = "none";
    document.querySelector("#decryption").style.display = "block";
    document.querySelector("#encryption").style.display = "none";
    document.querySelector("#dec-btn").style.backgroundColor = "#333";
    document.querySelector("#enc-btn").style.backgroundColor = "#222";
    document.querySelector("#main>h1 span img").style.transform = "rotate(270deg)";
  });

  document.querySelector("#enc-btn").addEventListener("click", function () {
    document.querySelector("#decryption").style.display = "none";
    resultDiv.style.display = "none";
    document.querySelector("#encryption").style.display = "block";
    document.querySelector("#dec-btn").style.backgroundColor = "#222";
    document.querySelector("#enc-btn").style.backgroundColor = "#333";
    document.querySelector("#main>h1 span img").style.transform = "rotate(90deg)";
  });
}

handleButtonClicks();
