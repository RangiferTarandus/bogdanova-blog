import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';



export const fetchPost = createAsyncThunk('posts/fetchPosts', async () => {
	const {data} = await axios.get('/posts')
	return data
})


export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const {data} = await axios.get('/tags')
	return data
})


export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
	await axios.delete(`/posts/${id}`)
})




const initialState = {
	post: {
		items: [],
		status: 'loading'
	},
	tags: {
		items: [],
		status: 'loading'
	}
}


const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: {
		//ПОЛУЧЕНИЕ СТАТЕЙ
		[fetchPost.pending]: (state) =>{
			state.post.items = []
			state.post.status = 'loading'
		},
		[fetchPost.fulfilled]: (state, action) =>{
			state.post.items = action.payload
			state.post.status = 'loaded'
		},
		[fetchPost.rejected]: (state) =>{
			state.post.items = []
			state.post.status = 'error'
		},


		//ПОЛУЧЕНИЕ ТЕГОВ
		[fetchTags.pending]: (state) =>{
			state.tags.items = []
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) =>{
			state.tags.items = action.payload
			state.tags.status = 'loaded'
		},
		[fetchTags.rejected]: (state) =>{
			state.tags.items = []
			state.tags.status = 'error'
		},

		//УДАЛЕНИЕ СТАТЬИ
		[fetchRemovePost.pending]: (state, action) =>{
			state.post.items = state.post.items.filter((obg) => obg._id != action.meta.arg)
		},
		
	}
})


export const postsReducer = postSlice.reducer