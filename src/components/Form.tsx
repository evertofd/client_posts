import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/actions/postActions";
import { AppDispatch } from "../app/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    /**
    * @Everto Farias
    * @description: Función que maneja los cambios en los campos del formulario, actualizando el estado con los valores ingresados
    * @return: void - Actualiza el estado del formulario manteniendo los valores previos y modificando solo el campo cambiado
    */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
    * @Everto Farias
    * @description: Funciòn que maneja el envío del formulario para crear un nuevo post
    * @return: Evitamos la recarga del formulario, ejecutamos el dispacth para crear un post y luego limpia el formulario
    */

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            await dispatch(createPost(formData));
            setFormData({ name: "", description: "" });
            toast.success("¡Post creado con éxito!");
        } catch (error) {
            toast.error("Hubo un error al crear el post.");
        }
    };

    const isButtonDisabled = formData.name.trim() === "" || formData.description.trim() === "";

    return (
        <div className="form-container mb-4">
            <div className="card shadow-sm">

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-5">
                                <label htmlFor="name" className="form-label fw-bold">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ingrese el nombre del post"
                                    required
                                />
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="description" className="form-label fw-bold">Descripción</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Ingrese una descripción breve"
                                    rows={1}
                                    required
                                ></textarea>
                            </div>
                            <div className="col-md-2 d-flex aling-items-center mt-5 justify-content-center">
                                <div >
                                <button
                                    type="reset"
                                    className="btn btn-outline-danger me-2"
                                    onClick={() => setFormData({ name: "", description: "" })}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eraser" viewBox="0 0 16 16">
                                        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
                                    </svg>

                                </button>
                                <button type="submit" className="btn btn-success" disabled={isButtonDisabled}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-postcard-heart-fill" viewBox="0 0 16 16">
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm6 2.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0m3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622M2 5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                                    </svg>
                                    Crear
                                </button>
                                </div>
                               
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;