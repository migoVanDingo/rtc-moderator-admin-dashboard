import { getAuth, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../../config/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserId, setUsername } from "../store/slices/user"
import { doc, getFirestore, updateDoc } from "firebase/firestore"

export const useAuth = () => {
  const dispatch = useDispatch()

  const nav = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log("result", result)
      const user: any = result.user
      sessionStorage.setItem("access_token", user.accessToken || "")
      sessionStorage.setItem("user", JSON.stringify(user))

      dispatch(setUserId(user.uid))
      dispatch(setUsername(user.displayName))

      nav("/") // Redirect to the main page
    } catch (error) {
      console.error("Google Sign-In Error:", error)
    }
  }



  const logout = async () => {
    const auth = getAuth()
    const db = getFirestore()

    try {
      // Step 1: Get the current user's ID (assuming it's stored in sessionStorage)
      const user = JSON.parse(sessionStorage.getItem("user") || "") 
      if (!user) throw new Error("No user found in session.")

      const userId = user.uid

      // Step 2: Update the 'active' field to false in Firestore
      const userRef = doc(db, "users", userId) // Adjust 'users' to the collection name where you store user data
      await updateDoc(userRef, {
        active: false, // Setting 'active' field to false
      })

      console.log("User's active status updated to false.")

      // Step 3: Sign out from Firebase Authentication
      await signOut(auth)
      console.log("User signed out successfully.")

      // Step 4: Clear sessionStorage, localStorage, and any other stored data
      sessionStorage.clear()
      localStorage.clear()
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;" // If using cookies for tokens

      // Step 5: Redirect the user to the login page
      const navigate = useNavigate()
      navigate("/login") // Redirect to login page (or homepage)
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return { handleGoogleLogin, logout }
}
