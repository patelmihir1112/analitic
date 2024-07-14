import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex mt-3">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold">MySite</a>
            </div>
            <div className="hidden md:flex md:space-x-8 md:ml-10">
              <a href="/" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="/about" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="/services" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="/contact" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <a href="/login" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Login</a>
              <a href="/signup" className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Sign Up</a>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-800">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="/about" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="/services" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="/contact" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            <a href="/login" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Login</a>
            <a href="/signup" className="text-white bg-blue-500 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Sign Up</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
