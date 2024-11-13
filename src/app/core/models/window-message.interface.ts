import { WindowMessageType } from "./window-event-type.enum";
import { Origin } from "./origin.enum";

export declare type Payload = {
  [key: string]: any;
};

export interface WindowMessage {
  source: Origin;
  type: WindowMessageType;
  payload: Payload;
}