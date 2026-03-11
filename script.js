// DOM Elements
const passwordDisplay = document.getElementById('password-display');
const passwordLength = document.getElementById('password-length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthIndicator = document.getElementById('strength-indicator');
const strengthText = document.getElementById('strength-text');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Update length value display
if (passwordLength && lengthValue) {
  passwordLength.addEventListener('input', () => {
    lengthValue.textContent = passwordLength.value;
  });
}

// Generate password function (version pour tests)
function generatePassword(length, options) {
    const includeUppercase = options.uppercase;
    const includeLowercase = options.lowercase;
    const includeNumbers = options.numbers;
    const includeSymbols = options.symbols;

    // Validate at least one character set is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        throw new Error('Au moins un type de caractère doit être sélectionné');
    }

    // Build character pool based on selections
    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    // Ensure at least one character from each selected set
    let password = '';
    const selectedSets = [];
    if (includeUppercase) selectedSets.push(uppercaseChars);
    if (includeLowercase) selectedSets.push(lowercaseChars);
    if (includeNumbers) selectedSets.push(numberChars);
    if (includeSymbols) selectedSets.push(symbolChars);

    // Add one character from each selected set
    selectedSets.forEach(set => {
        const randomIndex = Math.floor(Math.random() * set.length);
        password += set[randomIndex];
    });

    // Fill the rest of the password length with random characters from the pool
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    // Shuffle the password to randomize the position of the guaranteed characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

// Calculate password strength
function calculateStrength(password) {
    let score = 0;
    const length = password.length;

    // Length score
    if (length >= 12) score += 4;
    else if (length >= 8) score += 2;
    else if (length >= 4) score += 1;

    // Character variety
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
    const varietyCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
    score += varietyCount * 2;

    // Deduct for repeated characters
    const charCount = {};
    for (const char of password) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    const maxRepeat = Math.max(...Object.values(charCount));
    if (maxRepeat > 1) {
        // Penalty increases with repetition
        score -= Math.floor((maxRepeat - 1) * 0.5);
    }

    // Ensure score is between 0 and 10
    if (score < 0) score = 0;
    if (score > 10) score = 10;
    return score;
}

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePassword, calculateStrength };
}

// Event listeners for UI
if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        const length = parseInt(passwordLength.value);
        const options = {
            uppercase: uppercaseCheck.checked,
            lowercase: lowercaseCheck.checked,
            numbers: numbersCheck.checked,
            symbols: symbolsCheck.checked
        };
        
        try {
            const password = generatePassword(length, options);
            passwordDisplay.textContent = password;
            
            // Calculate and display strength
            const strength = calculateStrength(password);
            strengthIndicator.style.width = `${strength * 10}%`;
            
            // Update strength text
            if (strength <= 3) strengthText.textContent = 'Faible';
            else if (strength <= 6) strengthText.textContent = 'Moyen';
            else strengthText.textContent = 'Fort';
        } catch (error) {
            alert(error.message);
        }
    });
}

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const password = passwordDisplay.textContent;
        if (password && password !== 'Votre mot de passe apparaîtra ici') {
            navigator.clipboard.writeText(password).then(() => {
                alert('Mot de passe copié !');
            }).catch(err => {
                console.error('Erreur lors de la copie : ', err);
            });
        }
    });
}