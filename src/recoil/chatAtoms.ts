import { atom } from 'recoil';

export const chatPopupState = atom<boolean>({
    key: 'chatPopupState',
    default: false,
});