let suits = ['spades', 'hearts', 'diamonds', 'clubs'];
let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

var cards = [];

function fileFor(rank, suit) {
	if (rank == 'jack' || rank == 'queen' || rank == 'king') {
		suit += '2';
	}

	return 'cards/' + rank + '_of_' + suit + '.png';
}

let id = 0;

for (let suit of suits) {
	for (let rank of ranks) {
		cards.push({
			rank: rank,
			suit: suit,
			file: fileFor(rank, suit),
			id: 'card' + id,
			selected: false,
		});

		id++;
	}
}

var app = new Vue({
	el: '#board',
	data: {
		cards: cards,
		lastClickedId: '',
	},
	methods: {
		shuffle: shuffle,

		cardClicked: function(event) {
			if (this.lastClickedId == '') {
				this.lastClickedId = event.target.id;
			}
			else {
				this.swapCards(this.lastClickedId, event.target.id);
				this.lastClickedId = '';
			}

			this.selectCard(this.lastClickedId);
		},

		swapCards: function(id1, id2) {
			let index1 = this.findCardIndex(id1);

			let index2 = this.findCardIndex(id2);

			this.swap(index1, index2);
		},

		swap: function(index1, index2) {
			let newCards = this.cards.map(function(elt) { return elt; });

			let temp = newCards[index1];
			newCards[index1] = newCards[index2];
			newCards[index2] = temp;

			this.cards = newCards;
		},

		selectCard: function(id) {
			for (let card of this.cards) {
				card.selected = (card.id == id);
			}
		},

		findCardIndex: function(id) {
			return this.cards.findIndex(function(elt) {
				return elt.id == id;
			});
		}
	}
});
