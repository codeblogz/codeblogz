
import Blog from "../../schemas/Blog";
import connect from "../../utils/db";

export default async function handler(req, res) {
    if(req.method === "GET")
    {
      try {
        await connect();
          // fetching blogs according to limit
          // if we giv limit it gives us according to it else give all latest records or blogs
          // const catagorie = req.params.catagorie;
          const query = req.query;
          let blogs;
          if(req.headers.id){
            // then it will fetch only it 
            // if we give it an id of spacific post in headers
             blogs = await Blog.find({_id : req.headers.id});
            }else{
              const { catagorie } = query;   
              let { page } = query;
              const skip = (page-1)*5
              const limit = (page)*5
              blogs = await Blog.find(catagorie === "all" ? {} : {catagorie}).skip(skip).limit(limit).sort({$natural : -1});
          }
          
          return res.status(200).json(blogs);
        
      } catch (error) {
        return res.status(500).json({success : false , msg : "Error while loading blogs!"});
      }
    }
}