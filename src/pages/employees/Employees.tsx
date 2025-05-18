import React, { useState } from 'react';
import {
  Table,
  Input,
  Button,
  Select,
  Pagination,
  Space,
  Avatar,
  Spin,
  Typography,
  Modal,
  Form,
  DatePicker,
  InputNumber
} from 'antd';
import { PlusOutlined, SearchOutlined, PhoneOutlined } from '@ant-design/icons';
import { FaUser } from 'react-icons/fa';
import { useGetCompanyQuery } from "../../redux/api/company.api";
import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeesByBranchQuery
} from "../../redux/api/employee.api";

const { Option } = Select;
const { Text } = Typography;

const Employees: React.FC = () => {
  const [search, setSearch] = useState('');
  const [branchId, setBranchId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const pageSize = 8;

  const { data: companyData, isLoading: isCompanyLoading } = useGetCompanyQuery({});
  const branches = companyData?.branches || [];

  const selectedBranchId = branchId ?? branches[0]?.id;

  const { data, isLoading } = useGetEmployeesByBranchQuery(
      {
        branch_id: selectedBranchId,
        search,
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      },
      { skip: !selectedBranchId }
  );

  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [addEmployee, { isLoading: isAdding }] = useAddEmployeeMutation();

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
  };

  const handleAddEmployee = async (values: any) => {
    const payload = {
      user: {
        ...values.user,
        birth_date: values.user.birth_date.format("YYYY-MM-DD")
      },
      branch_id: selectedBranchId,
      department_id: values.department_id,
      shift_id: values.shift_id,
      position: values.position,
      salary: values.salary,
      official_salary: values.official_salary
    };
    await addEmployee(payload);
    form.resetFields();
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'F.I.SH',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => (
          <Space>
            <Avatar icon={<FaUser />} />
            <span style={{ color: '#1A73E8', fontWeight: 500 }}>{user?.full_name}</span>
          </Space>
      ),
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      render: () => 'Direktor', // временно
    },
    {
      title: <PhoneOutlined />,
      dataIndex: 'user',
      key: 'phone',
      render: (user: any) => user?.phone_number,
    },
    {
      title: 'ISHGA QABUL QILUVCHI FILIAL',
      dataIndex: 'branch',
      key: 'branch',
      render: (_: any, record: any) => {
        const branch = branches.find((b: any) => b.id === record.branch);
        return branch ? branch.name : 'Nomaʼlum filial';
      },
    },
    {
      title: 'SMENASI',
      dataIndex: 'shift',
      key: 'shift',
      render: () => '9:00 - 10:00', // временно
    },
    {
      title: "TUG'ILGAN SANA",
      dataIndex: 'user',
      key: 'birthDate',
      render: (user: any) => new Date(user?.birth_date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
      ),
    },
  ];

  return (
      <div style={{ padding: 24, background: '#f9fbfd' }}>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Xodim qo'shish
          </Button>
          <Space>
            <Input
                prefix={<SearchOutlined />}
                placeholder="Qidiruv"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Select
                style={{ width: 240 }}
                placeholder="Filial tanlang"
                loading={isCompanyLoading}
                value={selectedBranchId}
                onChange={(value) => {
                  setBranchId(value);
                  setCurrentPage(1);
                }}
            >
              {branches.map((branch) => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Option>
              ))}
            </Select>
          </Space>
        </Space>

        {isLoading ? (
            <Spin />
        ) : data?.results?.length === 0 ? (
            <Text type="secondary">Hozircha bu filialda xodimlar mavjud emas.</Text>
        ) : (
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data?.results || []}
                pagination={false}
                rowSelection={{ type: 'checkbox' }}
            />
        )}

        <Pagination
            style={{ marginTop: 16, textAlign: 'right' }}
            current={currentPage}
            pageSize={pageSize}
            total={data?.count || 0}
            onChange={setCurrentPage}
        />

        <Modal
            title="Yangi xodim qo'shish"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            confirmLoading={isAdding}
        >
          <Form layout="vertical" form={form} onFinish={handleAddEmployee}>
            <Form.Item name={['user', 'full_name']} label="F.I.SH" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'gender']} label="Jinsi" rules={[{ required: true }]}>
              <Select>
                <Option value="male">Erkak</Option>
                <Option value="female">Ayol</Option>
              </Select>
            </Form.Item>
            <Form.Item name={['user', 'phone_number']} label="Telefon raqam" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'passport_number']} label="Passport raqami" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'jshshr']} label="JSHSHIR" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'birth_date']} label="Tug'ilgan sana" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={['user', 'salary_type']} label="Maosh turi" rules={[{ required: true }]}>
              <Select>
                <Option value="official">Rasmiy</Option>
                <Option value="unofficial">Norasmiy</Option>
              </Select>
            </Form.Item>
            <Form.Item name="department_id" label="Bo'lim ID" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="shift_id" label="Smena ID" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="position" label="Lavozimi" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="salary" label="Maosh" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="official_salary" label="Rasmiy maosh" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default Employees;
