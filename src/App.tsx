
function App() {

  return (
    <>
      <div className='bg-white flex flex-col justify-center items-center p-5'>
        <div className=" text-center mt-10 p-6">
          <h1 className="text-[#0000ff] text-3xl font-bold">BRUTAL</h1>
          <h4 className="font-bold">¡Welcome!</h4>
          <h4 className="font-bold">Let's work in an orderly and efficient manner.</h4>
        </div>
        <div className="flex flex-col my-5 w-full gap-2">
          <input  type="text" placeholder="User" className="border-2 border-blue-500 rounded-md p-2 focus:border-blue-700 focus:ring-1.5 focus:ring-blue-500 focus:outline-none"/>
          <input type="text" placeholder="Password" className="border-2 border-blue-500 rounded-md p-2 focus:border-blue-700 focus:ring-1.5 focus:ring-blue-500 focus:outline-none"/>
          <button className="bg-[#1F41BB] rounded-md p-3 text-white font-bold">Sing in</button>
        </div>
        <div className="mt-5 w-full flex flex-col justify-center items-center text-center">
          <h2 className="mb-2 text-blue-500 font-bold">Or continue in</h2>
          <button className="bg-gray-700 rounded-md p-3 w-full text-white font-bold">Administration</button>
        </div>
      </div>
    </>
  )
}

export default App
