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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-wifi-off text-danger" viewBox="0 0 16 16">
                        <path d="M10.706 3.294A12.6 12.6 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4q.946 0 1.852.148zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.45 8.45 0 0 1 3.51-1.27zm2.596 1.404.785-.785q.947.362 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.5 8.5 0 0 0-1.98-.932zM8 10l.933-.933a6.5 6.5 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.53.53 0 0 1-.611.09A5.5 5.5 0 0 0 8 10m4.905-4.905.747-.747q.886.451 1.685 1.03a.485.485 0 0 1 .047.737.52.52 0 0 1-.668.05 11.5 11.5 0 0 0-1.811-1.07M9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A2 2 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z" />
                    </svg>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                    </svg>
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