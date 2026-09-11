import { sequelize } from "../connectionDB.js";
import { DataTypes } from 'sequelize';
import commentModel from "./comment.model.js";

const postsModel = sequelize.define("post",{
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,

},{
    paranoid: false,
    timestamps:true,
    deletedAt:'deletedAt'
});

postsModel.hasMany(commentModel,{foreignKey:"postId", onDelete:"CASCADE", onUpdate:"CASCADE"});
commentModel.belongsTo(postsModel,{foreignKey:"postId", onDelete:"CASCADE", onUpdate:"CASCADE"})

export default postsModel;