import { useState } from "react";
import { Form, Popconfirm, message, Modal, Upload, Input, Select } from "antd";
import * as XLSX from 'xlsx';

const AdminAccountsPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "User",
      isBanned: false,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: "Admin",
      isBanned: true,
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Jordan",
      email: "mj@example.com",
      role: "User",
      isBanned: false,
    },
  ]);
  const [form] = Form.useForm(); // Form cho View Detail
  const [createForm] = Form.useForm(); // Form cho Create User
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal View Detail
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Modal Create User
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  const toggleBan = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isBanned: !user.isBanned } : user
      )
    );
    message.success("User status updated successfully");
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    message.success("User deleted successfully");
  };


  const openCreateUserModal = () => {
    setIsCreateModalOpen(true);
    createForm.resetFields();
  };

  const handleCreateUser = (values) => {
    const newUser = {
      id: Date.now(),
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
      isBanned: false,
    };
    setUsers((prev) => [...prev, newUser]);
    setIsCreateModalOpen(false);
    message.success("User created successfully");
  };

  const createUsersFromExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Assuming first row is header
      const headers = jsonData[0];
      const usersData = jsonData.slice(1);

      const newUsers = usersData.map((row, index) => ({
        id: Date.now() + index,
        firstName: row[headers.indexOf('FirstName')] || '',
        lastName: row[headers.indexOf('LastName')] || '',
        email: row[headers.indexOf('Email')] || '',
        role: row[headers.indexOf('Role')] || 'User',
        isBanned: false,
      }));

      setUsers((prev) => [...prev, ...newUsers]);
      message.success('Users imported successfully');
    };

    reader.readAsArrayBuffer(file);
    return false; // prevent upload
  };


  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setEditableFields(user);
    setIsModalOpen(true);
    form.setFieldsValue(user);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setEditableFields({});
    form.resetFields();
  };

  const handleCancelCreateModal = () => {
    setIsCreateModalOpen(false);
    createForm.resetFields();
  };

  const handleUpdateUser = (values) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? { ...user, ...values }
          : user
      )
    );
    setIsModalOpen(false);
    message.success("User updated successfully");
  };


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Accounts</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={openCreateUserModal}
        >
          Create User
        </button>
        <Upload
          accept=".xlsx, .xls"
          beforeUpload={createUsersFromExcel}
          showUploadList={false}
        >
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Users from Excel
          </button>
        </Upload>

      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.firstName}</td>
                <td className="border p-2">{user.lastName}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  {user.isBanned ? (
                    <span className="text-red-500 font-semibold">Banned</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Active</span>
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  <Popconfirm
                    title={user.isBanned ? "Unban this user?" : "Ban this user?"}
                    description="Are you sure?"
                    onConfirm={() => toggleBan(user.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button
                      className={`px-3 py-1 rounded text-white ${user.isBanned
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                      {user.isBanned ? "Unban" : "Ban"}
                    </button>
                  </Popconfirm>

                  <button
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    onClick={() => handleViewDetail(user)}
                  >
                    View Detail
                  </button>

                  <Popconfirm
                    title="Delete this user?"
                    description="Are you sure you want to delete?"
                    onConfirm={() => deleteUser(user.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded">
                      Delete
                    </button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal User Detail */}
      <Modal
        title="User Details"
        open={isModalOpen}
        onCancel={handleCancelModal}
        getContainer={false}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              // Nếu validate thành công
              handleUpdateUser(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        okText="Update"
        cancelText="Cancel"
      >
        {selectedUser && (
          <Form
            form={form}
            initialValues={editableFields}
            layout="vertical"
          >
            <Form.Item label="ID">
              <span>{selectedUser.id}</span>
            </Form.Item>

            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input first name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input last name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'The input is not valid E-mail!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please select role!' }]}
            >
              <Select
                options={[
                  { label: "Admin", value: "Admin" },
                  { label: "User", value: "User" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Status">
              <span>{selectedUser.isBanned ? "Banned" : "Active"}</span>
            </Form.Item>
          </Form>
        )}
      </Modal>
      {/* Modal Create User */}
      <Modal
        title="Create New User"
        open={isCreateModalOpen}
        onCancel={handleCancelCreateModal}
        onOk={() => {
          createForm.validateFields()
            .then((values) => handleCreateUser(values))
            .catch((info) => console.log('Validate Failed:', info));
        }}
        okText="Create"
        cancelText="Cancel"
        getContainer={false}
      >
        <Form
          form={createForm}
          layout="vertical"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select role!' }]}
          >
            <Select options={[{ label: "Admin", value: "Admin" }, { label: "User", value: "User" }]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminAccountsPage;
