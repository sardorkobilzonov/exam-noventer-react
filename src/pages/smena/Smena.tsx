import React, { useState } from 'react';
import {
    useGetShiftsQuery,
    useCreateShiftMutation,
    useUpdateShiftMutation,
    useDeleteShiftMutation
} from '../../redux/api/smena.api';
import { useGetCompanyQuery } from '../../redux/api/company.api';
import {
    Modal,
    Button,
    Input,
    Select,
    TimePicker,
    Form,
    message,
    Table,
    Space,
    Popconfirm
} from 'antd';
import dayjs from 'dayjs';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Smena: React.FC = () => {
    const [selectedBranch, setSelectedBranch] = useState<number | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShift, setEditingShift] = useState<any>(null);

    const [form] = Form.useForm();
    const { data: companyData } = useGetCompanyQuery({});
    const branches = companyData?.branches || [];

    const selectedBranchId = selectedBranch ?? branches[0]?.id;

    const { data, isLoading } = useGetShiftsQuery({ branch: selectedBranchId }, { skip: !selectedBranchId });
    const [createShift] = useCreateShiftMutation();
    const [updateShift] = useUpdateShiftMutation();
    const [deleteShift] = useDeleteShiftMutation();

    const handleFinish = async (values: any) => {
        const payload = {
            name: values.name,
            start_time: values.start_time.format('HH:mm:ss'),
            end_time: values.end_time.format('HH:mm:ss'),
            branch: selectedBranchId,
        };

        try {
            if (editingShift) {
                await updateShift({ id: editingShift.id, ...payload }).unwrap();
                message.success('Smena yangilandi');
            } else {
                await createShift(payload).unwrap();
                message.success('Smena yaratildi');
            }

            form.resetFields();
            setIsModalOpen(false);
            setEditingShift(null);
        } catch {
            message.error('Xatolik yuz berdi');
        }
    };

    const openEditModal = (shift: any) => {
        setEditingShift(shift);
        form.setFieldsValue({
            name: shift.name,
            start_time: dayjs(shift.start_time, 'HH:mm:ss'),
            end_time: dayjs(shift.end_time, 'HH:mm:ss'),
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteShift(id).unwrap();
            message.success('Smena o‘chirildi');
        } catch {
            message.error('O‘chirishda xatolik');
        }
    };

    const columns = [
        {
            title: 'Smena',
            dataIndex: 'name',
        },
        {
            title: 'Boshlanish vaqti',
            dataIndex: 'start_time',
        },
        {
            title: 'Tugash vaqti',
            dataIndex: 'end_time',
        },
        {
            title: 'Amallar',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openEditModal(record)} />
                    <Popconfirm title="O'chirishga ishonchingiz komilmi?" onConfirm={() => handleDelete(record.id)}>
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <label htmlFor="branch" className="font-medium">
                        Filial tanlang:
                    </label>
                    <Select
                        id="branch"
                        className="w-60"
                        value={selectedBranchId}
                        onChange={(value) => setSelectedBranch(value)}
                        options={branches.map((b: any) => ({ label: b.name, value: b.id }))}
                    />
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                    Smena qo'shish
                </Button>
            </div>

            <Table
                loading={isLoading}
                dataSource={data || []}
                columns={columns}
                rowKey="id"
                pagination={false}
            />

            <Modal
                title={editingShift ? "Smena tahrirlash" : "Yangi smena qo'shish"}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingShift(null);
                    form.resetFields();
                }}
                onOk={() => form.submit()}
            >
                <Form layout="vertical" form={form} onFinish={handleFinish}>
                    <Form.Item name="name" label="Smena nomi" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="start_time" label="Boshlanish vaqti" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm:ss" className="w-full" />
                    </Form.Item>
                    <Form.Item name="end_time" label="Tugash vaqti" rules={[{ required: true }]}>
                        <TimePicker format="HH:mm:ss" className="w-full" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Smena;
