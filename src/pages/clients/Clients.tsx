import React, { useState } from 'react';
import { Table, Input, Button, Pagination, Space, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { FaUser } from 'react-icons/fa';

const mockClients = new Array(15).fill(null).map((_, index) => ({
  key: index,
  name: 'Carry Anna',
  phone: '+998 (93) 954-21-11',
  city: 'Toshkent',
  branch: '01-02-2025 8:56',
  license: 'Yuqlab olindi',
  createdAt: '01-02-2025 8:56',
  avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
}));

const Clients: React.FC = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'F.I.SH',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: { avatar: string; name: string }) => (
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
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'LITSENZIYA',
      dataIndex: 'license',
      key: 'license',
    },
    {
      title: 'YARATILGAN VAQTI',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
        <Button type="primary" icon={<PlusOutlined />}>Mijoz qo'shish</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredClients.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false}
        rowSelection={{ type: 'checkbox' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <span>
          1 to {Math.min(pageSize, filteredClients.length)} of {filteredClients.length} items{' '}
          <a>View all</a>
        </span>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredClients.length}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Clients;