import { Link } from 'react-router';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ROUTES } from '@/constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-border bg-background text-foreground max-w-sm px-6 py-7">
        <DialogHeader>
          <DialogTitle className="text-primary">Log in required</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            You must be log in to access the Dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="border-border text-primary hover:bg-input flex-1 cursor-pointer rounded-lg border py-2 text-sm transition-colors"
          >
            Cancel
          </button>
          <Link
            to={ROUTES.LOGIN}
            onClick={onClose}
            className="bg-secondary hover:bg-secondary/90 flex-1 rounded-lg py-2 text-center text-sm text-white transition-colors"
          >
            Log In
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
