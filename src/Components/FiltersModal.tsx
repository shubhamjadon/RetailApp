import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {FilterType, SelectedFilterType} from '../Constants/model';

interface FiltersModalProps {
  visible: boolean;
  closeModal: () => void;
  filtersArr: FilterType[];
  setFilters: Dispatch<SetStateAction<SelectedFilterType[] | undefined>>;
}

const FiltersModal = ({
  visible,
  closeModal,
  filtersArr,
  setFilters,
}: FiltersModalProps) => {
  if (!filtersArr?.length) {
    return null;
  }

  const handleSubmit = () => {
    setFilters([
      {
        filter: 'area',
        selectedOption: 'Koramangla',
      },
      {
        filter: 'type',
        selectedOption: 'General Store',
      },
      {
        filter: 'route',
        selectedOption: 'r4',
      },
    ]);
  };

  const handleReset = () => {
    setFilters(undefined);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}>
        <Pressable style={styles.container} onPress={closeModal}>
          <Pressable style={styles.modalView}>
            {filtersArr.map(filterObj => (
              <View key={filterObj.filterKey}>
                <Text>{filterObj.filterLabel}</Text>
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={handleReset}>
                <Text style={styles.buttonText}>Reset</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}>
                <Text style={[styles.buttonText, styles.submitButtonText]}>
                  Submit
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default FiltersModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: 'blue',
  },
});
