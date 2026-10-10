export interface BirthdayConfig {
  bestieName: string;
  bestieNickname: string;
  senderName: string;
  birthdayDate: string; // ISO date string or formatted date
  targetSeconds: number; // for initial testing (e.g. 10s)
  useSecondsCountdown: boolean;
  letterMessage: string;
  photos: PhotoMemory[];
  reasons: string[];
  coupons: CouponGift[];
}

export interface PhotoMemory {
  id: string;
  url: string;
  caption: string;
  date?: string;
  rotation?: number;
}

export interface CouponGift {
  id: string;
  title: string;
  description: string;
  code: string;
  claimed: boolean;
  iconName: string;
}
