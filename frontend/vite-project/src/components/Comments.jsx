import { api } from "../pages/utility";
import thumbsUp from "../media/pngwing.com (2).png";
import thumbsDown from "../media/pngwing.com (4).png";
import { useState, useEffect } from "react";
import trash from "../media/trash.png"

export const CommentsList = ({post_id}) =>{
    const [commentList, setCommentList] = useState([])
    const [newComment, setNewComment] = useState('')
    const [commentStatus, setCommentStatus] = useState(false)    

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
            setCommentStatus(false)
        } catch {
            alert('Please try again later, currently having technical difficulties')
        }
    }

    const likeComment = async (commentID) =>{
        try{
            let response = await api.put(`comments/comment/update/${commentID}/`, {
                up : "update"
            })
        } catch (error){
            console.log(error)
        }
    }
    const dislikeComment = async (commentID) => {
        try{
            let response = await api.put(`comments/comment/update/${commentID}/`, {
                down : "update"
            })
        } catch (error){
            console.log(error)
        }
    }

    const deleteComment = async (commentID) =>{
        let response = await api.delete(`comments/comment/${commentID}`)
        setCommentStatus(true)
    }

    useEffect(() =>{
        getAllComments()
        setCommentStatus(false)
    },[commentStatus])

    return (
    <>
        <div className="ml-5 flex justify-center">
            <input 
            className="rounded text-center"
            type='text'
            placeholder="New Comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            />
            <button className="ml-2 border border-slate-300 rounded text-l" onClick={() => [addComment(), setCommentStatus(true), setNewComment('')]}> Post Comment </button>
        </div>
        <ol role="list" className="divide-y divide-gray-100">
            {commentList.length > 0 ? (commentList.map((comment, idx) =>(
                <li key={idx}>
                    <div className="flex justify-end mr-10">
                        <button><img className='h-6 w-6' src={trash} onClick={()=> deleteComment(comment.id)}/></button>
                    </div>
                    <Comment  comment = {comment} className="flex justify-between gap-x-6 py-5"/>
                    <div className="flex justify-center space-x-10">
                        <button className="flex flex-row">{comment.up.length}<img className="h-5 w-5" src={thumbsUp} onClick={()=> [likeComment(comment.id), setCommentStatus(true)]}/></button>
                        <button className="flex flex-row">{comment.down.length}<img className="h-5 w-5" src={thumbsDown} onClick={() => [dislikeComment(comment.id), setCommentStatus(true)]} /></button>
                    </div>
                </li>
            ))): <p>This post has no Comments</p>}
        </ol>
    </>
    )
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const Comment = ({comment}) => {
    const [userInformation, setUserInfo] = useState([])

    const getUserInfo = async () =>{
        let response = await api.get(`users/profile/${comment.created_by}`)
        let user = response.data
        setUserInfo(user)
    }

    useEffect(()=>{
        getUserInfo()
    },[])
    return (
    <div className="flex justify-between gap-x-6 py-2">
        <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50 ml-5" src={userInformation.profile_picture}/>
            <div className="min-w-0 flex-auto">
                <h1 className="text-sm font-semibold leading-6 text-gray-900">{userInformation.display_name}</h1>
                <h3 className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.content}</h3>
            </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-5">
            
            <h4 className="text-sm leading-6 text-gray-900">Date: {comment.date_created}</h4>
            <p className="mt-1 text-xs leading-5 text-gray-500">Edited: {comment.edited.toString()}</p>
        </div>
    </div>
    )
}
