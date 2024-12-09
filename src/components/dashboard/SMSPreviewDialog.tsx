import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SMSPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Array<{
    text: string;
    sender: "business" | "customer";
  }>;
}

const SMSPreviewDialog = ({
  isOpen,
  onClose,
  messages,
}: SMSPreviewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[380px] p-0">
        <DialogHeader className="bg-background border-b p-4">
          <DialogTitle className="text-center">Message Preview</DialogTitle>
        </DialogHeader>
        <div className="p-4 bg-background max-h-[500px] overflow-y-auto">
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === "customer" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SMSPreviewDialog;
