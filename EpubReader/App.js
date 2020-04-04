/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import {Epub} from '@seongjoojin/epubjs-rn';

import TopBar from './app/TopBar';
import BottomBar from './app/BottomBar';

const App = () => {
  const navRef = useRef(null);
  const epubRef = useRef(null);

  const [flow, setFlow] = useState('paginated');
  const [location, setLocation] = useState(6);
  const [src, setSrc] = useState(
    'https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opf',
  );
  const [title, setTitle] = useState('');
  const [toc, setToc] = useState([]);
  const [showBars, setShowBars] = useState(true);
  const [sliderDisabled, setSliderDisabled] = useState(true);
  const [book, setBook] = useState(null);
  const [visibleLocation, setVisibleLocation] = useState(null);

  const toggleBars = () => {
    setShowBars(!showBars);
  };

  useEffect(() => {
    setTimeout(() => toggleBars(), 1000);

    () => {};
  }, []);

  return (
    <>
      <StatusBar hidden={!showBars} translucent={true} animated={false} />
      <SafeAreaView style={styles.container}>
        <Epub
          style={styles.reader}
          ref={epubRef}
          src={src}
          flow={flow}
          location={location}
          onLocationChange={visibleLocation => {
            console.log('locationChanged', visibleLocation);
            setVisibleLocation(visibleLocation);
          }}
          onLocationsReady={locations => {
            // console.log("location total", locations.total);
            setSliderDisabled(false);
          }}
          onReady={book => {
            // console.log("Metadata", book.package.metadata)
            // console.log("Table of Contents", book.toc)
            setTitle(book.package.metadata.title);
            setToc(book.navigation.toc);
            setBook(book);
          }}
          onPress={(cfi, position, rendition) => {
            toggleBars();
            console.log('press', cfi);
          }}
          onLongPress={(cfi, rendition) => {
            console.log('longpress', cfi);
          }}
          onDblPress={(cfi, position, imgSrc, rendition) => {
            // Path relative to where the book is opened
            console.log(book.path.directory);
            // imgSrc is the actual src in the img html tag
            console.log('dblpress', cfi, position, imgSrc);
          }}
          onViewAdded={index => {
            console.log('added', index);
          }}
          beforeViewRemoved={index => {
            console.log('removed', index);
          }}
          onSelected={(cfiRange, rendition) => {
            console.log('selected', cfiRange);
            // Add marker
            rendition.highlight(cfiRange, {});
          }}
          onMarkClicked={(cfiRange, data, rendition) => {
            console.log('mark clicked', cfiRange);
            rendition.unhighlight(cfiRange);
          }}
          onError={message => {
            console.log('EPUBJS-Webview', message);
          }}
        />
        <View style={[styles.bar, {top: 0}]}>
          <TopBar
            title={title}
            shown={showBars}
            onLeftButtonPressed={() => setShowNav(true)}
            onRightButtonPressed={value => {
              if (flow === 'paginated') {
                setFlow('scrolled-continuous');
              } else {
                setFlow('paginated');
              }
            }}
          />
        </View>
        <View style={[styles.bar, {bottom: 0}]}>
          <BottomBar
            disabled={sliderDisabled}
            value={visibleLocation ? visibleLocation.start.percentage : 0}
            shown={showBars}
            onSlidingComplete={value => {
              setLocation(value.toFixed(6));
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3F3F3C',
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 55,
  },
});

export default App;
