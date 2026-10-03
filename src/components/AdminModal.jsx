import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  RotateCcw,
  Search,
  X,
  Eye,
  EyeOff,
  AlertTriangle,
  KeyRound,
  Flame,
  Sparkles
} from 'lucide-react';
import { MENU_CATEGORIES } from '../data/defaultMenu';

export default function AdminModal({
  isOpen,
  onClose,
  items,
  showPrices = false,
  onToggleShowPrices,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onResetDefaults,
  onToggleStock,
  onShowToast,
  isAdminLoggedIn,
  setIsAdminLoggedIn
}) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin search inside modal
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCatFilter, setAdminCatFilter] = useState('all');

  // Add/Edit Dish Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    kannadaName: '',
    englishName: '',
    category: 'mutton',
    timing: 'both',
    price: '',
    portion: '',
    isSpecial: false,
    isSundaySpecial: false,
    inStock: true,
    column: 'left'
  });

  // Delete confirmation
  const [itemToDelete, setItemToDelete] = useState(null);
  // Reset confirmation
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  // Change password modal
  const [showChangePass, setShowChangePass] = useState(false);
  const [newPass, setNewPass] = useState('');

  if (!isOpen) return null;

  // Retrieve current saved passcode (default: 'admin123')
  const storedPasscode = localStorage.getItem('tmh_admin_pin') || 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === storedPasscode || password === '1985') {
      setIsAdminLoggedIn(true);
      setLoginError('');
      setPassword('');
      onShowToast('Welcome to Thirumala Menu Manager!');
    } else {
      setLoginError('Invalid Passcode. Default is "admin123" or PIN "1985".');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    onShowToast('Logged out of Admin Panel');
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setFormData({
      kannadaName: '',
      englishName: '',
      category: 'mutton',
      timing: 'both',
      price: '',
      portion: '',
      isSpecial: false,
      isSundaySpecial: false,
      inStock: true,
      column: 'left'
    });
    setShowFormModal(true);
  };

  const handleOpenEdit = (dish) => {
    setIsEditing(true);
    setCurrentEditId(dish.id);
    setFormData({
      kannadaName: dish.kannadaName || '',
      englishName: dish.englishName || '',
      category: dish.category || 'mutton',
      timing: dish.timing || 'both',
      price: dish.price || '',
      portion: dish.portion || '',
      isSpecial: Boolean(dish.isSpecial),
      isSundaySpecial: Boolean(dish.isSundaySpecial),
      inStock: Boolean(dish.inStock),
      column: dish.column || (dish.category === 'chicken' ? 'right' : 'left')
    });
    setShowFormModal(true);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formData.englishName.trim() || !formData.kannadaName.trim() || !formData.price) {
      alert('Please enter English Name, Kannada Name, and Price.');
      return;
    }

    const priceNum = parseFloat(formData.price) || 0;

    if (isEditing && currentEditId) {
      onUpdateItem({
        id: currentEditId,
        ...formData,
        price: priceNum
      });
      onShowToast(`Updated "${formData.englishName}"`);
    } else {
      const newItem = {
        id: `tmh-${Date.now()}`,
        ...formData,
        price: priceNum
      };
      onAddItem(newItem);
      onShowToast(`Added new dish "${formData.englishName}"`);
    }

    setShowFormModal(false);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      onDeleteItem(itemToDelete.id);
      onShowToast(`Deleted "${itemToDelete.englishName}"`);
      setItemToDelete(null);
    }
  };

  const confirmReset = () => {
    onResetDefaults();
    setShowResetConfirm(false);
    onShowToast('Menu reset to authentic original items');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPass.trim().length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    localStorage.setItem('tmh_admin_pin', newPass.trim());
    onShowToast('Admin password updated successfully');
    setShowChangePass(false);
    setNewPass('');
  };

  // Filtered dishes in Admin view
  const filteredDishes = items.filter((dish) => {
    const matchesSearch =
      adminSearch.trim() === '' ||
      dish.englishName.toLowerCase().includes(adminSearch.toLowerCase()) ||
      dish.kannadaName.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesCat = adminCatFilter === 'all' || dish.category === adminCatFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div
      className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1a1411] border border-amber-300 dark:border-[#4a3629] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#781212] text-[#fef08a] p-3.5 px-4 flex items-center justify-between border-b border-amber-500/40 shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                Thirumala Menu Admin
              </h3>
              <p className="text-[10px] text-amber-200 opacity-90 kannada-text">
                ಮೆನು ನಿರ್ವಹಣೆ ಮತ್ತು ಬೆಲೆ ಪರಿಷ್ಕರಣೆ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-black/40 hover:bg-black/60 text-amber-200 text-xs px-2.5 py-1 rounded-lg border border-amber-400/30 transition active:scale-95 font-semibold"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="text-amber-200 hover:text-white p-1 rounded-lg hover:bg-black/30 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAdminLoggedIn ? (
          /* LOGIN SCREEN */
          <div className="p-6 sm:p-8 max-w-sm mx-auto w-full text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto text-amber-800 dark:text-amber-300 shadow">
              <KeyRound className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-black text-stone-900 dark:text-amber-400">
                Hotel Owner & Staff Login
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Enter your passcode to manage dishes, prices, and availability.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Enter passcode (default: admin123)"
                  className="w-full bg-stone-50 dark:bg-[#120e0c] border border-stone-300 dark:border-[#4a3629] rounded-xl px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <p className="text-xs text-red-600 dark:text-red-400 font-bold">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-sm shadow-md active:scale-95 transition"
              >
                Sign In to Admin
              </button>
            </form>

            <div className="bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800/40 text-left text-[11px] text-amber-900 dark:text-amber-300">
              <span className="font-bold">🔑 Default Credentials:</span>
              <p className="mt-0.5 opacity-90">Passcode: <code className="font-mono font-bold bg-amber-200/60 dark:bg-amber-900/60 px-1 py-0.5 rounded">admin123</code> or PIN <code className="font-mono font-bold bg-amber-200/60 dark:bg-amber-900/60 px-1 py-0.5 rounded">1985</code></p>
            </div>
          </div>
        ) : (
          /* ADMIN DASHBOARD */
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Top Stats & Quick Actions Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-amber-50 dark:bg-stone-900 p-2.5 rounded-xl border border-amber-200 dark:border-stone-800">
                <span className="text-stone-500 dark:text-stone-400 text-[10px] block uppercase font-bold">Total Dishes</span>
                <span className="text-lg font-black text-amber-800 dark:text-amber-400">{items.length}</span>
              </div>
              <div className="bg-emerald-50 dark:bg-stone-900 p-2.5 rounded-xl border border-emerald-200 dark:border-stone-800">
                <span className="text-stone-500 dark:text-stone-400 text-[10px] block uppercase font-bold">In Stock</span>
                <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                  {items.filter((i) => i.inStock).length}
                </span>
              </div>
              <div className="bg-red-50 dark:bg-stone-900 p-2.5 rounded-xl border border-red-200 dark:border-stone-800">
                <span className="text-stone-500 dark:text-stone-400 text-[10px] block uppercase font-bold">Sold Out</span>
                <span className="text-lg font-black text-red-700 dark:text-red-400">
                  {items.filter((i) => !i.inStock).length}
                </span>
              </div>
              <div className="bg-stone-50 dark:bg-stone-900 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-col justify-center items-center">
                <button
                  onClick={() => setShowChangePass(true)}
                  className="text-[11px] font-bold text-stone-700 dark:text-stone-300 hover:text-amber-600 flex items-center gap-1"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Passcode</span>
                </button>
              </div>
            </div>

            {/* Action Buttons: Add Item & Reset Menu */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Dish</span>
              </button>

              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs transition"
                title="Restore default 25 items"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Menu</span>
              </button>
            </div>

            {/* Price Visibility on Customer Menu Toggle Card */}
            <div className="bg-amber-50 dark:bg-[#231b16] p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-2">
              <div>
                <span className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <span>💰</span>
                  <span>Customer Menu Prices</span>
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {showPrices ? 'Prices are currently visible on menus.' : 'Prices are currently hidden on menus.'}
                </p>
              </div>
              <button
                type="button"
                onClick={onToggleShowPrices}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95 ${
                  showPrices
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700'
                }`}
              >
                {showPrices ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showPrices ? 'Showing Prices' : 'Prices Hidden'}</span>
              </button>
            </div>

            {/* Search & Category Filter within Admin */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <div className="bg-stone-100 dark:bg-[#120e0c] px-3 py-1.5 rounded-xl border border-stone-200 dark:border-[#3e2c21] flex items-center gap-2 flex-1">
                  <Search className="w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder="Search dish to edit..."
                    className="w-full bg-transparent text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                  {adminSearch && (
                    <button onClick={() => setAdminSearch('')} className="text-stone-400 hover:text-stone-600">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <select
                  value={adminCatFilter}
                  onChange={(e) => setAdminCatFilter(e.target.value)}
                  className="bg-stone-100 dark:bg-[#120e0c] border border-stone-200 dark:border-[#3e2c21] rounded-xl px-2.5 py-1.5 text-xs text-stone-700 dark:text-stone-300 font-semibold focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="mutton">Mutton</option>
                  <option value="chicken">Chicken</option>
                  <option value="staples">Staples</option>
                  <option value="soups">Soups & Specials</option>
                </select>
              </div>
            </div>

            {/* Dishes Management Table / List */}
            <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-[#15100d]">
              {filteredDishes.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-500">
                  No matching dishes found.
                </div>
              ) : (
                filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-2.5 sm:p-3 flex items-center justify-between gap-2 hover:bg-stone-50 dark:hover:bg-[#1d1613] transition"
                  >
                    {/* Left: Dish Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-stone-900 dark:text-amber-300 kannada-text text-sm sm:text-base leading-tight">
                          {dish.kannadaName}
                        </span>
                        <span className="text-xs font-bold text-stone-700 dark:text-stone-200">
                          {dish.englishName}
                        </span>
                        {dish.portion && (
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.2 rounded">
                            {dish.portion}
                          </span>
                        )}
                        {dish.isSundaySpecial && (
                          <span className="text-[9px] bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold px-1.5 py-0.2 rounded">
                            Sunday Special
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-500">
                        <span className="uppercase font-semibold text-[10px] text-amber-700 dark:text-amber-500">
                          {dish.category}
                        </span>
                        <span>•</span>
                        <span>{dish.timing === 'both' ? 'Morning & Evening' : dish.timing === 'morning' ? 'Morning Only' : 'Evening Only'}</span>
                      </div>
                    </div>

                    {/* Middle: Price & Stock Switch */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-black text-[#15803d] dark:text-emerald-400">
                          ₹{dish.price}
                        </span>
                      </div>

                      {/* Quick 1-click In Stock / Sold Out Toggle */}
                      <button
                        onClick={() => {
                          onToggleStock(dish.id);
                          onShowToast(
                            `Marked "${dish.englishName}" as ${dish.inStock ? 'Sold Out' : 'In Stock'}`
                          );
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase transition active:scale-95 flex items-center gap-1 border ${
                          dish.inStock
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                            : 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300'
                        }`}
                        title="Click to toggle In-Stock / Sold-Out"
                      >
                        {dish.inStock ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-red-600" />
                            <span>Sold Out</span>
                          </>
                        )}
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEdit(dish)}
                        className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 hover:text-amber-800 transition"
                        title="Edit dish"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => setItemToDelete(dish)}
                        className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-red-100 dark:hover:bg-red-950/60 hover:text-red-700 transition"
                        title="Delete dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* MODAL: ADD / EDIT DISH FORM */}
        {showFormModal && (
          <div
            className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-3 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowFormModal(false)}
          >
            <div
              className="bg-white dark:bg-[#1f1713] border border-amber-300 dark:border-[#4a3629] rounded-2xl max-w-md w-full p-4 sm:p-5 space-y-3.5 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <h4 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-amber-400">
                  {isEditing ? 'Edit Dish & Price' : 'Add New Menu Item'}
                </h4>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-3 text-xs">
                {/* Kannada Name */}
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Kannada Name (ಕನ್ನಡ ಹೆಸರು) *
                  </label>
                  <input
                    type="text"
                    value={formData.kannadaName}
                    onChange={(e) => setFormData({ ...formData, kannadaName: e.target.value })}
                    placeholder="e.g. ಮಟನ್ ಚಾಪ್ಸ್"
                    className="w-full bg-stone-50 dark:bg-[#120e0c] border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 kannada-text focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    required
                  />
                </div>

                {/* English Name */}
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    English Name *
                  </label>
                  <input
                    type="text"
                    value={formData.englishName}
                    onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
                    placeholder="e.g. Mutton Chops"
                    className="w-full bg-stone-50 dark:bg-[#120e0c] border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* Price & Portion */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g. 240"
                      className="w-full bg-stone-50 dark:bg-[#120e0c] border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Portion Note
                    </label>
                    <input
                      type="text"
                      value={formData.portion}
                      onChange={(e) => setFormData({ ...formData, portion: e.target.value })}
                      placeholder="e.g. 4 pcs / 1 pc"
                      className="w-full bg-stone-50 dark:bg-[#120e0c] border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Category & Timings */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-[#120e0c] border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 focus:outline-none"
                    >
                      <option value="mutton">Mutton (ಕುರಿ ಮಾಂಸ)</option>
                      <option value="chicken">Chicken (ಕೋಳಿ ಮಾಂಸ)</option>
                      <option value="staples">Mudde & Staples (ರೊಟ್ಟಿ • ಅನ್ನ)</option>
                      <option value="soups">Soups & Specials (ಸೂಪ್)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Serving Timings
                    </label>
                    <select
                      value={formData.timing}
                      onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-[#120e0c] border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 focus:outline-none"
                    >
                      <option value="both">Both (Morning & Evening)</option>
                      <option value="morning">Morning Only (ಬೆಳಿಗ್ಗೆ)</option>
                      <option value="evening">Evening Only (ಸಂಜೆ)</option>
                    </select>
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-200 dark:border-stone-800">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <span className="font-bold text-stone-700 dark:text-stone-300">In Stock</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSpecial}
                      onChange={(e) => setFormData({ ...formData, isSpecial: e.target.checked })}
                      className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <span className="font-bold text-stone-700 dark:text-stone-300">Special</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSundaySpecial}
                      onChange={(e) => setFormData({ ...formData, isSundaySpecial: e.target.checked })}
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                    />
                    <span className="font-bold text-red-600 dark:text-red-400">Sunday</span>
                  </label>
                </div>

                {/* Submit buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black shadow-md active:scale-95 transition"
                  >
                    {isEditing ? 'Save Changes' : 'Add Dish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: DELETE CONFIRMATION */}
        {itemToDelete && (
          <div
            className="fixed inset-0 bg-black/75 z-70 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={() => setItemToDelete(null)}
          >
            <div
              className="bg-white dark:bg-[#1c1613] border border-red-300 dark:border-red-900 rounded-2xl max-w-xs w-full p-4 text-center space-y-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="font-black text-stone-900 dark:text-stone-100 text-sm">
                Delete "{itemToDelete.englishName}"?
              </h4>
              <p className="text-xs text-stone-500">
                Are you sure you want to remove this item from the hotel menu?
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: RESET CONFIRMATION */}
        {showResetConfirm && (
          <div
            className="fixed inset-0 bg-black/75 z-70 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowResetConfirm(false)}
          >
            <div
              className="bg-white dark:bg-[#1c1613] border border-amber-300 dark:border-amber-700 rounded-2xl max-w-xs w-full p-4 text-center space-y-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="font-black text-stone-900 dark:text-stone-100 text-sm">
                Reset to Original 25 Dishes?
              </h4>
              <p className="text-xs text-stone-500">
                This will restore all default dishes and prices from the physical hotel poster.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReset}
                  className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow"
                >
                  Reset Menu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CHANGE ADMIN PASSCODE */}
        {showChangePass && (
          <div
            className="fixed inset-0 bg-black/75 z-70 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowChangePass(false)}
          >
            <div
              className="bg-white dark:bg-[#1c1613] border border-amber-300 dark:border-[#4a3629] rounded-2xl max-w-xs w-full p-4 space-y-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-black text-stone-900 dark:text-stone-100 text-sm text-center">
                Set New Admin Passcode
              </h4>
              <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
                <input
                  type="text"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Enter new PIN or password"
                  className="w-full bg-stone-50 dark:bg-[#120e0c] border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-stone-900 dark:text-stone-100 text-center font-bold focus:outline-none"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowChangePass(false)}
                    className="py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                  >
                    Save PIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
