// https://www.npmjs.com/package/react-native-expo-viewport-units?activeTab=code
import { Dimensions } from 'react-native';

export const vw = (number: number) => {
 return Dimensions.get('window').width * (number / 100);
};

export const vh = (number: number) => {
 return Dimensions.get('window').height * (number / 100);
};

export const vmin = (number: number) => {
 return Math.min(Dimensions.get('window').width * (number / 100), Dimensions.get('window').height * (number / 100));
};

export const vmax = (number: number) => {
 return Math.max(Dimensions.get('window').width * (number / 100), Dimensions.get('window').height * (number / 100));
};
