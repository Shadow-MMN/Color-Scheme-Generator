const colors = [
    document.getElementById('color1'),
    document.getElementById('color2'),
    document.getElementById('color3'),
    document.getElementById('color4'),
    document.getElementById('color5')
];

const hexValues = [
    document.getElementById('hex1'),
    document.getElementById('hex2'),
    document.getElementById('hex3'),
    document.getElementById('hex4'),
    document.getElementById('hex5')
];
const selectedColor = document.getElementById('selected-color')
const colorSelection = document.getElementById('color-selection')
const submitBtn = document.getElementById('submit')
const colorForm = document.getElementById('color-form')

function updateColors(data) {
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = data.colors[i].hex.value;
        hexValues[i].textContent = data.colors[i].hex.value;
    }
}

function saveToLocalStorage(data) {
    const colorSchemeData = {
        colors: data.colors,
        selectedColor: selectedColor.value
    };
    localStorage.setItem('colorScheme', JSON.stringify(colorSchemeData));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('colorScheme');
    if (savedData) {
        const data = JSON.parse(savedData);
        updateColors(data);
        selectedColor.value = data.selectedColor;
    }
}

colorForm.addEventListener("submit", function(e){
    e.preventDefault();
    console.log(selectedColor.value);
    console.log(colorSelection.value);
   handleFetch()
});
async function handleFetch() {
    const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor.value.substring(1)}&format=json&mode=${colorSelection.value}&count=5`)
    const data = await res.json()
    updateColors(data)
    saveToLocalStorage(data)
}

// Load the saved color scheme on page load
window.addEventListener('load', loadFromLocalStorage);