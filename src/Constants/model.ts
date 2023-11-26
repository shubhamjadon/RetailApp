export interface UserInfoType {
  id: string;
  name: string;
  stores: string[];
}

export interface StoreVisitType {
  userId: string;
  images: string[];
  visitTime: string;
}

export interface StoreType {
  id: string;
  type: string;
  name: string;
  route: string;
  area: string;
  address: string;
  store_visits?: StoreVisitType[];
}

export interface FilterType {
  filterLabel: string;
  filterKey: string;
  filterOptions: string[];
}

export interface SelectedFilterType {
  filter: string;
  selectedOption: string;
}
