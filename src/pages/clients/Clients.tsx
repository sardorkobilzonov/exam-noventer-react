import React, { useState } from 'react';
import {
  Table, Input, Button, Pagination, Space, Avatar, Modal, Form, message, Popconfirm
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { FaUser } from 'react-icons/fa';
import {useCreateClientMutation, useDeleteClientMutation, useGetClientsQuery} from "../../redux/api/client.api.ts";


const Clients: React.FC = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { data, isLoading } = useGetClientsQuery({ limit, offset, search });
  const [createClient] = useCreateClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  const handleAddClient = async () => {
    try {
      const values = await form.validateFields();
      await createClient(values).unwrap();
      message.success("Mijoz qo'shildi");
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      message.error("Xatolik yuz berdi");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteClient(id).unwrap();
      message.success('Mijoz o‘chirildi');
    } catch (err) {
      message.error('O‘chirishda xatolik');
    }
  };

  const columns = [
    {
      title: 'F.I.SH',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: any) => (
          <Space>
            <Avatar src={record.avatar} icon={<FaUser />} />
            <span>{record.name}</span>
          </Space>
      ),
    },
    {
      title: 'MOBILE NUMBER',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'CITY',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'FILIAL NOMI',
      dataIndex: 'branch_name',
      key: 'branch_name',
    },
    {
      title: 'LITSENZIYA',
      dataIndex: 'license',
      key: 'license',
      render: () => 'Yuklab olingan', // Заглушка
    },
    {
      title: 'YARATILGAN VAQTI',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'AMALLAR',
      key: 'actions',
      render: (_: unknown, record: any) => (
          <Popconfirm title="O‘chirishni istaysizmi?" onConfirm={() => handleDelete(record.id)}>
            <Button danger>O‘chirish</Button>
          </Popconfirm>
      ),
    },
  ];

  return (
      <div style={{ padding: 24, background: '#f9fbfd' }}>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Input
              prefix={<SearchOutlined />}
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Mijoz qo'shish
          </Button>
        </Space>

        <Table
            columns={columns}
            dataSource={data?.results || []}
            loading={isLoading}
            rowKey="id"
            pagination={false}
            rowSelection={{ type: 'checkbox' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <span>
          {offset + 1} to {Math.min(offset + limit, data?.count || 0)} of {data?.count || 0} items{' '}
          <a>View all</a>
        </span>
          <Pagination
              current={currentPage}
              pageSize={limit}
              total={data?.count || 0}
              onChange={setCurrentPage}
          />
        </div>

        <Modal
            title="Yangi mijoz"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={handleAddClient}
            okText="Qo'shish"
        >
          <Form layout="vertical" form={form}>
            <Form.Item name="name" label="Ismi" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Telefon" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="city" label="Shahar">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default Clients;
