function emptySpotClicked(column, lastCard, lastColumn) {
    //alert("Empty spot clicked in column " + column.id);
        if(lastCard.value == 13){
        let cardsToMove = lastColumn.popFrom(lastCard)
        column.append(cardsToMove)
        this.forget()
        lastCard.selected = false
  }
}