export const signup = async (formData) => {
  const endpoint = formData.role === 'elderly'
    ? 'http://localhost:5001/api/users/signup' 
    : 'http://localhost:5001/api/volunteers/signup';

  console.log("Making API call to:", endpoint); 

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      try {
        const errorJson = JSON.parse(errorText);
        console.error("Signup API error response:", errorJson);
        return { message: errorJson.message || `Error: ${response.status} ${response.statusText}` };
      } catch (err) {
        console.error("Unexpected server response (not JSON):", errorText);
        return { message: `Unexpected response: ${errorText}` };
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    return { message: 'Something went wrong. Please try again.' };
  }
};

export const login = async (formData) => {
  try {
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      try {
        const errorJson = JSON.parse(errorText);
        console.error("Login API error response:", errorJson);
        return { message: errorJson.message || `Error: ${response.status} ${response.statusText}` };
      } catch (err) {
        console.error("Unexpected server response (not JSON):", errorText);
        return { message: `Unexpected response: ${errorText}` };
      }
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userRole', data.role);
      console.log("✅ Login Successful:", data);
      return data;
    }

    return { message: "Login failed. Please try again." };
  } catch (error) {
    console.error('Login error:', error);
    return { message: 'Something went wrong. Please try again.' };
  }
};
