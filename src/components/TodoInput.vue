<template>
	<div>
    <b-input-group class="mb-2">
      <b-form-input 
			  type="text" 
				placeholder="やりたいことを入力してください"
				v-model="userContent"
				>
			</b-form-input>
			<b-form-datepicker class="mb-2" placeholder="何日までに行いますか？" v-model="userTimelimit"></b-form-datepicker>
    </b-input-group>
		<b-button variant="outline-info" class="mb-2" @click="addTodo($event); save($event)">
      <b-icon icon="check-box" aria-hidden="true"></b-icon>追加
    </b-button>
	</div>
</template>

<script>
export default {
	name: 'todo-input',
  data () {
	  return {
		  userContent: '',
		  userTimelimit: '',
	  }
	},
	computed: {
		todos () {
			return this.$store.state.todos
		}
	},
	methods: {
		addTodo() {
      this.$store.commit('addTodo', {
				content: this.userContent,
				timelimit: this.userTimelimit
			})
			this.userContent = '',
			this.timelimit = ''
		},
		save() {
			this.$store.dispatch('save')
		},
	},
	
}
</script>

<style>
/* localStorage.setItem('todo-app-data', JSON.stringify(state.todos)) */
</style>