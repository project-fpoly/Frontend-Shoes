import React, { CSSProperties } from 'react'
import { Input, Tooltip } from 'antd'

interface NumericInputProps {
  value: string
  onChange: (value: string) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  style?: CSSProperties
  disabled?: boolean
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value)

const NumericInput: React.FC<NumericInputProps> = (props) => {
  const { value, onChange, min, max, step, placeholder, style } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if (
      (reg.test(inputValue) || inputValue === '' || inputValue === '-') &&
      (!max || parseFloat(inputValue) <= max) && // Kiểm tra giá trị nhập không vượt quá max nếu max tồn tại
      (!min || parseFloat(inputValue) >= min) // Kiểm tra giá trị nhập không nhỏ hơn min nếu min tồn tại
    ) {
      onChange(inputValue)
    }
  }

  const handleBlur = () => {
    let valueTemp = value
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1)
    }
    if (max && parseFloat(valueTemp) > max) {
      // Kiểm tra max tồn tại trước khi sử dụng nó
      onChange(max.toString())
    } else if (min && parseFloat(valueTemp) < min) {
      // Kiểm tra min tồn tại trước khi sử dụng nó
      onChange(min.toString())
    } else {
      onChange(valueTemp.replace(/0*(\d+)/, '$1'))
    }
  }

  const title = value ? (
    <span className="numeric-input-title">
      {value !== '-' ? formatNumber(parseFloat(value)) : '-'}
    </span>
  ) : (
    placeholder || 'Input a number'
  )

  return (
    <Tooltip
      trigger={['focus']}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder || 'Input a number'}
        maxLength={16}
        min={min}
        max={max}
        step={step}
        style={style} // Sử dụng style từ props
      />
    </Tooltip>
  )
}

export default NumericInput
