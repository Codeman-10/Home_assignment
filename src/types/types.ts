import { ProductItem } from "../services/api.types";

export interface FilterDataProps {
  product: string[];
  category: string;
  data: ProductItem[];
}

export type FilterProps = {
  filterData: FilterDataProps;
  handleFilteredData: (
    data: ProductItem[],
    filterCriteria: FilterCriteriaProps
  ) => void;
};

export type FilterCriteriaProps = {
  product: string[];
  category: string;
};
