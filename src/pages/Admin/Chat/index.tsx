import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, notification, Modal, Button, Table, Tag } from 'antd';
import UpdateSettingsForm from './updateForm';
import ChatsPage from '../../Chat';

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    openAiEndpoint: '',
    chatGPTKey: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Lấy accessToken từ localStorage
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found in localStorage');
        }

        // Tạo header
        const headers: Record<string, string> = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`,
        };
        const response = await axios.get('http://localhost:9000/api/chat/all', { headers });
        setChatData(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch data from the API.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const fetchFormData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://660edb22356b87a55c504eef.mockapi.io/chatgpt/1');
      setInitialValues(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch form data from the API.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await axios.put(
        'https://660edb22356b87a55c504eef.mockapi.io/chatgpt/1',
        values,
      );
      notification.success({
        message: 'Success',
        description: 'Settings updated successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update settings.',
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID Chat',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Người tạo',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_online',
      key: 'is_online',
      render: (isOnline: boolean) => (
        <Tag color={isOnline ? 'green' : 'red'}>
          {isOnline ? 'On' : 'Off'}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Mở khóa tính năng ChatGPT
      </Button>
      <ChatsPage />
      <Table dataSource={chatData} columns={columns} />
      <Modal
        title="Mở khóa"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {loading ? (
          <Spin />
        ) : (
          <>
            <UpdateSettingsForm
              initialValues={initialValues}
              onSubmit={handleSubmit} // Truyền hàm handleSubmit vào component con
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default SettingsPage;
