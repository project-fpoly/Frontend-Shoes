import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { Cloudinary } from "cloudinary-core";
import axios from "axios";

const cloudinary = new Cloudinary({
    cloud_name: "dxspp5ba5",
    api_key: "134991839275134",
    api_secret: "SMtt3hatMMwDY2pEuxnZSQt48qI",
});

const uploadToCloudinary = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset");
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`,
            formData
        );
        console.log(response.data.secure_url);
        return response.data.secure_url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};

const ImageUploader = () => {
    const [fileList, setFileList] = useState([]);

    const handleChange = async (info) => {
        let fileList = [...info.fileList];

        // Limit the number of uploaded images
        fileList = fileList.slice(-1);

        // Perform the upload to Cloudinary
        if (info.file.status === "done") {
            try {
                const imageUrl = await uploadToCloudinary(info.file.originFileObj);
                // Update the 'images' field in your state or data object with the image URL
                // For example: setImageUrl(imageUrl);
                message.success("Image uploaded successfully!");
            } catch (error) {
                message.error("Failed to upload image");
            }
        }

        setFileList(fileList);
    };

    const uploadButton = (
        <div>
            <Button>Upload</Button>
        </div>
    );

    return (
        <Upload
            name="images"
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" // Replace with your API endpoint
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
        >
            {fileList.length >= 1 ? null : uploadButton}
        </Upload>
    );
};

export default ImageUploader;