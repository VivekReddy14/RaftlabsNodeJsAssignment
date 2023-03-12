const userfunction = require('../helpers/userqueries');

const userController = {}

userController.getuserdetails = async (req) => {
    try{
        const response = await userfunction.getuserdetails(req.params.userid);
        return {
            isSuccess : true,
            message: {
                response
            }
        };
    } catch(e){
        console.log(e);
        return {
            isSuccess : false,
            error : e
        }
    }
}


userController.createuser = async (req) => {
    const body = req.body;
    try{
        const response = await userfunction.createuser(req.body);
        return {
            isSuccess : true,
            message: "User craeted"
        }
    } catch(e){
        console.log(e)
        return {
            isSuccess : false,
            error : e
        }
    }
}

userController.updateuser = async (req) => {
    try{
        const response = await userfunction.updateuser(req.body.data, req.body.userid);
        return {
            isSuccess : true,
            message: response
        }
    } catch(e){
        console.log(e)
    }
}

userController.deleteuser = async (req) => {
    try{
        const response = await userfunction.deleteuser(req.body.userid);
        return {
            isSuccess : true,
            message: response
        }
    } catch(e){
        console.log(e)
    }
}


module.exports = userController