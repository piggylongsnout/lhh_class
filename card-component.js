Vue.component('card', {
	props: ['card'],

	methods: {
		onClick: function() {
			this.$emit('card-clicked', this.card);
		},
	},

	template: `
		<span
		  class="card"
		  v-bind:class="{ selected: card.selected, reversed: card.reversed }">
			<img v-on:click="onClick" v-bind:src="card.file()" />
			<span class="back" v-on:click="onClick"></span>
		</span>`,
});