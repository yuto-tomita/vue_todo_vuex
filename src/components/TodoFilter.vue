<template>
  <div>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="タスク" active :class="{ active: filter == 'all' }" @click="changeFilter('all')"></b-tab>
      <b-tab
        title="進行中タスク"
        :class="{ active: filter == 'progress' }"
        @click="changeFilter('progress')"
      ></b-tab>
      <b-tab
        title="完了タスク"
        :class="{ active: filter == 'complete' }"
        @click="changeFilter('complete')"
      ></b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
	name: 'todo-filter',
	computed: {
		filter() {
			return this.$store.state.filter
		}
	},
	methods: {
		changeFilter(filter) {
			this.$store.commit('updateFilter', filter)
		}
	}
}
</script>

<style>
</style>