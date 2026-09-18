import React, { useState, useEffect, useRef } from 'react';
import { Screen, UserPersona, Incident, ServiceProvider, Friend, DataSharingLog, Theme } from './types';
import {
  INITIAL_FRIENDS,
  INITIAL_INCIDENTS,
  INITIAL_SERVICE_PROVIDERS,
  INITIAL_DANGER_ZONES,
  INITIAL_DATA_SHARING_LOGS
} from './data/mockData';
import { PhoneFrame } from './components/PhoneFrame';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { DemoToolbar } from './components/DemoToolbar';

// Screens
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SafetyMapScreen } from './screens/SafetyMapScreen';
import { FriendsScreen } from './screens/FriendsScreen';
import { ProvidersScreen } from './screens/ProvidersScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { IncidentDetailScreen } from './screens/IncidentDetailScreen';
import { SosCountdownOverlay } from './screens/SosCountdownOverlay';
import { SosActiveScreen } from './screens/SosActiveScreen';
import { HelpOnTheWayScreen } from './screens/HelpOnTheWayScreen';
import { ReportIncidentScreen } from './screens/ReportIncidentScreen';
import { ProviderPortalScreen } from './screens/ProviderPortalScreen';
import { OfflineScreen } from './screens/OfflineScreen';
import { PrivacyPolicyScreen } from './screens/PrivacyPolicyScreen';

