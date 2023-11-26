import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {IndexPath, Select as RNSelect, SelectItem} from '@ui-kitten/components';

interface SelectProps {
  label: string;
  selectedIndex: number;
  setSelectedIndex: (newIndex: number) => void;
  options: string[];
}

const Select = ({
  label,
  selectedIndex,
  setSelectedIndex,
  options,
}: SelectProps) => {
  const selectedIndexPath = useMemo(() => {
    return new IndexPath(selectedIndex);
  }, [selectedIndex]);

  const onChange = (index: IndexPath | IndexPath[]) => {
    const currIndex = index as IndexPath;
    setSelectedIndex(currIndex.row);
  };

  return (
    <RNSelect
      label={label}
      selectedIndex={selectedIndexPath}
      value={options[selectedIndex]}
      onSelect={onChange}
      style={styles.container}>
      {options.map(option => (
        <SelectItem key={option} title={option} />
      ))}
    </RNSelect>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    minHeight: 96,
  },
});
