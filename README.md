# Saar - ChatGPT-like Chatbot

A modern chatbot named Saar that accesses data from Wikipedia and Google to provide answers to user questions. Built with Node.js, Express, and vanilla JavaScript.

## Features

- 🤖 **Intelligent Responses**: Answers questions using data from Wikipedia and Google
- 🔍 **Data Access**: Integrates with Wikipedia API and Google Custom Search API
- 💬 **Chat Interface**: Clean, modern chat UI with message history
- 🎨 **Dark Theme**: Spotify-inspired design with responsive layout
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express.js, Axios
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: Wikipedia MediaWiki API, Google Custom Search API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd saar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up Google Search API:
   - Get a Google API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Create a Custom Search Engine at [Google Custom Search](https://cse.google.com/)
   - Set environment variables:
     ```bash
     export GOOGLE_API_KEY=your_api_key
     export GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
     ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `POST /api/chat` - Send a message and get a response
  - Body: `{ "message": "Your question here" }`
  - Response: `{ "response": "Answer from Wikipedia/Google" }`

## Global Hosting Options

### Option 1: Vercel (Recommended for quick deployment)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd saar
   vercel
   ```

3. **Follow the prompts** to link your project and deploy.

4. **Add environment variables** for Google API if using.

### Option 2: Netlify

1. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `saar` folder or connect your Git repository
   - Set build command: `npm start` (for Node.js apps)
   - Set publish directory: `public` (for static files) or root for full-stack apps

2. **Deploy**: Netlify will automatically deploy your site.

### Option 3: Heroku

1. **Install Heroku CLI**:
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create a Heroku app**:
   ```bash
   cd saar
   heroku create your-app-name
   ```

3. **Set Node.js buildpack**:
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

5. **Open your app**:
   ```bash
   heroku open
   ```

### Option 4: Railway

1. **Go to [Railway](https://railway.app)** and sign up
2. **Connect your GitHub repository** or deploy manually
3. **Railway will auto-detect** your Node.js app and deploy it
4. **Add environment variables** if needed

### Option 5: DigitalOcean App Platform

1. **Go to [DigitalOcean](https://digitalocean.com)** and create an account
2. **Create a new app** from your GitHub repository
3. **Configure the app**:
   - Source: GitHub
   - Runtime: Node.js
   - Build Command: `npm install`
   - Run Command: `npm start`
4. **Deploy**

## File Structure

```
saar/
├── server.js              # Express server with chat API
├── package.json           # Dependencies and scripts
├── public/                # Static files
│   ├── index.html         # Main chat interface
│   ├── styles.css         # CSS styles
│   └── script.js          # Frontend JavaScript
├── README.md              # This file
└── TODO.md                # Development progress
```

## Customization

### Adding More Data Sources

- Modify `server.js` to integrate additional APIs
- Add more search functions similar to `searchWikipedia` and `searchGoogle`

### Styling

- Modify `public/styles.css` to customize the appearance
- The design uses a dark theme with green accents

### Backend Enhancements

- Add conversation history storage
- Implement user sessions
- Add more advanced NLP processing
- Integrate with other AI services

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
