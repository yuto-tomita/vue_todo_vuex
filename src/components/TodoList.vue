<template>
  <div>
    <todo-filter />
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-card
          border-variant="secondary"
          footer-border-variant="secondary"
          align="center"
          v-for="todo in todosFilter"
          :key="todo.id"
          :content="todo.content"
          :timelimit="todo.timelimit"
        >
          <template v-slot:header>
            <b-button variant="outline-info" @click="openModal(todo)">編集</b-button>
            <b-button variant="outline-danger" @click="removeTodo(todo.id)">削除</b-button>
						
						<div v-if="!todo.status" class="complete-button">
							<b-button
								variant="outline-success"
								@click="completeTodo(todo.id)"
								:class="{ complete : todo.status }"
							>完了</b-button>
						</div>

						<div v-else class="notcomplete-button">
							<b-button 
								variant="outline-success"
								:class="{ notcomplete : !todo.status }"
								@click="notCompleteTodo(todo.id)"
							>完了を取り消す</b-button>
						</div>
          </template>
          <b-card-text :class="{ content : todo.status }">{{ todo.content }}</b-card-text>
          <template v-slot:footer>
            <p :class="{ content : todo.status }">期限：{{ todo.timelimit | moment }}</p>
          </template>
        </b-card>
      </b-row>
      <transition name="modal">
        <show-modal
          :id="todoId"
          :timelimit.sync="todoTimelimit"
          :content.sync="todoContent"
          v-if="showContent"
          @close="modalClose"
          v-model="editContent"
          @edit="editTodo($event)"
        />
      </transition>
    </b-container>
  </div>
</template>

<script>
import ShowModal from './ShowModal'
import TodoFilter from './TodoFilter'
import moment from 'moment'

export default {
	name: 'todo-list',
	components: {
		ShowModal,
		TodoFilter,
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
    todosFilter () {
			return this.$store.getters.todosFilter
		},
	},
	mounted () {
		this.$store.dispatch('restore')
  },
	methods: {
		openModal (todo) {
			this.showContent = true
			this.todoId = todo.id
			this.todoTimelimit = todo.timelimit
			this.todoContent = todo.content
		},
		editTodo (e) {
			console.log(e)
			this.$store.commit('editTodo', {
				newContent: this.todoContent,
				newTimelimit: this.todoTimelimit,
				id: e
			})
			// this.editContent = this.todo.content
		},
		modalClose () {
			this.showContent = false
		},
		removeTodo(id) {
			this.$store.commit('deleteTodo', id)
		},
		completeTodo(id) {
			this.$store.commit('completeTodo', id)
		},
		notCompleteTodo(id) {
			this.$store.commit('notCompleteTodo', id)
		}
	},
	filters: {
		moment: function(date) {
			if ( moment(date).isAfter() ) {
				return moment(date).format('YYYY年MM月DD日')
			} else {
				return moment(date).format('YYYY年MM月DD日')
			}
		},
	}
}
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.card {
  margin-left: 20px;
  margin-top: 20px;
}

.modal-content {
  margin-top: 100px;
}

.content {
  text-decoration: line-through;
  color: gray;
}

.complete-button {
	display: inline;
}

.notcomplete-button {
	display: inline;
}

.complete {
  display: none;
}

.notcomplete {
  display: none;
}

</style>