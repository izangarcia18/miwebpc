let currentPrice = 0;
const selectedParts = {
    cpu: 0,
    gpu: 0,
    case: 0,
    storage: [], // Array for multiple storage
    ecosystem: []
};

// Formatter
const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
});

function updatePrice() {
    let storageTotal = selectedParts.storage.reduce((a, b) => a + b, 0);
    let ecosystemTotal = selectedParts.ecosystem.reduce((a, b) => a + b, 0);
    
    currentPrice = selectedParts.cpu + selectedParts.gpu + selectedParts.case + storageTotal + ecosystemTotal;
    
    document.getElementById('total-price').innerText = formatter.format(currentPrice);
}

// Single Selection (RadioButton behavior)
function selectOption(category, price, element) {
    // Update logic
    selectedParts[category] = price;
    
    // UI Update
    // 1. Remove 'selected' from siblings in the same grid/section
    let siblings = element.parentElement.children;
    for(let sib of siblings) {
        sib.classList.remove('selected');
    }
    
    // 2. Add to clicked
    element.classList.add('selected');
    
    updatePrice();
}

// Multi Selection (Toggle)
function toggleOption(category, price, element) {
    if (element.classList.contains('selected')) {
        // Remove
        element.classList.remove('selected');
        const index = selectedParts[category].indexOf(price);
        if (index > -1) {
            selectedParts[category].splice(index, 1);
        }
    } else {
        // Add
        element.classList.add('selected');
        selectedParts[category].push(price);
    }
    updatePrice();
}

// Ecosystem Toggle
function toggleEco(price, btnElement) {
    let card = btnElement.parentElement;
    if (card.classList.contains('added')) {
        card.classList.remove('added');
        btnElement.innerText = "+ AÑADIR";
        const index = selectedParts.ecosystem.indexOf(price);
        if (index > -1) selectedParts.ecosystem.splice(index, 1);
    } else {
        card.classList.add('added');
        btnElement.innerText = "✓ AÑADIDO";
        selectedParts.ecosystem.push(price);
    }
    updatePrice();
}
