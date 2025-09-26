// Content script for Brainrot Buster
console.log('Brainrot Buster content script loaded');

let contentObserver;
let interventionTimeout;

// Start observing content
function startContentObservation() {
  if (contentObserver) return;
  
  contentObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          analyzeContent(node);
        }
      });
    });
  });
  
  contentObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Analyze content for brainrot detection
function analyzeContent(element) {
  const textContent = element.textContent || '';
  
  // Simple brainrot detection patterns (in real app, would use AI API)
  const brainrotPatterns = [
    /\b(viral|trending|controversial|drama|beef|roast)\b/i,
    /\b(influencer|tiktoker|youtuber)\b/i,
    /\b(cringe|sus|cap|no cap|fr fr|periodt)\b/i,
    /\b(reaction|response|exposed|cancelled)\b/i,
    /[🔥💯😂😭🤡]/
  ];
  
  const isBrainrot = brainrotPatterns.some(pattern => pattern.test(textContent));
  
  // Send to background script
  chrome.runtime.sendMessage({
    action: 'contentAnalyzed',
    isBrainrot: isBrainrot,
    content: textContent.substring(0, 100) // First 100 chars for analysis
  });
}

// Listen for intervention messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showIntervention') {
    showInterventionOverlay(request);
  }
});

// Show intervention overlay
function showInterventionOverlay(data) {
  // Remove existing overlay
  const existing = document.getElementById('brainrot-buster-overlay');
  if (existing) existing.remove();
  
  const overlay = document.createElement('div');
  overlay.id = 'brainrot-buster-overlay';
  overlay.innerHTML = `
    <div class="brainrot-buster-backdrop">
      <div class="brainrot-buster-modal">
        <div class="brainrot-buster-header">
          <h3>🧠 Brainrot Buster</h3>
          <button class="brainrot-buster-close">×</button>
        </div>
        <div class="brainrot-buster-content">
          <p>You've been scrolling for ${Math.round(data.sessionLength)} minutes</p>
          <p>${Math.round(data.brainrotPercentage)}% of content detected as brainrot</p>
          <p>Time for a mindful break?</p>
        </div>
        <div class="brainrot-buster-actions">
          <button class="brainrot-buster-snooze">Snooze 10m</button>
          <button class="brainrot-buster-dismiss">Nah</button>
          <button class="brainrot-buster-engage">Take a break</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Add event listeners
  overlay.querySelector('.brainrot-buster-close').onclick = () => overlay.remove();
  overlay.querySelector('.brainrot-buster-dismiss').onclick = () => overlay.remove();
  overlay.querySelector('.brainrot-buster-snooze').onclick = () => {
    overlay.remove();
    // Snooze for 10 minutes
    interventionTimeout = setTimeout(() => showInterventionOverlay(data), 10 * 60 * 1000);
  };
  overlay.querySelector('.brainrot-buster-engage').onclick = () => {
    overlay.remove();
    // Open productive alternative
    window.open('https://gmail.com', '_blank');
  };
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startContentObservation);
} else {
  startContentObservation();
}