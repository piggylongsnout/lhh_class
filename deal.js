const columnCount = 7;

function deal() {
    let a = 0

    for(let row = 0; row < 7; row++){

        for(let col = row; col < 7; col++){

             let card = this.cards[a];
             a++
             card.reversed = false
            if(col == row == 1) {card.reversed = false} else {card.reversed = true};
            this.columns[col].cards.push(card);

       }
    }
}
