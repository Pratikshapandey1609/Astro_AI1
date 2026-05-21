import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">AstroAI Platform</h3>
            <p className="text-gray-300 mt-2">© 2024 AstroAI Platform. All rights reserved.</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold mb-2">Pratiksha Pandey</p>
            <div className="flex space-x-4 justify-center md:justify-end">
              <a 
                href="https://www.linkedin.com/in/pratiksha-pandey-147770276/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/Pratikshapandey1609" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;