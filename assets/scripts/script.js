// Assignment code here

//minimum and maximum length of a password
const minLength = 8;
const maxLength = 128;

//all valid characters for a password
const lowercaseChars = "qwertyuiopasdfghjklzxcvbnm";
const uppercaseChars = "QWERTYUIOPASDFGHJKLZXCVBNM";
const numericChars = "1234567890";
const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

var userCriteria;


// Collects the user's chosen criteria for generating a password
function getPasswordCriteria() {
  // Criteria object that contains password options
  var criteria = {
    length: 0,
    validLength: function() {
      return Number.isInteger(this.length) && this.length >= minLength && this.length <= maxLength;
    },
    useLowercaseChars: false,
    useUppercaseChars: false,
    useNumericChars: false,
    useSpecialChars: false
  };

  // Get length
  while (!criteria.validLength()) {
    criteria.length = prompt("Type password length \n" + 
    "(between " + minLength + " and " + maxLength + " characters)");
    criteria.length = parseInt(criteria.length);

    if (!criteria.validLength()) {
      alert("Password must be between " + minLength + " and " + maxLength + " characters.");
    }
  }

  // Get types of allowed characters
  const message = "Press OK to include ";

  // while no options are selected
  while (!Object.values(criteria).includes(true)) {
    criteria.useLowercaseChars = confirm(message + "lowercase letters.");
    criteria.useUppercaseChars = confirm(message + "uppercase letters.");
    criteria.useNumericChars = confirm(message + "numbers.");
    criteria.useSpecialChars = confirm(message + "special characters.");

    if (!Object.values(criteria).includes(true)) {
      alert("You must include at least one type of character.");
    }
  }

  return criteria;
}


// get a random integer from 0 to max (exclusive)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createCharacterTypeArray(criteria) {
  // create an empty array who's length is equal to the password length
  passwordChars = Array(criteria.length).fill(undefined);

  // inserts a character type in a random spot in passwordChars array
  var insertCharTypeInPassword = function(charType) {
    var validIndex;
    do {
      const randIndex = getRandomInt(passwordChars.length);
      validIndex = passwordChars[randIndex] === undefined;
      if (validIndex) {
        passwordChars[randIndex] = charType;
      }
    } while (!validIndex);
    
  }

  // get array of character types user requested
  var validCharTypes = [];
  for (const charType in criteria) {
    if (criteria[charType] === true) {
      validCharTypes.push(charType);
      insertCharTypeInPassword(charType);  // make sure at least one of each char type is in password
    }
  }

  // generate random character type for each blank spot in password chars array
  for (var i = 0; i < passwordChars.length; i++) {
    if (passwordChars[i] === undefined) {
      // replace undefined spot with a random chracter type
      passwordChars[i] = validCharTypes[getRandomInt(validCharTypes.length)];
    }
  }

  console.log(passwordChars);

  return {charTypes: validCharTypes, password: passwordChars};
}

// swap character types with actual characters
function insertCharactersInPassword(charData) {
  charTypes = charData.charTypes;
  passwordChars = charData.password;
  var password = "";

  var getRandomCharFromType = function(type) {
    var char;
    switch (type) {
      case "useLowercaseChars":
        char = lowercaseChars.charAt(getRandomInt(lowercaseChars.length));
        return char;
      
      case "useUppercaseChars":
        char = uppercaseChars.charAt(getRandomInt(uppercaseChars.length));
        return char;
      
      case "useNumericChars":
        char = numericChars.charAt(getRandomInt(numericChars.length));
        return char;

      case "useSpecialChars":
        char = specialChars.charAt(getRandomInt(specialChars.length));
        return char;
    }
  }

  for (var i = 0; i < passwordChars.length; i++) {
    var char = getRandomCharFromType(passwordChars[i]);
    password += char;
  }

  return password;
}


// create random string of characters depending on criteria
function createRandomPassword(criteria) {
  var charData = createCharacterTypeArray(criteria);
  var password = insertCharactersInPassword(charData);
  return password;
}


function updateCriteriaList() {
  var length = document.querySelector("#length");
  length.innerHTML = "Password Length: " + userCriteria.length;

  var useLowercase = document.querySelector("#use-lowercase");
  if (userCriteria.useLowercaseChars === true) {
    useLowercase.classList.add("criteria-used");
  }
  else {
    useLowercase.classList.add("criteria-crossed");
  }

  var useUppercase = document.querySelector("#use-uppercase");
  if (userCriteria.useUppercaseChars === true) {
    useUppercase.classList.add("criteria-used");
  }
  else {
    useUppercase.classList.add("criteria-crossed");
  }

  var useNumeric = document.querySelector("#use-numeric");
  if (userCriteria.useNumericChars === true) {
    useNumeric.classList.add("criteria-used");
  }
  else {
    useNumeric.classList.add("criteria-crossed");
  }

  var useSpecial = document.querySelector("#use-special");
  if (userCriteria.useSpecialChars === true) {
    useSpecial.classList.add("criteria-used");
  }
  else {
    useSpecial.classList.add("criteria-crossed");
  }
}


function generatePassword(criteria=undefined) {
  if (criteria === undefined) {
    criteria = getPasswordCriteria();
  }
  userCriteria = criteria;
  updateCriteriaList();
  return createRandomPassword(userCriteria);
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  // Show Refresh Button
  var refreshBtn = document.querySelector("#refresh");
  refreshBtn.style.display = "inline-block";

  // Show Criteria statement
  var criteriaDiv = document.querySelector(".criteria");
  criteriaDiv.style.display = "block";
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// Get references to the #refresh element
var refreshBtn = document.querySelector("#refresh");

// Write password to the #password input
function refreshPassword() {
  var password = generatePassword(userCriteria);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
refreshBtn.addEventListener("click", refreshPassword);
