import BasicSelect from "../BasicSelect";
import Button from "@mui/material/Button";
import { useEffect, useMemo, useRef, useState } from "react";

import { SelectChangeEvent } from "@mui/material/Select";
import { ProductItem } from "../../services/api.types";
import { FilterDataProps } from "../../types/types";
import {
  getProductListByCategory,
} from "../../services/api";
import { FilterWrapper } from "./Filter.style";
import MultipleSelect from "../MutipleSelect";

export type FilterProps = {
  filterData: FilterDataProps;
  categoryList: string[];
  handleFilter: (
    data: ProductItem[],
    filterCriteria: FilterCriteriaProps
  ) => void;
};
export type FilterCriteriaProps = {
  product: string[];
  category: string;
};

const Filter: React.FC<FilterProps> = ({ categoryList, handleFilter }) => {
  const [productList, setProductList] = useState<string[] | []>([]);
  const [productData, setProductData] = useState<ProductItem[] | []>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteriaProps>({
    product: [],
    category: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const previousFilterCriteria = useRef<FilterCriteriaProps>(filterCriteria);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const result = await getProductListByCategory(filterCriteria.category);
        setProductData(result);
        setProductList(result.map((item: ProductItem) => item.title));
      } catch (err) {
        console.log("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (filterCriteria.category) {
      getProductList();
    }
  }, [filterCriteria.category]);

  const filteredResult = useMemo(() => {
    if (filterCriteria.product.length > 0) {
      return productData.filter((item: ProductItem) =>
        filterCriteria.product.includes(item.title)
      );
    }
    return productData;
  }, [filterCriteria.product, productData]);

  const handleProductChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFilterCriteria((prev: FilterCriteriaProps) => ({
      ...prev,
      product: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setFilterCriteria((prev: FilterCriteriaProps) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  const handleClear = () => {
    const reset = {
      category: "",
      product: [],
    };
    setFilterCriteria(reset);
    handleFilter([], reset);
    previousFilterCriteria.current = reset;
  };
  return (
    <>
      <FilterWrapper>
        <div className="header">
          <p>Filters</p>
          <p onClick={handleClear}>clear</p>
        </div>
        <div className="search_wrapper">
          <BasicSelect
            options={categoryList}
            label={"Category"}
            selected={filterCriteria.category}
            id={"categoryList1"}
            handleChange={handleCategoryChange}
          />
          <MultipleSelect
            options={productList}
            label={"Product"}
            disabled={filterCriteria.category === "" || loading}
            selected={filterCriteria.product}
            id={"productList1"}
            handleChange={handleProductChange}
          />
        </div>
        <Button
          onClick={() => {
            if (
              JSON.stringify(filterCriteria) ===
              JSON.stringify(previousFilterCriteria.current)
            ) {
              return;
            }
            handleFilter(filteredResult, filterCriteria);

            previousFilterCriteria.current = filterCriteria;
          }}
          className="filter-btn"
          variant="contained"
          disabled={filterCriteria.category === "" || loading}
        >
          Run Report
        </Button>
      </FilterWrapper>
    </>
  );
};

export default Filter;
