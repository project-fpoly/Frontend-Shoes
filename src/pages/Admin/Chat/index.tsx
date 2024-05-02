import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spin, notification, Modal } from 'antd'
import UpdateSettingsForm from './updateForm'
import ChatsPage from '../../Chat'

const SettingsPage = () => {
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({
    openAiEndpoint: '',
    chatGPTKey: '',
  })
  const [modalVisible, setModalVisible] = useState(false) // State để kiểm soát trạng thái hiển thị của modal

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          'https://660edb22356b87a55c504eef.mockapi.io/chatgpt/1',
        )
        setInitialValues(response.data)
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch data from the API.',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      await axios.put(
        'https://660edb22356b87a55c504eef.mockapi.io/chatgpt/1',
        values,
      )
      notification.success({
        message: 'Success',
        description: 'Settings updated successfully.',
      })
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update settings.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={() => setModalVisible(true)}>
        Mở khóa tính năng ChatGPT
      </button>{' '}
      {/* Nút để mở modal */}
      <ChatsPage />
      <Modal
        title="Mở khóa"
        open={modalVisible}
        onCancel={() => setModalVisible(false)} // Đóng modal khi nhấn nút Hủy bỏ hoặc bên ngoài modal
        footer={null} // Không hiển thị footer của modal
      >
        {loading ? (
          <Spin />
        ) : (
          <UpdateSettingsForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        )}
      </Modal>
    </div>
  )
}

export default SettingsPage
