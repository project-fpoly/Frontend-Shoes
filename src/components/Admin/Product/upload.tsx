import React, { useState } from 'react';
import { Button, Upload } from 'antd';

const UploadImage = ({ value, onChange }: any) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handleFileChange = (info: any) => {
    const files = info.fileList.map((file: any) => file.originFileObj) as File[];
    setFileList(files);
    onChange(files);
  }

  const handleRemove = (file: any) => {
    const updatedFileList = fileList.filter((item) => item?.uid !== file?.uid);
    setFileList([...updatedFileList]);
    onChange(updatedFileList);
  };
  return (
    <Upload
      multiple
      beforeUpload={() => false}
      fileList={fileList.map((file, index) => ({
        uid: String(index),
        name: file?.name,
        status: 'done',
      }))}
      onRemove={handleRemove}
      onChange={handleFileChange}
    >
      <Button>Chọn ảnh</Button>
    </Upload>
  );
};

export default UploadImage;