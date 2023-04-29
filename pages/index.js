import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const[blogs,setBlogs] = useState([]);

  useEffect( ()=>{
    async function fetchadata(){
      let res = await fetch(
       "http://localhost:3000/api/getblogs?catagorie=all&page=1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await res.json();
      console.log(data);
      setBlogs(data);
    }
    fetchadata();
  },[]);

  return (
    <>
   <div className="text-5xl w-full h-full flex items-center justify-center bg-black text-white">hello world!</div>
   {blogs && blogs.length > 0 ? (
    blogs.map((blog) => {
      return (
          <div key={blog._id} className="w-[20rem] mx-auto" id={blog._id}>
             <Image unoptimized width={100} height={100} className="w-[20rem] h-[13rem] object-cover" src={blog.url} alt={blog.title}></Image>
            <h4 id={blog.catagorie} className="catagorie">
              {blog.catagorie}
            </h4>
            <h1 className="title font-bold text-xl">
              {blog.title.length > 20
                ? blog.title.substring(0, 20) + "..."
                : blog.title}
            </h1>
            <p className="break-words description font-semibold">
              {blog.description.length > 25
                ? blog.description.substring(0, 25) + "..."
                : blog.description}
            </p>
          </div>
      );
    })
  ) : (
    <div className="error text-red-600 font-serif font-bold">
      No blog Aviable
    </div>
  )}
  </>
  )
}
