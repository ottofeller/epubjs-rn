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
  StatusBar,
} from 'react-native';

const TopBar = ({title, shown, onLeftButtonPressed, onRightButtonPressed}) => {
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

    timing(fadeAnim, {
      toValue: 1,
      duration: 20,
    }).start();

    setBarsShown(true);
  };

  const hide = () => {
    const timing = Animated.timing;

    timing(fadeAnim, {
      toValue: 0,
      duration: 20,
    }).start();

    setBarsShown(false);
  };

  return (
    <Animated.View style={[styles.header, {opacity: fadeAnim}]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onRightButtonPressed}>
        <Text>gear</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '400',
    flex: 8,
    color: '#000',
    ...Platform.select({
      ios: {
        fontFamily: 'Baskerville',
      },
      android: {
        fontFamily: 'serif',
      },
    }),
  },
  header: {
    backgroundColor: '#cdcdcd',
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 24,
      },
    }),
    top: 0,
    ...Platform.select({
      ios: {
        height: 84,
      },
      android: {
        height: 74,
      },
    }),
    right: 0,
    left: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 14,
  },
  backButton: {
    width: 34,
    height: 34,
    margin: 20,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
});

export default TopBar;
