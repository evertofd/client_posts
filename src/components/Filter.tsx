import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterPosts } from "../features/posts/postSlice"
const Filter = () => {
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        setFilter(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        console.log('aqui llego')
        e.preventDefault();
        dispatch(filterPosts(filter));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={filter}
                    onChange={handleChange}
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary mt-2">Filtrar</button>
            </form>
        </div>
    );
};

export default Filter;
