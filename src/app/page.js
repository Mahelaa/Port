"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showStartScreen, setShowStartScreen] = useState(false);

  // Initial loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
      setShowStartScreen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isLoaded) {
        setIsLoaded(false);
        setShowStartScreen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoaded]);

  // Handle Start button click
  const handleStart = () => {
    setShowStartScreen(false);
    setIsLoaded(true);
  };

  return (
    <div className="awge-container">
      {initialLoading ? (
        <div className="loading-screen">
          <div className="loading-text">LOADING...</div>
        </div>
      ) : showStartScreen ? (
        <div className="start-screen">
          <div className="noise"></div>
          <div className="crt-effect"></div>
          <div className="scanline"></div>
          <div className="start-content">
            <h1 className="glitch-text title-text">PORTFOLIO</h1>
            <div className="press-start blink" onClick={handleStart}>PRESS START</div>
          </div>
        </div>
      ) : (
        <>
          <div className="noise"></div>
          <div className="crt-effect"></div>
          <div className="scanline"></div>
          
          <header className="awge-header">
            <div className="glitch-text" data-text="PORTFOLIO">PORTFOLIO</div>
            <div className="header-right">
              <div className="datetime">
                {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
              </div>
            </div>
          </header>
          
          {/* ESC button */}
          <div className="esc-button" onClick={() => {
            setIsLoaded(false);
            setShowStartScreen(true);
          }}>ESC</div>
          
          <main className="awge-content">
            <div className="menu-grid">
              <div className="menu-item">
                <span className="menu-number">01.</span>
                <span className="menu-title">ABOUT</span>
              </div>
              <div className="menu-item">
                <span className="menu-number">02.</span>
                <span className="menu-title">PROJECTS</span>
              </div>
              <div className="menu-item">
                <span className="menu-number">03.</span>
                <span className="menu-title">SKILLS</span>
              </div>
              <div className="menu-item">
                <span className="menu-number">04.</span>
                <span className="menu-title">CONTACT</span>
              </div>
              <div className="menu-item">
                <span className="menu-number">05.</span>
                <span className="menu-title">RESUME</span>
              </div>
            </div>
          </main>
          
          <footer className="awge-footer">
            <div className="copyright">© {new Date().getFullYear()} PORTFOLIO - ALL RIGHTS RESERVED</div>
          </footer>
        </>
      )}
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @font-face {
          font-family: 'Gothic Pixels';
          src: url('https://fonts.cdnfonts.com/s/36671/nasalization-rg.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        
        body {
          margin: 0;
          padding: 0;
          background-color: #000;
          color: #fff;
          font-family: 'Gothic Pixels', 'Courier New', monospace;
          overflow: hidden;
          height: 100vh;
        }
        
        .awge-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          overflow: hidden;
        }
        
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #000;
          z-index: 100;
        }
        
        .loading-text {
          font-size: 2rem;
          color: #fff;
          animation: blink 1s infinite;
        }
        
        .start-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }
        
        .start-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }
        
        .title-text {
          font-size: 3.5rem;
          letter-spacing: 8px;
          text-shadow: 4px 4px 0 #000;
          color: #fff;
          position: relative;
          image-rendering: pixelated;
          text-transform: uppercase;
        }
        
        .title-text::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          top: 2px;
          color: rgba(255, 255, 255, 0.4);
          z-index: -1;
        }
        
        .title-text::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          top: -2px;
          color: rgba(0, 255, 255, 0.4);
          z-index: -1;
        }
        
        .press-start {
          font-size: 1.5rem;
          letter-spacing: 2px;
          cursor: pointer;
          text-transform: uppercase;
          padding: 10px 20px;
          image-rendering: pixelated;
          background: #000;
          color: #fff;
          border: 4px solid white;
          box-shadow: 0 0 0 4px #000, 
                      0 0 0 8px #fff,
                      inset 0 0 0 2px #000;
          transition: all 0.1s steps(2);
          transform: scale(1);
        }
        
        .press-start:hover {
          transform: scale(1.05);
          background: #333;
          color: #0f0;
          border-color: #0f0;
          box-shadow: 0 0 0 4px #000, 
                      0 0 0 8px #0f0,
                      inset 0 0 0 2px #000;
        }
        
        .press-start:active {
          transform: scale(0.95);
          background: #000;
          color: #ff0;
          border-color: #ff0;
          box-shadow: 0 0 0 4px #000, 
                      0 0 0 8px #ff0,
                      inset 0 0 0 2px #000;
        }
        
        .esc-button {
          position: fixed;
          top: 20px;
          right: 20px;
          color: white;
          padding: 8px 12px;
          font-size: 14px;
          z-index: 100;
          cursor: pointer;
          image-rendering: pixelated;
          text-transform: uppercase;
          background: #000;
          border: 2px solid white;
          box-shadow: 0 0 0 2px #000, 
                      0 0 0 4px #fff,
                      inset 0 0 0 1px #000;
          transition: all 0.1s steps(2);
        }
        
        .esc-button:hover {
          background: #333;
          color: #0f0;
          border-color: #0f0;
          box-shadow: 0 0 0 2px #000, 
                      0 0 0 4px #0f0,
                      inset 0 0 0 1px #000;
        }
        
        .noise {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/png;base64,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");
          opacity: 0.1;
          z-index: 1;
          pointer-events: none;
        }
        
        .crt-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
          background-size: 100% 4px;
          z-index: 2;
          pointer-events: none;
        }
        
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 3;
          animation: scanline 6s linear infinite;
          pointer-events: none;
        }
        
        .awge-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          z-index: 5;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glitch-text {
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 4px;
          position: relative;
          text-transform: uppercase;
        }
        
        .header-right {
          font-size: 14px;
          opacity: 0.7;
        }
        
        .awge-content {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          z-index: 10;
          position: relative;
        }
        
        .menu-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          opacity: 0.7;
          transition: all 0.1s steps(2);
          padding: 10px;
          border: 2px solid transparent;
          image-rendering: pixelated;
        }
        
        .menu-item:hover {
          transform: translateX(10px);
          opacity: 1;
          border: 2px solid #fff;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
        }
        
        .menu-item:active {
          background: rgba(0, 255, 0, 0.2);
          border-color: #0f0;
          color: #0f0;
        }
        
        .menu-title {
          font-size: 28px;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-shadow: 2px 2px 0 #000;
        }
        
        .awge-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          font-size: 12px;
          opacity: 0.5;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 5;
        }
        
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        
        @media (max-width: 768px) {
          .menu-title {
            font-size: 22px;
          }
          
          .glitch-text {
            font-size: 20px;
          }
          
          .title-text {
            font-size: 2rem;
          }
          
          .press-start {
            font-size: 1.2rem;
          }
        }
        
        /* Add pixel effect to text */
        .pixel-effect {
          image-rendering: pixelated;
        }
      `}</style>
      
      {/* Preload font */}
      <link rel="preload" href="https://fonts.cdnfonts.com/s/36671/nasalization-rg.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      
      {/* External font link */}
      <link href="https://fonts.cdnfonts.com/css/nasalization" rel="stylesheet" />
    </div>
  );
}
