import React from 'react';
import backgroundImage from './your-image.jpg'; // Replace with the actual image path

const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    backgroundImage: `url(${"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <footer style={footerStyle} className="text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold">KYCdapp</h2>
          <p className="text-sm text-gray-300">Building a better future.</p>
        </div>
        {/* <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-gray-300 hover:text-white">Home</a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">About</a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">Services</a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
          </li>
        </ul> */}
      </div>
      <div className="mt-8 text-center text-gray-300">
        &copy; {new Date().getFullYear()} KYCdapp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
