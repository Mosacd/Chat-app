
export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  isSticker?: boolean;
  stickerUrl?: string;
}

// interface User {
//   id: string;
//   name: string;
// }

export interface Sticker {
  uid: string;
  stickerPackUid: string;
  imageUrl: string;
  displayName: string;
  displayOrder: number;
}

export interface StickerPack {
  id: string;
  uid: string;
  name: string;
  stickerCount: number;
  stickers?: Sticker[];
}