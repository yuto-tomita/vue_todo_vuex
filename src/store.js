import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		filter: 'all',
		todos: [
			{
				id: 1,
				content: 'お菓子かう',
				timelimit: '3月15日',
				status: false
			},
			{
				id: 2,
				content: '本を買う',
				timelimit: '3月15日',
				status: false
			}
		],
		nextTaskId: 3,
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
		},
		completeTodo(state, id) {
			const index = state.todos.findIndex(item => item.id == id)
			state.todos[index].status = true
		},
		updateFilter(state, filter) {
			state.filter = filter
		}
	},
})



