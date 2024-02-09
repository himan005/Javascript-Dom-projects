const BASE_URL = "http://localhost:5500/api/fe/glossary-suggestions";

let timeoutId

const inputField = document.getElementById('typeahead')
const suggestionList= document.getElementById('suggestion-list')
inputField.addEventListener('input', onTextEntered)

function onTextEntered(){
    if(inputField.value.length === 0){
        clearSuggestions()
        return
    }
    clearTimeout(timeoutId)
    timeoutId = setTimeout(fetchAndSuggestions, 5000)
}

async function fetchAndSuggestions(){
    const url = new URL(BASE_URL)
    url.searchParams.set('text', inputField.value)
    const response = await fetch(url)
    const suggestions = await response.json()
    const fragment = document.createDocumentFragment();
    suggestions.forEach(suggestion =>{
        fragment.appendChild(createSuggestion(suggestion))
    })
    suggestionList.replaceChild(fragment)
}

function createSuggestion(suggestion){
    const suggestionElement = document.createElement("li")
    suggestionElement.textContent = suggestion
    suggestionElement.addEventListener('click', ()=>{
        inputField.value = suggestion;
        clearSuggestions()
    })
    return suggestionElement
}

function clearSuggestions(){
    clearTimeout(timeoutId)
    suggestionList.innerHTML = "";
}

