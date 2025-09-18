import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, User, Play, MessageCircle } from "lucide-react";

interface WatchChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
  movieId: number;
  onWatchTogether: () => void;
  onWatchAlone: () => void;
}

export default function WatchChoiceModal({
  isOpen,
  onClose,
  movieTitle,
  onWatchTogether,
  onWatchAlone,
}: WatchChoiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">How do you want to watch?</DialogTitle>
          <p className="text-center text-muted-foreground">"{movieTitle}"</p>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4">
          {/* Watch Alone Option */}
          <Button
            onClick={onWatchAlone}
            variant="outline"
            className="h-20 flex-col gap-2 border-2 hover:border-primary"
          >
            <User className="h-6 w-6" />
            <div className="text-center">
              <div className="font-semibold">Watch Alone</div>
              <div className="text-xs text-muted-foreground">Solo viewing with recommendations</div>
            </div>
          </Button>

          {/* Watch Together Option */}
          <Button
            onClick={onWatchTogether}
            variant="outline"
            className="h-20 flex-col gap-2 border-2 hover:border-primary"
          >
            <Users className="h-6 w-6" />
            <div className="text-center">
              <div className="font-semibold">Watch Together</div>
              <div className="text-xs text-muted-foreground">Create a room and invite friends</div>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-4 border-t text-xs text-muted-foreground">
          <div className="text-center space-y-1">
            <Play className="h-4 w-4 mx-auto" />
            <div>Personal viewing</div>
          </div>
          <div className="text-center space-y-1">
            <MessageCircle className="h-4 w-4 mx-auto" />
            <div>Chat & sync</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}