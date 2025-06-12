// Global variables
let currentCommand = null;
let commandHistory = [];

// Initialize the app
function init() {
    updateDisplay();
}

// Show sender view
function showSenderView() {
    document.getElementById('senderView').classList.remove('hidden');
    document.getElementById('receiverView').classList.add('hidden');
    
    // Update toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Show receiver view
function showReceiverView() {
    document.getElementById('receiverView').classList.remove('hidden');
    document.getElementById('senderView').classList.add('hidden');
    
    // Update toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update receiver display
    updateReceiverDisplay();
}

// Send command function
function sendCommand(commandText, commandType) {
    const timestamp = new Date();
    
    currentCommand = {
        text: commandText,
        type: commandType,
        timestamp: timestamp
    };

    // Add to history
    commandHistory.push(currentCommand);
    
    // Keep only last 10 commands
    if (commandHistory.length > 10) {
        commandHistory.shift();
    }

    // Update displays
    updateDisplay();
    updateReceiverDisplay();

    // Visual feedback
    const clickedButton = event.target;
    clickedButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedButton.style.transform = '';
    }, 150);

    console.log(`Befehl gesendet: ${commandText} um ${timestamp.toLocaleTimeString()}`);
}

// Update sender display
function updateDisplay() {
    const currentCommandElement = document.getElementById('currentCommandText');
    const timestampElement = document.getElementById('commandTimestamp');
    
    if (currentCommand) {
        currentCommandElement.textContent = currentCommand.text;
        timestampElement.textContent = `Gesendet: ${currentCommand.timestamp.toLocaleString()}`;
    } else {
        currentCommandElement.textContent = 'Kein Befehl ausgewählt';
        timestampElement.textContent = '';
    }
}

// Update receiver display
function updateReceiverDisplay() {
    const receivedCommandElement = document.getElementById('receivedCommandText');
    const receivedTimestampElement = document.getElementById('receivedTimestamp');
    const displayCommandElement = document.getElementById('displayCommand');
    
    if (currentCommand) {
        receivedCommandElement.textContent = currentCommand.text;
        receivedTimestampElement.textContent = `Empfangen: ${currentCommand.timestamp.toLocaleString()}`;
        
        // Change background based on command type
        const commandColors = {
            'degustation': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'abraeumen': 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)',
            'neue-serie': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'pause': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        };
        
        displayCommandElement.style.background = commandColors[currentCommand.type] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
        receivedCommandElement.textContent = 'Warten auf Befehl...';
        receivedTimestampElement.textContent = '';
    }
}

// Auto-refresh receiver view every 2 seconds
setInterval(() => {
    if (!document.getElementById('receiverView').classList.contains('hidden')) {
        updateReceiverDisplay();
    }
}, 2000);

// Initialize app when page loads
window.onload = init;

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === '1') sendCommand('Degustation läuft', 'degustation');
    if (event.key === '2') sendCommand('Abräumen', 'abraeumen');
    if (event.key === '3') sendCommand('Neue Serie', 'neue-serie');
    if (event.key === '4') sendCommand('Pause', 'pause');
});