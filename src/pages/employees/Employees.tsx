import React, { useState } from 'react';
import { Table, Input, Button, Select, Pagination, Space, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined, PhoneOutlined } from '@ant-design/icons';
import { FaUser } from 'react-icons/fa';

const { Option } = Select;

const mockData = new Array(80).fill(null).map((_, index) => ({
  key: index,
  name: 'Ubaydullayev Nurillo',
  role: 'Direktor',
  phone: '+998 (90) 954-21-11',
  branch: 'Sheroz Turdiyev',
  shift: '9:00 - 10:00',
  birthDate: index === 0 ? '01-02-1999' : '01-02-2025',
  avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
}));

const Employees: React.FC = () => {
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (!branch || item.branch === branch)
  );

  interface Employee {
    key: number;
    name: string;
    role: string;
    phone: string;
    branch: string;
    shift: string;
    birthDate: string;
    avatar: string;
  }

  interface Column {
    title: React.ReactNode;
    dataIndex: string;
    key: string;
    render?: (text: string, record: Employee) => React.ReactNode;
  }

  const columns: Column[] = [
    {
      title: 'F.I.SH',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<FaUser />} />
          <span style={{ color: '#1A73E8', fontWeight: 500 }}>{record.name}</span>
        </Space>
      ),
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: <PhoneOutlined />,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: (
        <Space>
          <FaUser /> ISHGA QABUL QILUVCHI FILIAL
        </Space>
      ),
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: (
        <Space>
          <FaUser /> SMENASI
        </Space>
      ),
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: "TUG'ILGAN SANA",
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f9fbfd' }}>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Button type="primary" icon={<PlusOutlined />}>Xodim qo'shish</Button>
        <Space>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Qidiruv"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            style={{ width: 200 }}
            placeholder="Filial tanlang"
            allowClear
            value={branch}
            onChange={(value) => setBranch(value)}
          >
            <Option value="Sheroz Turdiyev">Sheroz Turdiyev</Option>
          </Select>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false}
        rowSelection={{ type: 'checkbox' }}
      />
      <Pagination
        style={{ marginTop: 16, textAlign: 'right' }}
        current={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default Employees;
