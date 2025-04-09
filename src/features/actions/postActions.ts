import instance from '../../axios';
import { addPost, Post, deletePost } from '../posts/postSlice';

/**
* @Everto Farias
* @description: Función que crea una acción para añadir un nuevo post a la base de datos y actualizar el estado de Redux
* @param: postData (objeto de tipo Post con la información del nuevo post)
* @return: Función thunk que devuelve true si la operación fue exitosa o lanza un error en caso contrario
*/

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

/**
* @Everto Farias
* @description: Función para eliminar un post específico de la base de datos y actualizar el estado de Redux
* @param: id (número que identifica al post que se desea eliminar)
* @return: Función thunk que devuelve los datos de respuesta del servidor o lanza un error en caso de fallo
*/

export const removePost = (id: number) => {
    return async (dispatch: any) => {
        try {
            const response = await instance.delete(`/posts/${id}`);
            dispatch(deletePost(response.data.post.id));
            return response.data
        } catch (error) {
            console.error('Error al eliminar el post', error);
            throw new Error('Error al eliminar el post');
        }
    };
};