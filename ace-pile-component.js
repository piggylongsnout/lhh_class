Vue.component('ace-pile', {
	props: ['acePile'],

	methods: {
		cardClicked: function(card) {
			//if (card == this.lastCard() || !card.reversed) {
			//	this.$emit('card-clicked', card, this.column);
			//}
		},

		cards: function() {
			return this.acePile.cards;
		},

		empty: function() {
			return this.cards().length == 0;
		},

		emptySpotClicked: function() {
			this.$emit('empty-spot-clicked', this.column);
		},

		id: function() {
			return this.acePile.id;
		},

		lastCard: function() {
			if (!this.empty()) {
				return this.cards()[this.cards().length - 1];
			}
			else {
				return null;
			}
		},
	},

	template: `
		<span
		  class="ace-pile"
		  v-bind:class="{ empty: acePile.empty() }">
			<card
			  v-for="card in acePile.cards"
			  v-bind:key="card.id"
			  v-bind:card="card"
			  v-on:card-clicked="cardClicked"
			  ></card>
			<span class="empty-spot" v-on:click="emptySpotClicked"></span>
		</span>
	`,
});
