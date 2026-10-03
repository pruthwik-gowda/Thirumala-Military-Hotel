import React, { useState, useEffect, useMemo } from 'react';
import AuspiciousHeader from './components/AuspiciousHeader';
import BrandHero from './components/BrandHero';
import SearchAndFilters from './components/SearchAndFilters';
import PosterBoard from './components/PosterBoard';
import DishCardView from './components/DishCardView';
import SundaySpecialBanner from './components/SundaySpecialBanner';
import PhoneModal from './components/PhoneModal';
import LightboxModal from './components/LightboxModal';
import AdminModal from './components/AdminModal';
import FooterInfo from './components/FooterInfo';
import BottomStickyBar from './components/BottomStickyBar';
import Toast from './components/Toast';
import { DEFAULT_MENU_ITEMS, HOTEL_INFO } from './data/defaultMenu';

export default function App() {
  // Theme state: LIGHT MODE IS DEFAULT as explicitly requested
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('tmh_theme');
    return saved === 'dark'; // Defaults to false (Light mode)
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('tmh_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('tmh_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Menu items state with LocalStorage persistence
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tmh_menu_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored menu items:', e);
    }
    return DEFAULT_MENU_ITEMS;
  });

  // Save to LocalStorage whenever menuItems changes
  const saveMenuItems = (newItems) => {
    setMenuItems(newItems);
    try {
      localStorage.setItem('tmh_menu_items', JSON.stringify(newItems));
    } catch (e) {
      console.error('Error saving menu items:', e);
    }
  };

  // CRUD Operations for Admin
  const handleAddItem = (newItem) => {
    saveMenuItems([newItem, ...menuItems]);
  };

  const handleUpdateItem = (updatedItem) => {
    saveMenuItems(
      menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteItem = (id) => {
    saveMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleToggleStock = (id) => {
    saveMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  const handleResetDefaults = () => {
    saveMenuItems(DEFAULT_MENU_ITEMS);
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTiming, setActiveTiming] = useState('morning'); // 'morning' | 'evening'
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'mutton' | 'chicken' | 'staples' | 'soups'
  const [viewMode, setViewMode] = useState('poster'); // 'poster' | 'cards'

  // Modals & Navigation
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, title: '', type: '' });
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleCopyPhone = (number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(number);
      showToast(`Copied ${number} to clipboard!`);
    } else {
      showToast(`Phone: ${number}`);
    }
  };

  // Find Leg Soup item for Sunday special
  const legSoupItem = useMemo(() => {
    return menuItems.find(
      (item) => item.isSundaySpecial || item.englishName.toLowerCase().includes('leg soup')
    );
  }, [menuItems]);

  // Filtered dishes for current view
  const filteredDishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return menuItems.filter((dish) => {
      // 1. Timing filter
      const matchesTiming =
        dish.timing === 'both' || dish.timing === activeTiming;

      // 2. Category filter
      const matchesCategory =
        activeCategory === 'all' || dish.category === activeCategory;

      // 3. Search query filter across English & Kannada
      const matchesSearch =
        q === '' ||
        dish.englishName.toLowerCase().includes(q) ||
        dish.kannadaName.toLowerCase().includes(q) ||
        (dish.kannadaAlt && dish.kannadaAlt.toLowerCase().includes(q)) ||
        dish.category.toLowerCase().includes(q) ||
        (dish.portion && dish.portion.toLowerCase().includes(q));

      return matchesTiming && matchesCategory && matchesSearch;
    });
  }, [menuItems, activeTiming, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col items-center pb-24 selection:bg-amber-600 selection:text-white transition-colors duration-200">
      
      {/* 1. Auspicious Invocations Bar with Theme Toggle & Admin button */}
      <AuspiciousHeader
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Container */}
      <main className="w-full max-w-md px-3 pt-3.5 space-y-3">
        
        {/* 2. Hotel Brand Hero Card with TM Seal */}
        <BrandHero
          onOpenCallModal={() => setIsCallModalOpen(true)}
          onOpenEmblemView={() =>
            setLightboxData({
              isOpen: true,
              title: 'Thirumala Military Hotel Emblem',
              type: 'logo'
            })
          }
        />

        {/* 3. Search Bar, Timing Switcher & Category Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTiming={activeTiming}
          onTimingChange={setActiveTiming}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* 4. Sunday Special Leg Soup Banner */}
        <SundaySpecialBanner
          legSoupItem={legSoupItem}
          onOpenCallModal={() => setIsCallModalOpen(true)}
        />

        {/* 5. Menu Display Area */}
        <section id="menu-section" className="space-y-3">
          {viewMode === 'poster' && (
            <PosterBoard
              items={filteredDishes}
              activeTiming={activeTiming}
              onOpenLightbox={() =>
                setLightboxData({
                  isOpen: true,
                  title:
                    activeTiming === 'evening'
                      ? '೨. ಸಂಜೆಯ ಮೆನು (Evening Menu)'
                      : '೧. ಬೆಳಗಿನ ಮೆನು (Morning Menu)',
                  type: 'poster'
                })
              }
              onOpenCallModal={() => setIsCallModalOpen(true)}
            />
          )}

          {viewMode === 'cards' && (
            <DishCardView
              items={filteredDishes}
              onOpenCallModal={() => setIsCallModalOpen(true)}
            />
          )}
        </section>

        {/* 6. Outdoor Catering & Hotel Contact Footer Card */}
        <FooterInfo
          onCopyPhone={handleCopyPhone}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
        />

      </main>

      {/* 7. Bottom Sticky Action Bar */}
      <BottomStickyBar onOpenCallModal={() => setIsCallModalOpen(true)} />

      {/* 8. Call Hotel & WhatsApp Modal */}
      <PhoneModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onCopyPhone={handleCopyPhone}
      />

      {/* 9. Fullscreen Zoomable Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        title={lightboxData.title}
        onClose={() => setLightboxData({ isOpen: false, title: '', type: '' })}
      >
        {lightboxData.type === 'poster' && (
          <div className="bg-[#fbf5e8] text-stone-900 rounded-2xl p-3 border-4 border-amber-600 shadow-2xl">
            <PosterBoard
              items={filteredDishes}
              activeTiming={activeTiming}
              onOpenLightbox={() => {}}
              onOpenCallModal={() => setIsCallModalOpen(true)}
            />
          </div>
        )}

        {lightboxData.type === 'logo' && (
          <div className="bg-[#fbf5e8] p-4 sm:p-6 rounded-3xl flex items-center justify-center border-4 border-amber-600 shadow-2xl max-w-sm mx-auto">
            <div className="w-72 h-72 sm:w-80 sm:h-80">
              <img
                src="/logo-tm.png"
                alt="Thirumala Military Hotel Emblem"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
            </div>
          </div>
        )}
      </LightboxModal>

      {/* 10. Admin Modal for Editing Menu & Prices */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        items={menuItems}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        onResetDefaults={handleResetDefaults}
        onToggleStock={handleToggleStock}
        onShowToast={showToast}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />

      {/* 11. Notification Toast */}
      <Toast message={toastMessage} />

    </div>
  );
}
