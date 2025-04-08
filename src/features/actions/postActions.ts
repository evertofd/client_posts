import instance from '../../axios';
import { addPost, Post, deletePost } from '../posts/postSlice';
export const createPost = (postData: Post) => {
    return async (dispatch: any) => {
        try {
            const response = await instance.post('/posts', postData);
            dispatch(addPost(response.data.post));
            return true;
        } catch (error) {
            console.error("Error al crear el post", error);
            throw new Error("Error al crear el post")
        }
    };
};


export const removePost = (id: number) => {
    return async (dispatch: any) => {
        try {
            await instance.delete(`/posts/${id}`);
            dispatch(deletePost(id));
            return true
        } catch (error) {
            console.error('Error al eliminar el post', error);
            throw new Error('Error al eliminar el post');
        }
    };
};