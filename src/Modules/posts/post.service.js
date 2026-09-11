import { sequelize } from '../../DB/connectionDB.js';
import commentModel from '../../DB/models/comment.model.js';
import postsModel from '../../DB/models/post.model.js';
import userModule from '../../DB/models/user.model.js';


/*** Part2 ***/
/** B- Posts APIs **/

//Q1

export const createPost = async (req,res,next)=>{
try {
    const {title, content, userId} = req.body
    const posts =  postsModel.build({title, content, userId});
   await posts.save()
res.status(200).json({message:"Post created successfully", posts})
} catch (error) {
    if (error?.parent.errno == 1452) {
        res.status(404).json({message: "Error fetching, user not exist"})
    }
    res.status(500).json({message: error.message, error})
}

};

//Q2

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;      
    const { userId } = req.body;    

    if (!userId) {
      return res.status(400).json({
        message: ' UserId not valid '
      });
    }

    const post = await postsModel.findByPk(postId);


    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    const deletedPost =await postsModel.destroy({
        where:{
            
            userId:userId,
            id: postId

        }
    });
    if (deletedPost === 0) {
  return res.status(404).json({
    message: 'You are not authorized to delete this post'
  });
}


    return res.status(200).json({
      message: 'Post deleted successfully'
    });

 



  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while deleting the post.',
      error: error.message
    });
  }
};

//Q3

export const findPost = async (req,res,next)=>{
try {

    const posts = await postsModel.findAll({
        attributes:["id","title"],
        include:{
            model: userModule,
            attributes:["id","name"]
                 
        },
                include:{
            model: commentModel,
            attributes:["id","content"]
                 
        }
    });

res.status(200).json({posts})
} catch (error) {
    if (error?.parent.errno == 1452) {
        res.status(404).json({message: "Error fetching, user not exist"})
    }
    res.status(500).json({message: error.message, error})
}

};

//Q4


export const getAllPostsWithCommentCount = async (req, res) => {
  try {
    const posts = await postsModel.findAll({

      attributes: [
        "id",
        "title",

          [
            sequelize.fn('COUNT', sequelize.col('Comments.id')),
            'commentsCount'
          ]

      ],

      include: [
        {
          model: commentModel,
          attributes: [] 
        }
      ],

      group: ['Post.id']
    });

    return res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve posts.',
      error: error.message
    });
  }
};




