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
			// stateの内容を更新した上でlocalstrageのstateの状態も更新する
			localStorage.setItem('todo-app-data', JSON.stringify(state))
		},
		deleteTodo(state, id) {
			const index = state.todos.findIndex(item => item.id == id)
			state.todos.splice(index, 1)
			// 削除ボタンを押したらローカルストレージ上の値も削除されるようにする
			localStorage.setItem('todo-app-data', JSON.stringify(state))
		},
		completeTodo(state, id) {
			const index = state.todos.findIndex(item => item.id == id)
			state.todos[index].status = true
			localStorage.setItem('todo-app-data', JSON.stringify(state))
		},
		notCompleteTodo(state, id) {
			const index = state.todos.findIndex(item => item.id == id)
			state.todos[index].status = false
			localStorage.setItem('todo-app-data', JSON.stringify(state))
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



