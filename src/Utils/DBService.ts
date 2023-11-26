import firestore from '@react-native-firebase/firestore';
import {
  FilterType,
  SelectedFilterType,
  StoreType,
  UserInfoType,
} from '../Constants/model';
import {useRef} from 'react';

class DBService {
  #UsersCollection = firestore().collection('usersTemp');
  #StoresCollection = firestore().collection('storeTemp');
  #FiltersCollection = firestore().collection('filters');
  #userDetails?: UserInfoType;
  #storesList?: StoreType[];
  #filterTypesList?: FilterType[];

  async getUserData(userId: string): Promise<UserInfoType> {
    const userQuery = await this.#UsersCollection.doc(userId).get();
    const userData = userQuery.data() as UserInfoType;

    this.#userDetails = userData;

    return userData;
  }

  async getStoresData(storesIDArray: string[]): Promise<StoreType[]> {
    const storesPromises = storesIDArray.map(async storeId => {
      const storeDoc = await this.#StoresCollection.doc(storeId).get();
      return storeDoc.data();
    });
    const stores = (await Promise.all(storesPromises)) as StoreType[];

    this.#storesList = stores;

    return stores;
  }

  async getFilters() {
    const snapshot = await this.#FiltersCollection.get();
    const filterTypesArr: FilterType[] = [];
    snapshot.forEach(doc => {
      filterTypesArr.push(doc.data() as FilterType);
    });

    this.#filterTypesList = filterTypesArr;

    return filterTypesArr;
  }

  searchStore(searchString: string) {
    if (!searchString) {
      return this.#storesList;
    }

    const filteredStoreList: StoreType[] = [];
    this.#storesList?.forEach(store => {
      if (store.name?.toLowerCase().includes(searchString?.toLowerCase())) {
        filteredStoreList.push(store);
      }
    });

    return filteredStoreList;
  }

  filterStore(filters?: SelectedFilterType[]) {
    if (!filters) {
      return this.#storesList;
    }

    const filteredStoreList: StoreType[] = [];
    let matchCount = 0;
    this.#storesList?.forEach(store => {
      matchCount = 0;
      filters.forEach(filterObj => {
        if (store[filterObj.filter] === filterObj.selectedOption) {
          matchCount += 1;
        }
      });
      if (matchCount === filters.length) {
        filteredStoreList.push(store);
      }
    });

    return filteredStoreList;
  }
}

const dbSevice = new DBService();

export const useDBService = () => {
  const db = useRef(dbSevice);

  return db.current;
};

export default DBService;
