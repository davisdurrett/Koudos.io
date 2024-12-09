import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";

interface MessageTemplateInputProps {
  value: string;
  onChange: (value: string) => void;
  variables: Array<{ name: string; description: string }>;
  placeholder?: string;
}

const MessageTemplateInput = ({
  value,
  onChange,
  variables,
  placeholder,
}: MessageTemplateInputProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertVariable = (varName: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const cursorPosition = textarea.selectionStart;
      const newValue =
        value.slice(0, cursorPosition) +
        `{${varName}}` +
        value.slice(cursorPosition);
      onChange(newValue);
      // Reset cursor position after variable insertion
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          cursorPosition + varName.length + 2,
          cursorPosition + varName.length + 2,
        );
      }, 0);
    }
  };

  // Auto-resize textarea based on content
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex gap-2">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-mono text-sm resize-none overflow-hidden"
        style={{ minHeight: "38px" }}
      />
      <Select onValueChange={insertVariable}>
        <SelectTrigger className="w-[180px] h-10 self-start">
          <PlusIcon className="w-4 h-4 mr-2" />
          <span>Add Variable</span>
        </SelectTrigger>
        <SelectContent>
          {variables.map((variable) => (
            <SelectItem key={variable.name} value={variable.name}>
              <div className="flex flex-col">
                <span>{`{${variable.name}}`}</span>
                <span className="text-xs text-muted-foreground">
                  {variable.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MessageTemplateInput;
