const columnCount = 7;

function deal() {
    //alert("Deal!");
for(let col = 0; col < 7; col++){

   let card = this.cards[col];
   if(col > 0) {card.reversed = true};


    this.columns[col].cards.push(card);


}

}