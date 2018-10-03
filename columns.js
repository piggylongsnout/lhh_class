let suits = ['spades', 'hearts', 'diamonds', 'clubs'];
let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

let cards = [];

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
			id: 'card' + id,
			selected: false,
			reversed: false,

			file: function() {
				return fileFor(this.rank, this.suit);
			},

			swap: function(other) {
				let thisIndex = cards.indexOf(this);
				let otherIndex = cards.indexOf(other);

				cards[thisIndex] = other;
				cards[otherIndex] = this;
			},

			name: function() {
				return this.rank + ' of ' + this.suit;
			},
		});

		id++;
	}
}

let columns = [];

for (let i = 0; i < columnCount; ++i) {
	columns.push({
		id: i,
		cards: [],

		clear: function() {
			this.cards = [];
		},

		popFrom: function(card) {
			let index = this.cards.indexOf(card);

			let cards = this.cards.slice(index);

			this.cards.splice(index);

			return cards;
		},

		append: function(cards) {
			this.cards = this.cards.concat(cards);
		},
	});
}

var app = new Vue({
	el: '#board',
	data: {
		cards: cards,
		columns: columns,
		lastClicked: null,
	},
	methods: {
		deal: function() {
			for (let column of this.columns) {
				column.clear();
			}

			shuffle.call(this);

			deal.call(this);
		},

		cardClicked: function(card, column) {
			alert("You clicked " + card.name());
		},
	}
});
