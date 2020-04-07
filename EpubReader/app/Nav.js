import React, {useState} from 'react';
import {
  SafeAreaView,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {Rendition} from '@seongjoojin/epubjs-rn';

const Nav = ({visible, closeModal, data, display}) => {
  // console.log('Nav data', data);
  const [modalVisible, setModalVisible] = useState(visible);

  const moveToc = (herf) => {
    console.log('moveToc', herf);
    if (display) display(herf);
    closeModal();
  };
  return (
    <SafeAreaView style={style.container}>
      <Modal visible={modalVisible}>
        <View style={style.header}>
          <Text style={style.headerTitle}>Table of Contents</Text>
          <TouchableOpacity style={style.backButton} onPress={closeModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={style.content}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={style.ItemBox}
              onPress={() => moveToc(item.href)}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#cdcdcd',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    right: 20,
  },
  content: {},
  ItemBox: {
    padding: 20,
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 0.5,
  },
});

export default Nav;
