import { useState, useEffect } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Collapse, Radio, Button, RadioChangeEvent } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { IStateProduct } from "../../../common/redux/type";
import { getProductsWithFilters } from "../../../features/product";

const { Panel } = Collapse;

const sortOptions = [
    { label: "Tăng dần theo giá bán", value: "asc" },
    { label: "Giảm dần theo giá bán", value: "desc" },
    { label: "Tăng dần theo lượt xem", value: "asc_views" },
    { label: "Giảm dần theo lượt xem", value: "desc_views" },
    { label: "Tăng dần theo số lượng bán", value: "asc_sold" },
    { label: "Giảm dần theo số lượng bán", value: "desc_sold" },
    { label: "Tăng dần theo giảm giá", value: "asc_sale" },
    { label: "Giảm dần theo giảm giá", value: "desc_sale" },
    { label: "Tăng dần theo đánh giá", value: "asc_rate" },
    { label: "Giảm dần theo đánh giá", value: "desc_rate" },
];

interface FilterProps {
    page: number;
    searchKeyword: string;
}

const Filter = (props: FilterProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: IStateProduct) => state.product);

    const [selectedSort, setSelectedSort] = useState<
        "asc" | "desc" | "asc_views" | "desc_views" | "asc_sold" | "desc_sold" | "asc_sale" | "desc_sale" | "asc_rate" | "desc_rate" | undefined
    >();

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const handleToggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleSortChange = (e: RadioChangeEvent) => {
        setSelectedSort(e.target.value as "asc" | "desc" | "asc_views" | "desc_views" | "asc_sold" | "desc_sold" | "asc_sale" | "desc_sale" | "asc_rate" | "desc_rate");
    };

    const handleResetFilter = () => {
        setSelectedSort(undefined);
    };

    useEffect(() => {
        const handleFilter = () => {
            const filters = {
                page: props.page,
                pageSize: 10,
                searchKeyword: props.searchKeyword,
                sort: selectedSort,
            };
            dispatch(getProductsWithFilters(filters));
        };

        handleFilter();
    }, [dispatch, selectedSort, props.page, props.searchKeyword]);


    return (
        <Collapse defaultActiveKey={["0"]}>
            <Panel
                header={
                    <span onClick={handleToggleFilter}>
                        <FilterOutlined /> Bộ lọc
                    </span>
                }
                key="1"
            >

                <Radio.Group options={sortOptions} onChange={handleSortChange} value={selectedSort} />

                <Button onClick={handleResetFilter} loading={loading === "pending"}>
                    Reset
                </Button>
            </Panel>
        </Collapse>
    );
};

export default Filter;