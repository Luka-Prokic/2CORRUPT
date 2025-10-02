declare module 'react-native-swipe-button' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface SwipeButtonProps {
    onSwipeSuccess?: () => void;
    height?: number;
    width?: number;
    title?: string;
    shouldResetAfterSuccess?: boolean;
    swipeSuccessAnimationDuration?: number;
    thumbIconBackgroundColor?: string;
    thumbIconBorderColor?: string;
    railBackgroundColor?: string;
    railFillBackgroundColor?: string;
    railFillBorderColor?: string;
    railStyles?: ViewStyle;
    thumbIconStyles?: ViewStyle;
  }

  export default class SwipeButton extends Component<SwipeButtonProps> {}
}
