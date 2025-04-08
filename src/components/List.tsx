import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postThunks";
import { RootState, AppDispatch } from "../app/store";
import { removePost } from "../features/actions/postActions";
import { toast } from 'react-toastify';

const List = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error, filterQuery, filteredPosts } = useSelector((state: RootState) => state.posts);

    const handleDelete = async (id: number) => {
        try {
            await dispatch(removePost(id));
            toast.success('Post eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el post', error);
            toast.error('Error al eliminar el post');
        }
    };

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) return <p>Cargando posts...</p>;
    if (error) return <p>Error: {error}</p>;

    const postsToDisplay = filterQuery.trim() === "" ? posts : filteredPosts;

    return (
        <div>
            <h2>Lista de Posts</h2>
            <ul>
                {postsToDisplay.length > 0 ? (
                    postsToDisplay.map((post: any) => (
                        <li key={post.id}>
                            {post.name}{" "}
                            <span
                                onClick={() => handleDelete(post.id)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            >
                                x
                            </span>
                        </li>
                    ))
                ) : (
                    <p>No hay posts disponibles</p>
                )}
            </ul>
        </div>
    );
};

export default List;
