const BASE_URL = "http://localhost:4024/api";

export const signup = async(userData) =>{
    try{
        const response = await fetch(`${BASE_URL}/signup`,{
            method :"POST",
            headers :{
                "Content-Type" :"application/json",
            },
            body : JSON.stringify(userData)
        });
        const data = await response.json();;
        return data;
    }catch(error){
        console.log("Signup Error " , error);
        throw error;
    }
}

export const login = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};