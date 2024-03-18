import React, { useState } from 'react';
import UploadImage from '../Product/upload';
import axios from 'axios';
import { message, Modal, Button } from 'antd';

interface ParentComponentProps {
    name: string;
}

const ParentComponent: React.FC<ParentComponentProps> = ({ name }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (files: File[]) => {
        setSelectedFiles(files);
    };

    const handleUpload = async (files: File[]) => {
        const CLOUD_NAME = 'dxspp5ba5';
        const PRESET_NAME = 'upload';
        const FOLDER_NAME = 'Upload';
        const urls: string[] = [];
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
        return urls;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedFiles.length === 0) {
            // Xử lý khi không có file được chọn
            return;
        }

        try {
            setProcessing(true);

            console.log(selectedFiles);
            const urls = await handleUpload(selectedFiles);
            name(urls);
        } catch (error) {
            console.error('Error during file upload:', error);
        } finally {
            setProcessing(false);
        }
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={handleOpenModal}>
                Mở form
            </Button>
            <Modal
                title="Upload ảnh"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Ảnh</label>
                        <UploadImage value={selectedFiles} onChange={handleFileChange} />
                    </div>
                    <Button type="primary" htmlType="submit" disabled={processing}>
                        {processing ? 'Đang tải lên...' : 'Tải lên'}
                    </Button>
                </form>
            </Modal>
        </>
    );
};

export default ParentComponent;