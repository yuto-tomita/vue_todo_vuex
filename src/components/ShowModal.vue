<template>
<div>
  <div class="modal-mask">
    <div class="modal-wrapper" @click.self="$emit('close')">
      <div class="modal-container">

        <div class="modal-header">
          {{ id }}:編集
          {{ timelimit }}
	        {{ content }}
        </div>

			  <div class="modal-form">
				  <b-input-group class="mb-2">
				  <b-form-input 
					  type="text" 
					  placeholder="やりたいことを入力してください"
						@input="onInput"
						:value="content"	
				  >
				  </b-form-input>
				  <b-form-datepicker 
					  class="mb-2" 
					  placeholder="何日までに行いますか？"
				  >
				  </b-form-datepicker>
			  </b-input-group>
			  </div>

			  <div class="modal-footer">
				  <button @click="edit(id)">OK</button>
				  <button @click="$emit('close')">Close</button>
			  </div>
		  </div>
	  </div>
  </div>
</div>
		
</template>
<script>
export default {
	name: 'show-modal',
	props: ['id', 'timelimit', 'content']	,
  deta () {
		return {
			closeModal: false,
			text: '',
		}
	},
	methods: {
		edit(id) {
			this.$emit('edit', id)
			this.$emit('close')
		},
		onInput(e) {
			this.$emit('input', e)
		}
	}
}
</script>

<style>

	.modal-mask {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

	.modal-container {
		width: 600px;
		height: 300px;
		padding: 20px 30px;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		position: relative;
	}

	.modal-body {
		margin: 20px 0;
	}

	.modal-footer {
		position: absolute;
		bottom: 40px;
		right: 40px;
	}	
</style>