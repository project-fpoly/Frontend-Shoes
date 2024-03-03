import { useState, useEffect } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Collapse, Checkbox, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { IStateProduct } from "../../../common/redux/type";
import { getProductsWithFilters } from "../../../features/product";

const { Panel } = Collapse;

const sortOptions = [
    { label: "Tăng dần", value: "asc" },
    { label: "Giảm dần", value: "desc" },
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
    const { loading } = useSelector(
        (state: IStateProduct) => state.product
    );

    const [selectedSorts, setSelectedSorts] = useState<Array<"asc" | "desc" | "asc_views" | "desc_views" | "asc_sold" | "desc_sold" | "asc_sale" | "desc_sale" | "asc_rate" | "desc_rate">>([]);

    const handleSortChange = (checkedValues: string[]) => {
        setSelectedSorts(checkedValues as Array<
            "asc" | "desc" | "asc_views" | "desc_views" | "asc_sold" | "desc_sold" | "asc_sale" | "desc_sale" | "asc_rate" | "desc_rate"
        >);
    };


    const handleResetFilter = () => {
        setSelectedSorts([]);

    };


    useEffect(() => {
        const handleFilter = () => {
            const filters = {
                page: props.page,
                pageSize: 10,
                searchKeyword: props.searchKeyword,
                sort: selectedSorts.length > 0 ? selectedSorts[0] : undefined,
            };
            dispatch(getProductsWithFilters(filters));
        };

        handleFilter();
    }, [dispatch, selectedSorts, props.page, props.searchKeyword]);
    return (
        <Collapse defaultActiveKey={["1"]}>
            <Panel
                header={
                    <span>
                        <FilterOutlined /> Bộ lọc
                    </span>
                }
                key="1"
            >
                <Checkbox.Group options={sortOptions} onChange={handleSortChange} value={selectedSorts} />
                <Button onClick={handleResetFilter} loading={loading === 'pending'}>Reset</Button>
            </Panel>
        </Collapse>
    );
};
export default Filter;