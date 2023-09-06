import forumsListData from '../data/forums.json'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Post from './Post';
import {api} from '../pages/utility.jsx'

export default function PostList() {
    
    const { forum_id } = useParams();
    const [forumsList, setForumsList] = useState([]);
    const [postList, setPostList] = useState([])
    const [newPost, setNewPost] = useState("")
    const [title, setTitle] = useState("")
    const navigate = useNavigate() 
    const [textBox, setTextBox] = useState(false)

    useEffect(()=>{
        const getAllPosts = async() => {
          let response = await api.get(`forum/${forum_id}/posts/`)
          let postData = response.data 
          setPostList(postData)
        }
        getAllPosts()
      }, [newPost, textBox])

      const addPosts = async(e) => {
        e.preventDefault() 
        try{
            let response = await api.post(`forum/${forum_id}/posts/`, {
                content: newPost,
                title: title
            })
            setTextBox(false)
            setNewPost("")
            setTitle("")

        }
        catch{
            alert('Post not added!')
        }
      }
      

    return (
        <div className="min-h-screen w-[70%] flex flex-col items-center mt-8">
            

            {
                textBox ? (
                    <form onSubmit = {(e) => addPosts(e)}>
                        <input
                        type='text'
                        placeholder='content'
                        value= {newPost}
                        onChange ={(e) => setNewPost(e.target.value)}
                        /> 
                        <input 
                        type ='text'
                        placeholder='title'
                        value = {title}
                        onChange = {(e) => setTitle(e.target.value)}
                        /> 
                        <input type = 'submit' />
                    </form>
                )
                :
                <button onClick={()=>setTextBox(true)} className="border border-b-color_palette_5 bg-color_palette_3 rounded pl-2 pr-1 hover:bg-color_palette_1 ">
                Add Post
                </button> 
            }
            <ul className='w-full flex flex-col items-center mt-8 space-y-1'>
                {postList.map((post, index) => (
                    
                    <Post key={index} post = {post} />
                    // forum={forumsList[forum_id-1]
                ))}
            </ul>
        </div>
    )
}