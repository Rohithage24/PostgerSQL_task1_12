import jwt  from "jsonwebtoken";
const secKey = "rohithage@789"

export const createToken = (data)=>{
    const payload = {
        Mobile : data.Mobile,
        Name : data.Name
    }
    const token = jwt.sign(payload ,secKey ,{ expiresIn: '24h' })

    return token;

} 


export const verifyToken = (token) => {
    console.log("Token : ", token);
    
    try {
        if (!token) throw new Error("Token is missing");
      
        const decoded = jwt.verify(token, secKey); 
        console.log(decoded);
        return decoded;
    } catch (err) {
 
        console.error("Token verification failed:", err.message);
        return null; 
    }
}


// export const verifyToken = (token) => {
//     console.log("Token : ",token , "sec :" ,secKey);
    
//     try {
//         if (!token) throw new Error("Token is missing");
//         const decoded = jwt.verify(token, secKey);
//         console.log(decoded);
//         return decoded;
//     } catch (err) {
//         console.error("Token verification failed:", err.message);
//         return null; // or throw an error to handle upstream
//     }
// }