export default function App() {
  // Screen & Navigation State
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentPersona, setCurrentPersona] = useState<UserPersona>('thandi');

  // Theme State (Dark / Light) with local persistence
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('khusela-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('khusela-theme', next);
      }
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
    }
  }, [theme]);

  // Application Data State
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [providers, setProviders] = useState<ServiceProvider[]>(INITIAL_SERVICE_PROVIDERS);
  const [sharingLogs, setSharingLogs] = useState<DataSharingLog[]>(INITIAL_DATA_SHARING_LOGS);

  // Selected entities
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(INITIAL_INCIDENTS[0]);
  const [dispatchedProvider, setDispatchedProvider] = useState<ServiceProvider | null>(null);

  // Simulation & Safety States
  const [isOffline, setIsOffline] = useState(false);
  const [showSosCountdown, setShowSosCountdown] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [hasDispatched, setHasDispatched] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);
  const [userInDangerZone, setUserInDangerZone] = useState(false);
  const [userLocation, setUserLocation] = useState<{ x: number; y: number }>({ x: 48, y: 52 });

  // 5-tap gesture detection buffer
  const tapHistoryRef = useRef<number[]>([]);

  // Emergency 5-Tap Gesture Listener
  const handleViewportTap = (e: React.MouseEvent) => {
    // Only register taps when not already in SOS or countdown
    if (showSosCountdown || sosActive || currentScreen === 'sos-active' || currentScreen === 'help-on-the-way') {
      return;
    }

    const now = Date.now();
    // Filter taps older than 2.5 seconds
    tapHistoryRef.current = [...tapHistoryRef.current.filter((t) => now - t < 2500), now];

    if (tapHistoryRef.current.length >= 5) {
      tapHistoryRef.current = [];
      triggerSosCountdown();
    }
  };

  // SOS Triggers
  const triggerSosCountdown = () => {
    setShowSosCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowSosCountdown(false);
    setSosActive(true);
    setCurrentScreen('sos-active');

    // Add log entry
    const newLog: DataSharingLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Today 21:14',
      description: 'Emergency telemetry and live front camera buffer broadcasted',
      recipient: 'Lerato, Ayesha, Zanele, Naledi, Busi (5 Trusted Friends)',
      reason: 'User triggered 5-Tap emergency SOS protocol',
      canRevoke: false
    };
    setSharingLogs((prev) => [newLog, ...prev]);
  };

  const handleCancelCountdown = () => {
    setShowSosCountdown(false);
  };

  // Safe PIN Verification (1234 default, 9999 duress)
  const handleCancelSos = (pin: string): boolean => {
    if (pin === '1234') {
      // Legitimate cancel
      setSosActive(false);
      setHasDispatched(false);
      setHasArrived(false);
      setDispatchedProvider(null);
      setCurrentScreen('home');
      return true;
    } else if (pin === '9999') {
      // Duress PIN: appears to cancel locally, but keeps alert live covertly
      setCurrentScreen('home');
      return true;
    }
    return false;
  };

  // Dispatch Provider (from Friend or Victim)
  const handleDispatchProvider = (provider: ServiceProvider, targetFriendName: string) => {
    setDispatchedProvider(provider);
    setHasDispatched(true);

    // If Thandi is the one in danger, transition to Screen 7 (Help On The Way)
    if (sosActive) {
      setCurrentScreen('help-on-the-way');
    }

    // Add audit log
    const newLog: DataSharingLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Today 21:16',
      description: `GPS coordinates and incident token dispatched to patrol unit`,
      recipient: `${provider.name} (Officer S. Dlamini)`,
      reason: `Dispatched by network friend for ${targetFriendName}`,
      canRevoke: true
    };
    setSharingLogs((prev) => [newLog, ...prev]);
  };

  // Incident Reporting
  const handleAddIncidentReport = (newInc: Partial<Incident>) => {
    const createdIncident: Incident = {
      id: `inc-${Date.now()}`,
      title: newInc.title || 'COMMUNITY REPORT',
      location: newInc.location || 'Johannesburg Central',
      distanceKm: newInc.distanceKm || 0.5,
      timeAgo: 'Just now',
      description: newInc.description || '',
      status: 'recent',
      category: newInc.category || 'General',
      verified: false,
      x: newInc.x || 50,
      y: newInc.y || 55,
      reportedBy: newInc.reportedBy,
      photos: newInc.photos,
      timeline: newInc.timeline || [{ time: 'Just now', text: 'Reported by resident' }]
    };

    setIncidents((prev) => [createdIncident, ...prev]);
    setSelectedIncident(createdIncident);
    setCurrentScreen('home');
  };

  // Simulation Triggers (for DemoToolbar)
  const handleWalkIntoDangerZone = () => {
    const nextState = !userInDangerZone;
    setUserInDangerZone(nextState);
    if (nextState) {
      setUserLocation({ x: 50, y: 38 }); // Move into Hillbrow zone
    } else {
      setUserLocation({ x: 48, y: 52 }); // Move back to Braamfontein
    }
  };

  const handleSimulateShake = () => {
    triggerSosCountdown();
  };

  const handleSimulateFiveTaps = () => {
    triggerSosCountdown();
  };

  const handleToggleOffline = () => {
    const nextOffline = !isOffline;
    setIsOffline(nextOffline);
    if (nextOffline) {
      setCurrentScreen('offline-preview');
    }
  };

  const handleResetDemo = () => {
    setCurrentScreen('home');
    setCurrentPersona('thandi');
    setFriends(INITIAL_FRIENDS);
    setIncidents(INITIAL_INCIDENTS);
    setProviders(INITIAL_SERVICE_PROVIDERS);
    setSharingLogs(INITIAL_DATA_SHARING_LOGS);
    setSelectedIncident(INITIAL_INCIDENTS[0]);
    setDispatchedProvider(null);
    setIsOffline(false);
    setShowSosCountdown(false);
    setSosActive(false);
    setHasDispatched(false);
    setHasArrived(false);
    setUserInDangerZone(false);
    setUserLocation({ x: 48, y: 52 });
  };

  const handleQuickDispatch = () => {
    const sentinel = providers.find((p) => p.id === 'p3') || providers[0];
    handleDispatchProvider(sentinel, 'Thandi Ndlovu');
  };

  const handleSimulateArrival = () => {
    setHasArrived(true);
  };

  // Determine if TopBar & BottomNav should be visible
  const isFullScreenMode =
    currentScreen === 'onboarding' ||
    currentScreen === 'sos-active' ||
    currentScreen === 'help-on-the-way' ||
    currentScreen === 'offline-preview' ||
    currentScreen === 'report-incident' ||
    currentScreen === 'privacy-policy' ||
    currentScreen === 'provider-portal' ||
    showSosCountdown;

  return (
    <PhoneFrame
      isOffline={isOffline}
      currentTime="21:14"
      theme={theme}
      onToggleTheme={toggleTheme}
      onQuickReset={handleResetDemo}
    >
      {/* Floating Demo Control Pill */}
      <DemoToolbar
        currentPersona={currentPersona}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectPersona={(persona) => {
          setCurrentPersona(persona);
          if (persona === 'provider') {
            setCurrentScreen('provider-portal');
          } else if (persona === 'lerato') {
            setCurrentScreen('friends');
          } else {
            setCurrentScreen('home');
          }
        }}
        onWalkIntoDangerZone={handleWalkIntoDangerZone}
        onSimulateShake={handleSimulateShake}
        onSimulateFiveTaps={handleSimulateFiveTaps}
        onToggleOffline={handleToggleOffline}
        isOffline={isOffline}
        onResetDemo={handleResetDemo}
        onQuickDispatch={handleQuickDispatch}
        onSimulateArrival={handleSimulateArrival}
        userInDangerZone={userInDangerZone}
        sosActive={sosActive}
        dispatched={hasDispatched}
        arrived={hasArrived}
      />

      {/* Main Screen Body with 5-tap gesture detection */}
      <div
        className="w-full h-full flex flex-col relative overflow-hidden select-none"
        onClick={handleViewportTap}
      >
        {/* Standard TopBar (shown on primary tabs) */}
        {!isFullScreenMode && (
          <TopBar
            locationName="BRAAMFONTEIN"
            hasUnreadAlerts={friends.some((f) => f.status === 'alert')}
            theme={theme}
            onToggleTheme={toggleTheme}
            onSearchClick={() => setCurrentScreen('safety-map')}
            onNotificationsClick={() => setCurrentScreen('friends')}
            onLocationClick={() => setCurrentScreen('safety-map')}
          />
        )}

        {/* SCREEN ROUTING */}
        <div className="flex-1 w-full relative overflow-hidden flex flex-col">
          {currentScreen === 'onboarding' && (
            <OnboardingScreen
              onComplete={() => setCurrentScreen('home')}
              onOpenPrivacyPolicy={() => setCurrentScreen('privacy-policy')}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              friends={friends}
              incidents={incidents}
              userGreetingName={currentPersona === 'thandi' ? 'THANDI' : 'LERATO'}
              userInDangerZone={userInDangerZone}
              onSelectFriend={() => setCurrentScreen('friends')}
              onSelectIncident={(inc) => {
                setSelectedIncident(inc);
                setCurrentScreen('incident-detail');
              }}
              onOpenLiveAlert={(inc) => {
                setSelectedIncident(inc);
                setCurrentScreen('incident-detail');
              }}
              onNavigateToFriends={() => setCurrentScreen('friends')}
              onNavigateToMap={() => setCurrentScreen('safety-map')}
            />
          )}

          {currentScreen === 'safety-map' && (
            <SafetyMapScreen
              userLocation={userLocation}
              userInDangerZone={userInDangerZone}
              theme={theme}
              incidents={incidents}
              providers={providers}
              dangerZones={INITIAL_DANGER_ZONES}
              onTriggerSos={triggerSosCountdown}
              onOpenReportIncident={() => setCurrentScreen('report-incident')}
              onOpenFriends={() => setCurrentScreen('friends')}
              onOpenIncidentDetail={(inc) => {
                setSelectedIncident(inc);
                setCurrentScreen('incident-detail');
              }}
            />
          )}

          {currentScreen === 'friends' && (
            <FriendsScreen
              friends={friends}
              providers={providers}
              incidents={incidents}
              onDispatchProvider={handleDispatchProvider}
              dispatchedProviderId={dispatchedProvider?.id || null}
              onOpenIncidentDetail={(inc) => {
                setSelectedIncident(inc);
                setCurrentScreen('incident-detail');
              }}
            />
          )}

          {currentScreen === 'providers' && (
            <ProvidersScreen
              providers={providers}
              onOpenRegisterPortal={() => setCurrentScreen('provider-portal')}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsScreen
              friends={friends}
              sharingLogs={sharingLogs}
              theme={theme}
              onToggleTheme={toggleTheme}
              onOpenOfflinePreview={() => setCurrentScreen('offline-preview')}
              onOpenPrivacyPolicy={() => setCurrentScreen('privacy-policy')}
              onRevokeLog={(id) => {
                setSharingLogs((prev) =>
                  prev.map((l) => (l.id === id ? { ...l, isRevoked: true } : l))
                );
              }}
            />
          )}

          {currentScreen === 'incident-detail' && selectedIncident && (
            <IncidentDetailScreen
              incident={selectedIncident}
              onBack={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'sos-active' && (
            <SosActiveScreen
              friends={friends}
              onCancelSos={handleCancelSos}
              onDispatchedHelp={() => setCurrentScreen('help-on-the-way')}
              userLocation={userLocation}
            />
          )}

          {currentScreen === 'help-on-the-way' && (
            <HelpOnTheWayScreen
              provider={dispatchedProvider || providers[2]}
              friends={friends}
              onCancelSos={handleCancelSos}
              onHelpArrived={() => setHasArrived(true)}
              userLocation={userLocation}
            />
          )}

          {currentScreen === 'report-incident' && (
            <ReportIncidentScreen
              onBack={() => setCurrentScreen('home')}
              onSubmitReport={handleAddIncidentReport}
            />
          )}

          {currentScreen === 'provider-portal' && (
            <ProviderPortalScreen
              onBack={() => setCurrentScreen('providers')}
              onSimulateAcceptDispatch={() => {
                setHasDispatched(true);
              }}
            />
          )}

          {currentScreen === 'offline-preview' && (
            <OfflineScreen onBack={() => setCurrentScreen('home')} />
          )}

          {currentScreen === 'privacy-policy' && (
            <PrivacyPolicyScreen onBack={() => setCurrentScreen('settings')} />
          )}
        </div>

        {/* SOS Countdown Fullscreen Overlay (3, 2, 1) */}
        {showSosCountdown && (
          <SosCountdownOverlay
            onCountdownComplete={handleCountdownComplete}
            onCancel={handleCancelCountdown}
          />
        )}

        {/* Standard Bottom Navigation (shown on primary tabs) */}
        {!isFullScreenMode && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            liveAlertCount={friends.filter((f) => f.status === 'alert').length}
          />
        )}
      </div>
    </PhoneFrame>
  );
}
