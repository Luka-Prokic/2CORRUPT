declare module 'react-native-flags' {
  import { Component } from 'react';
  
  interface FlagProps {
    isoCode: string;
    size?: number;
    style?: any;
  }
  
  export default class Flag extends Component<FlagProps> {}
}
