var jwt = require('jsonwebtoken');
const JWT_Secret = "Legolas";
//Middleware processes request and updates it rather than sending it as response

const fetchUser= (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error :"Access Denied"});
    }

    try
    {
        const data = jwt.verify(token,JWT_Secret);
        req.user = data.user;
        next();
    }
    catch (error) {
        console.log(error.message);
        res.send("Internal Server Error")
    }
}

module.exports = fetchUser;