function aceCardClicked(card, acePile, lastCard, lastColumn) {
    //alert('you clicked ' + card.name());
    if(lastCard.value == card.value + 1){
        if(lastCard.suit == cardClicked.suit){
         let cardsToMove = lastColumn.popFrom(lastCard)
         acePile.append(cardsToMove)
         this.forget()
        }

     }
 }
