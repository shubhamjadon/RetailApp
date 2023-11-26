import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StoreType} from '../Screens/Home';

interface StoreListItemProps {
  store: StoreType;
  userId: string;
  handleUpload: (item: StoreType, isUploadDone: boolean) => void;
}

const StoreListItem = ({store, userId, handleUpload}: StoreListItemProps) => {
  const isUploadDone = store.store_visits?.find(obj => obj.userId === userId);

  const handlePress = () => {
    console.log(store);
  };

  const onUpload = () => handleUpload(store, !!isUploadDone);

  return (
    <Pressable
      onPress={handlePress}
      style={{
        borderWidth: 1,
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
      }}>
      <View>
        <Text>{store.name}</Text>
        <Text>{store.type}</Text>
      </View>
      <Pressable onPress={onUpload}>
        <Text>{!isUploadDone ? 'Upload' : 'Site Visit Done'}</Text>
      </Pressable>
    </Pressable>
  );
};

export default StoreListItem;

const styles = StyleSheet.create({});
