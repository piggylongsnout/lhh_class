function aceEmptySpotClicked(acePile, lastCard, lastColumn) {
    //alert('you clicked ace pile ' + acePile.id);
if(lastCard.value == 1){
    let cardsToMove = lastColumn.popFrom(lastCard)
    acePile.append(cardsToMove)
    this.forget()
    //alert(acePile.id)
    }

}


