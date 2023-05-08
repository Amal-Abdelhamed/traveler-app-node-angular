const userModule=require("../../database/models/user.model")
const handler=require("../handler")
const { query } = require("express")
class User{
 
    static register=async(req,res)=>{
         try{
            const newUser = new userModule(req.body)
            await newUser.save();
                handler.resHandler(res, 200, true, newUser, "user added successfully");
               
        }
        catch(e){
            handler.resHandler(res, 500, false, e.message, "Error! ");
        }
    }

    static login = async (req, res) => {
        try {
            const userData = await userModule.loginUser(req.body.email, req.body.password)
            const token = await userData.generateToken()
            handler.resHandler(res, 200, true, { userData, token }, "user login successfully")
        } catch (e) {
            handler.resHandler(res, 500, false, e.message, "Error! ")
        }
    }

static logout = async (req, res) => {
    console.log(req.user);
  try {
    if (!req.user) {
      return handler.resHandler(res, 401, false, {}, "User not authenticated");
    }
    req.user.tokens = req.user.tokens.filter(t => t.token != req.token);
    await req.user.save();
    handler.resHandler(res, 200, true, {}, "Logged out successfully");
  } catch (e) {
    handler.resHandler(res, 500, false, e.message, "Error fetching data");
  }
}

//show my profile => user 
static profile = async (req, res) => {
        handler.resHandler(res, 200, true, req.user, 'profile data')
    }

//delet All users =>Admin only
 static delAllUsers = async (req, res) => {
        try {
          //this line to delet all user except admin 
          const query = { role: "user", isAdmin: { $ne: true } };
            await userModule.deleteMany(query)
            handler.resHandler(res, 200, true, [], "deleted all users")
        } catch (e) { handler.resHandler(res, 500, false, e.message, "error") }
    };

    //Show all users =>Admin only
    static showAllUsers = async (req, res) => {
      try {
         const query = { role: "user", isAdmin: { $ne: true } };
        const users = await userModule.find(query)
        if (users.length === 0) {
      handler.resHandler(res, 404, false, {}, " Don't have any users yet")
    }
      handler.resHandler(res, 200, true, users, " All users data")

      }catch(e){
        handler.resHandler(res, 500, false, e.message, "Error can't get data");
      }
    }

//show single user =>Admin

static showUser = async (req, res) => {
        try {
            const users = await userModule.findById(req.params.id);
            handler.resHandler(res, 200, true, users, "user data")

        } catch (e) { handler.resHandler(res, 500, false, e.message, "Error can't get data ") }
    };

    //logout all users 
    static logoutAllUsers = async (req, res,token) => {
try {
  
    const result = await userModule.updateMany(
      { "tokens.token": token },
      { $pull: { tokens: { token: token } } },
      { multi: true })
        handler.resHandler(res, 200, true, result, "All User accounts Logout Complete")
}catch(e){
  handler.resHandler(res, 500, false, e.message, "Error can't logout");
}
    }
    
//user edit his profile
static updateAccount = async (req, res) => {
        try {
            const user = await userModule.findById(req.params.id)
            for (let info in req.body) {
                user[info] = req.body[info]
                await user.save()
                handler.resHandler(res, 200, true, user, "user edited successfully")
            }
        } catch (e) { handler.resHandler(res, 500, false, e.message, "error") }
    };

    //delet single account \
    static deleteSingleUser = async (req, res) => {
      try {
         const user = await userModule.findByIdAndDelete(req.params.id)
            handler.resHandler(res, 200, true, user, "deleted one user successfully")
      }
      catch(e){
        handler.resHandler(res, 500, false, e.message, "Error can't delete account")
      }
    }
  
static showAllAdmins = async (req, res) => {
      try {
         const query = { role: "admin", isAdmin: { $ne: false } };
        const admin = await userModule.find(query)
        const AdminCount=admin.length
        if (AdminCount === 1) {
      handler.resHandler(res, 200, true, AdminCount, " only have one Admin ")
    }
      handler.resHandler(res, 200, true,{AdminCount, admin}, " All Admin data")

      }catch(e){
        handler.resHandler(res, 500, false, e.message, "Error can't get data");
      }
    }

    }



module.exports=User