const columnCount = 7;

function deal() {
    //alert("Deal!");
    let a = 0
for(let row = 0; row < 7; row++){
a = 0
for(let col = row; col < 7; col++){
a = a + 1
   let card = this.cards[col];
   card.reversed = true
   if(a == 1) {card.reversed = false} else {card.reversed = true};

    this.columns[col].cards.push(card);

}
}
}