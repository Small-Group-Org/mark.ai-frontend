import React, { createContext, useContext, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogPortal,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";

interface ConfirmationConfig {
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  confirmButtonClass?: string;
  onConfirm: () => void;
  preventOutsideClose?: boolean;
}

interface ConfirmationDialogContextType {
  showConfirmation: (config: ConfirmationConfig) => void;
  isOpen: boolean;
  closeDialog: () => void;
}

// Create context
const ConfirmationDialogContext = createContext<ConfirmationDialogContextType | undefined>(undefined);

// Provider component
export const ConfirmationDialogProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmationConfig | null>(null);

  const showConfirmation = (newConfig: ConfirmationConfig) => {
    setConfig(newConfig);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setConfig(null);
  };

  const handleConfirm = () => {
    if (config?.onConfirm) {
      config.onConfirm();
    }
    closeDialog();
  };

  const handleCancel = () => {
    closeDialog();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
    }
  };

  const contextValue: ConfirmationDialogContextType = {
    showConfirmation,
    isOpen,
    closeDialog,
  };

  return (
    <ConfirmationDialogContext.Provider value={contextValue}>
      {config && (
        <AlertDialog 
          open={isOpen} 
          {...(!config.preventOutsideClose && { onOpenChange: handleOpenChange })}
        >
          <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogContent 
              className="bg-white border border-gray-200 shadow-lg"
              {...(config.preventOutsideClose && {
                onEscapeKeyDown: (e: KeyboardEvent) => e.preventDefault(),
              })}
            >
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                  {config.title}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  {config.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel 
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  onClick={handleCancel}
                >
                  {config.cancelText || 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleConfirm}
                  className={config.confirmButtonClass || "bg-blue-500 text-white hover:bg-blue-600 border-0"}
                >
                  {config.confirmText}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      )}
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

// Hook for consuming the context
export const useConfirmationDialogContext = () => {
  const context = useContext(ConfirmationDialogContext);
  if (context === undefined) {
    throw new Error('useConfirmationDialogContext must be used within a ConfirmationDialogProvider');
  }
  return context;
};

export default ConfirmationDialogProvider; 