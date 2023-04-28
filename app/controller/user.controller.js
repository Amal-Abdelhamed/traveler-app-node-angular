const userModule=require("../../database/models/user.model")
const handler=require("../handler")

class User{
 
    static register=async(req,res)=>{
         try{
            const newUser = new userModule(req.body)
            if(req.body.userName.toLowerCase().includes("admin")){
                handler.resHandler(res, 403, false, {},"Username can't be admin");
            }
            else{
              await newUser.save();
                handler.resHandler(res, 200, true, newUser, "user added successfully");
               }
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


    }



module.exports=User