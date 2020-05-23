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
				:timelimit="todo.timelimit"
			>
			  <template v-slot:header>
					<b-button variant="outline-info" @click="testOpenModal(todo)">
						編集
						<!-- @click="this.$bvModal.show(todo)" -->
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
		<transition name="modal">
			<!-- v-modelでモーダルの入力フォームの値を受けとる -->
			<show-modal 
			  :id="todoId"
			  :timelimit="todoTimelimit"
				:content="todoContent"
			  v-if="showContent" 
				@close="modalClose"
				v-model="editContent"
			/>
		</transition>
  </b-container>
</div>
</template>

<script>
import ShowModal from './ShowModal'
export default {
	name: 'todo-list',
	components: {
		ShowModal,
	},
  data () {
    return {
			showModal: false,
			editUserContent: '',
			showContent: false,
			todoItem: '',
			editContent: '',
		}
	},
	computed: {
    todos () {
			return this.$store.state.todos
		}
	},
	methods: {
		testOpenModal (todo) {
			this.showContent = true
			this.todoId = todo.id
			this.todoTimelimit = todo.timelimit
			this.todoContent = todo.content
			// this.$bvModal.show('test-open-modal')
		},
    // testModal (id) {
		// 	this.$bvModal.show('test-open-modal', id)
		// },
		modalClose () {
			this.showContent = false
		}
	}
}
</script>

<style>
  .modal-enter-active, .modal-leave-active {
		transition: opacity .5s;
	}

	.modal-enter, .modal-leave-to {
		opacity: 0;
	}

  .card {
		margin-left: 20px;
		margin-top: 20px;
	}

	.modal-content {
		margin-top: 100px;
	}
</style>