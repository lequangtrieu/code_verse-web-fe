import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Popconfirm, message, Modal, Upload, Input, Select, Button, Tag, Table } from "antd";
import * as XLSX from 'xlsx';
import commonApi from "../../../common/api";
import getAuthInfo from "../../../config/getAuthInfo"
import { useNavigate } from 'react-router-dom';

const AdminAccountsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importUsers, setImportUsers] = useState([]); // User chuẩn bị import từ Excel
  const [existingEmails, setExistingEmails] = useState(new Set()); // Email hiện tại
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { token } = getAuthInfo();
      const res = await axios.get(commonApi.getAllUsers.url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const usersFromApi = res.data.map(user => ({
        id: user.id,
        fullName: user.name || '',
        email: user.username,
        role: user.role,
        isBanned: Boolean(user.isDeleted),
        avatar: user.avatar,
      }));
      setUsers(usersFromApi);

      // Lưu lại danh sách email để check trùng
      setExistingEmails(new Set(usersFromApi.map(u => u.email.toLowerCase())));

    } catch (error) {
      console.error("Failed to fetch users:", error);
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };


  const toggleBan = async (id, isBanned) => {
    try {
      const { token } = getAuthInfo();
      const lockBody = { lock: !isBanned }; // true nếu cần khóa, false nếu mở khóa

      await axios.put(commonApi.lockUser.url(id), lockBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      message.success(isBanned ? "User unlocked successfully" : "User locked successfully");

      fetchUsers();
    } catch (error) {
      console.error("Failed to update user status:", error);
      message.error("Failed to update user status");
    }
  };


  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    message.success("User deleted successfully");
  };

  const downloadTemplate = () => {
    // Tạo dữ liệu mẫu gồm 1 dòng header
    const wsData = [
      ["FirstName", "LastName", "Email", "Role"],
      ["Nguyen", "Van A", "vana@example.com", "LEARNER"],
    ];

    // Tạo worksheet và workbook
    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    // Xuất file excel
    XLSX.writeFile(workbook, "UserImportTemplate.xlsx");
  };

  // Khi chọn file excel, parse dữ liệu, đánh dấu trùng email, cập nhật importUsers
  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = jsonData[0];
      const usersData = jsonData.slice(1);

      const newUsers = usersData.map(row => {
        const firstName = row[headers.indexOf('FirstName')] || '';
        const lastName = row[headers.indexOf('LastName')] || '';
        const email = (row[headers.indexOf('Email')] || '').toLowerCase().trim();
        const fullName = `${firstName} ${lastName}`.trim();

        return {
          username: email,
          name: fullName,
          password: '123456',
          role: 'LEARNER',
          isDuplicate: existingEmails.has(email),
        };
      }).filter(u => u.username && u.name);

      setImportUsers(newUsers);
    };

    reader.readAsArrayBuffer(file);
    return false; // Ngăn Upload tự động gửi file
  };

  const handleImport = async () => {
    const toImportUsers = importUsers.filter(u => !u.isDuplicate);

    if (toImportUsers.length === 0) {
      message.warning("Không có user mới để import.");
      return;
    }

    const { token } = getAuthInfo();

    try {
      await axios.post(commonApi.createLearnerByExcel.url, toImportUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      message.success(`Imported ${toImportUsers.length} user(s) successfully.`);
      fetchUsers();
      setImportUsers([]);
      setIsImportModalOpen(false);
    } catch (error) {
      message.error("Failed to import users.");
    }
  };

  // Cấu hình cột cho bảng preview import user
  const importColumns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        record.isDuplicate ? <span style={{ color: 'red', fontWeight: 'bold' }}>{text} <Tag color="red">Email đã tồn tại</Tag></span> : text
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  const handleViewDetail = (user) => {
    if (user.role === 'LEARNER') {
      navigate(`/admin-panel/learner/${user.id}`);
    } else {
      // Mở modal chi tiết như cũ
      setSelectedUser(user);
      setEditableFields(user);
      setIsModalOpen(true);
      form.setFieldsValue(user);
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setEditableFields({});
    form.resetFields();
  };


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Accounts</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      <div className="flex gap-4 mb-6">
        {/* Nút này mở modal import Excel */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsImportModalOpen(true)}
        >
          Create Learners from Excel
        </button>
      </div>

      {/* Modal import Excel */}
      <Modal
        title="Import Learners from Excel"
        open={isImportModalOpen}
        onCancel={() => {
          setIsImportModalOpen(false);
          setImportUsers([]);
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsImportModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="import"
            type="primary"
            disabled={importUsers.filter(u => !u.isDuplicate).length === 0}
            onClick={handleImport}
          >
            Import
          </Button>,
        ]}
        width={700}
      >
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={downloadTemplate}>
            Download Excel Template
          </Button>
        </div>
        <Upload
          accept=".xlsx,.xls"
          beforeUpload={handleFileUpload}
          showUploadList={false}
        >
          <Button>Upload Excel File</Button>
        </Upload>

        {importUsers.length > 0 && (
          <Table
            columns={importColumns}
            dataSource={importUsers}
            rowKey={(record) => record.username}
            pagination={false}
            style={{ marginTop: 16 }}
            rowClassName={(record) => (record.isDuplicate ? 'row-duplicate' : '')}
          />
        )}
      </Modal>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-4">Loading...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="text-center">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.fullName}</td>
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
                      onConfirm={() => toggleBan(user.id, user.isBanned)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button
                        className={`w-16 px-3 py-1 rounded text-white ${user.isBanned ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        title="User Details"
        open={isModalOpen}
        onCancel={handleCancelModal}
        getContainer={false}
        footer={null}
      >
        {selectedUser && (
          <Form
            layout="vertical"
          >
            <Form.Item label="ID">
              <span>{selectedUser.id}</span>
            </Form.Item>

            <Form.Item label="Full Name">
              <span>{selectedUser.fullName}</span>
            </Form.Item>

            <Form.Item label="Email">
              <span>{selectedUser.email}</span>
            </Form.Item>

            <Form.Item label="Phone Number">
              <span>{selectedUser.phoneNumber}</span>
            </Form.Item>

            <Form.Item label="Role">
              <span>{selectedUser.role}</span>
            </Form.Item>

            <Form.Item label="Bio">
              <span>{selectedUser.bio}</span>
            </Form.Item>

            <Form.Item label="Status">
              <span>{selectedUser.isBanned ? "Banned" : "Active"}</span>
            </Form.Item>
          </Form>
        )}
      </Modal>

    </div>
  );
};

export default AdminAccountsPage;
