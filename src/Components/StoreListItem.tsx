import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {StoreType} from '../Constants/model';
import CameraModal from './CameraModal';
import {Button, Icon, ListItem} from '@ui-kitten/components';

interface StoreListItemProps {
  store: StoreType;
  userId: string;
}

const StoreListItem = ({store, userId}: StoreListItemProps) => {
  const [isUploadDone, setIsUploadDone] = useState(
    () => !!store.store_visits?.find(obj => obj.userId === userId),
  );
  const [showCamera, setShowCamera] = useState(false);

  const onUpload = () => {
    setShowCamera(true);
  };

  const renderItemAccessory = (): React.ReactElement => {
    if (isUploadDone) {
      return <Icon name="checkmark-circle-outline" style={styles.icon} />;
    }
    return (
      <Button size="small" onPress={onUpload}>
        Upload
      </Button>
    );
  };

  return (
    <>
      <ListItem
        title={store.name}
        description={store.type}
        accessoryRight={renderItemAccessory}
      />
      <CameraModal
        visible={showCamera}
        closeModal={() => setShowCamera(false)}
        onUploadDone={() => setIsUploadDone(true)}
        storeId={store.id}
        userId={userId}
      />
    </>
  );
};

export default StoreListItem;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
