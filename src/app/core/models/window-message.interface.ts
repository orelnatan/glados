import { MessageType } from "./message-type.enum";
import { MessageOrigin } from "./message-origin.enum";
import { MessagePayload } from "./message-payload.type";

export interface WindowMessage {
  source: MessageOrigin;
  type: MessageType;
  payload: MessagePayload;
}