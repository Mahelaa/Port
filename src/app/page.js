"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showStartScreen, setShowStartScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGameboySection, setCurrentGameboySection] = useState('about');
  const [selectedIndex, setSelectedIndex] = useState(0); // Track selected menu item

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  // GameBoy menu navigation handler
  const handleGameboyNavigation = (section) => {
    setCurrentGameboySection(section);
  };

  // D-pad navigation handler
  const handleDpadNavigation = (direction) => {
    const sections = ['about', 'projects', 'skills', 'contact', 'resume'];
    const currentIndex = sections.indexOf(currentGameboySection);
    let newIndex;
    
    switch(direction) {
      case 'left':
        newIndex = (currentIndex - 1 + sections.length) % sections.length;
        break;
      case 'right':
        newIndex = (currentIndex + 1) % sections.length;
        break;
      default:
        return;
    }
    
    setCurrentGameboySection(sections[newIndex]);
    setSelectedIndex(newIndex);
  };

  // A button: Show selected content
  const handleAButton = () => {
    if (showStartScreen) {
      handleStart();
    } else {
      // A button confirms selection - we're already showing the selected content
      // Could add animation or sound effect here
    }
  };

  // B button: Go back to start screen
  const handleBButton = () => {
    setIsLoaded(false);
    setShowStartScreen(true);
  };

  // If mobile device detected, show GameBoy layout
  if (isMobile) {
    return (
      <div className="gameboy-container">
        <div className="gameboy-body">
          <div className="gameboy-screen-area">
            <div className="gameboy-screen-border">
              <div className="gameboy-screen">
                <div className="power-indicator">POWER</div>

                {initialLoading ? (
                  <div className="gameboy-loading">
                    NINTENDO
                    <div className="gameboy-loading-dots">
                      <span className="loading-dot">.</span>
                      <span className="loading-dot">.</span>
                      <span className="loading-dot">.</span>
                    </div>
                  </div>
                ) : showStartScreen ? (
                  <div className="gameboy-start-screen">
                    <div className="gameboy-title">PORTFOLIO</div>
                    <div className="gameboy-subtitle">PRESS START</div>
                    <div className="gameboy-start-button" onClick={handleStart}>
                      START
                    </div>
                  </div>
                ) : (
                  <div className="gameboy-content">
                    <div className="gameboy-header">
                      {currentGameboySection.toUpperCase()}
                    </div>
                    
                    {currentGameboySection === 'about' && (
                      <div className="gameboy-section">
                        <p>Hi! I'm a web developer with a passion for creating interactive experiences.</p>
                        <p>I specialize in front-end development and enjoy building creative interfaces.</p>
                      </div>
                    )}

                    {currentGameboySection === 'projects' && (
                      <div className="gameboy-section">
                        <p>Project 1: Portfolio Site</p>
                        <p>Project 2: E-commerce App</p>
                        <p>Project 3: Weather App</p>
                      </div>
                    )}

                    {currentGameboySection === 'skills' && (
                      <div className="gameboy-section">
                        <p>HTML, CSS, JavaScript</p>
                        <p>React, Next.js</p>
                        <p>Node.js, Git</p>
                      </div>
                    )}

                    {currentGameboySection === 'contact' && (
                      <div className="gameboy-section">
                        <p>Email: me@example.com</p>
                        <p>GitHub: github.com/username</p>
                        <p>LinkedIn: linkedin.com/in/username</p>
                      </div>
                    )}

                    {currentGameboySection === 'resume' && (
                      <div className="gameboy-section">
                        <p>Download my resume</p>
                        <p>Education: Computer Science</p>
                        <p>Experience: 5+ years</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="gameboy-nintendo">NINTENDO<span className="gameboy-tm">TM</span></div>
              <div className="gameboy-model">GAME BOY</div>
            </div>
          </div>
          
          {!initialLoading && !showStartScreen && (
            <div className="gameboy-controls">
              <div className="dpad">
                <div 
                  className="dpad-button dpad-up"
                  onClick={() => {}}
                  onTouchStart={(e) => {
                    e.preventDefault(); // Prevent additional onClick from firing
                  }}
                ></div>
                <div 
                  className="dpad-button dpad-right"
                  onClick={() => handleDpadNavigation('right')}
                  onTouchStart={(e) => {
                    e.preventDefault(); // Prevent additional onClick from firing
                    handleDpadNavigation('right');
                  }}
                ></div>
                <div 
                  className="dpad-button dpad-down"
                  onClick={() => {}}
                  onTouchStart={(e) => {
                    e.preventDefault(); // Prevent additional onClick from firing
                  }}
                ></div>
                <div 
                  className="dpad-button dpad-left"
                  onClick={() => handleDpadNavigation('left')}
                  onTouchStart={(e) => {
                    e.preventDefault(); // Prevent additional onClick from firing
                    handleDpadNavigation('left');
                  }}
                ></div>
                <div className="dpad-center"></div>
              </div>
              
              <div className="action-buttons">
                <div className="ab-buttons">
                  <div 
                    className="ab-button b-button" 
                    onClick={handleBButton}
                    onTouchStart={handleBButton}
                  >B</div>
                  <div 
                    className="ab-button a-button"
                    onClick={handleAButton}
                    onTouchStart={handleAButton}
                  >A</div>
                </div>
              </div>
              
              <div className="menu-buttons">
                <div className="menu-button select-button" onClick={() => setShowStartScreen(true)}>SELECT</div>
                <div className="menu-button start-button" onClick={handleStart}>START</div>
              </div>
            </div>
          )}
          
          {!initialLoading && !showStartScreen && (
            <div className="gameboy-nav">
              {['about', 'projects', 'skills', 'contact', 'resume'].map((section, index) => (
                <div 
                  key={section}
                  className={`gameboy-nav-item ${currentGameboySection === section ? 'active' : ''}`} 
                  onClick={() => handleGameboyNavigation(section)}
                >
                  {section.toUpperCase()}
                </div>
              ))}
            </div>
          )}
          
          <div className="gameboy-speaker">
            {[...Array(6)].map((_, i) => <div key={i} className="speaker-hole"></div>)}
          </div>
        </div>
        <style jsx>{`
          .gameboy-container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #e5e1e6;
            font-family: 'Press Start 2P', monospace;
            overflow: hidden;
            position: relative;
          }
          
          .gameboy-body {
            width: 320px;
            height: 520px;
            background-color: #8b8b8b;
            border-radius: 10px 10px 50px 10px;
            padding: 20px 20px 60px;
            position: relative;
            box-shadow: 
              inset -4px -4px 0 0 #706f6f,
              inset 4px 4px 0 0 #d0d0d0;
          }
          
          .gameboy-screen-area {
            width: 100%;
            margin-bottom: 20px;
          }
          
          .gameboy-screen-border {
            background-color: #383838;
            padding: 20px;
            border-radius: 10px;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
          }
          
          .gameboy-screen {
            background-color: #9bbc0f;
            padding: 10px;
            border-radius: 5px;
            position: relative;
            height: 180px;
            overflow: hidden;
            box-shadow: inset 2px 2px 0 rgba(0,0,0,0.1);
          }
          
          .power-indicator {
            position: absolute;
            top: 5px;
            right: 10px;
            color: #0f380f;
            font-size: 8px;
            background-color: #8bac0f;
            padding: 2px 4px;
            border-radius: 2px;
          }
          
          .gameboy-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            font-size: 16px;
            color: #0f380f;
          }
          
          .gameboy-loading-dots {
            display: flex;
          }
          
          .loading-dot {
            animation: dot-blink 1s infinite;
          }
          
          .loading-dot:nth-child(2) {
            animation-delay: 0.3s;
          }
          
          .loading-dot:nth-child(3) {
            animation-delay: 0.6s;
          }
          
          .gameboy-start-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
          
          .gameboy-title {
            font-size: 16px;
            font-weight: bold;
            color: #0f380f;
            margin-bottom: 15px;
          }
          
          .gameboy-subtitle {
            font-size: 10px;
            color: #306230;
            margin-bottom: 10px;
          }
          
          .gameboy-start-button {
            padding: 3px 8px;
            background-color: #8bac0f;
            border: 2px solid #0f380f;
            font-size: 12px;
            color: #0f380f;
            cursor: pointer;
            animation: blink 1s infinite;
          }
          
          .gameboy-content {
            height: 100%;
            overflow: auto;
            padding: 5px;
          }
          
          .gameboy-header {
            font-size: 12px;
            color: #0f380f;
            border-bottom: 2px solid #0f380f;
            margin-bottom: 8px;
            padding-bottom: 3px;
          }
          
          .gameboy-section {
            font-size: 9px;
            line-height: 1.5;
            color: #306230;
          }
          
          .gameboy-section p {
            margin-bottom: 8px;
          }
          
          .gameboy-nintendo {
            text-align: center;
            margin-top: 10px;
            font-size: 9px;
            font-weight: bold;
            color: #706f6f;
          }
          
          .gameboy-tm {
            font-size: 6px;
            vertical-align: super;
          }
          
          .gameboy-model {
            text-align: center;
            font-size: 12px;
            color: #706f6f;
            font-style: italic;
            position: relative;
          }
          
          .gameboy-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
          }
          
          .dpad {
            position: relative;
            width: 80px;
            height: 80px;
          }
          
          .dpad-button {
            position: absolute;
            background-color: #373737;
            box-shadow: 
              inset -2px -2px 0 0 #1a1a1a,
              inset 2px 2px 0 0 #5a5a5a;
            cursor: pointer;
            transition: all 0.05s ease;
          }
          
          .dpad-button:active {
            box-shadow: 
              inset 2px 2px 0 0 #1a1a1a,
              inset -2px -2px 0 0 #5a5a5a;
            transform: scale(0.95);
          }
          
          .dpad-center {
            position: absolute;
            width: 25px;
            height: 25px;
            top: 28px;
            left: 28px;
            background-color: #373737;
            z-index: 2;
          }
          
          .dpad-up {
            width: 25px;
            height: 25px;
            top: 0;
            left: 28px;
          }
          
          .dpad-right {
            width: 25px;
            height: 25px;
            top: 28px;
            left: 55px;
          }
          
          .dpad-down {
            width: 25px;
            height: 25px;
            top: 55px;
            left: 28px;
          }
          
          .dpad-left {
            width: 25px;
            height: 25px;
            top: 28px;
            left: 0;
          }
          
          .action-buttons {
            display: flex;
            flex-direction: column;
          }
          
          .ab-buttons {
            display: flex;
            justify-content: center;
            transform: rotate(-25deg);
          }
          
          .ab-button {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #a51d1d;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 5px;
            color: #ffffff;
            box-shadow: 
              inset -2px -2px 0 0 #7a0000,
              inset 2px 2px 0 0 #ff6969;
            cursor: pointer;
            transition: all 0.05s ease;
          }
          
          .ab-button:active {
            box-shadow: 
              inset 2px 2px 0 0 #7a0000,
              inset -2px -2px 0 0 #ff6969;
            transform: scale(0.95);
          }
          
          .menu-buttons {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            width: 180px;
            justify-content: center;
            gap: 15px;
          }
          
          .menu-button {
            background-color: #373737;
            padding: 5px 12px;
            border-radius: 15px;
            color: #8b8b8b;
            font-size: 8px;
            text-align: center;
            box-shadow: 
              inset -2px -2px 0 0 #1a1a1a,
              inset 2px 2px 0 0 #5a5a5a;
            transform: rotate(-25deg);
            cursor: pointer;
            transition: all 0.05s ease;
          }
          
          .menu-button:active {
            box-shadow: 
              inset 2px 2px 0 0 #1a1a1a,
              inset -2px -2px 0 0 #5a5a5a;
            transform: rotate(-25deg) scale(0.95);
          }
          
          .gameboy-nav {
            position: absolute;
            bottom: 85px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #8bac0f;
            border: 2px solid #0f380f;
            border-radius: 4px;
            width: 90%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .gameboy-nav-item {
            font-size: 8px;
            padding: 4px 8px;
            color: #0f380f;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .gameboy-nav-item.active {
            background-color: #0f380f;
            color: #8bac0f;
            box-shadow: 0 0 0 1px #0f380f;
          }
          
          .gameboy-speaker {
            position: absolute;
            bottom: 15px;
            right: 35px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 7px;
            transform: rotate(-25deg);
          }
          
          .speaker-hole {
            width: 7px;
            height: 7px;
            background-color: #2a2a2a;
            border-radius: 50%;
          }
          
          @keyframes dot-blink {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
          
          @keyframes blink {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
        
        {/* Preload font */}
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </div>
    );
  }

  // Desktop version remains unchanged
  return (
    <div className="awge-container">
      {/* TV noise video background */}
      <video 
        className="tv-noise-bg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://assets.codepen.io/39255/old-tv-noise-loop.mp4" type="video/mp4" />
      </video>

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
            <div className="press-start blink" onClick={handleStart}>
              <img 
                src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
                alt=""
                className="win98-icon"
              />
              START
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="noise"></div>
          <div className="crt-effect"></div>
          <div className="scanline"></div>
          
          {/* Windows 98 Menu Bar */}
          <div className="win98-menubar">
            <div className="win98-title-bar">
              <div className="win98-title">
                <img 
                  src="https://win98icons.alexmeub.com/icons/png/computer-3.png"
                  alt=""
                  className="win98-icon small"
                />
                Portfolio.exe
              </div>
              <div className="win98-window-controls">
                <button className="win98-button minimize">_</button>
                <button className="win98-button maximize">□</button>
                <button className="win98-button close" onClick={() => {
                  setIsLoaded(false);
                  setShowStartScreen(true);
                }}>✕</button>
              </div>
            </div>
            <div className="win98-menu">
              <div className="win98-menu-item">File</div>
              <div className="win98-menu-item">Edit</div>
              <div className="win98-menu-item">View</div>
              <div className="win98-menu-item">Shane</div>
            </div>
          </div>
          
          <main className="awge-content">
            <div className="menu-grid">
              <div className="menu-item">
                <span className="menu-number">01.</span>
                <span className="menu-title">
                  <img 
                    src="https://win98icons.alexmeub.com/icons/png/internet_options-5.png" 
                    alt=""
                    className="win98-icon"
                  />
                  ABOUT
                </span>
              </div>
              <div className="menu-item">
                <span className="menu-number">02.</span>
                <span className="menu-title">
                  <img 
                    src="https://win98icons.alexmeub.com/icons/png/briefcase-0.png" 
                    alt=""
                    className="win98-icon"
                  />
                  PROJECTS
                </span>
              </div>
              <div className="menu-item">
                <span className="menu-number">03.</span>
                <span className="menu-title">
                  <img 
                    src="https://win98icons.alexmeub.com/icons/png/settings_gear-0.png" 
                    alt=""
                    className="win98-icon"
                  />
                  SKILLS
                </span>
              </div>
              <div className="menu-item">
                <span className="menu-number">04.</span>
                <span className="menu-title">
                  <img 
                    src="https://win98icons.alexmeub.com/icons/png/modem-5.png" 
                    alt=""
                    className="win98-icon"
                  />
                  CONTACT
                </span>
              </div>
              <div className="menu-item">
                <span className="menu-number">05.</span>
                <span className="menu-title">
                  <img 
                    src="https://win98icons.alexmeub.com/icons/png/notepad-1.png" 
                    alt=""
                    className="win98-icon"
                  />
                  RESUME
                </span>
              </div>
            </div>
          </main>
          
          {/* Windows 98 Status Bar */}
          <div className="win98-statusbar">
            <div className="win98-status-item">Ready</div>
            <div className="win98-status-item">{new Date().toLocaleDateString()}</div>
          </div>
          
          <footer className="awge-footer">
            <div className="copyright">
              <img 
                src="https://win98icons.alexmeub.com/icons/png/world-0.png" 
                alt=""
                className="win98-icon small"
              />
              © {new Date().getFullYear()} PORTFOLIO - ALL RIGHTS RESERVED
            </div>
            
            <div className="datetime">
              {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
            </div>
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
          background: #fff; /* Changed from black to white */
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
          display: flex;
          align-items: center;
          justify-content: center;
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
        
        .tv-noise-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0.08; /* Subtle effect that doesn't overwhelm content */
          pointer-events: none;
          filter: contrast(1.2) brightness(0.8);
          mix-blend-mode: hard-light;
        }
        
        .awge-content {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          z-index: 10;
          position: relative;
          padding-top: 60px; /* Increased for bigger menu bar */
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
          color: #000; /* Added to make text visible against white background */
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
          text-shadow: 2px 2px 0 #fff; /* Changed shadow to be visible against white background */
          display: flex;
          align-items: center;
          color: #000; /* Added to ensure text is visible */
        }
        
        .awge-footer {
          position: fixed;
          bottom: 20px;
          left: 0;
          right: 0;
          padding: 20px;
          font-size: 12px;
          opacity: 0.5;
          border-top: 1px solid rgba(0, 0, 0, 0.1); /* Changed to dark border for white bg */
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #000; /* Added black text color */
        }
        
        .copyright {
          display: flex;
          align-items: center;
          color: #000; /* Explicitly set black text */
        }
        
        .datetime {
          font-size: 14px;
          opacity: 0.7;
          color: #000; /* Explicitly set black text */
        }
        
        .win98-icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          image-rendering: pixelated;
          vertical-align: middle;
        }
        
        .win98-icon.small {
          width: 16px;
          height: 16px;
          margin-right: 5px;
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
          /* These styles won't be applied since we're showing the mobile warning */
          /* But kept in case you decide to support mobile in the future */
          .menu-title {
            font-size: 22px;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .menu-title {
            font-size: 24px;
          }
          
          .menu-item {
            padding: 8px;
          }
          
          .win98-icon {
            width: 22px;
            height: 22px;
          }
        }
        
        @media (min-width: 1025px) {
          .menu-grid {
            gap: 35px;
          }
          
          .menu-item:hover {
            transform: translateX(15px);
          }
        }
        
        /* Add Windows 98 border style */
        .win98-border {
          border: 2px solid;
          border-color: #fff #888 #888 #fff;
          box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #888;
        }
        
        /* Add pixel effect to text */
        .pixel-effect {
          image-rendering: pixelated;
        }

        /* Windows 98 Menu Bar Styles - Made Bigger */
        .win98-menubar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: #c0c0c0;
          z-index: 100;
          user-select: none;
          border-bottom: 2px solid #404040;
        }
        
        .win98-title-bar {
          background: linear-gradient(90deg, #000080, #1084d0);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 8px;
          font-family: 'MS Sans Serif', 'Segoe UI', Tahoma, sans-serif;
          font-size: 14px;
          font-weight: bold;
          height: 28px;
        }
        
        .win98-title {
          display: flex;
          align-items: center;
        }
        
        .win98-window-controls {
          display: flex;
        }
        
        .win98-button {
          width: 20px;
          height: 18px;
          margin-left: 4px;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #c0c0c0;
          border: 1px solid;
          border-color: #dfdfdf #404040 #404040 #dfdfdf;
          box-shadow: inset 1px 1px #ffffff, inset -1px -1px #808080;
          cursor: pointer;
          color: black; /* Make button text black */
        }
        
        .win98-button:active {
          border-color: #404040 #dfdfdf #dfdfdf #404040;
          box-shadow: inset -1px -1px #ffffff, inset 1px 1px #808080;
        }
        
        .win98-menu {
          display: flex;
          background-color: #c0c0c0;
          padding: 3px 1px;
          border-bottom: 1px solid #808080;
          height: 24px;
          color: black; /* Changed menu text to black */
        }
        
        .win98-menu-item {
          padding: 2px 12px;
          font-family: 'MS Sans Serif', 'Segoe UI', Tahoma, sans-serif;
          font-size: 13px;
          margin-right: 4px;
          cursor: pointer;
          color: black; /* Explicit black color for menu items */
        }
        
        .win98-menu-item:hover {
          background-color: #000080;
          color: white; /* Keep the hover text color white for contrast */
        }
        
        /* Add style for black icons in menu bar */
        .win98-menu .win98-icon {
          filter: brightness(0); /* Make icons black */
        }
        
        .win98-menu-item:hover .win98-icon {
          filter: brightness(1); /* Return to original color on hover */
        }
      `}</style>
      
      {/* Preload font */}
      <link rel="preload" href="https://fonts.cdnfonts.com/s/36671/nasalization-rg.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      
      {/* External font link */}
      <link href="https://fonts.cdnfonts.com/css/nasalization" rel="stylesheet" />
      
      {/* Add classic Windows fonts */}
      <link href="https://fonts.cdnfonts.com/css/ms-sans-serif" rel="stylesheet" />
      
      {/* Windows 98 icons CDN */}
      <link rel="preload" href="https://win98icons.alexmeub.com/icons/png/windows-0.png" as="image" />
    </div>
  );
}
