import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPosts } from './postThunks';
import { RootState } from '../../app/store';
export interface Post {
    id?: number;
    name: string;
    description: string;
    createAt?: Date;
    updateAt?: Date;
}

export interface PostState {
    posts: Post[];
    filteredPosts: Post[];
    filterQuery: string;
    loading: boolean;
    error: null | string;
}

const initialState: PostState = {
    posts: [],
    filteredPosts: [],
    loading: false,
    filterQuery: "",
    error: null,
};

/**
* @Everto Farias
* @description: Configuración del slice de Redux para manejar el estado de posts, incluyendo reducers para establecer, añadir, eliminar y filtrar posts, 
* así como reducers extra para manejar estados de carga de datos asíncronos.
* @param: name (nombre del slice), initialState (estado inicial), reducers (funciones modificadoras), extraReducers (para acciones asíncronas)
* @return: Objeto slice de Redux con acciones y reducer para gestión del estado de posts
*/

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload;
        },
        addPost(state, action) {
            state.posts.push(action.payload);
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
            state.filteredPosts = state.filteredPosts.filter((post) => post.id !== action.payload);
        },
        filterPosts(state, action) {
            state.filterQuery = action.payload;
            const query = action.payload.toLowerCase().trim();
            state.filteredPosts = query === ""
                ? state.posts
                : state.posts.filter(post =>
                    post.name.toLowerCase().includes(query)
                );
        },

    }, extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Error al obtener los posts";
            });
    },
});

export const { setPosts, addPost, deletePost, filterPosts } = postSlice.actions;
export const selectFilteredPosts = (state: RootState) => state.posts.filteredPosts;
export default postSlice.reducer;
