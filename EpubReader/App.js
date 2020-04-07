/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import {Epub, Streamer} from '@seongjoojin/epubjs-rn';

import TopBar from './app/TopBar';
import BottomBar from './app/BottomBar';
import Nav from './app/Nav';

const App = () => {
  const epubRef = useRef(null);

  const [flow, setFlow] = useState('paginated');
  const [location, setLocation] = useState(6);
  const [url, setUrl] = useState(
    'https://s3.amazonaws.com/epubjs/books/moby-dick.epub',
  );
  const [origin, setOrgin] = useState('');
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [toc, setToc] = useState([]);
  const [showBars, setShowBars] = useState(true);
  const [sliderDisabled, setSliderDisabled] = useState(true);
  const [book, setBook] = useState(null);
  const [visibleLocation, setVisibleLocation] = useState(null);
  const [showNav, setShowNav] = useState(false);

  const toggleBars = () => {
    setShowBars(!showBars);
  };

  const closeNavModal = () => {
    setShowNav(false);
  };

  useEffect(() => {
    const streamer = new Streamer();
    streamer
      .start()
      .then((origin) => {
        setOrgin(origin);
        return streamer.get(url);
      })
      .then((src) => {
        return setSrc(src);
      });
    // setTimeout(() => toggleBars(), 1000);

    () => {
      streamer.kill();
    };
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
          origin={origin}
          onLocationChange={(visibleLocation) => {
            console.log('locationChanged', visibleLocation);
            setVisibleLocation(visibleLocation);
          }}
          onLocationsReady={(locations) => {
            // console.log("location total", locations.total);
            setSliderDisabled(false);
          }}
          onReady={(book) => {
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
          onViewAdded={(index) => {
            console.log('added', index);
          }}
          beforeViewRemoved={(index) => {
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
          onError={(message) => {
            console.log('EPUBJS-Webview', message);
          }}
        />
        <View style={[styles.bar, {top: 0}]}>
          <TopBar
            title={title}
            shown={showBars}
            onLeftButtonPressed={() => {
              setShowNav(true);
            }}
            onRightButtonPressed={() => {
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
            onSlidingComplete={(value) => {
              setLocation(value.toFixed(6));
            }}
          />
        </View>
        {showNav && (
          <Nav
            visible={showNav}
            closeModal={closeNavModal}
            data={toc}
            display={(loc) => {
              setLocation(loc);
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reader: {
    position: 'relative',
    flex: 1,
    alignSelf: 'stretch',
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 55,
  },
});

export default App;
