import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import postsModel from "./post.model.js";
import commentModel from "./comment.model.js";


const userModule = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
            
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            checkPasswordLength(value) {
        if (!value || value.length <= 6) {
          throw new Error('Password must be greater than 6 characters.');
        }
        }
              }
     },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
},{
    hooks:{
        beforeCreate: function checkNameLength(user) {
      if (!user.name || user.name.length <= 2) {
        throw new Error('User name must be greater than 2 characters.');
      }
    }
    }
});

userModule.hasMany(postsModel,{foreignKey: "userId"});
postsModel.belongsTo(userModule,{foreignKey: "userId", onDelete:"CASCADE", onUpdate:"CASCADE"});

userModule.hasMany(commentModel,{foreignKey:"userId"});
commentModel.belongsTo(userModule,{foreignKey:"userId"});

export default userModule;