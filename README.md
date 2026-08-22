# Cocokin.ai — Client Interface (Frontend)

> Part of the **Cocokin.ai** vector similarity relationship measurement tool. This repository contains the client-side React application.

Cocokin.ai is a premium, high-fidelity relationship alignment calculator that maps user preferences into N-dimensional vectors and matches them using normalized dot-product spatial calculations (Cosine Similarity). 

This interface is styled with a bespoke retro-academic theme: **"Instrumen Resonansi"** — featuring warm paper textures, deep ink typography, and custom brass-and-amber interactive vector readouts.

---

## 📐 Features

*   **Vector Initializer (`CreateQuizPage`)**: Direct inline-editable form to input at least 5 personality/preference questions. Creators calibrate their own reference answers using analog rating sliders.
*   **Resonance Alignment Interface (`AnswerQuizPage`)**: A clean, single-dimension quiz runner screen for participants, supporting custom name signatures.
*   **Vector Spatial Analysis (`MatchDetailPage`)**:
    *   **Vector Angle Visualizer**: An SVG/Canvas component rendering the actual angular offset ($\theta$) between the two preference vectors based on the computed cosine score.
    *   **Radar Chart Grid**: Multi-dimensional overlay grid utilizing `recharts` to contrast the participant's vector values against the reference template.
    *   **Computation Ledger**: Step-by-step mathematical breakdown showing Dot Product, Vector Magnitudes, and the normalization formula.
*   **Interactive Dashboard**: Displays all created active coordinates, total resonance count per coordinate, and lists matches with automatic geolocation identification.
*   **Theme Switcher**: Instant transition between light (analog paper) and dark (deep space radar) modes, utilizing custom Tailwind CSS v4 variables.

---

## 🛠️ Technology Stack

*   **Framework**: React 19 (TypeScript)
*   **Build Pipeline**: Vite
*   **Styling**: Tailwind CSS v4 (Custom selector-based dark mode)
*   **Visualization**: Recharts (Radar charts), Iconify (Solar Icons pack)
*   **State & Navigation**: React Router DOM v6
*   **Form Management**: React Hook Form with Zod validation resolver

---

## ⚙️ Project Setup

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd cocokin-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env` file in the root of the frontend folder:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

---

## 📂 Architecture & Key Components

*   [`RatingSlider.tsx`](src/components/RatingSlider.tsx): Custom-built slider rating controller utilizing vector icons from the Solar pack that light up and animate on interaction.
*   [`VectorAngleVisualizer.tsx`](src/components/VectorAngleVisualizer.tsx): SVG-based geometric representation rendering the angular difference between user thoughts.
*   [`ProtectedRoute.tsx`](src/components/ProtectedRoute.tsx): React Router wrapper protecting creator dashboard and editing views using JWT verification states.
