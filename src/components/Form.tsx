import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/actions/postActions";
import { AppDispatch } from "../app/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            await dispatch(createPost(formData));
            setFormData({ name: "", description: "" });
            toast.success("¡Post creado con éxito!");
        } catch (error) {
            toast.error("Hubo un error al crear el post.");
        } finally {
            setIsLoading(false);
        }
    };

    const isButtonDisabled = isLoading || formData.name.trim() === "" || formData.description.trim() === "";


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
                                       <i className="bi bi-eraser"></i>
                                    </button>
                                    <button type="submit" className="btn btn-success" disabled={isButtonDisabled}>
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                                <span>Creando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-postcard-heart-fill pe-2"></i>
                                                Crear
                                            </>
                                        )}
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