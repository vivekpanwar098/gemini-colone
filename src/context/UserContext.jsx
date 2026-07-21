import React, { createContext, useState } from 'react'
import run from '../data/gemini'
export const dataContext = createContext()

function UserContext({children}) {
    const [input,setInput]= useState("")
    async function sent(){
       await run("hello")
    }
    const data={
        input,
        setInput,
        sent

    }
  return (
    <div>
        <dataContext.Provider value={data}>
            {children}
        </dataContext.Provider>
    

    </div>
  )
}

export default UserContext
