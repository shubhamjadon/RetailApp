import {Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, CameraType} from 'react-native-camera-kit';
import {useDBService} from '../Utils/DBService';
import {Button, Icon, Spinner} from '@ui-kitten/components';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const CameraModal = ({
  visible,
  closeModal,
  onUploadDone,
  storeId,
  userId,
}: any) => {
  const db = useDBService();
  const cameraRef = useRef<any>();
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (imageUri) {
      setShowUploadButton(true);
    }
  }, [imageUri]);

  const takePhoto = async () => {
    const {uri} = await cameraRef.current?.capture?.();

    setImageUri(uri);
  };

  const handleUpload = async () => {
    if (imageUri) {
      setShowLoader(true);
      await db.uploadImage(imageUri, storeId, userId);
      setShowLoader(false);
      handleCloseModal();
      onUploadDone();
    }
  };

  const handleDiscard = () => {
    setImageUri(undefined);
    setShowUploadButton(false);
  };

  const handleCloseModal = () => {
    handleDiscard();
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={handleCloseModal}>
        <View style={styles.cameraContainer}>
          <Camera
            style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}
            ref={ref => (cameraRef.current = ref)}
            cameraType={CameraType.Back} // front/back(default)
            flashMode="auto"
          />
          <View style={StyleSheet.absoluteFill}>
            <Pressable
              onPress={handleCloseModal}
              style={styles.closeIconContainer}>
              <Icon name="close-circle-outline" style={styles.closeIcon} />
            </Pressable>
            {!showUploadButton ? (
              <Pressable
                onPress={takePhoto}
                style={({pressed}) => [
                  {opacity: pressed ? 0.5 : 0.8},
                  styles.captureButton,
                ]}
              />
            ) : (
              <View style={styles.actionRowContainer}>
                <Button appearance="ghost" onPress={handleDiscard}>
                  Discard
                </Button>
                <Button appearance="filled" onPress={handleUpload}>
                  Upload
                </Button>
              </View>
            )}

            {showLoader && (
              <View style={styles.spinnerContainer}>
                <View style={styles.spinnerInCenter}>
                  <Spinner size="large" />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cameraContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeIcon: {
    height: 64,
    width: 64,
  },
  captureButton: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 72,
    backgroundColor: 'black',
    top: SCREEN_HEIGHT - 2 * 72,
    left: SCREEN_WIDTH / 2 - 72 / 2,
  },
  closeButton: {},
  actionRowContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    top: SCREEN_HEIGHT - 2 * 64,
  },
  spinnerContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'transparent',
  },
  spinnerInCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
