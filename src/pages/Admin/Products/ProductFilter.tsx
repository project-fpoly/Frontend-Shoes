import { useState, useEffect } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Collapse, Radio, Button, RadioChangeEvent, Drawer, FloatButton, Input, DatePicker, Flex, Select, Slider, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { IStateCategory, IStateProduct } from "../../../common/redux/type";
import { getProductsWithFilters } from "../../../features/product";
import NumericInput from "../../../components/Admin/Product/input";
import { fetchAllCategories } from "../../../features/category";
const { Panel } = Collapse;
const { Option } = Select;

const sortOptions = [
  { label: 'Tăng dần theo giá bán', value: 'asc' },
  { label: 'Giảm dần theo giá bán', value: 'desc' },
  { label: 'Tăng dần theo lượt xem', value: 'asc_views' },
  { label: 'Giảm dần theo lượt xem', value: 'desc_views' },
  { label: 'Tăng dần theo số lượng bán', value: 'asc_sold' },
  { label: 'Giảm dần theo số lượng bán', value: 'desc_sold' },
  { label: 'Tăng dần theo đánh giá', value: 'asc_rate' },
  { label: 'Giảm dần theo đánh giá', value: 'desc_rate' },
  { label: 'Tăng dần theo ngày tạo', value: 'asc_createdAt' },
  { label: 'Giảm dần theo ngày tạo', value: 'desc_createdAt' },
];

interface FilterProps {
  page: number;
  pageSize: number;
  searchKeyword: string;
}

const Filter = (props: FilterProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: IStateProduct) => state.product);
  useEffect(() => {
    dispatch(fetchAllCategories({ page: 1, limit: 1000, keyword: '' }));
  }, [dispatch]);
  const { categories } = useSelector((state: IStateCategory) => state.category);
  //Size
  const [selectedSort, setSelectedSort] = useState<
    | 'asc'
    | 'desc'
    | 'asc_views'
    | 'desc_views'
    | 'asc_sold'
    | 'desc_sold'
    | 'asc_sale'
    | 'desc_sale'
    | 'asc_rate'
    | 'desc_rate'
    | 'asc_createdAt'
    | 'desc_createdAt'
    | undefined
  >();
  //Size
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  //Price
  const [selectedMinPrice, setSelectedMinPrice] = useState<string>('');
  const handleMinPriceChange = (minPrice: string) => {
    setSelectedMinPrice(minPrice);
    if (minPrice === '' && selectedMaxPrice !== undefined) {
      setSelectedMaxPrice('');
    }
  };

  const [selectedMaxPrice, setSelectedMaxPrice] = useState<string>('');

  const handleMaxPriceChange = (maxPrice: string) => {
    setSelectedMaxPrice(maxPrice);
  };
  //Material
  const [selectedMaterial, setSelectedMaterial] = useState<string | undefined>();
  const materialsOptions = [
    { label: "Leather", value: "Leather" },
    { label: "Fabric", value: "Fabric" },
    { label: "Rubber", value: "Rubber" },
    { label: "Plastic", value: "Plastic" },
    { label: "Velvet", value: "Velvet" },
    { label: "EVA", value: "EVA" },
    { label: "Mesh", value: "Mesh" },
  ];
  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
  };
  //Color
  const [selectedColor, setSelectedColor] = useState(''); // Màu mặc định được chọn
  const handleColorChange = (e: any) => {
    setSelectedColor(e.target.value); // Cập nhật màu khi người dùng chọn
  };
  //Gender
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };
  //category
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  //Delete
  const [currentStep, setCurrentStep] = useState<number>(0);
  const onChange = (current: number) => {
    setCurrentStep(current);
    handleDeletedChange(current === 0 ? "" : current === 1 ? false : true);
  };
  const [isDeleted, setIsDeleted] = useState<boolean | string>("");
  const handleDeletedChange = (deleted: boolean | string) => {
    setIsDeleted(deleted);
  };
