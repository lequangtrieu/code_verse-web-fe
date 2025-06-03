import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Popconfirm, message, Modal, Upload, Input, Select, Button, Tag, Table } from "antd";
import * as XLSX from 'xlsx';
import commonApi from "../../../common/api";
import getAuthInfo from "../../../config/getAuthInfo"
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../../common/CustomModal'

const AdminAccountsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importUsers, setImportUsers] = useState([]);
  const [existingEmails, setExistingEmails] = useState(new Set());
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIdx, startIdx + pageSize);
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
        phoneNumber: user.phoneNumber,
        bio: user.bio,
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
    } else if (user.role === 'INSTRUCTOR') {
      navigate(`/admin-panel/instructor/${user.id}`);
    } else {
      setSelectedUser(user);
      setIsModalOpen(true);
      form.setFieldsValue(user);
    }
  };

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);


  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: '#ffe58f', padding: 0 }}>{part}</mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter ? user.role === roleFilter : true;
      const matchesStatus = statusFilter
        ? (statusFilter === 'active' ? !user.isBanned : user.isBanned)
        : true;

      return matchesSearch && matchesRole && matchesStatus;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter, users]);


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Accounts</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      <div className="flex gap-4 mb-6">
        {/* Nút này mở modal import Excel */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setImportUsers([]);
            setIsImportModalOpen(true);
          }}
        >
          Create Learners from Excel
        </button>
      </div>

      {/* Modal import Excel */}
      <CustomModal
        title="Import Learners from Excel"
        open={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          setImportUsers([]);
        }}
        footer={true}
        footerContent={
          <>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              onClick={() => setIsImportModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 text-sm rounded ${importUsers.filter(u => !u.isDuplicate).length === 0
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              disabled={importUsers.filter(u => !u.isDuplicate).length === 0}
              onClick={handleImport}>
              Import
            </button>
          </>
        }
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
      </CustomModal>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <Select
          placeholder="Filter by Role"
          allowClear
          style={{ width: 150 }}
          value={roleFilter}
          onChange={value => setRoleFilter(value)}
        >
          <Select.Option value="LEARNER">Learner</Select.Option>
          <Select.Option value="ADMIN">Admin</Select.Option>
          <Select.Option value="INSTRUCTOR">Instructor</Select.Option>
        </Select>

        <Select
          placeholder="Filter by Status"
          allowClear
          style={{ width: 150 }}
          value={statusFilter}
          onChange={value => setStatusFilter(value)}
        >
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="banned">Banned</Select.Option>
        </Select>

        <Input
          placeholder="Search by name, email or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <span className="text-gray-500 text-sm">Found {filteredUsers.length} results</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '28%' }} />
            <col style={{ width: '28%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Full Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 justify-center ">Actions</th>
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

              paginatedUsers.map(user => (
                <tr key={user.id} className="text-center">
                  <td className="border p-2 text-left">{user.id}</td>
                  <td className="border p-2 text-left">{highlightText(user.fullName, searchTerm)}</td>
                  <td className="border p-2 text-left">{highlightText(user.email, searchTerm)}</td>
                  <td className="border p-2 text-left">{user.role}</td>
                  <td className="border p-2 text-left">
                    {user.isBanned ? (
                      <span className="text-red-500 font-semibold">Banned</span>
                    ) : (
                      <span className="text-green-500 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="border p-2 justify-center space-x-2 whitespace-nowrap">
                    <Popconfirm
                      title={user.isBanned ? "Unban this user?" : "Ban this user?"}
                      onConfirm={() => toggleBan(user.id, user.isBanned)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button
                        className={`w-16 px-3 py-1 rounded text-white min-w-[70px] ${user.isBanned ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                          }`}
                      >
                        {user.isBanned ? "Unban" : "Ban"}
                      </button>
                    </Popconfirm>

                    <button
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded whitespace-nowrap min-w-[70px]"
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
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <span>
              Page {currentPage} of {Math.max(1, Math.ceil(filteredUsers.length / pageSize))}
            </span>
            <Button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, Math.max(1, Math.ceil(filteredUsers.length / pageSize))))
              }
              disabled={currentPage >= Math.max(1, Math.ceil(filteredUsers.length / pageSize))}
            >
              Next
            </Button>
          </div>
        </div>

      </div>

      <CustomModal
        title="Admin's Information"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        footer={false}
      >
        {selectedUser && (
          <Form layout="vertical" >
            {[
              { label: 'ID', value: selectedUser.id },
              { label: 'Full Name', value: selectedUser.fullName },
              { label: 'Email', value: selectedUser.email },
              { label: 'Phone Number', value: selectedUser.phoneNumber },
              { label: 'Role', value: selectedUser.role },
              { label: 'Bio', value: selectedUser.bio },
              {
                label: 'Status',
                value: selectedUser.isBanned ? (
                  <span style={{ color: '#ff4d4f', fontWeight: 600 }}>Banned</span>
                ) : (
                  <span style={{ color: '#52c41a', fontWeight: 600 }}>Active</span>
                ),
              },
            ].map(({ label, value }) => (
              <Form.Item label={<strong style={{ color: '#595959' }}>{label}</strong>} key={label} className="mb-1">
                <div
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    fontWeight: 500,
                    color: '#262626',
                  }}
                >
                  {value}
                </div>
              </Form.Item>
            ))}
          </Form>
        )}
      </CustomModal>


    </div>
  );
};

export default AdminAccountsPage;
