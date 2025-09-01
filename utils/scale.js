// Simple responsive scaling utilities to get consistent sizing across devices
// Base guideline sizes are based on standard ~5.5" device
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// iPhone 11/12/13 baseline (can be adjusted)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const horizontalScale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// moderate scale: provides tuned scaling (default factor 0.5)
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

// Round to nearest pixel for sharper rendering
export const s = (size) => PixelRatio.roundToNearestPixel(horizontalScale(size));
export const vs = (size) => PixelRatio.roundToNearestPixel(verticalScale(size));
export const ms = (size, factor) => PixelRatio.roundToNearestPixel(moderateScale(size, factor));

export default { s, vs, ms };


