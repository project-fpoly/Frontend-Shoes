import React, { useState } from 'react';
import UploadImage from '../Product/upload';
import axios from 'axios';
import { message } from 'antd';

const ParentComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (files:any) => {
        setSelectedFiles(files);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        // Xử lý logic khi submit form
        console.log(selectedFiles);
        uploadFiles(selectedFiles)
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Ảnh</label>
                <UploadImage value={selectedFiles} onChange={handleFileChange} />
            </div>
            <button type="submit">Tải lên</button>
        </form>
    );
};

export default ParentComponent;