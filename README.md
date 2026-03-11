# Secure Password Generator

A modern, responsive web application for generating secure passwords with customizable criteria.

## Features

- **Customizable Password Generation**: Choose password length (8-32 characters)
- **Character Set Control**: Include/exclude uppercase, lowercase, numbers, and symbols
- **Password Strength Indicator**: Visual feedback on password strength
- **One-Click Copy**: Copy generated passwords to clipboard with a single click
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Live Demo

The application is available at: [https://your-deployment-url.com](https://your-deployment-url.com)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/secure-password-generator.git
cd secure-password-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:7500`

## Usage

1. **Set Password Length**: Use the slider or input field to set desired password length (8-32 characters)
2. **Select Character Types**: Check/uncheck the character sets you want to include:
   - Uppercase letters (A-Z)
   - Lowercase letters (a-z)
   - Numbers (0-9)
   - Symbols (!@#$%^&* etc.)
3. **Generate Password**: Click the "Generate Password" button
4. **Copy Password**: Click the copy icon next to the generated password to copy it to clipboard
5. **View Strength**: Check the password strength indicator for security feedback

## Project Structure

```
secure-password-generator/
├── index.html          # Main HTML file
├── style.css           # Styles and responsive design
├── script.js           # Password generation logic and UI interactions
├── password.test.js    # Unit tests for password generation
├── package.json        # Project dependencies and scripts
├── README.md           # This documentation
└── .gitignore          # Git ignore file
```

## Technical Details

### Password Generation Algorithm
- Uses cryptographically secure random number generation
- Ensures at least one character from each selected character set
- Prevents predictable patterns
- Validates minimum security requirements

### Security Features
- No passwords are stored or transmitted to external servers
- All generation happens client-side in the browser
- Uses `window.crypto.getRandomValues()` for secure randomness
- Password strength calculation based on entropy and character diversity

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Opera 47+

## Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- Password generation with various character sets
- Length validation
- Strength calculation
- Edge cases and error handling

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The application can be deployed to any static hosting service:

1. **Netlify**: Drag and drop the `dist` folder or connect your repository
2. **Vercel**: `vercel --prod`
3. **GitHub Pages**: Push to the `gh-pages` branch
4. **AWS S3**: Upload files to an S3 bucket configured for static hosting

### Docker Deployment
```bash
docker build -t secure-password-generator .
docker run -p 7500:7500 secure-password-generator
```

## API Reference

### JavaScript Functions

#### `generatePassword(length, options)`
Generates a secure password based on provided criteria.

**Parameters:**
- `length` (Number): Password length (8-32)
- `options` (Object): Character set options
  - `uppercase` (Boolean): Include uppercase letters
  - `lowercase` (Boolean): Include lowercase letters
  - `numbers` (Boolean): Include numbers
  - `symbols` (Boolean): Include symbols

**Returns:** String - Generated password

#### `calculateStrength(password)`
Calculates password strength on a scale of 0-4.

**Parameters:**
- `password` (String): Password to evaluate

**Returns:** Number - Strength score (0: very weak, 4: very strong)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons from [Font Awesome](https://fontawesome.com)
- Color scheme inspired by modern design systems
- Password strength algorithm based on NIST guidelines

## Support

For issues, questions, or suggestions:
1. Check the [Issues](https://github.com/yourusername/secure-password-generator/issues) page
2. Create a new issue with detailed description
3. Contact: your.email@example.com

## Version History

- **v1.0.0** (2024-01-15)
  - Initial release
  - Basic password generation
  - Responsive design
  - Copy to clipboard functionality

- **v1.1.0** (2024-01-20)
  - Added password strength indicator
  - Improved UI animations
  - Added unit tests
  - Enhanced mobile experience