import React from 'react';
import { Input, Tooltip } from 'antd';

interface NumericInputProps {
    value: string;
    onChange: (value: string) => void;
    min?: number;
    max?: number; 
    step?: number;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput: React.FC<NumericInputProps> = (props) => {
    const { value, onChange, min, max, step } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };

    const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(parseFloat(value)) : '-'}</span>
    ) : (
        'Input a number'
    );

    return (
        <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
            <Input
                {...props}
                type="number" // Sử dụng type "number" để hiển thị các tính năng min, max, và step
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Input a number"
                maxLength={16}
                min={min} 
                max={max} 
                step={step} 
            />
        </Tooltip>
    );
};

export default NumericInput;
