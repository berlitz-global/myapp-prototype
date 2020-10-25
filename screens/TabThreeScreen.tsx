import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { WebView } from 'react-native-webview';

export default function TabTwoScreen() {
  return (
      <WebView 
        source={{ uri: 'https://portal.berlitz-platforms.io/learning-path' }} 
        allowsBackForwardNavigationGestures={true} 
        allowFileAccess={true}
        pullToRefreshEnabled={true}
        style={{ marginTop: 30}} />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
