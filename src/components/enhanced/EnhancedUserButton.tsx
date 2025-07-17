import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Settings, User, Palette, Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LoadingAnimation } from "@/components/animations/LoadingAnimation";

interface EnhancedUserButtonProps {
  className?: string;
  size?: number;
  showNotifications?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  onThemeChange?: (theme: 'light' | 'dark' | 'auto') => void;
}

export function EnhancedUserButton({ 
  className, 
  size = 8,
  showNotifications = true,
  theme = 'auto',
  onThemeChange
}: EnhancedUserButtonProps) {
  const { isLoading, isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const sizeInPixels = size * 4;

  const handleSignOutClick = () => {
    setShowSignOutConfirm(true);
  };

  const handleConfirmedSignOut = async () => {
    signOut();
    navigate("/");
    setShowSignOutConfirm(false);
  };

  const handleCancelSignOut = () => {
    setShowSignOutConfirm(false);
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center justify-center relative rounded-full ${className}`}
      >
        <LoadingAnimation isLoading={true} size={sizeInPixels} />
      </motion.div>
    );
  }

  if (!user || !isAuthenticated) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center justify-center relative rounded-full ${className}`}
          >
            <Button
              variant="ghost"
              className="p-0 rounded-full shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
              style={{
                height: `${sizeInPixels}px`,
                width: `${sizeInPixels}px`,
              }}
            >
              <Avatar
                style={{
                  height: `${sizeInPixels}px`,
                  width: `${sizeInPixels}px`,
                }}
              >
                <img
                  src="/assets/1000158361.jpg"
                  alt="User Avatar"
                  style={{
                    height: `${sizeInPixels}px`,
                    width: `${sizeInPixels}px`,
                  }}
                />
              </Avatar>
              
              {/* Notification Badge */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"
                  />
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56 z-[9999]">
          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-2 py-1.5 flex flex-col gap-0.5 border-b mb-2 pb-2"
          >
            <p className="font-medium text-sm">{user.name || 'YETI User'}</p>
            <p className="text-muted-foreground text-xs truncate">
              {user.email}
            </p>
          </motion.div>

          {/* Menu Items */}
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowSettings(true)}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Palette className="h-4 w-4" />
            <span>Theme</span>
          </DropdownMenuItem>
          
          {showNotifications && (
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
            onClick={handleSignOutClick}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sign Out Confirmation Dialog */}
      <Dialog open={showSignOutConfirm} onOpenChange={setShowSignOutConfirm}>
        <DialogContent className="sm:max-w-[425px] z-[9999]">
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out of your YETI AI account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <Button variant="outline" onClick={handleCancelSignOut}>
              Cancel
            </Button>
            <Button onClick={handleConfirmedSignOut} className="bg-red-600 hover:bg-red-700">
              Yes, Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[500px] z-[9999]">
          <DialogHeader>
            <DialogTitle>User Settings</DialogTitle>
            <DialogDescription>
              Customize your YETI AI experience
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <input 
                className="w-full px-3 py-2 border rounded-md"
                defaultValue={user.name || ''}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
                value={user.email || ''}
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme Preference</label>
              <select 
                className="w-full px-3 py-2 border rounded-md"
                value={theme}
                onChange={(e) => onThemeChange?.(e.target.value as 'light' | 'dark' | 'auto')}
              >
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowSettings(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}