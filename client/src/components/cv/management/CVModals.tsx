import { useState, useEffect } from "react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";

type CVModalsProps = {
  isDeleteModalOpen: boolean;
  isRenameModalOpen: boolean;
  selectedCVName: string;
  onCloseDeleteModal: () => void;
  onCloseRenameModal: () => void;
  onConfirmDelete: () => void;
  onConfirmRename: (newName: string) => void;
};

export const CVModals = ({
  isDeleteModalOpen,
  isRenameModalOpen,
  selectedCVName,
  onCloseDeleteModal,
  onCloseRenameModal,
  onConfirmDelete,
  onConfirmRename,
}: CVModalsProps) => {
  const [newCVName, setNewCVName] = useState(selectedCVName);
  // Update name state when selected CV changes
  useEffect(() => {
    setNewCVName(selectedCVName);
  }, [selectedCVName]);

  return (
    <>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        title="Delete CV"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this CV? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>

      {/* Rename Modal */}
      <Modal
        isOpen={isRenameModalOpen}
        onClose={onCloseRenameModal}
        title="Rename CV"
      >
        <div className="mb-4">
          <label
            htmlFor="cvName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Name
          </label>
          <input
            type="text"
            id="cvName"
            value={newCVName}
            onChange={(e) => setNewCVName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter new name..."
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCloseRenameModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => onConfirmRename(newCVName.trim())}
            disabled={!newCVName.trim()}
          >
            Rename
          </Button>
        </div>
      </Modal>
    </>
  );
};
