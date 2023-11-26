import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import StoreListItem from '../Components/StoreListItem';
import {FilterType, SelectedFilterType, StoreType} from '../Constants/model';
import {useLogin} from '../Providers/LoginProvider';
import {useDBService} from '../Utils/DBService';
import FiltersModal from '../Components/FiltersModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Icon,
  IconElement,
  Input,
  List,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const Home = () => {
  const {userData, logout} = useLogin();
  const db = useDBService();
  const [storesList, setStoresList] = useState<StoreType[]>([]);
  const [searchString, setSearchString] = useState('');
  const [filtersArr, setFiltersArr] = useState<FilterType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SelectedFilterType[] | undefined>();

  const userId = userData?.uid;

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

  const renderLogoutAction = (): React.ReactElement => (
    <TopNavigationAction icon={LogoutIcon} onPress={logout} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title="Home" accessoryRight={renderLogoutAction} />
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Input
            style={styles.flex1}
            placeholder="Search store..."
            onChangeText={setSearchString}
          />
          <Pressable onPress={handleShowFilters}>
            <Icon name="options-2-outline" style={styles.filterIcon} />
          </Pressable>
        </View>
        {!storesList?.length && <Text>Loading</Text>}
        <List
          // style={styles.container}
          data={storesList}
          renderItem={({item}) => (
            <StoreListItem store={item} userId={userId} />
          )}
        />
      </View>
      <FiltersModal
        visible={showFilters}
        closeModal={() => setShowFilters(false)}
        filtersArr={filtersArr}
        setFilters={setFilters}
      />
    </SafeAreaView>
  );
};

const LogoutIcon = (props): IconElement => (
  <Icon {...props} name="power-outline" />
);

export default Home;

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  flex1: {flex: 1},
  button: {},
  filterIcon: {width: 24, height: 24, marginLeft: 8},
});
