function cardClicked(card, column, lastCard, lastColumn) {

      if(lastColumn == null){
        this.remember(card, column),
        card.selected = true
      } else {  
          lastCard.selected = false
          //alert(card.value)
          //if(card.color != lastcard.color)
            if(lastCard.value == card.value - 1){
                let cardsToMove = lastColumn.popFrom(lastCard)
                column.append(cardsToMove)
            }
        //}
          this.forget()
      } 
    
    if(card.reversed = true){
        card.reversed = false
    }
    
    if(card.selected == true){

    //card.reversed = !card.reversed
    };

    
}