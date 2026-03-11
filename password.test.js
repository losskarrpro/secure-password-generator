const { generatePassword, calculateStrength } = require('./script.js');

describe('Password Generator', () => {
  describe('generatePassword', () => {
    test('should generate password of correct length', () => {
      const length = 12;
      const options = {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
      };
      const password = generatePassword(length, options);
      expect(password.length).toBe(length);
    });

    test('should respect uppercase option', () => {
      const length = 10;
      const options = {
        uppercase: true,
        lowercase: false,
        numbers: false,
        symbols: false
      };
      const password = generatePassword(length, options);
      expect(password).toMatch(/^[A-Z]+$/);
    });

    test('should respect lowercase option', () => {
      const length = 10;
      const options = {
        uppercase: false,
        lowercase: true,
        numbers: false,
        symbols: false
      };
      const password = generatePassword(length, options);
      expect(password).toMatch(/^[a-z]+$/);
    });

    test('should respect numbers option', () => {
      const length = 10;
      const options = {
        uppercase: false,
        lowercase: false,
        numbers: true,
        symbols: false
      };
      const password = generatePassword(length, options);
      expect(password).toMatch(/^[0-9]+$/);
    });

    test('should respect symbols option', () => {
      const length = 10;
      const options = {
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: true
      };
      const password = generatePassword(length, options);
      expect(password).toMatch(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/);
    });

    test('should throw error when no character type selected', () => {
      const length = 10;
      const options = {
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false
      };
      expect(() => generatePassword(length, options)).toThrow('Au moins un type de caractère doit être sélectionné');
    });

    test('should include all selected character types', () => {
      const length = 20;
      const options = {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
      };
      const password = generatePassword(length, options);
      
      expect(password).toMatch(/[A-Z]/);
      expect(password).toMatch(/[a-z]/);
      expect(password).toMatch(/[0-9]/);
      expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
    });

    test('should generate different passwords on multiple calls', () => {
      const length = 16;
      const options = {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
      };
      const password1 = generatePassword(length, options);
      const password2 = generatePassword(length, options);
      expect(password1).not.toBe(password2);
    });
  });

  describe('calculateStrength', () => {
    test('should return 0 for empty password', () => {
      expect(calculateStrength('')).toBe(0);
    });

    test('should give higher score for longer passwords', () => {
      const short = 'aB1!';
      const long = 'aB1!aB1!aB1!';
      expect(calculateStrength(long)).toBeGreaterThan(calculateStrength(short));
    });

    test('should give higher score for more character variety', () => {
      const lowVariety = 'aaaaaaaa';
      const highVariety = 'aB1!aB1!';
      expect(calculateStrength(highVariety)).toBeGreaterThan(calculateStrength(lowVariety));
    });

    test('should deduct for repeated characters', () => {
      const normal = 'aB1!aB1!';
      const repeated = 'aaaBBB111!!!';
      expect(calculateStrength(normal)).toBeGreaterThan(calculateStrength(repeated));
    });

    test('should clamp score between 0 and 10', () => {
      const weak = '';
      const strong = 'Aa1!Bb2@Cc3#Dd4$Ee5%Ff6^Gg7&Hh8*Ii9(Jj0)';
      expect(calculateStrength(weak)).toBe(0);
      expect(calculateStrength(strong)).toBe(10);
    });
  });
});