<template>
<div>
  <b-container fluid class="bv-example-row">
    <b-row>
			<b-card
				border-variant="secondary"
				footer-border-variant="secondary"
				align="center"
				v-for="todo in todos" 
				:key="todo.id" 
				:content="todo.content"
			>
			  <template v-slot:header>
					<b-button variant="outline-info" v-b-modal.modal-prevent-closing>
						編集
					</b-button>
					<b-button variant="outline-danger">
						削除
					</b-button>
					<b-button variant="outline-success">
						完了
					</b-button>
				</template>
				<b-card-text>{{ todo.content }}</b-card-text>
				<template v-slot:footer>
					期限：{{ todo.timelimit }}
				</template>
			</b-card>
    </b-row>
  </b-container>
	<b-modal id="modal-prevent-closing" title="編集">
		<b-form-input>

		</b-form-input>
	</b-modal>
</div>
</template>

<script>


export default {
	name: 'todo-list',
  data () {
    return {
			showModal: false,
			
		}
	},
	computed: {
    todos () {
			return this.$store.state.todos
		}
	},
	methods: {
		editTodo () {

		}
	}
}
</script>

<style>
  .card {
		margin-left: 20px;
		margin-top: 20px;
	}

	.modal-content {
		margin-top: 100px;
	}
</style>