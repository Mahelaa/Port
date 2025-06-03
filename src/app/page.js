"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import './styles.css';
import contentData from './contentData';
import { getIconSrc } from './iconConfig';

// Reusable components
const WindowHeader = ({ title, icon, onClose }) => (
  <div className="win98-title-bar">
    <div className="win98-title">
      <img src={getIconSrc(icon)} alt="" className="win98-icon small" />
      {title}
    </div>
    <div className="win98-window-controls">
      <button className="win98-button minimize">_</button>
      <button className="win98-button maximize">□</button>
      <button className="win98-button close" onClick={onClose}>✕</button>
    </div>
  </div>
);

const SkillBar = ({ name, level }) => (
  <div className="win98-skill-bar">
    <span className="win98-skill-label">{name}</span>
    <div className="win98-skill-progress">
      <div className="win98-skill-fill" style={{ width: `${level}%` }}></div>
    </div>
    <span className="win98-skill-percent">{level}%</span>
  </div>
);

export default function Home() {
  // Core state declarations
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showStartScreen, setShowStartScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGameboySection, setCurrentGameboySection] = useState('about');
  const [modalStates, setModalStates] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    resume: false
  });
  
  // Window states
  const [showGlitchWindow, setShowGlitchWindow] = useState(true);
  const [showPaintWindow, setShowPaintWindow] = useState(true);
  const [showIEModal, setShowIEModal] = useState(true);
  const [showMediaPlayerModal, setShowMediaPlayerModal] = useState(true);
  
  // Interactive states
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState(0);
  const [showIntroModal, setShowIntroModal] = useState(false);
  
  // Ref for error page handling
  const fromErrorRef = useRef(false);

  // Handle modal toggling with useCallback for performance
  const toggleModal = useCallback((modalName, isOpen) => {
    setModalStates(prev => ({ ...prev, [modalName]: isOpen }));
  }, []);

  // Check if user is returning from error page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fromError = params.get('fromError') === 'true';
      
      if (fromError) {
        setInitialLoading(false);
        setShowStartScreen(false);
        setIsLoaded(true);
        fromErrorRef.current = true;
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // Mobile detection with optimized resize handler
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial loading timer
  useEffect(() => {
    if (fromErrorRef.current) return;
    
    const timer = setTimeout(() => {
      setInitialLoading(false);
      setShowStartScreen(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isLoaded) {
        setIsLoaded(false);
        setShowStartScreen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoaded]);

  // Handler functions
  const handleStart = useCallback(() => {
    setShowStartScreen(false);
    setIsLoaded(true);
    setShowIntroModal(true);
  }, []);
  
  const handleGameboyNavigation = useCallback((section) => {
    setCurrentGameboySection(section);
  }, []);

  const handleDpadNavigation = useCallback((direction) => {
    const sections = ['about', 'projects', 'skills', 'contact', 'resume'];
    const currentIndex = sections.indexOf(currentGameboySection);
    let newIndex;

    switch (direction) {
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
  }, [currentGameboySection]);

  // Memoized functions for better performance
  const getSimplifiedContent = useCallback((section) => {
    return contentData.gameboy?.sections?.[section] || [];
  }, []);

  const getCurrentSkills = useCallback(() => {
    switch(activeSkillTab) {
      case 0: return contentData.skills?.frontend || [];
      case 1: return contentData.skills?.backend || [];
      case 2: return contentData.skills?.technologies || [];
      default: return [];
    }
  }, [activeSkillTab]);

  // Desktop icon click handler
  const handleDesktopIconClick = useCallback((action) => {
    if (action === 'ie') {
      setShowIEModal(true);
    } else if (action) {
      toggleModal(action, true);
    }
  }, [toggleModal]);

  // Close intro modal and show media player
  const handleIntroClose = useCallback(() => {
    setShowIntroModal(false);
    setShowMediaPlayerModal(true);
  }, []);

  // Add font loading handler
  const handleFontLoad = useCallback((e) => {
    e.target.media = 'all';
  }, []);

  if (isMobile) {
    return (
      <div className="gameboy-container">
        {/* Add favicon */}
        <link rel="icon" href="/favicon.png" />
        <div className="gameboy-body">
          <div className="gameboy-screen-area">
            <div className="gameboy-screen-border">
              <div className="gameboy-screen">
                <div className="power-indicator">{contentData.gameboy.powerText}</div>

                {initialLoading ? (
                  <div className="gameboy-loading">
                    {contentData.gameboy.nintendo}
                    <div className="gameboy-loading-dots">
                      <span className="loading-dot">.</span>
                      <span className="loading-dot">.</span>
                      <span className="loading-dot">.</span>
                    </div>
                  </div>
                ) : showStartScreen ? (
                  <div className="gameboy-start-screen">
                    <div className="gameboy-title">{contentData.loading.portfolioTitle}</div>
                    <div className="gameboy-subtitle">{contentData.loading.startText}</div>
                    <div className="gameboy-start-button" onClick={handleStart}>
                      {contentData.loading.startButtonText}
                    </div>
                  </div>
                ) : (
                  <div className="gameboy-content">
                    <div className="gameboy-header">
                      {currentGameboySection.toUpperCase()}
                    </div>

                    <div className="gameboy-section">
                      {getSimplifiedContent(currentGameboySection).map((text, index) => (
                        <p key={index}>{text}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="gameboy-nintendo">{contentData.gameboy.nintendo}<span className="gameboy-tm">{contentData.gameboy.trademark}</span></div>
              <div className="gameboy-model">{contentData.gameboy.model}</div>
            </div>
          </div>

          {!initialLoading && !showStartScreen && (
            <div className="gameboy-controls">
              <div className="dpad">
                <div
                  className="dpad-button dpad-up"
                  onClick={() => {}}
                  onTouchStart={(e) => {
                    e.preventDefault();
                  }}
                ></div>
                <div
                  className="dpad-button dpad-right"
                  onClick={() => handleDpadNavigation('right')}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleDpadNavigation('right');
                  }}
                ></div>
                <div
                  className="dpad-button dpad-down"
                  onClick={() => {}}
                  onTouchStart={(e) => {
                    e.preventDefault();
                  }}
                ></div>
                <div
                  className="dpad-button dpad-left"
                  onClick={() => handleDpadNavigation('left')}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleDpadNavigation('left');
                  }}
                ></div>
                <div className="dpad-center"></div>
              </div>

              <div className="action-buttons">
                <div className="ab-buttons">
                  <div
                    className="ab-button b-button"
                    onClick={() => {
                      setIsLoaded(false);
                      setShowStartScreen(true);
                    }}
                    onTouchStart={() => {
                      setIsLoaded(false);
                      setShowStartScreen(true);
                    }}
                  >B</div>
                  <div
                    className="ab-button a-button"
                    onClick={() => {
                      if (showStartScreen) {
                        handleStart();
                      }
                    }}
                    onTouchStart={() => {
                      if (showStartScreen) {
                        handleStart();
                      }
                    }}
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

        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </div>
    );
  }

  return (
    <div className="win98-desktop">
      {/* Preload critical resources */}
      <link rel="icon" href="/favicon.png" />
      <link rel="preload" href="https://fonts.cdnfonts.com/s/36671/nasalization-rg.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" href={getIconSrc('windows-0.png')} as="image" />
      
      <video
        className="tv-noise-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="https://assets.codepen.io/39255/old-tv-noise-loop.mp4" type="video/mp4" />
      </video>

      {initialLoading ? (
        <div className="loading-screen">
          <div className="loading-text">{contentData.loading.text}</div>
        </div>
      ) : showStartScreen ? (
        <div className="start-screen">
          <div className="noise"></div>
          <div className="crt-effect"></div>
          <div className="scanline"></div>
          <div className="start-content">
            <h1 className="glitch-text title-text">{contentData.loading.portfolioTitle}</h1>
            <div className="press-start blink" onClick={handleStart}>
              <img
                src={getIconSrc('windows-0.png')}
                alt=""
                className="win98-icon"
              />
              {contentData.loading.startButtonText}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="win98-desktop-icons">
            {contentData.desktopIcons?.map((item, index) => (
              <div 
                key={index} 
                className="win98-desktop-icon" 
                onClick={item.action ? () => handleDesktopIconClick(item.action) : undefined}
              >
                <img 
                  src={getIconSrc(item.icon)}
                  alt={item.name} 
                  className="desktop-icon-img"
                  loading="lazy"
                />
                <span className="desktop-icon-text">{item.name}</span>
              </div>
            ))}
          </div>
          
          {/* Error Windows - Optimized rendering */}
          {showGlitchWindow && (
            <div className="error-windows-cascade" style={{ right: '10px', top: '50px', position: 'absolute', zIndex: 1000 }}>
              {Array.from({ length: 6 }, (_, windowIndex) => (
                <div key={windowIndex} className="win98-window error-window" style={{ 
                  position: 'absolute', 
                  top: `${-45 + windowIndex * 5}px`, 
                  left: `${-45 + windowIndex * 5}px`,
                  border: '2px solid #dfdfdf',
                  borderRight: '2px solid #7f7f7f',
                  borderBottom: '2px solid #7f7f7f',
                  boxShadow: 'inset 1px 1px 0px 1px #ffffff, inset -1px -1px 0px 1px #0a0a0a',
                  width: '380px',
                  height: '180px'
                }}>
                  <div className="win98-title-bar">
                    <div className="win98-title">
                      <img src={getIconSrc(contentData.errorWindows?.icon)} alt="" className="win98-icon small" loading="lazy" />
                      {contentData.errorWindows?.title}
                    </div>
                  </div>
                  <div className="error-window-content">
                    <div className="error-content-wrapper">
                      <div className="error-icon-container">
                        <img 
                          src={getIconSrc(contentData.errorWindows?.errorIcon)}
                          alt="Error" 
                          className="error-icon"
                          loading="lazy"
                        />
                      </div>
                      <div className="error-text">
                        {windowIndex === 5 ? (
                          <>
                            <h3 style={{ color: 'black' }}>{contentData.errorWindows?.messages?.[1]?.title}</h3>
                            <p style={{ color: 'black' }}>{contentData.errorWindows?.messages?.[1]?.text}</p>
                            <div className="error-code" style={{ color: 'black' }}>
                              {contentData.errorWindows?.messages?.[1]?.code}
                            </div>
                            {contentData.errorWindows?.messages?.[1]?.technical?.map((text, index) => (
                              <p key={index} style={{ color: 'black' }}>{text}</p>
                            ))}
                          </>
                        ) : (
                          <>
                            <h3 style={{ color: 'black' }}>{contentData.errorWindows?.messages?.[0]?.title}</h3>
                            <p style={{ color: 'black' }}>{contentData.errorWindows?.messages?.[0]?.text}</p>
                            <div className="error-code" style={{ color: 'black' }}>
                              {contentData.errorWindows?.messages?.[0]?.code}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="error-buttons">
                      {windowIndex === 5 ? (
                        <>
                          <button className="win98-button-medium" style={{ color: 'black' }} onClick={() => setShowGlitchWindow(false)}>{contentData.errorWindows?.buttons?.[3]}</button>
                          <button className="win98-button-medium" style={{ color: 'black' }} onClick={() => window.location.href = '/error'}>{contentData.errorWindows?.buttons?.[4]}</button>
                          <button className="win98-button-medium" style={{ color: 'black' }}>{contentData.errorWindows?.buttons?.[2]}</button>
                        </>
                      ) : (
                        <>
                          <button className="win98-button-small" style={{ color: 'black' }} onClick={() => setShowGlitchWindow(false)}>{contentData.errorWindows?.buttons?.[0]}</button>
                          <button className="win98-button-small" style={{ color: 'black' }} onClick={() => setShowGlitchWindow(false)}>{contentData.errorWindows?.buttons?.[1]}</button>
                          <button className="win98-button-small" style={{ color: 'black' }} onClick={() => setShowGlitchWindow(false)}>{contentData.errorWindows?.buttons?.[2]}</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* MS Paint Window */}
          {showPaintWindow && (
            <div className="paint-window-container" style={{ left: '300px', top: '120px', position: 'absolute', zIndex: 980 }}>
              <div className="win98-window paint-window" style={{
                width: '500px',
                height: '400px',
                border: '2px solid #dfdfdf',
                borderRight: '2px solid #7f7f7f',
                borderBottom: '2px solid #7f7f7f',
                boxShadow: 'inset 1px 1px 0px 1px #ffffff, inset -1px -1px 0px 1px #0a0a0a',
                background: '#c0c0c0'
              }}>
                <div className="win98-title-bar">
                  <div className="win98-title">
                    <img src={getIconSrc(contentData.paint.icon)} alt="" className="win98-icon small" />
                    {contentData.paint.title}
                  </div>
                  <div className="win98-window-controls">
                    <button className="win98-button minimize">_</button>
                    <button className="win98-button maximize">□</button>
                    <button className="win98-button close" onClick={() => setShowPaintWindow(false)}>✕</button>
                  </div>
                </div>
                <div className="paint-content" style={{
                  height: 'calc(100% - 20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#c0c0c0'
                }}>
                  <div className="paint-menu-bar" style={{
                    background: '#c0c0c0',
                    borderBottom: '1px solid #808080',
                    padding: '2px 6px',
                    fontSize: '11px',
                    display: 'flex',
                    gap: '12px'
                  }}>
                    {contentData.paint.menuItems.map((item, index) => (
                      <div key={index} className="paint-menu-item">{item}</div>
                    ))}
                  </div>
                  
                  <div className="paint-workspace" style={{
                    display: 'flex',
                    flex: 1,
                    background: '#c0c0c0'
                  }}>
                    <div className="paint-toolbar-vertical" style={{
                      width: '52px',
                      background: '#c0c0c0',
                      border: '2px inset #c0c0c0',
                      margin: '4px',
                      padding: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}>
                      {contentData.paint.tools.map((tool, index) => (
                        <div key={index} className="paint-tool-button" title={tool.name} style={{
                          width: '24px',
                          height: '24px',
                          border: '1px outset #c0c0c0',
                          background: '#c0c0c0',
                          cursor: 'pointer'
                        }}>
                          <div className={`tool-icon ${tool.icon}`}></div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="paint-canvas-area" style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      margin: '4px',
                      background: '#c0c0c0'
                    }}>
                      <div className="paint-canvas" style={{
                        flex: 1,
                        background: 'white',
                        border: '2px inset #c0c0c0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}>
                        <img 
                          src={contentData.paint?.profileImage}
                          alt={contentData.paint?.profileAlt}
                          className="paint-profile-image" 
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Color Palette */}
                      <div className="paint-color-palette" style={{
                        height: '60px',
                        background: '#c0c0c0',
                        border: '2px inset #c0c0c0',
                        margin: '4px 0',
                        padding: '4px',
                        display: 'flex',
                        gap: '8px'
                      }}>
                        <div className="paint-current-colors" style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}>
                          <div style={{ fontSize: '10px', marginBottom: '2px' }}>Colors</div>
                          <div className="paint-color-selector" style={{
                            position: 'relative',
                            width: '32px',
                            height: '32px'
                          }}>
                            <div style={{
                              width: '24px',
                              height: '24px',
                              background: 'black',
                              border: '2px inset #c0c0c0',
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              cursor: 'pointer'
                            }}></div>
                            <div style={{
                              width: '24px',
                              height: '24px',
                              background: 'white',
                              border: '2px inset #c0c0c0',
                              position: 'absolute',
                              bottom: '0',
                              right: '0',
                              cursor: 'pointer'
                            }}></div>
                          </div>
                        </div>
                        <div className="paint-color-grid" style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(14, 1fr)',
                          gridTemplateRows: 'repeat(2, 1fr)',
                          gap: '1px',
                          flex: 1,
                          height: '48px'
                        }}>
                          {/*
                            First row - basic colors
                            '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
                            '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000',
                            // Second row - lighter variants and additional colors  
                            '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF',
                            '#FFFF80', '#80FFFF', '#80FF80', '#FF8080', '#8080FF', '#FF8040'
                          */}
                          {['#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
                            '#808040', '#004040', '#0080FF', '#004080', '#8000FF', '#804000',
                            '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF',
                            '#FFFF80', '#80FFFF', '#80FF80', '#FF8080', '#8080FF', '#FF8040'].map((color, index) => (
                            <div 
                              key={index}
                              style={{
                                width: '100%',
                                height: '100%',
                                background: color,
                                border: '1px inset #c0c0c0',
                                cursor: 'pointer',
                                minWidth: '14px',
                                minHeight: '14px'
                              }}
                              title={color}
                              onClick={() => {
                                // Add color selection functionality here if needed
                                console.log('Selected color:', color);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="paint-status-bar" style={{
                    height: '20px',
                    background: '#c0c0c0',
                    borderTop: '1px solid #808080',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 6px',
                    fontSize: '10px'
                  }}>
                    <div>{contentData.paint.statusText}</div>
                    <div>{contentData.paint.dimensions}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Windows Media Player Modal */}
          {showMediaPlayerModal && (
            <div className="media-player-container" style={{ left: '30px', top: '30px', position: 'absolute', zIndex: 995 }}>
              <div className="win98-window media-player-window" style={{ width: '280px', height: '350px', background: '#c0c0c0' }}>
                <div className="win98-title-bar">
                  <div className="win98-title">
                    <img src={getIconSrc(contentData.mediaPlayer.icon)} alt="" className="win98-icon small" />
                    {contentData.mediaPlayer.title}
                  </div>
                  <div className="win98-window-controls">
                    <button className="win98-button minimize">_</button>
                    <button className="win98-button maximize">□</button>
                    <button className="win98-button close" onClick={() => setShowMediaPlayerModal(false)}>✕</button>
                  </div>
                </div>
                
                <div className="wmp-menu-bar" style={{ 
                  background: '#c0c0c0', 
                  borderBottom: '1px solid #808080', 
                  padding: '2px 6px',
                  fontSize: '10px'
                }}>
                  {contentData.mediaPlayer.menuItems.map((item, index) => (
                    <span key={index} className="wmp-menu-item">{item}</span>
                  ))}
                </div>
                
                <div className="wmp-content" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 50px)' }}>
                  {/* Video/Visualization Area */}
                  <div className="wmp-display-area" style={{ 
                    height: '120px', 
                    background: 'black', 
                    margin: '6px',
                    border: '2px inset #c0c0c0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div className="wmp-visualization" style={{ 
                      display: 'flex', 
                      alignItems: 'end', 
                      gap: '1px',
                      height: '40px'
                    }}>
                      {[8, 16, 12, 24, 18, 10, 22, 14, 26, 15, 11, 20].map((height, index) => (
                        <div 
                          key={index}
                          style={{
                            width: '3px',
                            height: `${height}px`,
                            background: 'linear-gradient(to top, #00ff00, #ffff00, #ff0000)',
                            animation: `wmpPulse 0.${index + 5}s infinite alternate`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Track Info Overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '6px',
                      color: 'white',
                      fontSize: '10px',
                      textShadow: '1px 1px 1px black'
                    }}>
                      <div>{contentData.mediaPlayer.currentTrack}</div>
                    </div>
                  </div>
                  
                  {/* Controls Area */}
                  <div className="wmp-controls-area" style={{ 
                    padding: '6px',
                    background: '#c0c0c0'
                  }}>
                    {/* Transport Controls */}
                    <div className="wmp-transport-controls" style={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '3px',
                      marginBottom: '6px'
                    }}>
                      <button className="wmp-control-btn" style={{ 
                        width: '28px', 
                        height: '20px',
                        border: '1px outset #c0c0c0',
                        background: '#c0c0c0',
                        fontSize: '10px'
                      }}>⏮</button>
                      <button 
                        className="wmp-control-btn play-pause" 
                        onClick={() => setIsPlaying(!isPlaying)}
                        style={{ 
                          width: '28px', 
                          height: '20px',
                          border: '1px outset #c0c0c0',
                          background: '#c0c0c0',
                          fontSize: '10px'
                        }}
                      >
                        {isPlaying ? '⏸' : '▶'}
                      </button>
                      <button className="wmp-control-btn" style={{ 
                        width: '28px', 
                        height: '20px',
                        border: '1px outset #c0c0c0',
                        background: '#c0c0c0',
                        fontSize: '10px'
                      }}>⏹</button>
                      <button className="wmp-control-btn" style={{ 
                        width: '28px', 
                        height: '20px',
                        border: '1px outset #c0c0c0',
                        background: '#c0c0c0',
                        fontSize: '10px'
                      }}>⏭</button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="wmp-progress-section" style={{ marginBottom: '6px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        fontSize: '9px'
                      }}>
                        <span>00:42</span>
                        <div style={{ 
                          flex: 1, 
                          height: '5px',
                          border: '1px inset #c0c0c0',
                          background: '#808080',
                          position: 'relative'
                        }}>
                          <div style={{
                            width: '35%',
                            height: '100%',
                            background: 'linear-gradient(to right, #0080ff, #4040ff)',
                            position: 'relative'
                          }}>
                            <div style={{
                              position: 'absolute',
                              right: '-2px',
                              top: '-1px',
                              width: '4px',
                              height: '7px',
                              background: '#c0c0c0',
                              border: '1px outset #c0c0c0'
                            }} />
                          </div>
                        </div>
                        <span>02:15</span>
                      </div>
                    </div>
                    
                    {/* Volume Control */}
                    <div className="wmp-volume-section" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      fontSize: '9px'
                    }}>
                      <span>🔊</span>
                      <div style={{ 
                        width: '80px', 
                        height: '5px',
                        border: '1px inset #c0c0c0',
                        background: '#808080',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: '70%',
                          height: '100%',
                          background: 'linear-gradient(to right, #008000, #00ff00)',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            right: '-2px',
                            top: '-1px',
                            width: '4px',
                            height: '7px',
                            background: '#c0c0c0',
                            border: '1px outset #c0c0c0'
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Playlist Area */}
                  <div className="wmp-playlist-area" style={{ 
                    flex: 1,
                    margin: '0 6px 6px 6px',
                    border: '2px inset #c0c0c0',
                    background: 'white',
                    overflow: 'auto'
                  }}>
                    <div style={{ 
                      background: '#c0c0c0', 
                      padding: '2px 6px',
                      borderBottom: '1px solid #808080',
                      fontSize: '9px',
                      fontWeight: 'bold'
                    }}>
                      Playlist
                    </div>
                    <div style={{ padding: '2px' }}>
                      {contentData.mediaPlayer.playlist.map((track, index) => (
                        <div key={index} style={{ 
                          display: 'flex',
                          padding: '1px 3px',
                          background: (index === 0 && isPlaying) ? '#0080ff' : 'transparent',
                          color: (index === 0 && isPlaying) ? 'white' : 'black',
                          fontSize: '9px'
                        }}>
                          <span style={{ width: '15px' }}>{index + 1}.</span>
                          <span style={{ flex: 1 }}>{track.title}</span>
                          <span>{track.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="wmp-status-bar" style={{ 
                  height: '16px',
                  background: '#c0c0c0',
                  borderTop: '1px solid #808080',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 6px',
                  fontSize: '9px'
                }}>
                  <span>{isPlaying ? contentData.mediaPlayer.playingText : contentData.mediaPlayer.readyText}</span>
                  <span>{contentData.mediaPlayer.audioInfo}</span>
                </div>
              </div>
            </div>
          )}

          {/* Internet Explorer Modal */}
          {showIEModal && (
            <div className="ie-browser-container" style={{ right: '20px', top: '250px', position: 'absolute', zIndex: 985 }}>
              <div className="ie-browser-window" style={{
                width: '600px',
                height: '450px',
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid #dfdfdf',
                borderRight: '2px solid #7f7f7f',
                borderBottom: '2px solid #7f7f7f',
                boxShadow: 'inset 1px 1px 0px 1px #ffffff, inset -1px -1px 0px 1px #0a0a0a',
                background: '#c0c0c0',
                overflow: 'hidden'
              }}>
                {/* Title bar remains the same */}
                <div className="ie-title-bar">
                  <div className="ie-title">
                    <img src={getIconSrc(contentData.internetExplorer.icon)} alt="" className="ie-icon small" />
                    {contentData.internetExplorer.title}
                  </div>
                  <div className="ie-window-controls">
                    <button className="ie-button minimize">_</button>
                    <button className="ie-button maximize">□</button>
                    <button className="ie-button close" onClick={() => setShowIEModal(false)}>✕</button>
                  </div>
                </div>
                
                {/* Menu bar with flex-shrink to prevent growing */}
                <div className="ie-menu-bar" style={{ flexShrink: 0 }}>
                  {contentData.internetExplorer.menuItems.map((item, index) => (
                    <span key={index} className="ie-menu-item">{item}</span>
                  ))}
                </div>
                
                {/* Toolbar with flex-shrink */}
                <div className="ie-toolbar" style={{ flexShrink: 0 }}>
                  <div className="ie-toolbar-left">
                    {contentData.internetExplorer.toolbarButtons.map((button, index) => (
                      <button key={index} className="ie-toolbar-button">
                        <img src={getIconSrc(button.icon)} alt="" className="ie-toolbar-icon" />
                        {button.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Address bar with flex-shrink */}
                <div className="ie-address-bar" style={{ flexShrink: 0 }}>
                  <span className="ie-address-label">{contentData.internetExplorer.addressLabel}</span>
                  <div className="ie-address-input">
                    <input type="text" value="https://github.com/mahelaa" readOnly className="ie-url-input" />
                  </div>
                </div>
                
                {/* Content area with flex: 1 to take available space and overflow handling */}
                <div className="ie-content-area" style={{
                  flex: 1,
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div className="retro-github-page" style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    <div className="retro-github-header" style={{
                      background: '#c0c0c0',
                      padding: '4px 8px',
                      borderBottom: '1px solid #808080',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      flexShrink: 0
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>GitHub - Windows 98 Edition</div>
                    </div>
                    
                    <div className="retro-github-body" style={{
                      display: 'flex',
                      flex: 1,
                      overflow: 'hidden',
                      background: '#FFFFFF'
                    }}>
                      {/* Sidebar with fixed width and scrollable */}
                      <div className="retro-github-sidebar" style={{
                        width: '140px',
                        flexShrink: 0,
                        background: '#efefef',
                        borderRight: '1px solid #c0c0c0',
                        padding: '8px',
                        fontSize: '11px',
                        overflow: 'auto'
                      }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Navigation</div>
                        <ul style={{ 
                          listStyle: 'none', 
                          padding: '0',
                          margin: '0',
                          marginBottom: '15px'
                        }}>
                          <li style={{ marginBottom: '4px' }}><a href="#" style={{ color: '#0000EE', textDecoration: 'none' }}>Repository</a></li>
                          <li style={{ marginBottom: '4px' }}><a href="#" style={{ color: '#0000EE', textDecoration: 'none' }}>Issues</a></li>
                          <li style={{ marginBottom: '4px' }}><a href="#" style={{ color: '#0000EE', textDecoration: 'none' }}>Pull Requests</a></li>
                          <li style={{ marginBottom: '4px' }}><a href="#" style={{ color: '#0000EE', textDecoration: 'none' }}>Projects</a></li>
                        </ul>
                        
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>My Repositories</div>
                        <ul style={{ 
                          listStyle: 'none', 
                          padding: '0',
                          margin: '0'
                        }}>
                          <li style={{ marginBottom: '4px' }}><a href="#" style={{ color: '#0000EE', textDecoration: 'none' }}>portfolio-website</a></li>
                          <li style={{ marginBottom: '4px' }}><a href="#" style={{ color: '#0000EE', textDecoration: 'none' }}>ecommerce-platform</a></li>
                          <li style={{ marginBottom: '4px' }}><a href="#" style={{ color: '#0000EE', textDecoration: 'none' }}>weather-app</a></li>
                        </ul>
                      </div>
                      
                      {/* Main content area with scrolling */}
                      <div className="retro-github-content" style={{
                        flex: '1',
                        padding: '8px',
                        fontSize: '11px',
                        overflow: 'auto'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <img 
                            src={getIconSrc("user-0.png")} 
                            alt="User" 
                            style={{ width: '32px', height: '32px', marginRight: '10px' }} 
                          />
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>mahelaa</div>
                            <div style={{ color: '#666', fontSize: '11px' }}>Web Developer • Toronto, CA</div>
                          </div>
                        </div>
                        
                        <div style={{ 
                          border: '1px solid #c0c0c0', 
                          background: '#f5f5f5',
                          padding: '10px',
                          marginBottom: '10px',
                          borderRadius: '0'
                        }}>
                          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>About</div>
                          <p style={{ margin: '0', marginBottom: '5px' }}>
                            Passionate web developer with expertise in modern front-end technologies.
                          </p>
                        </div>
                        
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Popular Repositories</div>
                        
                        {/* Project list in a scrollable container */}
                        <div style={{ height: 'calc(100% - 130px)', overflow: 'auto' }}>
                          {contentData.projects.items.map((project, index) => (
                            <div key={index} style={{ 
                              border: '1px solid #c0c0c0',
                              padding: '8px',
                              marginBottom: '8px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <a href={project.githubLink} style={{ color: '#0000EE', fontWeight: 'bold', textDecoration: 'none' }}>
                                  {project.title}
                                </a>
                                <span style={{ color: '#666', fontSize: '10px' }}>Updated yesterday</span>
                              </div>
                              <p style={{ margin: '5px 0', fontSize: '10px' }}>{project.description}</p>
                              <div style={{ 
                                display: 'flex', 
                                fontSize: '10px',
                                color: '#666',
                                marginTop: '5px'
                              }}>
                                <span style={{ marginRight: '10px' }}>⭐ 15</span>
                                <span style={{ marginRight: '10px' }}>🔄 3</span>
                                <span>{project.technologies[0]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status bar with flex-shrink */}
                <div className="ie-status-bar" style={{
                  flexShrink: 0,
                  height: '20px',
                  borderTop: '1px solid #808080',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 8px',
                  alignItems: 'center',
                  background: '#c0c0c0',
                  fontSize: '11px'
                }}>
                  <span>Done</span>
                  <span>Internet zone</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="win98-taskbar">
            <div className="win98-start-button">
              <img 
                src={getIconSrc(contentData.taskbar.startButton.icon)} 
                alt="Start" 
                className="win98-icon small"
              />
              {contentData.taskbar.startButton.text}
            </div>
            
            <div className="win98-task-items">
            </div>
            
            <div className="win98-statusbar">
              {contentData.taskbar.statusItems.map((item, index) => (
                <div key={index} className="win98-status-item">
                  <img
                    src={getIconSrc(item.icon)}
                    alt=""
                    className="win98-icon small"
                  />
                  {item.text}
                </div>
              ))}
              <div className="win98-status-item">
                {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </>
      )}

      {!isMobile && modalStates.about && (
        <div className="win98-modal-overlay">
          <div className="win98-modal">
            <WindowHeader 
              title={contentData.about.title} 
              icon="user-4.png" 
              onClose={() => toggleModal('about', false)} 
            />
            <div className="win98-modal-content">              <img
                src={getIconSrc('user_computer-0.png')}
                alt="User profile"
                className="win98-user-icon"
              />
              <div className="win98-about-text">
                <h3>{contentData.about.content[0]}</h3>
                {contentData.about.content.slice(1, -1).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <hr className="win98-hr" />
                <p className="win98-additional-info">{contentData.about.content[contentData.about.content.length - 1]}</p>
              </div>
            </div>
            <div className="win98-modal-footer">
              <button className="win98-button-large" onClick={() => toggleModal('about', false)}>OK</button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && modalStates.skills && (
        <div className="win98-modal-overlay">
          <div className="win98-modal win98-skills-modal">
            <WindowHeader 
              title={contentData.skills.title} 
              icon="application_lightning-0.png" 
              onClose={() => toggleModal('skills', false)} 
            />
            <div className="win98-modal-content">
              <div className="win98-skills-tabs">
                <div className="win98-tabs">
                  {contentData.skills.categories.map((category, index) => (
                    <div 
                      key={index} 
                      className={`win98-tab ${index === activeSkillTab ? 'win98-tab-active' : ''}`}
                      onClick={() => setActiveSkillTab(index)}
                    >
                      {category}
                    </div>
                  ))}
                </div>

                <div className="win98-tab-content">
                  <div className="win98-skill-category">
                    <h3>{contentData.skills.categories[activeSkillTab]} Development</h3>
                    <div className="win98-skill-bars">
                      {getCurrentSkills().map((skill, index) => (
                        <SkillBar key={index} name={skill.name} level={skill.level} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="win98-modal-footer">
              <button className="win98-button-large" onClick={() => toggleModal('skills', false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && modalStates.projects && (
        <div className="win98-modal-overlay">
          <div className="win98-modal win98-projects-modal">
            <WindowHeader 
              title={contentData.projects.title} 
              icon="directory_open_file_mydocs-4.png" 
              onClose={() => toggleModal('projects', false)} 
            />
            <div className="win98-modal-content">
              <div className="win98-projects-list">
                {contentData.projects.items.map((project, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <hr className="win98-hr" />}
                    <div className="win98-project-item">                      <img
                        src={getIconSrc(project.icon)}
                        alt="Project icon"
                        className="win98-project-icon"
                      />
                      <div className="win98-project-details">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="win98-tech-tags">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="win98-tag">{tech}</span>
                          ))}
                        </div>
                        {project.githubLink && (
                          <div className="win98-project-link">
                            <a 
                              href={project.githubLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="win98-button-medium"
                              style={{ color: 'black', display: 'inline-flex', alignItems: 'center', marginTop: '8px' }}
                            >
                              <img 
                                src={getIconSrc("html-0.png")} 
                                alt="GitHub" 
                                style={{ width: '16px', height: '16px', marginRight: '4px' }} 
                              />
                              View on GitHub
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="win98-modal-footer">
              <button className="win98-button-large" onClick={() => toggleModal('projects', false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && modalStates.contact && (
        <div className="win98-modal-overlay">
          <div className="win98-modal win98-contact-modal">
            <WindowHeader 
              title={contentData.contact.title} 
              icon="outlook_express-4.png" 
              onClose={() => toggleModal('contact', false)} 
            />
            <div className="win98-modal-content">
              <div className="win98-contact-container">
                <div className="win98-contact-info">
                  <h3>Get In Touch</h3>
                  <p>{contentData.contact.intro}</p>

                  {contentData.contact.methods.map((method, index) => (
                    <div className="win98-contact-method" key={index}>
                      <img
                        src={`https://win98icons.alexmeub.com/icons/png/${method.icon}`}
                        alt={method.label}
                        className="win98-contact-icon"
                      />
                      <div>
                        <p className="win98-contact-label">{method.label}</p>
                        <p className="win98-contact-value">{method.value}</p>
                      </div>
                    </div>
                  ))}

                  <div className="win98-social-links">
                    <h4>{contentData.contact.social.title}</h4>
                    <div className="win98-social-icons">
                      {contentData.contact.social.icons.map((social, index) => (
                        <img 
                          key={index}
                          src={`https://win98icons.alexmeub.com/icons/png/${social.icon}`} 
                          alt={social.name} 
                          className="win98-social-icon" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="win98-modal-footer">
              <button className="win98-button-large" onClick={() => toggleModal('contact', false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && modalStates.resume && (
        <div className="win98-modal-overlay">
          <div className="win98-modal win98-download-modal">
            <WindowHeader 
              title={contentData.resume.title} 
              icon="file_download-0.png" 
              onClose={() => toggleModal('resume', false)} 
            />
            <div className="win98-modal-content">
              <div className="win98-download-container">
                <img 
                  src="https://win98icons.alexmeub.com/icons/png/document_gear-0.png"
                  alt="Resume document"
                  className="win98-download-icon-large"
                />
                
                <div className="win98-download-info">
                  <h3>{contentData.resume.filename}</h3>
                  <div className="win98-file-details">
                    {contentData.resume.fileDetails.map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                  </div>
                  
                  <div className="win98-download-progress">
                    <div className="win98-progress-label">Download Progress:</div>
                    <div className="win98-progress-bar">
                      <div className="win98-progress-fill"></div>
                    </div>
                  </div>
                  
                  <div className="win98-download-message">
                    <p>Would you like to download this file?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="win98-modal-footer">
              <a 
                href="/resume.pdf" 
                download={contentData.resume.filename} 
                className="win98-button-large win98-download-button"
              >
                Download Now
              </a>
              <button className="win98-button-large" onClick={() => toggleModal('resume', false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Introduction Modal */}
      {!isMobile && showIntroModal && (
        <div className="win98-modal-overlay">
          <div className="win98-modal win98-welcome-modal">
            <WindowHeader 
              title={contentData.welcome?.title || "Welcome"} 
              icon={contentData.welcome?.icon || "computer-4.png"} 
              onClose={() => setShowIntroModal(false)} 
            />
            <div className="win98-modal-content">
              <div className="welcome-content">
                <div className="welcome-icon-container">
                  <img
                    src={getIconSrc(contentData.welcome?.icon || "computer-4.png")}
                    alt="Computer"
                    className="welcome-icon"
                    loading="lazy"
                  />
                </div>
                <div className="welcome-text">
                  <h3>{contentData.welcome?.heading}</h3>
                  <p>{contentData.welcome?.description}</p>
                  
                  <ul className="welcome-list">
                    {contentData.welcome?.instructions?.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                  
                  <p>{contentData.welcome?.footer}</p>
                </div>
              </div>
            </div>
            <div className="win98-modal-footer">
              <button className="win98-button-large" onClick={handleIntroClose}>
                {contentData.welcome?.buttonText || "Got it!"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load fonts asynchronously - Fixed onLoad handlers */}
      <link 
        href="https://fonts.cdnfonts.com/css/nasalization" 
        rel="stylesheet" 
        media="print" 
        onLoad={handleFontLoad}
      />
      <link 
        href="https://fonts.cdnfonts.com/css/ms-sans-serif" 
        rel="stylesheet" 
        media="print" 
        onLoad={handleFontLoad}
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" 
        rel="stylesheet" 
        media="print" 
        onLoad={handleFontLoad}
      />
    </div>
  );
}
