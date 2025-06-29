import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, isToday, isYesterday } from 'date-fns';

interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'milestone' | 'system';
  title: string;
  message: string;
  icon?: React.ReactNode;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'achievement',
      title: 'New Rune Earned!',
      message: 'You earned the "Task Master" rune for completing 10 tasks!',
      icon: <Trophy className="text-warning-60" size={16} />,
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: '2',
      type: 'milestone',
      title: 'Level Up!',
      message: 'Your Focus Virtua reached Level 5! New abilities unlocked.',
      icon: <Zap className="text-primarysolid-60" size={16} />,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Task Due Soon',
      message: 'Complete your morning routine - due in 2 hours',
      icon: <AlertCircle className="text-warning-60" size={16} />,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTimeDisplay = (timestamp: string) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-warning-10 border-warning-50';
      case 'milestone': return 'bg-primarysolid-10 border-primarysolid-50';
      case 'reminder': return 'bg-info-10 border-info-50';
      case 'system': return 'bg-black-10 border-black-50';
      default: return 'bg-white-100 border-black-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-80 flex items-start justify-center z-50 p-4 pt-20">
      <div className="bg-white-100 rounded-2xl border-2 border-black-100 shadow-[0_8px_0_#001428,0_12px_16px_rgba(0,20,40,0.3)] w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="text-black-100" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error-50 rounded-full flex items-center justify-center text-caption-10-med font-caption-10-med text-white-100">
                  {unreadCount}
                </span>
              )}
            </div>
            <h2 className="text-title-16 font-title-16-black text-black-100">
              Notifications
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-caption-11-med font-caption-11-med"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-96">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="text-black-40 mx-auto mb-3" size={32} />
              <p className="text-text-14-reg font-text-14-reg text-black-60">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    p-3 rounded-xl border transition-all duration-200 cursor-pointer
                    ${notification.read 
                      ? 'bg-white-100 border-black-100 opacity-75' 
                      : `${getTypeColor(notification.type)} shadow-[-1px_2px_0px_#001428]`
                    }
                    hover:transform hover:-translate-y-0.5
                  `}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon || <Info size={16} className="text-black-60" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-text-12-med font-text-12-med text-black-100">
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-caption-10-reg font-caption-10-reg text-black-60">
                            {getTimeDisplay(notification.timestamp)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-caption-11-reg font-caption-11-reg text-black-60 mt-1">
                        {notification.message}
                      </p>
                      
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primarysolid-50 rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};