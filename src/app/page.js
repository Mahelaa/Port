"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import './styles.css';
import contentData from './contentData';

// Reusable components
const WindowHeader = ({ title, icon, onClose }) => (
  <div className="win98-title-bar">
    <div className="win98-title">
      <img src={`https://win98icons.alexmeub.com/icons/png/${icon}`} alt="" className="win98-icon small" />
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
  // State declarations
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showStartScreen, setShowStartScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGameboySection, setCurrentGameboySection] = useState('about');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalStates, setModalStates] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    resume: false
  });
  const [showGlitchWindow, setShowGlitchWindow] = useState(true);
  const [activeSkillTab, setActiveSkillTab] = useState(0);

  // Create a ref to track if we're returning from error page
  const fromErrorRef = useRef(false);

  // Handle modal toggling
  const toggleModal = useCallback((modalName, isOpen) => {
    setModalStates(prev => ({ ...prev, [modalName]: isOpen }));
  }, []);

  // Check if user is returning from error page - run this first
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fromError = params.get('fromError') === 'true';
      
      if (fromError) {
        // Skip intro if coming from error page
        setInitialLoading(false);
        setShowStartScreen(false);
        setIsLoaded(true);
        
        // Set our ref to prevent the loading timer from running
        fromErrorRef.current = true;
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Initial loading effect - only run for new visitors
  useEffect(() => {
    // Skip this effect if returning from error page
    if (fromErrorRef.current) {
      return;
    }
    
    const timer = setTimeout(() => {
      setInitialLoading(false);
      setShowStartScreen(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Key handling effect
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

  // Handler functions
  const handleStart = () => {
    setShowStartScreen(false);
    setIsLoaded(true);
  };

  const handleGameboyNavigation = (section) => {
    setCurrentGameboySection(section);
  };

  const handleDpadNavigation = (direction) => {
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
    setSelectedIndex(newIndex);
  };

  const getSimplifiedContent = (section) => {
    switch (section) {
      case 'about':
        return contentData.about.content.slice(0, 2);
      case 'projects':
        return contentData.projects.items.map(item => `${item.title}`);
      case 'skills':
        return contentData.skills.frontend.map(skill => `${skill.name}`);
      case 'contact':
        return contentData.contact.methods.map(method => `${method.label}: ${method.value}`);
      case 'resume':
        return ["Download my resume", "Education: Computer Science", "Experience: 5+ years"];
      default:
        return [];
    }
  };

  // Get current skills based on active tab
  const getCurrentSkills = () => {
    switch(activeSkillTab) {
      case 0: return contentData.skills.frontend;
      case 1: return contentData.skills.backend;
      case 2: return contentData.skills.tools;
      default: return [];
    }
  };

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

                    <div className="gameboy-section">
                      {getSimplifiedContent(currentGameboySection).map((text, index) => (
                        <p key={index}>{text}</p>
                      ))}
                    </div>
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
          <div className="win98-desktop-icons">
            {[
              { name: 'About Me', icon: 'user-0.png', action: () => toggleModal('about', true) },
              { name: 'Projects', icon: 'directory_closed-4.png', action: () => toggleModal('projects', true) },
              { name: 'Skills', icon: 'application_lightning-0.png', action: () => toggleModal('skills', true) },
              { name: 'Contact', icon: 'outlook_express-4.png', action: () => toggleModal('contact', true) },
              { name: 'Resume', icon: 'notepad-1.png', action: () => toggleModal('resume', true) },
              { name: 'Recycle Bin', icon: 'recycle_bin_empty-4.png' },
              { name: 'Internet Explorer', icon: 'internet_explorer-0.png' }
            ].map((item, index) => (
              <div key={index} className="win98-desktop-icon" onClick={item.action}>
                <img 
                  src={`https://win98icons.alexmeub.com/icons/png/${item.icon}`} 
                  alt={item.name} 
                  className="desktop-icon-img"
                />
                <span className="desktop-icon-text">{item.name}</span>
              </div>
            ))}
          </div>
          
          {/* Windows 98 Cascaded Error Windows */}
          {showGlitchWindow && (
            <div className="error-windows-cascade">
              {/* Background ghost windows - add more for drag effect */}
              <div className="win98-window error-window ghost-error ghost-error-5">
                <div className="win98-title-bar">
                  <div className="win98-title">
                    <img src="https://win98icons.alexmeub.com/icons/png/warning-0.png" alt="" className="win98-icon small" />
                    System Error
                  </div>
                </div>
                <div className="error-window-content ghost-content">
                  <div className="error-content-wrapper">
                    <div className="error-icon-container ghost-icon"></div>
                    <div className="error-text ghost-text"></div>
                  </div>
                  <div className="error-buttons ghost-buttons"></div>
                </div>
              </div>
              
              <div className="win98-window error-window ghost-error ghost-error-4">
                <div className="win98-title-bar">
                  <div className="win98-title">
                    <img src="https://win98icons.alexmeub.com/icons/png/warning-0.png" alt="" className="win98-icon small" />
                    System Error
                  </div>
                </div>
                <div className="error-window-content ghost-content">
                  <div className="error-content-wrapper">
                    <div className="error-icon-container ghost-icon"></div>
                    <div className="error-text ghost-text"></div>
                  </div>
                  <div className="error-buttons ghost-buttons"></div>
                </div>
              </div>
              
              <div className="win98-window error-window ghost-error ghost-error-3">
                <div className="win98-title-bar">
                  <div className="win98-title">
                    <img src="https://win98icons.alexmeub.com/icons/png/warning-0.png" alt="" className="win98-icon small" />
                    System Error
                  </div>
                </div>
                <div className="error-window-content ghost-content">
                  <div className="error-content-wrapper">
                    <div className="error-icon-container ghost-icon"></div>
                    <div className="error-text ghost-text"></div>
                  </div>
                  <div className="error-buttons ghost-buttons"></div>
                </div>
              </div>
              
              <div className="win98-window error-window ghost-error ghost-error-2">
                <div className="win98-title-bar">
                  <div className="win98-title">
                    <img src="https://win98icons.alexmeub.com/icons/png/warning-0.png" alt="" className="win98-icon small" />
                    System Error
                  </div>
                </div>
                <div className="error-window-content ghost-content">
                  <div className="error-content-wrapper">
                    <div className="error-icon-container ghost-icon"></div>
                    <div className="error-text ghost-text"></div>
                  </div>
                  <div className="error-buttons ghost-buttons"></div>
                </div>
              </div>
              
              <div className="win98-window error-window ghost-error ghost-error-1">
                <div className="win98-title-bar">
                  <div className="win98-title">
                    <img src="https://win98icons.alexmeub.com/icons/png/warning-0.png" alt="" className="win98-icon small" />
                    System Error
                  </div>
                </div>
                <div className="error-window-content ghost-content">
                  <div className="error-content-wrapper">
                    <div className="error-icon-container ghost-icon"></div>
                    <div className="error-text ghost-text"></div>
                  </div>
                  <div className="error-buttons ghost-buttons"></div>
                </div>
              </div>
              
              {/* Main error window */}
              <div className="win98-window error-window standard-error">
                <WindowHeader 
                  title="System Error" 
                  icon="warning-0.png" 
                  onClose={() => setShowGlitchWindow(false)} 
                />
                
                <div className="error-window-content">
                  <div className="error-content-wrapper">
                    <div className="error-icon-container">
                      <img 
                        src="https://win98icons.alexmeub.com/icons/png/messagebox_critical-0.png" 
                        alt="Error" 
                        className="error-icon" 
                      />
                    </div>
                    
                    <div className="error-text">
                      <h3>FATAL EXCEPTION</h3>
                      <p>Windows has encountered an error.</p>
                      <div className="error-code">
                        ERROR CODE: 0x0000000A
                      </div>
                      <p>Technical information:</p>
                      <p>*** STOP: 0x0000000A</p>
                    </div>
                  </div>
                  
                  <div className="error-buttons">
                    <button className="win98-button-medium" onClick={() => setShowGlitchWindow(false)}>Close</button>
                    <button className="win98-button-medium" onClick={() => window.location.href = '/error'}>Retry</button>
                    <button className="win98-button-medium">Ignore</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="win98-taskbar">
            <div className="win98-start-button">
              <img 
                src="https://win98icons.alexmeub.com/icons/png/windows-0.png" 
                alt="Start" 
                className="win98-icon small"
              />
              Start
            </div>
            
            <div className="win98-task-items">
            </div>
            
            <div className="win98-statusbar">
              <div className="win98-status-item">
                <img
                  src="https://win98icons.alexmeub.com/icons/png/world-0.png"
                  alt=""
                  className="win98-icon small"
                />
                © {new Date().getFullYear()} Made by @Shane
              </div>
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
            <div className="win98-modal-content">
              <img
                src="https://win98icons.alexmeub.com/icons/png/user_computer-0.png"
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
                    <div className="win98-project-item">
                      <img
                        src={`https://win98icons.alexmeub.com/icons/png/${project.icon}`}
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

      <link rel="preload" href="https://fonts.cdnfonts.com/s/36671/nasalization-rg.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      <link href="https://fonts.cdnfonts.com/css/nasalization" rel="stylesheet" />
      <link href="https://fonts.cdnfonts.com/css/ms-sans-serif" rel="stylesheet" />
      <link rel="preload" href="https://win98icons.alexmeub.com/icons/png/windows-0.png" as="image" />
    </div>
  );
}
