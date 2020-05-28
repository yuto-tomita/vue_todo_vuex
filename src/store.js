import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		filter: 'all',
		todos: [],
		nextTaskId: 1,
	},
	getters: {
		todosFilter(state) {
			if(state.filter == 'all') {
				return state.todos
			} else if (state.filter == 'progress') {
				return state.todos.filter(todo => !todo.status)
			} else if (state.filter == 'complete') {
				return state.todos.filter(todo => todo.status)
			} 
		}
	},
	mutations: {
    addTodo (state, { content, timelimit }) {
      state.todos.push({
				id: state.nextTaskId,
				content,
				timelimit,
				status: false
			})
			state.nextTaskId++
		},
		editTodo (state, { newContent, newTimelimit, id }) {
			const index = state.todos.findIndex(item => item.id == id )
			state.todos[index].content = newContent
			state.todos[index].timelimit = newTimelimit
		},
		deleteTodo(state, id) {
			const index = state.todos.findIndex(item => item.id == id)
			state.todos.splice(index, 1)
			// 削除ボタンを押したらtodoの状態をローカルストレージにも保存する
			localStorage.setItem('todo-app-data', JSON.stringify(state.todos))
		},
		completeTodo(state, id) {
			const index = state.todos.findIndex(item => item.id == id)
			state.todos[index].status = true
		},
		updateFilter(state, filter) {
			state.filter = filter
		},
		restore (state, { todos, nextTaskId }) {
			state.todos = todos
			state.nextTaskId = nextTaskId 
		}
	},
	actions: {
		save ({state}) {
			const data = {
				todos: state.todos,
				nextTaskId: state.nextTaskId
			}
			localStorage.setItem('todo-app-data', JSON.stringify(data))
		},
		restore ({commit}) {
			const data = localStorage.getItem('todo-app-data')
			if (data) {
				commit('restore', JSON.parse(data) )
			}
		}
	}
})



