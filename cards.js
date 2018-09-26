let suits = ['spades', 'hearts', 'diamonds', 'clubs'];
let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

let cards = [];

function fileFor(rank, suit) {
	if (rank == 'jack' || rank == 'queen' || rank == 'king') {
		suit += '2';
	}

	return 'cards/' + rank + '_of_' + suit + '.png';
}

function swapProp(left, right, prop) {
	let temp = left[prop];

	left[prop] = right[prop];
	right[prop] = temp;
}

let id = 0;

for (let suit of suits) {
	for (let rank of ranks) {
		cards.push({
			rank: rank,
			suit: suit,
			id: 'card' + id,
			selected: false,
			reversed: false,
			file: function() {
				return fileFor(this.rank, this.suit);
			},
			swap: function(other) {
				for (let prop of ['rank', 'suit', 'id', 'selected', 'reversed']) {
					swapProp(this, other, prop);
				}
			},
			name: function() {
				return this.rank + ' of ' + this.suit;
			},
		});

		id++;
	}
}

var app = new Vue({
	el: '#board',
	data: {
		cards: cards,
		lastClickedId: '',
		lastClicked: null,
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

		cardClicked2: function(card) {
			if (this.lastClicked == null) {
				this.lastClicked = card;
				card.selected = true;
			}
			else {
				this.lastClicked.selected = false;
				this.lastClicked.swap(card);
				this.lastClicked = null;
			}
		},

		swapCards: function(id1, id2) {
			let index1 = this.findCardIndex(id1);

			let index2 = this.findCardIndex(id2);

			this.swap(index1, index2);
		},

		swap: function(index1, index2) {
			this.cards[index1].swap(this.cards[index2])
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
