const userfunction = require('../helpers/userqueries');

const loginFunction = async (email, password, JWT_SECRET, jsonwebtoken) => {
    try{
        const details = await userfunction.getuserpassword(email);
        if ( password === details.ut_password) {
            console.log({
                isSuccess : true,
                token: jsonwebtoken.sign({ email }, JWT_SECRET),
                userid: details.ut_id,
              })
            return {
              isSuccess : true,
              token: jsonwebtoken.sign({ email }, JWT_SECRET),
              userid: details.ut_id,
            };
          }
        
          throw new Error("The username and password your provided are invalid")
    } catch(e){
        throw e;
    }
}

module.exports = loginFunction