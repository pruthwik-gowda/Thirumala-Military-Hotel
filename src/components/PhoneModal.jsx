import React from 'react';
import { Phone, MessageCircle, Copy, X } from 'lucide-react';
import { HOTEL_INFO } from '../data/defaultMenu';

export default function PhoneModal({ isOpen, onClose, onCopyPhone }) {
  if (!isOpen) return null;

  const phone1 = HOTEL_INFO.phones[0];
  const phone2 = HOTEL_INFO.phones[1];
  const tel1 = HOTEL_INFO.telPhones ? HOTEL_INFO.telPhones[0] : `+917795085362`;
  const tel2 = HOTEL_INFO.telPhones ? HOTEL_INFO.telPhones[1] : `+917349729646`;
  const waNumber = HOTEL_INFO.waPhone || '917795085362';
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    'Hi, I would like to enquire about todays menu and availability'
  )}`;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#fcfaf6] dark:bg-[#1c1613] border border-amber-300 dark:border-[#4a3629] rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-full transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-400 dark:border-emerald-600/50 text-emerald-800 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
          <Phone className="w-7 h-7" />
        </div>

        <div>
          <h3 className="font-extrabold text-amber-950 dark:text-amber-400 text-base">
            Call Thirumala Military Hotel
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
            Tap a number to place order or check woodfire batch timings:
          </p>
        </div>

        {/* Call Numbers */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${tel1}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition shadow"
            >
              <Phone className="w-4 h-4" />
              <span>📞 {phone1} (Primary)</span>
            </a>
            <button
              onClick={() => onCopyPhone(phone1)}
              className="p-2.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-xl text-stone-700 dark:text-stone-300 transition"
              title="Copy number"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${tel2}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm transition shadow border border-stone-600"
            >
              <Phone className="w-4 h-4" />
              <span>📞 {phone2} (Secondary)</span>
            </a>
            <button
              onClick={() => onCopyPhone(phone2)}
              className="p-2.5 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-xl text-stone-700 dark:text-stone-300 transition"
              title="Copy number"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* WhatsApp Direct Option */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm transition shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="w-full py-1.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
