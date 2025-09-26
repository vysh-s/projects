// Background script for Brainrot Buster
console.log('Brainrot Buster background script loaded');

// Session tracking
let sessionData = {
  startTime: null,
  totalTime: 0,
  isActive: false,
  contentAnalyzed: 0,
  brainrotCount: 0
};

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && isSocialMediaSite(tab.url)) {
      startSession();
    } else {
      endSession();
    }
  });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (isSocialMediaSite(tab.url)) {
      startSession();
    } else {
      endSession();
    }
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'contentAnalyzed') {
    sessionData.contentAnalyzed++;
    if (request.isBrainrot) {
      sessionData.brainrotCount++;
    }
    
    // Check if intervention is needed
    checkForIntervention();
  }
  
  if (request.action === 'getSessionData') {
    sendResponse(sessionData);
  }
});

function isSocialMediaSite(url) {
  const socialSites = [
    'twitter.com', 'x.com', 'instagram.com', 'tiktok.com', 
    'reddit.com', 'youtube.com', 'linkedin.com'
  ];
  return socialSites.some(site => url.includes(site));
}

function startSession() {
  if (!sessionData.isActive) {
    sessionData.isActive = true;
    sessionData.startTime = Date.now();
    console.log('Session started');
  }
}

function endSession() {
  if (sessionData.isActive) {
    sessionData.isActive = false;
    const sessionLength = Date.now() - sessionData.startTime;
    sessionData.totalTime += sessionLength;
    console.log('Session ended, length:', sessionLength / 1000 / 60, 'minutes');
  }
}

function checkForIntervention() {
  const currentTime = Date.now();
  const sessionLength = sessionData.isActive ? (currentTime - sessionData.startTime) / 1000 / 60 : 0;
  const brainrotPercentage = sessionData.contentAnalyzed > 0 ? 
    (sessionData.brainrotCount / sessionData.contentAnalyzed) * 100 : 0;
  
  // Check if intervention criteria are met
  if (sessionLength > 10 && brainrotPercentage > 70) {
    triggerIntervention(sessionLength);
  }
}

function triggerIntervention(sessionLength) {
  // Send message to content script to show intervention
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'showIntervention',
        sessionLength: sessionLength,
        brainrotPercentage: (sessionData.brainrotCount / sessionData.contentAnalyzed) * 100
      });
    }
  });
}