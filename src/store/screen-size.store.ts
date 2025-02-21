import {writable, get} from 'svelte/store';

import {ScreenSizeEnum} from '../types/screen-size.type'

const getScreenSize = (): ScreenSizeEnum  => {
    const width = window.innerWidth;
    if (width < 768) return ScreenSizeEnum.Mobile;
    if (width < 1025) return ScreenSizeEnum.Tablet;
    return ScreenSizeEnum.Desktop;
}

export const screenSize = writable<ScreenSizeEnum>(getScreenSize());

export const screen = {
    subscribe: screenSize.subscribe,
    isDesktop: () => get(screenSize) === ScreenSizeEnum.Desktop,
    isTablet: () => get(screenSize) === ScreenSizeEnum.Tablet,
    isMobile: () => get(screenSize) === ScreenSizeEnum.Mobile,
};