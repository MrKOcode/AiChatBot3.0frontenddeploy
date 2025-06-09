import React, { useRef } from "react";
import { AutosizeTextarea } from "@/components/chat/ui/autosize-textarea";
import { Button } from "@/components/chat/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/redux/api/chat-state-api";
import type { AppDispatch, RootState } from "@/redux/store/store";
import type { AutosizeTextAreaRef } from "@/components/chat/ui/autosize-textarea";

export default function ChatInput() {
  const currentConversationId = useSelector(
    (state: RootState) => state.chat.currentConId,
  );
  const inputRef = useRef<AutosizeTextAreaRef>(null);
  const dispatch = useDispatch<AppDispatch>();
  const submitMessage = (): void => {
    const messageText = inputRef.current?.textArea.value;
    if (messageText && messageText !== "") {
      console.log("Dispatching sendMessage thunk");
      dispatch(sendMessage(currentConversationId, messageText));
      if (inputRef.current) {
        inputRef.current.textArea.value = "";
      }
    }
  };
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  };

  return (
    <div className="absolute w-full bottom-0 flex justify-end items-end select-none pointer-events-none">
      <div className="h-28 w-full items-center justify-center flex flex-col z-10">
        <div className="w-2/3 items-center justify-center flex">
          <div className="flex-row flex space-x-4 items-end w-full pointer-events-auto">
            <AutosizeTextarea
              className="h-96 w-full"
              placeholder="Type a message..."
              ref={inputRef}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={submitMessage}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
