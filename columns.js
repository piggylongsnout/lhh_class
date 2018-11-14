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
	let value = 0;
	for (let rank of ranks) {
		let color = (suit == 'hearts' || suit == 'diamonds' ? 'red' : 'black');
		cards.push({
			rank: rank,
			suit: suit,
			color: color,
			value: ++value,
			id: 'card' + id,
			selected: false,
			reversed: false,

			file: function () {
				return fileFor(this.rank, this.suit);
			},

			swap: function (other) {
				let thisIndex = cards.indexOf(this);
				let otherIndex = cards.indexOf(other);

				cards[thisIndex] = other;
				cards[otherIndex] = this;
			},

			name: function () {
				return this.rank + ' of ' + this.suit;
			},
		});

		id++;
	}
}

let columns = [];

function makeColumn(id) {
	return {
		id: id,
		cards: [],

		clear: function () {
			this.cards = [];
		},

		empty: function () {
			return this.cards.length == 0;
		},

		popFrom: function (card) {
			let index = this.cards.indexOf(card);

			let cards = this.cards.slice(index);

			this.cards.splice(index);

			return cards;
		},

		append: function (cards) {
			this.cards = this.cards.concat(cards);
		},

		lastCard: function() {
			if (this.empty()) {
				return null;
			}
			else {
				return this.cards[this.cards.length - 1];
			}
		},
	};
}

for (let i = 0; i < columnCount; ++i) {
	columns.push(makeColumn(i));
}

let acePiles = [];

for (let i = 0; i < 4; ++i) {
	acePiles.push(makeColumn('acePile' + i));
}

var app = new Vue({
	el: '#board',
	data: {
		cards: cards,
		columns: columns,
		acePiles: acePiles,
		downPile: makeColumn('downPile'),
		upPile: makeColumn('upPile'),
		lastClicked: { card: null, column: null },
	},
	methods: {
		aceCardClicked: function(card, acePile) {
			let lastCard = this.lastClicked.card;
			let lastColumn = this.lastClicked.column;

			console.log("Clicked " + card.name());
			if (lastCard != null) {
				console.log("Last card " + lastCard.name());
			}

			aceCardClicked.call(this, card, acePile, lastCard, lastColumn);
		},

		aceEmptySpotClicked: function(acePile) {
			let lastCard = this.lastClicked.card;
			let lastColumn = this.lastClicked.column;
			aceEmptySpotClicked.call(this, acePile, lastCard, lastColumn);
		},

		deal: function () {
			for (let column of this.columns) {
				column.clear();
			}

			for (let acePile of this.acePiles) {
				acePile.clear();
			}

			for (let card of this.cards) {
				card.selected = false;
				card.reversed = false;
			}

			this.forget();

			shuffle.call(this);

			deal.call(this);

			// it takes 28 cards to deal the game
			this.downPile.cards = this.cards.slice(28);

			for (let card of this.downPile.cards) {
				card.reversed = true;
			}

			this.upPile.clear();
		},

		cardClicked: function (card, column) {
			let lastCard = this.lastClicked.card;
			let lastColumn = this.lastClicked.column;

			console.log("Clicked " + card.name());
			if (lastCard != null) {
				console.log("Last card " + lastCard.name());
			}

			cardClicked.call(this, card, column, lastCard, lastColumn);
		},

		downPileClicked: function(card, column) {
			if (card == column.lastCard()) {
				column.cards.pop();
				card.reversed = false;
				this.upPile.cards.push(card);
			}
		},

		emptyDownPileClicked: function() {
			resetDownPile.call(this, this.downPile, this.upPile);
			this.forget();
			for (let card of cards) {
				card.selected = false;
			}
		},

		upPileClicked: function(card, column, lastCard, lastColumn) {
			if (card == lastCard || lastCard == null) {
				this.cardClicked(card, column);
			}
		},

		emptySpotClicked: function (column) {
			let lastCard = this.lastClicked.card;
			let lastColumn = this.lastClicked.column;
			emptySpotClicked.call(this, column, lastCard, lastColumn);
		},

		remember: function(lastCard, lastColumn) {
			this.lastClicked = {
				card: lastCard,
				column: lastColumn,
			};
		},

		forget: function() {
			this.remember(null, null);
		},
	}
});
