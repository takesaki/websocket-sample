export type WebSocketMessage = BbsMessage | ControlMessage;

export interface BbsMessage {
  type: 'message';
  author: number;
  date: number;
  message: string;
} 

export interface ControlMessage {
  type: 'connected';
  id: string;
}