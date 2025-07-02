import { Dropdown, Menu, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const CommentActions = ({ isOwner, onEdit, onDelete, onReport }) => {
  const menuItems = isOwner
    ? [
        { key: "edit", label: "Edit", onClick: onEdit },
        { key: "delete", label: "Delete", onClick: onDelete },
      ]
    : [{ key: "report", label: "Report", onClick: onReport }];

  return (
    <Dropdown
      trigger={["click"]}
      overlay={
        <Menu>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              onClick={item.onClick}
              danger={item.key === "delete"}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <Button type="text" icon={<MoreOutlined />} size="small" />
    </Dropdown>
  );
};

export default CommentActions;
