// let draggedItem

document.querySelectorAll('.item').forEach(setUpItem)
document.querySelectorAll('.drop-zone').forEach(setUpDropZone)

function setUpItem(item){
    item.addEventListener('dragstart', onDragItem)
    item.addEventListener('dblclick', onDoubleClickItem)
}

function setUpDropZone(dropZone){
    dropZone.addEventListener('drop', onDropOverDropZone)
    dropZone.addEventListener('dragover', onDragOverDropZone)
}

function onDragItem(event){
    // draggedItem = event.target
    const draggedItemId = event.target.id
    event.dataTransfer.setData('text/plain', draggedItemId)
}

function onDropOverDropZone(event){
    event.preventDefault()
    const draggedItemId = event.dataTransfer.getData('text/plain')
    const draggedItem = document.getElementById(draggedItemId)
    if(this !== draggedItem.parentNode){
        this.appendChild(draggedItem);
    }
}

function onDragOverDropZone(event){
    event.preventDefault()
}

function onDoubleClickItem(){
    const unrankedDropZone = document.getElementById('unranked-drop-zone')
    if(unrankedDropZone !== this.parentNode){
        unrankedDropZone.appendChild(this)
    }
}
