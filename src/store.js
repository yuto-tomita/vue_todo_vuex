import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		todos: [
			{
				id: 1,
				content: 'お菓子かう',
				timelimit: '3月15日'
			},
			{
				id: 2,
				content: '本を買う',
				timelimit: '3月15日'
			}
		],
		nextTaskId: 3,
	},
	mutations: {
    addTodo (state, { content, timelimit }) {
      state.todos.push({
				id: state.nextTaskId,
				content,
				timelimit,
			})
			state.nextTaskId++
		},
	}
})



