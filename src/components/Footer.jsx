import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='wholenav'>
        <div className='thenav'>
          <nav style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-evenly' }}>
            {/* Dialala */}
            <div style={{ justifyContent: 'center' }}>
              <p style={{ color: 'white' }}>Diala Abdalqaer</p>
              <div className='icons'>
                <a href='https://www.linkedin.com/in/diala-abedalqader-ba289050/' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <FaLinkedin size={30} color='white' /> {/* LinkedIn Icon */}
                </a>
                <a href='https://github.com/MsDiala' target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} color='white' /> {/* GitHub Icon */}
                </a>
              </div>
            </div>
            {/* Hadeel Ali Obaid*/}
            <div style={{ justifyContent: 'center' }}>
              <p style={{ color: 'white' }}>Hadeel Ali Obaid</p>
              <div>
                <a href='https://www.linkedin.com/in/hadeel-obaid-254011279/' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <FaLinkedin size={30} color='white' /> {/* LinkedIn Icon */}
                </a>
                <a href='https://github.com/Hadeel-Ali-Obaid' target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} color='white' /> {/* GitHub Icon */}
                </a>
              </div>
            </div>
            {/* Ahmed Mash*/}
            <div style={{ justifyContent: 'center' }}>
              <p style={{ color: 'white' }}>Ahmad Mash</p>
              <div>
                <a href='https://www.linkedin.com/in/ahmad-almashagbah-4293b3166/' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <FaLinkedin size={30} color='white' /> {/* LinkedIn Icon */}
                </a>
                <a href='https://github.com/Shwarzar' target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} color='white' /> {/* GitHub Icon */}
                </a>
              </div>
            </div>
            {/* Ahmed Ibrahim*/}
            <div style={{ justifyContent: 'center' }}>
              <p style={{ color: 'black' }}>Ahmed Ibrahim</p>
              <div>
                <a href='https://www.linkedin.com' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <FaLinkedin size={30} color='white' /> {/* LinkedIn Icon */}
                </a>
                <a href='https://github.com' target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} color='white' /> {/* GitHub Icon */}
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
