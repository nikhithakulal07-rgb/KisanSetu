import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, Users, IndianRupee, Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/useRealtimeData';

export const FarmerBottomNav: React.FC = () => {
  const notifications = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { to: '/farmer/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/farmer/centres', label: 'Centres', icon: MapPin },
    { to: '/farmer/queue', label: 'Queue', icon: Users, highlight: true },
    { to: '/farmer/payments', label: 'Payments', icon: IndianRupee },
    { to: '/farmer/notifications', label: 'Alerts', icon: Bell, badge: unreadCount },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-xs font-semibold relative transition ${
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                } ${item.highlight ? 'relative' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`relative p-1 rounded-full ${
                      item.highlight && isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : item.highlight
                        ? 'bg-emerald-100 text-emerald-700'
                        : ''
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full h-4 w-4 text-[10px] flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] mt-0.5">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
