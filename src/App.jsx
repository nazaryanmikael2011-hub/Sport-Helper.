import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFitness, FitnessProvider } from './context/FitnessContext';
import { Header } from './components/layout/Header';
import { DesktopSidebar, MobileBottomNav } from './components/layout/Navigation';
import { ToastContainer } from './components/layout/ToastContainer';
import { DashboardView } from './components/dashboard/DashboardView';
import { NutritionView } from './components/nutrition/NutritionView';
import { WorkoutsView } from './components/workouts/WorkoutsView';
import { ShopView } from './components/shop/ShopView';
import { ProfileView } from './components/profile/ProfileView';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingFlow } from './components/auth/OnboardingFlow';
import { WelcomeScreen } from './components/auth/WelcomeScreen';
import { CartDrawer } from './components/shop/CartDrawer';
import { ActiveWorkoutPlayer } from './components/workouts/ActiveWorkoutPlayer';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { user, profile, activeWorkout, cancelWorkout } = useFitness();

  const isFirstTime = !user.isLoggedIn || !profile.isOnboarded;

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} />;
      case 'nutrition':
        return <NutritionView />;
      case 'workouts':
        return <WorkoutsView />;
      case 'shop':
        return <ShopView onOpenCart={() => setIsCartOpen(true)} />;
      case 'profile':
        return (
          <ProfileView
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        );
      default:
        return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  // First-time visitor experience: Welcome screen + Step-by-step Onboarding
  if (isFirstTime) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col selection:bg-[#00FF85] selection:text-black">
        <ToastContainer />
        
        <WelcomeScreen
          onStartOnboarding={() => setIsOnboardingOpen(true)}
          onOpenLogin={() => setIsAuthOpen(true)}
        />

        <OnboardingFlow
          isOpen={isOnboardingOpen}
          onClose={() => {
            setIsOnboardingOpen(false);
            setActiveTab('dashboard');
          }}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col selection:bg-[#00FF85] selection:text-black">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Desktop Sidebar (hidden on mobile) */}
        <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic View Area */}
        <main className="flex-1 px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6 pb-28 md:pb-12 max-w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals & Overlays */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      <OnboardingFlow
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Active Workout Player when workout is running */}
      {activeWorkout && (
        <ActiveWorkoutPlayer
          workout={activeWorkout}
          onClose={cancelWorkout}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <FitnessProvider>
      <AppContent />
    </FitnessProvider>
  );
}
