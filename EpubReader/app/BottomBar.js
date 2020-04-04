import React, {Component, useState, useEffect} from 'react';

import {
  Platform,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from 'react-native';

import Slider from '@react-native-community/slider';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#cdcdcd',
    paddingTop: 0,
    bottom: 0,
    ...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 54,
      },
    }),
    right: 0,
    left: 0,
    borderTopWidth: 1,
    borderTopColor: '#000',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  slider: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
  },
});

const BottomBar = ({shown, disabled, value, onSlidingComplete}) => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const [barsShown, setBarsShown] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (shown) {
        show();
      } else {
        hide();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (shown) {
      show();
    } else {
      hide();
    }
  }, [shown]);

  const show = () => {
    const timing = Animated.timing;

    Animated.sequence([
      timing(fadeAnim, {
        toValue: 1,
        duration: 20,
      }),
    ]).start();

    setBarsShown(true);
  };

  const hide = () => {
    const timing = Animated.timing;

    Animated.sequence([
      timing(fadeAnim, {
        toValue: 0,
        duration: 20,
      }),
    ]).start();

    setBarsShown(false);
  };

  return (
    <Animated.View style={[styles.footer, {opacity: fadeAnim}]}>
      <Slider
        style={styles.slider}
        disabled={disabled}
        value={value}
        onSlidingComplete={onSlidingComplete}
      />
    </Animated.View>
  );
};

export default BottomBar;
