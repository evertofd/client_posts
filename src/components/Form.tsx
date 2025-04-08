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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-primary">Crear</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
