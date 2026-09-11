import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const commentModel = sequelize.define("comment",{
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    postId: {
       type: DataTypes.INTEGER,
       allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false
    }

});

export default commentModel