import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

import { useAuthContext } from "../context/auth-context"
import { handleSignupInputErrors } from "../utils/handle-input-error"

export function useSignup() {
   const [loading, setLoading] = useState(false)
   const { setAuthUser } = useAuthContext()

   async function signup({ fullName, username, password, confirmPassword, gender }) {
      const validateInput = handleSignupInputErrors({
         fullName,
         username,
         password,
         confirmPassword,
         gender,
      })
      if (!validateInput) return

      try {
         setLoading(true)

         await axios
            .post(
               "/api/auth/signup",
               { fullName, username, password, confirmPassword, gender },
               { headers: { "Content-Type": "application/json" } }
            )
            .then((response) => {
               if (response.status === 201) toast.success("Account created successfully.")
               if (response.status === 400) toast.error("Username already exists.")

               const data = response.data
               if (!data) throw new Error("Failed to signup.")

               // Save user data in local storage
               localStorage.setItem("chat-user", JSON.stringify(data))

               // update user auth context
               setAuthUser(data)
            })
      } catch (error) {
         toast.error(error.response.data.message)
      } finally {
         setLoading(false)
      }
   }

   return { loading, signup }
}
