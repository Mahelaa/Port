"use client";

import React, { useEffect, useState, useRef } from 'react';
import '../bsod.css';

export default function ErrorPage() {
  const [countdown, setCountdown] = useState(10);
  const [glitchText, setGlitchText] = useState(false);
  const bsodRef = useRef(null);
  
  // Handle countdown timer
  useEffect(() => {
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          // Add a parameter to indicate returning from error page
          window.location.href = '/?fromError=true';
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(countdownInterval);
    };
  }, []);
  
  // Handle random glitch effects
  useEffect(() => {
    // Random text glitches
    const textGlitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 150);
    }, 3000);
    
    // Random screen jumps
    const jumpInterval = setInterval(() => {
      if (bsodRef.current) {
        bsodRef.current.classList.add('screen-jump');
        setTimeout(() => {
          if (bsodRef.current) {
            bsodRef.current.classList.remove('screen-jump');
          }
        }, 100);
      }
    }, 5000);
    
    return () => {
      clearInterval(textGlitchInterval);
      clearInterval(jumpInterval);
    };
  }, []);

  return (
    <div className="bsod-container">
      <div className="scanlines"></div>
      <div className="noise"></div>
      <div className="flicker"></div>
      
      <div className={`bsod ${glitchText ? 'text-glitch' : ''}`} ref={bsodRef}>
        <div className="bsod-header glitch-text-slow">
          <span>WINDOWS</span>
        </div>
        <div className="bsod-content">
          <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
          
          <p className="corrupted-text">SY̸S̵T̶E̶M̷_̶S̶E̴R̷V̵I̴C̷E̵_̴E̷X̴C̶E̷P̸T̸I̴O̶N̵</p>
          
          <p>If this is the first time you've seen this error screen, restart your computer. If this screen appears again, follow these steps:</p>
          
          <p>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
          
          <p className="easter-egg glitch-text-fast">CONGRATULATIONS! YOU DISCOVERED ONE OF THE HIDDEN EASTER EGGS! Redirecting in <span className="countdown">{countdown}</span> seconds...</p>
          
          <p>If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use safe mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.</p>
          
          <p className="scramble-periodic">Technical Information:</p>
          <p className="glitch-text-slow">*** STOP: 0x0000003B (0xC0000005, 0xFFFFF88002E8159C, 0xFFFFF88002C2A840, 0x0000000000000000)</p>
          
          <p className="collect-info">Collecting error information...</p>
          <p className="physical-memory">Dumping physical memory to disk: <span className="count">100%</span></p>
        </div>
      </div>
    </div>
  );
}
