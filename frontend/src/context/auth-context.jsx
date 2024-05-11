import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
   return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {
   const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")))

   return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}