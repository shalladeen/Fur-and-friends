export const signup = async (formData) => {
    const endpoint = formData.role === 'elderly'
      ? 'http://localhost:5001/api/users/signup'  // ✅ Update this to match your server.js route
      : 'http://localhost:5001/api/volunteers/signup'; // ✅ Updated to match server.js
  
    console.log("Making API call to:", endpoint); // Debugging log
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Signup API error response:", errorText);
        return { message: `Error: ${response.status} ${response.statusText}` };
      }
  
      return response.json();
    } catch (error) {
      console.error('Signup error:', error);
      return { message: 'Something went wrong. Please try again.' };
    }
  };
  