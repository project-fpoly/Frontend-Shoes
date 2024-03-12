import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import axios from 'axios';

const UploadImage = ({ value, onChange }: any) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handleFileChange = (info: any) => {
    const files = Array.from(info.fileList.map((file:any) => file.originFileObj));
    setFileList(files);
    onChange(files); // Gọi hàm onChange của prop cha để cập nhật giá trị
  };

  const uploadFiles = async (files: any) => {
    const CLOUD_NAME = 'dxspp5ba5';
    const PRESET_NAME = 'upload';
    const FOLDER_NAME = 'Upload';
    const urls = [];
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    for (const file of files) {
      const formData = new FormData();
      formData.append('upload_preset', PRESET_NAME);
      formData.append('folder', FOLDER_NAME);
      formData.append('file', file);

      try {
        const response = await axios.post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        urls.push(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Failed to upload image');
      }
    }

    console.log(urls);
    message.success('Images uploaded successfully!');
  };

  return (
    <div>
      <Upload
        multiple
        beforeUpload={() => false}
        fileList={fileList.map((file, index) => ({
          uid: String(index),
          name: file.name,
          status: 'done',
        }))}
        onChange={handleFileChange}
      >
        <Button>Chọn ảnh</Button>
      </Upload>
    </div>
  );
};

export default UploadImage;