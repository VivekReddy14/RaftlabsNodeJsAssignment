const db = require('../models/index');
const usertablemodel = db.models.usertable;
const usertablequeries = {}

usertablequeries.getuserdetails = async (userid) => {
    try{
        const response = await usertablemodel.findOne({
            where:{
                ut_id : userid,
                ut_isactive : true
            } ,
            raw: true
        });    
        return response;
    } catch(e){
        throw e
    }
}

usertablequeries.getuserpassword = async (email) => {
    try{
        const response = await usertablemodel.findOne({
            where:{
                ut_email : email,
                ut_isactive : true
            } ,
            raw: true
        });    
        return response;
    } catch(e){
        throw e
    }
}

usertablequeries.createuser = async (data) => {
    try{
        const response = await usertablemodel.create({
            ut_firstname: data.firstname,
            ut_lastname: data.lastname,
            ut_phone: data.phonenumber,
            ut_email: data.email,
            ut_password: data.password,
            ut_isactive: true,
            ut_dob: data.dob,
            ut_gender: data.gender
        })
        console.log("create resp", response);
        return response
    } catch(e){
        throw e
    }
}

usertablequeries.updateuser = async (data, userid) => {
    try{
        const response = await usertablemodel.update({...data},{
            where : {
                ut_id : userid,
                ut_isactive : true
            }
        })
        return response;
    } catch(e){
        throw e
    }
}

usertablequeries.deleteuser = async (userid) => {
    try{
        const response = await usertablemodel.destroy({
            where : {
                ut_id : userid
            }
        })
        return response;
    } catch(e){
        throw e
    }
}


module.exports = usertablequeries