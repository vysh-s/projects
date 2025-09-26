// Background script for Brainrot Buster
console.log('Brainrot Buster background script loaded');

// Idle detection for morning blocker
let lastActiveTime = Date.now();
let isIdle = false;
let idleThreshold = 4 * 60 * 60 * 1000; // 4 hours default

// Session tracking
let sessionData = {
  startTime: null,
  totalTime: 0,
  isActive: false,
  contentAnalyzed: 0,
  brainrotCount: 0,
  lastIdleTime: null,
  shouldShowMorningBlocker: false
};

// Initialize idle detection
chrome.idle.setDetectionInterval(60); // Check every minute

chrome.idle.onStateChanged.addListener((state) => {
  console.log('Idle state changed:', state);
  
  if (state === 'idle' || state === 'locked') {
    isIdle = true;
    sessionData.lastIdleTime = Date.now();
    console.log('Device went idle at:', new Date(sessionData.lastIdleTime));
  } else if (state === 'active') {
    if (isIdle && sessionData.lastIdleTime) {
      const idleDuration = Date.now() - sessionData.lastIdleTime;
      console.log('Device active after idle duration:', idleDuration / 1000 / 60, 'minutes');
      
      // Load user settings for idle threshold
      chrome.storage.sync.get(['idleThreshold'], (result) => {
        const userIdleThreshold = (result.idleThreshold || 4) * 60 * 60 * 1000;
        
        if (idleDuration >= userIdleThreshold) {
          sessionData.shouldShowMorningBlocker = true;
          console.log('Should show morning blocker on next social media visit');
        }
      });
    }
    isIdle = false;
  }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && isSocialMediaSite(tab.url)) {
      checkMorningBlocker(activeInfo.tabId);
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
      checkMorningBlocker(tabId);
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
  
  if (request.action === 'dismissMorningBlocker') {
    sessionData.shouldShowMorningBlocker = false;
    
    // Track morning action for streaks
    const today = new Date().toDateString();
    chrome.storage.sync.get(['morningStreak', 'lastMorningAction'], (result) => {
      let newStreak = result.morningStreak || 0;
      
      if (request.action === 'quickAction' || request.action === 'surprise') {
        newStreak++;
      }
      
      chrome.storage.sync.set({
        morningStreak: newStreak,
        lastMorningAction: today,
        [`morningAction_${today}`]: request.actionType
      });
    });
  }
  
  if (request.action === 'getMorningBlockerStatus') {
    sendResponse({ shouldShow: sessionData.shouldShowMorningBlocker });
  }
});

function checkMorningBlocker(tabId) {
  if (sessionData.shouldShowMorningBlocker) {
    // Check if user has already seen morning blocker today
    const today = new Date().toDateString();
    chrome.storage.sync.get(['lastMorningAction'], (result) => {
      if (result.lastMorningAction !== today) {
        // Show morning blocker
        chrome.tabs.sendMessage(tabId, {
          action: 'showMorningBlocker'
        });
      } else {
        sessionData.shouldShowMorningBlocker = false;
      }
    });
  }
}

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