import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import RecordingScreen from './RecodingScreen';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import { Audio,Video } from 'expo-av';

type Props = {};
type State = {};
export default class TabOneScreen extends React.Component<Props,State> {
  private recording: Audio.Recording | null;
  private sound: Audio.Sound | null;

  constructor(props: Props){
    super(props);
    this.recording = null;
    this.sound = null;
  }

  speak() {
    var thingToSay = 'Something to Say';
    Speech.speak(thingToSay);
    console.log(
      '555'
    );
  }

   private startRecording = async () => {
    
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true
      });
      const permissionResponse = await Audio.requestPermissionsAsync()
      
     console.log('Permission',permissionResponse); 
     
     const recording = new Audio.Recording();
     this.recording = recording;
     await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
     await this.recording.startAsync();
     
      // You are now recording!
    } catch (error) {
      // An error occurred!
      console.log('error', error);
    
    }
  }

  private stopRecording  = async () => {
   
    const soundObject = new Audio.Sound();
    try {
      await this.recording.stopAndUnloadAsync();
      console.log('Pause');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true
      });
      let sound = await (await this.recording.createNewLoadedSoundAsync()).sound
      //await sound.setVolumeAsync(1.0);
      await sound.playAsync();
      // You are now recording!
      console.log(await sound.getStatusAsync());
    } catch (error) {
      // An error occurred!
      console.log('error stop recording', error);
    }
  }

  onFullScreen(details) {
   //  console.log(details);
  }


  render() { 
    return (<View style={styles.container}>
      <Text style={styles.title}>Tab One 1</Text>
      <Button title="Start Recording" onPress={this.startRecording}></Button>
      <Button title="Stop Recording" onPress={this.stopRecording}></Button>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* <RecordingScreen/> */}
      {/* <Video source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay
        useNativeControls={true}
        usePoster={true}
        isLooping={false}
        onFullscreenUpdate={this.onFullScreen}
        style={{ width: 300, height: 300 }}
      /> */}
    </View>);
  }
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
