'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface DeleteUserModalProps {
  isOpen: boolean;
  userId: string; // userId is now required and cannot be null
  onClose: () => void;
  onSuccess: () => void; // Callback for successful deletion
}

export default function DeleteUserModal({
  isOpen,
  userId,
  onClose,
  onSuccess,
}: DeleteUserModalProps) {

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    console.log('Delete button clicked');
  
    setIsLoading(true);
  
    try {
      // Construct the API endpoint
      const requestUrl = `/api/users/${userId}`;
      console.log(`Sending DELETE request to: ${requestUrl}`);
  
      // Perform the DELETE request
      const response = await fetch(requestUrl, { method: 'DELETE' });
  
      // Handle the response
      if (!response.ok) {
        // Extract the error message from the response
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to delete user';
        console.error(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }
  
      // Successfully deleted
      const successData = await response.json();
      console.log('User deleted successfully:', successData);
  
      // Trigger success callback and close the modal
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      // Log and display the error message
      console.error('Error occurred during user deletion:', error);
    } finally {
      // Always reset the loading state
      setIsLoading(false);
    }
  };
  
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Supprimer l'utilisateur</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-700">
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}