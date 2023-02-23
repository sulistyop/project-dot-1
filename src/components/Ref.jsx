import { useRef, useState } from "react"

export const Ref = () =>{
    const inputRef = useRef('')
    const [input, setInput] = useState('')

    const handleSubmit = (e) =>{
      e.preventDefault()

      setInput([inputRef.current.value])

    }
    
    return(
              <>
              <div className='flex flex-col items-center m-5'>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 flex-col items-center justify-center">
                  <h1 className='text-white  flex flex-col items-center'>Tugas 2 Input Ref </h1>

                    <form onSubmit={handleSubmit}>
                          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input Text</label>
                          <input 
                              ref={inputRef}
                             
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:ring-orange-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                              placeholder="Masukan text anda disini ..."
                            />
                      <button type="submit" className="w-full text-white bg-orange-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send</button>
                    </form>
                    <div className='text-white text-2xl'>{[input]}</div>
                  </div>
                </div>
              </div>
              </>
     
    )
}

export default Ref