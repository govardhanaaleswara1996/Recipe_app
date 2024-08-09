const logout = () => {
    // Clear the token and userId from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
  };
   
  export default logout;