function cardClicked(card, column, lastCard, lastColumn) {
//alert(column.id)

      if(lastColumn == null){
        this.remember(card, column),
        card.selected = true
      } else {  
          lastCard.selected = false
            if(lastCard.value == card.value - 1 && lastCard.color != card.color){
                let cardsToMove = lastColumn.popFrom(lastCard)
                column.append(cardsToMove)
               
            }
          this.forget()
      } 
    
    if(card.reversed = true){
        card.reversed = false
    }

    
}