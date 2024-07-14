return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Amrytt Media</h1>
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-2 bg-blue-500 py-2 px-4 rounded hover:bg-blue-700 transition duration-100"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 py-2 px-4 rounded hover:bg-green-700 transition duration-100"
          >
            Sign Up
          </button>
        </div>
      </div>

      <div
        className="flex-grow flex items-center justify-center bg-cover bg-center p-4"
        style={{ backgroundImage: "url('/images/landingPage.webp')" }}
      >
        <div className="bg-white bg-opacity-50 p-8 rounded text-center">
          <h2 className="text-3xl mb-3">Welcome to Amrytt Media</h2>
          <p className="text-lg mb-4">An awesome app built with React and Tailwind CSS.</p>
        </div>
      </div>

      <div className="bg-gray-800 text-white p-4 text-center">
        © 2023 Amrytt Media. All rights reserved.
      </div>
    </div>
  );