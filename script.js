const adjectives = [
    'Electric', 'Neon', 'Midnight', 'Cosmic', 'Velvet', 'Chrome', 'Savage', 'Golden',
    'Crimson', 'Silver', 'Thunder', 'Lightning', 'Shadow', 'Diamond', 'Steel', 'Fire',
    'Ice', 'Storm', 'Wild', 'Dark', 'Bright', 'Mystic', 'Ancient', 'Modern', 'Broken',
    'Flying', 'Burning', 'Frozen', 'Twisted', 'Perfect', 'Endless', 'Forgotten',
    'Lost', 'Found', 'Rebel', 'Royal', 'Street', 'Urban', 'Desert', 'Ocean'
];

const nouns = [
    'Dragons', 'Wolves', 'Eagles', 'Tigers', 'Lions', 'Hawks', 'Ravens', 'Foxes',
    'Roses', 'Thorns', 'Flames', 'Shadows', 'Dreams', 'Echoes', 'Whispers', 'Thunder',
    'Lightning', 'Storm', 'Rain', 'Snow', 'Stars', 'Moon', 'Sun', 'Sky', 'Earth',
    'Ocean', 'River', 'Mountain', 'Valley', 'Desert', 'Forest', 'Garden', 'Castle',
    'Tower', 'Bridge', 'Road', 'Path', 'Journey', 'Adventure', 'Mystery', 'Secret',
    'Magic', 'Power', 'Energy', 'Spirit', 'Soul', 'Heart', 'Mind', 'Voice', 'Sound'
];

const bandStructures = [
    'The {adjective} {noun}',
    '{adjective} {noun}',
    '{noun} of {adjective}',
    'The {noun}',
    '{adjective} & The {noun}',
    '{noun} {adjective}',
    'The {adjective} {adjective} {noun}',
    '{adjective} {adjective}',
    'The {noun} {noun}',
    '{adjective} {noun} Society'
];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateBandName() {
    const structure = getRandomElement(bandStructures);
    const adjective = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);
    
    return structure
        .replace(/{adjective}/g, adjective)
        .replace(/{noun}/g, noun);
}

function generateThreeBandNames() {
    const names = new Set();
    
    while (names.size < 3) {
        names.add(generateBandName());
    }
    
    return Array.from(names);
}

function displayBandNames(names) {
    const container = document.getElementById('bandNames');
    const nameElements = [
        document.getElementById('name1'),
        document.getElementById('name2'),
        document.getElementById('name3')
    ];
    
    nameElements.forEach((element, index) => {
        element.textContent = names[index];
    });
    
    container.classList.remove('hidden');
}

function handleGenerate() {
    const names = generateThreeBandNames();
    displayBandNames(names);
}

document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const generateAgainButton = document.getElementById('generateAgain');
    
    generateButton.addEventListener('click', handleGenerate);
    generateAgainButton.addEventListener('click', handleGenerate);
});