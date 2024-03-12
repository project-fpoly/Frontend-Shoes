import { useState } from "react";
import { Row, Col, Card, Button, Modal, Descriptions, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

interface Voucher {
    id: number;
    name: string;
    code: string;
    quantity: number;
    reduced_amount: number;
    description: string;
    expiration_date: string;
    create_date: string;
    create_by: string;
}

const { Title } = Typography;

const Voucher = () => {
    const [visible, setVisible] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [applied, setApplied] = useState(false);

    const sampleVoucher: Voucher = {
        id: 1,
        name: "Mã giảm giá 50%",
        code: "DISCOUNT50",
        quantity: 100,
        reduced_amount: 50,
        description: "Giảm 50% cho đơn hàng từ 500k",
        expiration_date: "31/12/2024",
        create_date: "01/01/2024",
        create_by: "Admin",
    };

    const handleShowDetails = (voucher: Voucher) => {
        setVisible(true);
        setSelectedVoucher(voucher);
    };

    const handleApply = () => {
        setApplied(true);
        setVisible(false);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={12}>
                <Title level={2}>Voucher</Title>
                <Card
                    title={sampleVoucher.name}
                    extra={
                        <Button
                            type="primary"
                            onClick={() => handleShowDetails(sampleVoucher)}
                            style={{
                                backgroundColor: '#000000', // Màu đen
                                borderColor: '#000000', // Màu viền đen
                                color: '#ffffff', // Màu chữ trắng
                                transition: 'background-color 0.3s ease',
                            }}
                            className="apply-button"
                        >
                            Xem chi tiết voucher
                        </Button>
                    }
                    style={{ width: '100%' }}
                >
                    <p>Khách hàng có thể áp dụng cùng lúc với mã giảm phí vận chuyển</p>
                </Card>
                <Modal
                    title={selectedVoucher?.name}
                    visible={visible}
                    onOk={handleApply}
                    onCancel={handleCancel}
                    okText="Áp dụng"
                    cancelText="Hủy"
                >
                    {selectedVoucher && !applied && (
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Mã giảm giá" labelStyle={{ fontWeight: 'bold', color: '#000' }}>
                                {selectedVoucher.code}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số lượng" labelStyle={{ fontWeight: 'bold', color: '#000' }}>
                                {selectedVoucher.quantity}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số tiền giảm" labelStyle={{ fontWeight: 'bold', color: '#000' }}>
                                {selectedVoucher.reduced_amount}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mô tả" labelStyle={{ fontWeight: 'bold', color: '#000' }}>
                                {selectedVoucher.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="Hạn sử dụng" labelStyle={{ fontWeight: 'bold', color: '#000' }}>
                                {selectedVoucher.expiration_date}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo" labelStyle={{ fontWeight: 'bold', color: '#000' }}>
                                {selectedVoucher.create_date}
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                    {applied && (
                        <Typography.Text style={{ color: 'green' }}>Đã áp dụng thành công!</Typography.Text>
                    )}
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                       
                        {!applied && (
                            <Button
                                style={{
                                    backgroundColor: '#000000', // Màu đen
                                    borderColor: '#000000', // Màu viền đen
                                    color: '#ffffff', // Màu chữ trắng
                                    transition: 'background-color 0.3s ease',
                                }}
                                type="primary"
                                onClick={handleApply}
                            >
                                Áp dụng
                            </Button>
                        )}
                    </div>
                </Modal>
            </Col>
        </Row>
    );
};

export default Voucher;
