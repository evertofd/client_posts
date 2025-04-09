import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postThunks";
import { RootState, AppDispatch } from "../app/store";
import { removePost } from "../features/actions/postActions";
import { toast } from 'react-toastify';

const List = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error, filterQuery, filteredPosts } = useSelector((state: RootState) => state.posts);

    /**

    * @Everto Farias
    * @description: Función asíncrona que gestiona la eliminación de un post segùn su ID
    * @param: id (número que identifica al post que se desea eliminar)
    * @return: Activa el dispatch para eliminar y muestra notificación de éxito o error
    */

    const handleDelete = async (id: number) => {
        try {
            const response = await dispatch(removePost(id));
            toast.success(response.message);
        } catch (error) {
            console.error('Error al eliminar el post', error);
            toast.error('Error al eliminar el post');
        }
    };

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) return (
        <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger d-flex align-items-center p-4 shadow-sm rounded-3 my-4 border-start border-danger border-5">
            <div className="d-flex align-items-center">
                <div className="me-3 bg-danger bg-opacity-10 p-2 rounded-circle">
                    <i className="bi bi-wifi-off"></i>
                </div>
                <div>
                    <h5 className="mb-1 fw-bold">Error de conexión</h5>
                    <p className="mb-0">No se pudo obtener la información. Por favor, verifica tu conexión e intenta nuevamente.</p>
                </div>
            </div>
        </div>
    );

    const postsToDisplay = filterQuery.trim() === "" ? posts : filteredPosts;

    return (
        <div className="posts-container mb-4 ">
            <div className="card h-100  shadow  bg-body-tertiary rounded">
                <div className="card-body p-0">
                    <div className="table-responsive list_table rounded" >
                        <table className="table table-hover table-striped mb-0">
                            <thead className="table-light sticky-top">
                                <tr>
                                    <th scope="col" className="px-4" style={{ width: "30%" }}>Nombre</th>
                                    <th scope="col" className="px-4" style={{ width: "60%" }}>Descripción</th>
                                    <th scope="col" className="text-center px-4" style={{ width: "10%" }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postsToDisplay.length > 0 ? (
                                    postsToDisplay.map((post: any) => (
                                        <tr key={post.id}>
                                            <td className="px-4">{post.name}</td>
                                            <td className="px-4">{post.description}</td>
                                            <td className="text-center px-4">
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="btn btn-danger btn-sm"
                                                    title="Eliminar post"
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="p-0">
                                            <div className="list_table_empty">
                                                <div className="alert alert-secondary text-center" style={{ maxWidth: '80%' }}>
                                                    <span className="fw-bold">No hay posts disponibles</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer text-muted small">
                    Total de posts: {postsToDisplay.length}
                </div>
            </div>
        </div>
    );
};

export default List;