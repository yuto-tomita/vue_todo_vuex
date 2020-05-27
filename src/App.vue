<template>
  <div id="app">
    <h1>
      TodoList
    </h1>
    <todo-input></todo-input>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'

export default {
  name: 'App',
  components: {
    TodoInput,   
    TodoList,
    TodoFilter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
