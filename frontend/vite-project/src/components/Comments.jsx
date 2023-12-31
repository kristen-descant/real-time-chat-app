import { api } from "../pages/utility";
import thumbsUp from "../media/pngwing.com (2).png";
import thumbsDown from "../media/pngwing.com (4).png";
import { useState, useEffect } from "react";
import trash from "../media/trash.png"
import { useOutletContext, useParams } from "react-router-dom";

export const CommentsList = () =>{
    const {post_id} = useParams()
    const [commentList, setCommentList] = useState([])
    const [newComment, setNewComment] = useState("")
    const [commentStatus, setCommentStatus] = useState(false)
    const [countComments, setCountComments] = useState(0)
    const {userInfo, counter, setCounter} = useOutletContext()

    const getAllComments = async () =>{
        try{
            let response = await api.get(`comments/post/${post_id}/`)
            let commentData = response.data
            setCommentList(commentData)
        } catch (error){
            console.log(error)
        }
    }

    const addComment = async() =>{
        if (!newComment.trim()){
            return alert("can not comment an empty comment!")
        }
        try {
            let response = await api.post(`comments/post/${post_id}/`, {
                content : newComment
            })
            // setCommentStatus(false)
            setCounter(counter+1)
        } catch {
            alert('Please try again later, currently having technical difficulties')
        }
    }

    const likeComment = async (commentID) =>{
        try{
            let response = await api.put(`comments/comment/update/${commentID}/`, {
                up : "update"
            })
            setCounter(counter+1)
        } catch (error){
            console.log(error)
        }
    }
    const dislikeComment = async (commentID) => {
        try{
            let response = await api.put(`comments/comment/update/${commentID}/`, {
                down : "update"
            })
            setCounter(counter+1)
        } catch (error){
            console.log(error)
        }
    }

    const deleteComment = async (commentID) =>{
        try{
            let response = await api.delete(`comments/comment/${commentID}`)
            // setCommentStatus(true)
            setCounter(counter+1)
        } catch {
            alert("This is not your comment, Can not delete comment")
        }
    }

    useEffect(() =>{
        getAllComments()
        // setCommentStatus(false)
    },[countComments])

    useEffect(() => {
        setCountComments(countComments +1)
      }, [counter])

    return (
    <>
        <div className="min-h-screen w-[70%] flex flex-col items-center mt-8">
            <input 
            className="rounded text-center"
            type='text'
            placeholder="New Comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            />
            <button className="mt-1 border border-slate-300 rounded text-l" onClick={() => [addComment(), setCommentStatus(true), setNewComment('')]}> Post Comment </button>
        <ol role="list" className="divide-y divide-gray-100 w-full">
            {commentList.length > 0 ? (commentList.map((comment, idx) =>(
                <li key={idx}>
                    {userInfo.data.id === comment.created_by ? (
                        <div className="flex justify-end mr-10">
                            <button><img className='h-6 w-6' src={trash} onClick={()=> deleteComment(comment.id)}/></button>
                        </div>
                    ) : null}
                    <Comment  comment = {comment} currentUser = {userInfo.data.id}  className="flex justify-between gap-x-6 py-5"/>
                    <div className="flex justify-center space-x-10">
                        <button className="flex flex-row text-[green]">{comment.up.length}<span className="px-1"></span><img className="h-3 md:h-5" src={thumbsUp} onClick={()=> [likeComment(comment.id), setCommentStatus(true)]}/></button>
                        <button className="flex flex-row text-[red]">{comment.down.length}<span className="px-1"></span><img className="h-5 w-5" src={thumbsDown} onClick={() => [dislikeComment(comment.id), setCommentStatus(true)]} /></button>
                    </div>
                </li>
            ))): <p>This post has no Comments</p>}
        </ol>
        </div>
    </>
    )
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const Comment = ({comment, currentUser}) => {
    const [userInformation, setUserInfo] = useState([])
    const [commentInfo, setCommentInfo] = useState([])
    const [commentStatus, setCommentStatus] = useState(false)
    const [countComments, setCountComments] = useState(0)
    const [editStatus, setEditStatus] = useState(false)
    const [editComment, setEditComment] = useState('')
    const {counter, setCounter} = useOutletContext()

    
    
    const getUserInfo = async () =>{
        let response = await api.get(`users/profile/${comment.created_by}`)
        let user = response.data
        setUserInfo(user)
    }

    const getCommentInfo = async () =>{
        let response = await api.get(`comments/comment/${comment.id}`)
        let commentInformation = response.data
        setCommentInfo(commentInformation)
    }

    const editCom =  async () =>{
        try {
            let response = await api.put(`comments/comment/${comment.id}/`, {
                content : editComment
            })
            setCounter(counter+1)
        } catch {
            alert('Unable to edit')
        }
    }
    

    useEffect(()=>{
        getCommentInfo()
        getUserInfo()
        // setCommentStatus(true)
    },[countComments])

    useEffect(() => {
        setCountComments(countComments +1)
      }, [counter])
    // console.log(commentInfo)

    return (
    <div className="flex justify-between gap-x-6 py-2">
        <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50 ml-5" src={userInformation.profile_picture}/>
            <div className="min-w-0 flex-auto">
                <h1 className="text-sm font-semibold leading-6 text-gray-900">{userInformation.display_name}</h1>
                <h3 className="mt-1 truncate text-xs leading-5 text-gray-500">{commentInfo.content}</h3>
            </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-5">
            
            <h4 className="text-sm leading-6 text-gray-900">Date: {commentInfo.date_created}</h4>
            {commentInfo.length > 1 ? (<div>Edited: {commentInfo.edited.toString()}</div>) : (<div>Edited: {comment.edited.toString()}</div>)}
            {commentInfo.created_by === currentUser ? (
                <div className="flex justify-end">
                    {!editStatus ? <button onClick={()=> [setEditStatus(true)]}>Edit</button> : null}
                    {editStatus ? (
                        <div className="flex justify-center space-x-10">
                        <input
                        className=""
                        type="text"
                        placeholder='New Comment'
                        onChange={(e) => setEditComment(e.target.value)}
                        value={editComment}
                        />
                        <button className="ml-2 border border-slate-300 rounded text-l" onClick={() => [editCom(), setEditComment(''), setEditStatus(false), setCommentStatus(false)]}>Post Edit</button>
                        <button className="ml-2 border border-slate-300 rounded text-l" onClick={() => [setEditComment(''), setEditStatus(false)]}>Cancel</button>
                        </div>
                    ): null}
                </div>
            ) : null}
        </div>
        
        </div>
        )
}