//Sale
  //Gender
  const [selectedPriceSale, setSelectedPriceSale] = useState<number | string>("");
  const handlePriceSaleChange = (priceSale: number | string) => {
    setSelectedPriceSale(priceSale);
  };

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showFloatButton, setShowFloatButton] = useState<boolean>(true);

  const handleToggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSortChange = (e: RadioChangeEvent) => {
    setSelectedSort(e.target.value as
      | 'asc'
      | 'desc'
      | 'asc_views'
      | 'desc_views'
      | 'asc_sold'
      | 'desc_sold'
      | 'asc_rate'
      | 'desc_rate'
    );
  };
  const handleResetFilter = () => {
    setSelectedSort(undefined);
    setSelectedSize(undefined);
    setSelectedMinPrice('');
    setSelectedMaxPrice('');
    setSelectedMaterial(undefined);
    setSelectedColor('');
    setSelectedGender(undefined);
    setIsDeleted("");
    setSelectedCategory("")
    setCurrentStep(0);
    setSelectedPriceSale("")

  };

  useEffect(() => {
    const handleFilter = () => {
      const filters = {
        page: props.page,
        pageSize: props.pageSize,
        searchKeyword: props.searchKeyword,
        sort: selectedSort,
        categoryId: selectedCategory,
        size: selectedSize,
        minPrice: selectedMinPrice,
        maxPrice: selectedMaxPrice,
        material: selectedMaterial,
        color: selectedColor,
        gender: selectedGender,
        isDeleted: isDeleted,
        priceSale: selectedPriceSale,
      };

      dispatch(getProductsWithFilters(filters));
    };

    handleFilter();
  }, [
    dispatch,
    selectedSort,
    selectedCategory,
    selectedSize,
    selectedMinPrice,
    selectedMaxPrice,
    selectedMaterial,
    selectedColor,
    selectedGender,
    isDeleted,
    selectedPriceSale,
    props.page,
    props.pageSize,
    props.searchKeyword,

  ]);
  useEffect(() => {
    setShowFloatButton(!showFilter);
  }, [showFilter]);

  return (
    <>
      {showFloatButton && (
        <FloatButton
          onClick={handleToggleFilter}
          shape="square"
          type="primary"
          style={{
            position: "fixed",
            top: `calc(25vh - 25px)`, // 3/4 chiều cao bên dưới của trình duyệt
            right: 44,
            height: 25
          }}
          icon={<FilterOutlined />}
        />

      )}
      <Drawer
        title="Bộ lọc"
        open={showFilter}
        onClose={handleToggleFilter}
        footer={[
          <Button key="reset" onClick={handleResetFilter} loading={loading === "pending"}>
            Reset
          </Button>,
        ]}
      >
        <Collapse defaultActiveKey={["0"]}>
          <Panel header="Sắp xếp" key="1">
            <Radio.Group options={sortOptions} onChange={handleSortChange} value={selectedSort} />
          </Panel>
          <Panel header="Kích thước" key="2">
            <Slider
              min={36}
              max={42}
              onChange={(value) => handleSizeChange(value.toString())}
              value={parseInt(selectedSize || '36')}
              marks={{
                36: '36',
                37: '37',
                38: '38',
                39: '39',
                40: '40',
                41: '41',
                42: '42',
              }}
            />
          </Panel>
          <Panel header="Khoảng giá" key="3">
            <Input.Group compact>
              <NumericInput
                placeholder="Min Price"
                style={{ width: '50%' }}
                value={selectedMinPrice}
                onChange={handleMinPriceChange}
                min={0}
                max={20000000}
                step={10000}
              />
              <NumericInput
                placeholder="Max Price"
                style={{ width: '50%' }}
                value={selectedMaxPrice}
                onChange={handleMaxPriceChange}
                min={parseInt(selectedMinPrice) || 0} // Sử dụng selectedMinPrice nếu tồn tại, ngược lại sử dụng 500000
                max={20000000}
                step={300000}

              />
            </Input.Group>
          </Panel>
          <Panel header="Chất liệu" key="4">
            <Radio.Group options={materialsOptions} onChange={e => handleMaterialChange(e.target.value)} value={selectedMaterial} />
          </Panel>

          <Panel header="Màu sắc" key="5">
            <Radio.Group onChange={handleColorChange} value={selectedColor}>
              <Radio.Button value="red" style={{ backgroundColor: 'red' }}></Radio.Button>
              <Radio.Button value="green" style={{ backgroundColor: 'green' }}></Radio.Button>
              <Radio.Button value="blue" style={{ backgroundColor: 'blue' }}></Radio.Button>
              <Radio.Button value="yellow" style={{ backgroundColor: 'yellow' }}></Radio.Button>
              <Radio.Button value="black" style={{ backgroundColor: 'black' }}></Radio.Button>
              <Radio.Button value="white" style={{ backgroundColor: 'white', border: '1px solid #ccc' }}></Radio.Button>
            </Radio.Group>
          </Panel>
          <Panel header="Giới tính" key="6">
            <Radio.Group onChange={(e) => handleGenderChange(e.target.value)} value={selectedGender}>
              <Radio.Button value="nam">Nam</Radio.Button>
              <Radio.Button value="nữ">Nữ</Radio.Button>
            </Radio.Group>
          </Panel>

          <Panel header="Danh mục" key="7">
            <Select
              placeholder="Chọn danh mục"
              onChange={handleCategoryChange}
              value={selectedCategory}
              style={{ width: 200 }}
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Panel>
          <Panel header={<span style={{ color: 'red', fontWeight: 'bold' }}>Đã đánh dấu xóa</span>} key="8">
            <Steps current={currentStep} onChange={onChange} size="small">
              <Steps.Step title="Tất cả" />
              <Steps.Step title="Chưa xóa" />
              <Steps.Step title="Đã xóa" />
            </Steps>
          </Panel>
      
          <Panel header="Giảm giá" key="9">
            <Radio.Group onChange={(e) => handlePriceSaleChange(e.target.value)} value={selectedGender}>
              <Radio.Button value="1">Có Sale</Radio.Button>
              <Radio.Button value="0">Không có Sale</Radio.Button>
              <Radio.Button value="">Tất cả</Radio.Button>
            </Radio.Group>
          </Panel>



        </Collapse>
      </Drawer>
    </>
  );
};

export default Filter;
