import { Op, where } from "sequelize";
import commentModel from "../../DB/models/comment.model.js";
import postsModel from "../../DB/models/post.model.js";
import userModule from "../../DB/models/user.model.js";

//Q1
export const postBulkComments = async (req,res,next)=>{

const Createdcomments = await commentModel.bulkCreate(req.body);
res.status(200).json({message:"Comments created", Createdcomments})

};

//Q2

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;            
    const { userId, content, postId } = req.body;  


    if (!userId || content === undefined) {
      return res.status(400).json({
        message: 'Both userId and updated content are required.'
      });
    }

    const [updatedRowsCount] = await commentModel.update(
      { content: content },
      {
        where: {
          id: id,
          userId: userId
        }
      }
    );


    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: 'You are not authorized to update this comment.'
      });
    }

    return res.status(200).json({
      message: 'Comment updated successfully.'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while updating the comment.',
      error: error.message
    });
  }
};

//Q3


export const findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;


    if (!postId || !userId || !content) {
      return res.status(400).json({
        success: false,
        message: 'postId, userId, and content are all required.'
      });
    }


    const [comment, created] = await commentModel.findOrCreate({
      where: {
        postId: postId,
        userId: userId,
        content: content
      },
      defaults: {
        postId: postId,
        userId: userId,
        content: content
      }
    });


    return res.status(created ? 201 : 200).json({
      success: true,
      message: created ? 'New comment created successfully.' : 'Existing comment retrieved.',
      created: created, // true if newly created, false if retrieved
      data: comment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while handling the comment.',
      error: error.message
    });
  }
};

//Q4


export const searchCommentsByWord = async (req, res) => {
  try {

    const { word } = req.query;

    if (!word) {
      return res.status(400).json({
        success: false,
        message: 'A search word is required in the query parameters.'
      });
    }


    const { count, rows } = await commentModel.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%` 
        }
      }
    });

    return res.status(200).json({
      success: true,
      totalMatched: count, 
      comments: rows       
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while searching comments.',
      error: error.message
    });
  }
};

//Q5

 

export const getRecentComments = async (req, res) => {
  try {
    const { postId } = req.params; 

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: 'postId parameter is required.'
      });
    }


    const comments = await commentModel.findAll({
      where: {
        postId: postId
      },
      order: [
        ['createdAt', 'DESC'] 
      ],
      limit: 3 
    });

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching recent comments.',
      error: error.message
    });
  }
};

//Q6

export const getSpecificComment = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id parameter is required.'
      });
    }


    const comment = await commentModel.findByPk(id,{
        include:[
            {
                model: postsModel

            },
            {
                model: userModule,
                attributes:["id", "name", "email"]
            }
        ]


    });

    return res.status(200).json({
      success: true,
      data: comment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching recent comments.',
      error: error.message
    });
  }
};








