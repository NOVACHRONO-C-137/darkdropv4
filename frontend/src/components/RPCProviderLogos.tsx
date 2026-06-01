'use client';
import React, { useState, useEffect } from 'react';

// ADDED: The href links for each provider 
const web3Providers = [
    { id: 'alchemy', name: 'Alchemy', src: '/logos/alchemy.svg', href: 'https://alchemy.com', color: '#363FF9', bg: '#0a0b2e' },
    { id: 'chainstack', name: 'Chainstack', src: '/logos/chainstack.svg', href: 'https://chainstack.com', color: '#0075FF', bg: '#001836' },
    { id: 'helius', name: 'Helius', src: '/logos/helius.svg', href: 'https://helius.dev', color: '#FF6424', bg: '#2b1004' },
    { id: 'quicknode', name: 'QuickNode', src: '/logos/quicknode.svg', href: 'https://quicknode.com', color: '#25C975', bg: '#052b19' }
];

const RPCProviderLogos = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="rpc-provider-logos-wrapper">
            <style dangerouslySetInnerHTML={{ __html: `
              .rpc-provider-logos-wrapper .button-container {
                display: flex;
                flex-wrap: wrap;
                gap: 40px; 
                padding-top: 12px; 
                padding-bottom: 40px; 
              }

              .rpc-provider-logos-wrapper .brutalist-button {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 80px; 
                height: 80px;
                background-color: #063525;
                border: 2px solid #42c498; 
                border-radius: 8px; 
                box-shadow: 2px 2px 1px #000000;
                position: relative;
                cursor: pointer;
                overflow: hidden;
                text-decoration: none; /* Keeps the link from having a default underline */
                transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
              }

              .rpc-provider-logos-wrapper .brutalist-button:hover {
                background-color: var(--brand-bg);
                border-color: var(--brand-color);
                transform: translate(-2px, -2px); 
                box-shadow: 4px 4px 0 #000000, 8px 8px 15px var(--brand-glow);
              }

              .rpc-provider-logos-wrapper .brutalist-button::before,
              .rpc-provider-logos-wrapper .brutalist-button::after {
                content: "";
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transition: 0.6s;
                z-index: 1;
              }

              .rpc-provider-logos-wrapper .brutalist-button::before { left: -100%; }
              .rpc-provider-logos-wrapper .brutalist-button::after { left: 100%; }
              .rpc-provider-logos-wrapper .brutalist-button:hover::before { animation: rpcSwipeRight 1.5s infinite; }
              .rpc-provider-logos-wrapper .brutalist-button:hover::after { animation: rpcSwipeLeft 1.5s infinite; }

              @keyframes rpcSwipeRight { 100% { transform: translateX(200%) skew(-45deg); } }
              @keyframes rpcSwipeLeft { 100% { transform: translateX(-200%) skew(-45deg); } }

              .rpc-provider-logos-wrapper .mark-container {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                width: 100%;
                height: 100%;
                transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                z-index: 2;
              }

              .rpc-provider-logos-wrapper .provider-img {
                max-width: 32px;
                max-height: 32px;
                object-fit: contain;
                filter: grayscale(1) sepia(1) hue-rotate(100deg) saturate(500%) brightness(0.9);
                transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
              }

              .rpc-provider-logos-wrapper .provider-img.quicknode {
                filter: invert(1) grayscale(1) sepia(1) hue-rotate(100deg) saturate(500%) brightness(0.35);
              }

              .rpc-provider-logos-wrapper .brutalist-button:hover .mark-container {
                transform: translateY(-10px);
              }

              .rpc-provider-logos-wrapper .brutalist-button:hover .provider-img {
                transform: rotate(360deg) scale(0.7); 
                filter: none;
              }

              .rpc-provider-logos-wrapper .text-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;
                bottom: 8px; 
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                z-index: 2;
              }

              .rpc-provider-logos-wrapper .powered-label {
                font-size: 6px; 
                font-weight: normal;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: rgba(224,224,224,0.6);
              }

              .rpc-provider-logos-wrapper .brand-name {
                font-size: 10px; 
                font-weight: bold;
                letter-spacing: 0.05em;
                color: var(--brand-color);
                margin-top: 1px;
              }

              .rpc-provider-logos-wrapper .brutalist-button:hover .text-container {
                opacity: 1;
                transform: translateY(0);
              }
            ` }} />
            <div
                className="button-container"
                style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease-in-out' }}
            >
                {web3Providers.map((provider) => (
                    <a
                        key={provider.id}
                        href={provider.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutalist-button"
                        style={{
                            '--brand-color': provider.color,
                            '--brand-bg': provider.bg,
                            '--brand-glow': `${provider.color}40`
                        } as React.CSSProperties}
                    >
                        <div className="mark-container">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={provider.src} alt={provider.name} className={`provider-img ${provider.id}`} />
                        </div>

                        <div className="text-container">
                            <span className="powered-label">POWERED BY</span>
                            <span className="brand-name">{provider.name}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default RPCProviderLogos;