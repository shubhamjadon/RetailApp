import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {FilterType, SelectedFilterType} from '../Constants/model';
import Select from './Select';
import {Button} from '@ui-kitten/components';

interface FiltersModalProps {
  visible: boolean;
  closeModal: () => void;
  filtersArr: FilterType[];
  setFilters: Dispatch<SetStateAction<SelectedFilterType[] | undefined>>;
}

interface SelectedFiltersType {
  filterKey: string;
  selectedIndex: number;
}

const FiltersModal = ({
  visible,
  closeModal,
  filtersArr,
  setFilters,
}: FiltersModalProps) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType[]>(
    [],
  );

  useEffect(() => {
    const arr: any = [];
    filtersArr.forEach(filterObj => {
      arr.push({
        filterKey: filterObj.filterKey,
        selectedIndex: 0 as number,
      });
    });

    setSelectedFilters(arr);
  }, [filtersArr]);

  const handleSubmit = () => {
    const selectedFiltersArr: any = [];
    selectedFilters?.forEach((obj, index) => {
      if (obj.selectedIndex) {
        selectedFiltersArr.push({
          filter: obj.filterKey,
          selectedOption:
            filtersArr[index].filterOptions[obj.selectedIndex - 1],
        });
      }
    });
    setFilters(selectedFiltersArr);
  };

  const handleReset = () => {
    setFilters(undefined);

    const arr: any = [];
    filtersArr.forEach(filterObj => {
      arr.push({
        filterKey: filterObj.filterKey,
        selectedIndex: 0 as number,
      });
    });

    setSelectedFilters(arr);
  };

  const changeSelectedFilters = (index: number, selectedIndex: number) => {
    const newArr = [...selectedFilters];
    newArr[index].selectedIndex = selectedIndex;

    setSelectedFilters(newArr);
  };

  if (!selectedFilters?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}>
        <Pressable style={styles.container} onPress={closeModal}>
          <Pressable style={styles.modalView}>
            {filtersArr.map((filterObj, index) => (
              <Select
                key={filterObj.filterKey}
                label={filterObj.filterLabel}
                options={['Select', ...filterObj.filterOptions]}
                selectedIndex={selectedFilters[index].selectedIndex}
                setSelectedIndex={newIndex =>
                  changeSelectedFilters(index, newIndex)
                }
              />
            ))}
            <View style={styles.buttonContainer}>
              <Button appearance="ghost" onPress={handleReset}>
                Reset
              </Button>
              <Button appearance="filled" onPress={handleSubmit}>
                Submit
              </Button>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
