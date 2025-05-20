# **Meme Reverse Image Search Engine** 🚀

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

A modern web application that helps you trace meme origins, find variations, and analyze viral trends using AI-powered reverse image search.

## ✨ Features

- **React + Vite** frontend with TypeScript
- **TensorFlow.js** for client-side image analysis
- **Google Vision API** integration for reverse search
- **Meme template recognition** using custom models
- **Responsive UI** with modern design
- **Type-safe** codebase

## 🛠 Tech Stack

**Frontend:**
- React 18
- Vite
- TypeScript
- TensorFlow.js
- Tailwind CSS (or your preferred CSS solution)

**Backend (optional):**
- Node.js/Express or FastAPI
- Google Vision API
- Know Your Meme API

## � Quick Start

### Prerequisites
- Node.js (v16+ recommended)
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git https://github.com/anshumeshsaini/MeneIQ.git
cd viral-meme-oracle
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_GOOGLE_API_KEY=your_api_key
VITE_MEME_API_KEY=your_meme_api_key
```

4. Run the development server:
```bash
yarn dev
# or
npm run dev
```

## 🏗 Project Structure

```
src/
├── assets/              # Static assets
├── components/          # Reusable components
│   ├── ImageUpload.tsx
│   ├── ResultsView.tsx
│   └── ...
├── hooks/               # Custom hooks
│   ├── useImageSearch.ts
│   └── ...
├── models/              # TensorFlow models
│   ├── memeModel.ts
│   └── ...
├── pages/               # Page components
│   ├── Home.tsx
│   └── ...
├── services/            # API services
│   ├── googleVision.ts
│   └── ...
├── types/               # Type definitions
│   ├── meme.d.ts
│   └── ...
├── utils/               # Utility functions
│   ├── imageUtils.ts
│   └── ...
├── App.tsx
└── main.tsx
```

## 🔍 How It Works

1. User uploads an image through the React interface
2. The app uses TensorFlow.js to analyze the image client-side
3. For more advanced search, the image is sent to Google Vision API
4. Results are displayed with:
   - Original source (if found)
   - Similar memes
   - Viral trend data
   - Template recognition

## 🚀 Deployment

Build for production:
```bash
yarn build
# or
npm run build
```

Deploy to your preferred platform (Vercel, Netlify, etc.)

## 📈 Future Improvements

- [ ] Add WebAssembly support for faster TensorFlow.js performance
- [ ] Implement real-time meme tracking
- [ ] Add browser extension version
- [ ] Social media sharing integration

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

## 📜 License

MIT

---

**Made with React, Vite, and Meme Magic** ✨

