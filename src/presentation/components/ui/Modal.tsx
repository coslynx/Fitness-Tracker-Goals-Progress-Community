'use client'

import React, { useState, useEffect } from 'react';
import { ModalProps } from '../../../../types/ui';
import { useStore } from '@/lib/store';
import { Button } from '@/presentation/components/ui/Button';
import { Spinner } from '@/presentation/components/ui/Spinner';

// Ensure correct version of Tailwind CSS is imported
import 'tailwindcss/tailwind.css';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  isLoading = false,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
}) => {
  // Use Zustand to manage modal state
  const { goals } = useStore();

  // Handle close event
  const handleClose = () => {
    onClose();
  };

  // Handle confirm event
  const handleConfirm = () => {
    onConfirm();
  };

  // Render the Modal component with Tailwind CSS styling
  return (
    <>
      {/* Check if the modal is open */ }
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75 p-4"
        >
          <div className="relative w-full max-w-lg max-h-full">
            {/* Modal content */ }
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */ }
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>
              {/* Modal body */ }
              <div className="p-6 space-y-6">
                {/* Display spinner if isLoading is true */ }
                {isLoading && <Spinner />}
                {/* Display modal content */ }
                {children}
              </div>
              {/* Modal footer */ }
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                {/* Cancel button */ }
                <Button onClick={handleClose} variant="secondary">
                  {cancelLabel}
                </Button>
                {/* Confirm button */ }
                <Button onClick={handleConfirm} variant="primary">
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;