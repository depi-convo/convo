const Welcome = ({ user }) => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full size-18  bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% rounded-4xl  ">
        <div className="text-6xl mb-4 font-englebert">Convo</div>
        <h1 className="text-3xl font-bold mb-4">Hello There!</h1>
        <p className="text-xl text-blue-100 max-w-md">
          مرحبًا {user?.name || "بك"} 
        </p>
  
      </div>
    )
  }
  
  
  
  export default Welcome
  
  