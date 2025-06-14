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

function displayBandNames(names, isFromClaude = false, isFallback = false) {
    const container = document.getElementById('bandNames');
    const sourceIndicator = document.getElementById('sourceIndicator');
    const nameElements = [
        document.getElementById('name1'),
        document.getElementById('name2'),
        document.getElementById('name3')
    ];
    
    // Check if elements exist before setting content
    nameElements.forEach((element, index) => {
        if (element && names[index]) {
            element.textContent = names[index];
        }
    });
    
    // Update source indicator if it exists
    if (sourceIndicator) {
        if (isFromClaude) {
            sourceIndicator.textContent = isFallback ? '🤖 Claude AI (Fallback)' : '🤖 Generated by Claude AI';
            sourceIndicator.className = 'source-indicator claude';
        } else {
            sourceIndicator.textContent = '⚡ Local Generator';
            sourceIndicator.className = 'source-indicator local';
        }
    }
    
    if (container) {
        container.classList.remove('hidden');
    }
}

async function handleGenerate() {
    const generateButton = document.getElementById('generateButton');
    
    // Show loading state
    generateButton.disabled = true;
    generateButton.textContent = 'Generating...';
    
    try {
        // Get theme from input
        const themeInput = document.getElementById('themeInput');
        const theme = themeInput ? themeInput.value.trim() : '';
        
        // Try to get names from Claude API first
        const response = await fetch('https://band-name-1bovjbh52-tysondraveys-projects.vercel.app/api/generate-names', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ theme })
        });
        
        if (response.ok) {
            const data = await response.json();
            displayBandNames(data.names, true, data.fallback);
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        console.error('Error calling API, using local generation:', error);
        // Fallback to local generation if API fails
        const names = generateThreeBandNames();
        displayBandNames(names, false);
    } finally {
        // Reset button state
        generateButton.disabled = false;
        generateButton.textContent = 'Generate Band Names';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    
    if (generateButton) {
        generateButton.addEventListener('click', handleGenerate);
    }
});