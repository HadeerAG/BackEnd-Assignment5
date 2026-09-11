
import userModule from './../../DB/models/user.model.js';

/** Part 2 A Section Q1 */

export const createUser = async (req,res,next)=>{
try {
    const {name, email, password, role} = req.body
    const user =  userModule.build({name, email, password, role});
   await user.save()
res.status(200).json({message:"User added successfully", user})
} catch (error) {
    res.status(500).json({message: error.message, error})
}

};

/** Part 2 A Section Q2 **/

export const UpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

  
    let user = await userModule.findByPk(id);

    if (!user) {

      user = await userModule.create(
        { id, name, email, password, role },
        { validate: false, hooks: false } 
      );

      return res.status(201).json({
        message: "User created successfully",
        user
      });
    }


    user.name = name ?? user.name;
    user.email = email ?? user.email;
    if (password) user.password = password;
    if (role) user.role = role;


    await user.save({ validate: false, hooks: false }); 

    return res.status(200).json({
      message: "User updated successfully",
      user
    });

  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

/** Part 2 A Section Q3 **/

export const findUser = async (req, res, next) => {
  try {

    const { name, email, password, role } = req.body;

  
    const user = await userModule.findOne({
      where:{
        email: email.toLowerCase()

      }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }



      return res.status(201).json({
        message: "User found",
        data: user
      });
    }






   catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

/** Part 2 A Section Q4 **/

export const findUserByPK = async (req, res, next) => {
  try {


    const { id } = req.params;

  
    const user = await userModule.findByPk(id,{
      attributes:{
        exclude: ["role"]

      }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }



      return res.status(200).json({
        message: "User found",
        data: user
      });
    }






   catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};
