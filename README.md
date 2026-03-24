# Syon Vijae - Portfolio

An ultra-modern, extremely polished personal portfolio built with React, Vite, and Tailwind CSS. The interface features an otherworldly "Digital Deep Sea" aesthetic with Apple-level minimalism, native hardware-accelerated cursors, and 3D scenes.

## 🚀 Features

* **3D Interactive Hero**: Built using `React Three Fiber`, featuring a custom GLSL shader that renders an undulating bioluminescent sphere reacting to user controls.
* **Cinematic Horizontal Scroll**: Overhauled vertical scrolling into a GSAP ScrollTrigger timeline, mapped synchronously with Lenis smooth-scrolling physics.
* **100% Native Custom Cursor**: Engineered with Framer Motion, completely replacing browser native cursors with a highly responsive, lag-free glowing cyan orb (`translate3d` tracking).
* **Glassmorphic Design System**: Advanced styling masking, including dynamic CSS `radial-gradient` borders that react locally to mouse proximity.
* **Immersive Full-Screen Modals**: Uses Framer Motion's `AnimatePresence` to present massive, content-rich details on Club Recruitments and Coursework without breaking statically generated routes.
* **Fully Static Deployable**: Designed specifically for seamless deployments on GitHub Pages (`base: './'`).

## 💻 Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Scroll Physics**: [GSAP ScrollTrigger](https://gsap.com/) + [Lenis](https://lenis.studiofreight.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)

## 🛠️ Usage & Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Production Build**
   ```bash
   npm run build
   ```
   *The generated `/dist` folder can be directly served or deployed to GitHub Pages.*

## 👨‍💻 Author

**Syon Vijae**
- [GitHub](https://github.com/syon-vt)
- [LinkedIn](https://www.linkedin.com/in/syon-vijae-thyvalappil-b551b73a7/)
