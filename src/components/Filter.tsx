import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPosts } from "../features/posts/postSlice"
import { RootState, AppDispatch } from "../app/store";

const Filter = () => {
    const { posts } = useSelector((state: RootState) => state.posts);
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        const value = e.target.value;
        setFilter(value);

        if (value.trim() === "") {
            dispatch(filterPosts(value));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(filterPosts(filter));
    };

    const isButtonDisabled = posts.length === 0 || filter.trim() === "";


    return (
        <div className="filter-container mt-5 mb-4 p-3 bg-light border rounded shadow-sm">
            <form onSubmit={handleSubmit}>
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <input
                            type="text"
                            placeholder="Filtrar por nombre"
                            value={filter}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-4">
                        <button
                            type="submit"
                            className="btn btn-secondary w-100"
                            disabled={isButtonDisabled}
                        >
                            Filtrar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Filter;
