import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white'>
      <div className=' bg-white shadow p-3'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <div className='flex'>
            <a className='text-2xl font-bold'>My Site</a>
          </div>
          <div className="mr-2 flex md:hidden">
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
          <div className='hidden md:flex flex-1 items-center justify-start gap-8 ms-10'>
            <a className='text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>Home</a>
            <a className='text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>About</a>
            <a className='text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>Service</a>
            <a className='text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>Contract</a>
          </div>
          <div className='hidden md:flex items-center justify-between gap-4'>
            <a className='text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>Login</a>
            <a className='border bg-blue-500 text-white rounded-lg px-2 py-2'>Sign Up</a>
          </div>
        </div>

      </div>
      {isOpen &&
        <div className='md:hidden'>
          <div className='px-3 py-2 flex flex-col p-2'>
            <a className='block text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>Home</a>
            <a className='block text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>About</a>
            <a className='block text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>Service</a>
            <a className='block text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>Contract</a>
            <a className='block text-gray-800 hover:text-blue-600 px-3 py-2 font-semibold'>Login</a>
            <a className='block border bg-blue-500 text-white rounded-lg px-2 py-2'>Sign Up</a>
          </div>
        </div>
      }
    </nav>
  );
};

export default Navbar;
