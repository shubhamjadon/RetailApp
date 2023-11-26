import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StoreListItem from '../Components/StoreListItem';
import {FilterType, SelectedFilterType, StoreType} from '../Constants/model';
import {useLogin} from '../Providers/LoginProvider';
import {useDBService} from '../Utils/DBService';
import FiltersModal from '../Components/FiltersModal';

const Home = () => {
  const {userData, logout} = useLogin();
  const db = useDBService();
  const [storesList, setStoresList] = useState<StoreType[]>([]);
  const [searchString, setSearchString] = useState('');
  const [filtersArr, setFiltersArr] = useState<FilterType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SelectedFilterType[] | undefined>();

  const userId = userData!.uid;

  const fetchStoresData = async () => {
    const userDetails = await db.getUserData(userId);
    const storesArr = await db.getStoresData(userDetails.stores);

    setStoresList(storesArr);
  };

  const fetchFilters = async () => {
    const filters = await db.getFilters();

    setFiltersArr(filters);
  };

  useEffect(() => {
    fetchStoresData();
    fetchFilters();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchString);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchString]);

  useEffect(() => {
    const filteredStoreList = db.filterStore(filters);
    setStoresList(filteredStoreList || []);
  }, [filters]);

  const handleSearch = (searchStr: string) => {
    const filteredStoreList = db.searchStore(searchStr);

    setStoresList(filteredStoreList || []);
  };

  const handleShowFilters = () => setShowFilters(true);

  const handleLogout = () => logout();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Home</Text>
        <Pressable onPress={handleLogout}>
          <Text>Logout</Text>
        </Pressable>
      </View>
      <TextInput onChangeText={setSearchString} placeholder="Search" />
      <Pressable onPress={handleShowFilters}>
        <Text>Filters</Text>
      </Pressable>
      <FlatList
        data={storesList}
        renderItem={({item}) => (
          <StoreListItem store={item} userId={userId} handleUpload={() => {}} />
        )}
        keyExtractor={item => item.id}
      />
      <FiltersModal
        visible={showFilters}
        closeModal={() => setShowFilters(false)}
        filtersArr={filtersArr}
        setFilters={setFilters}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
