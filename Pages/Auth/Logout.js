/**
 * Logout Component
 * 
 * This component handles the user logout process by removing the user data from localStorage 
 * and redirecting the user to the login page.
 * 
 * @component
 * @example
 * return (
 *   <Logout />
 * )
 */
const Logout = () => {
    // Remove the user data from localStorage
    localStorage.removeItem('user')
    
    // Redirect the user to the login page
    window.location.href = "/login"
    
    return null
}

export default Logout