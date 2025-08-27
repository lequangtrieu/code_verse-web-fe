import React from "react";
import { Button, Tooltip } from "antd";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Table,
} from "lucide-react";
import {
  UploadOutlined,
  VideoCameraOutlined,
  RobotOutlined,
} from "@ant-design/icons";

import addColumn from "../../../../../column-add.svg";
import addRow from "../../../../../row-add.svg";
import deleteTable from "../../../../../table-delete.svg";

const Toolbar = ({
  editor,
  onImageUpload,
  onVideoUpload,
  onGenerateAI,
  isFullscreen,
  toggleFullscreen,
  isTraining
}) => {
  if (!editor) return null;

  const renderDivider = (key) => (
    <div key={key} className="border-l mx-1 border-gray-300" />
  );

  const toolbarItems = [
    {
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      icon: <Bold size={16} />,
    },
    {
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      icon: <Italic size={16} />,
    },
    "divider",
    {
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
      icon: <Heading1 size={16} />,
    },
    {
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
      icon: <Heading2 size={16} />,
    },
    "divider",
    {
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      icon: <List size={16} />,
    },
    {
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      icon: <ListOrdered size={16} />,
    },
    "divider",
    {
      title: "Insert Table",
      action: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      active: editor.isActive("table"),
      icon: <Table size={16} />,
    },
    {
      title: "Add Column",
      action: () => editor.chain().focus().addColumnAfter().run(),
      customIcon: addColumn,
    },
    {
      title: "Add Row",
      action: () => editor.chain().focus().addRowAfter().run(),
      customIcon: addRow,
    },
    {
      title: "Delete Table",
      action: () => editor.chain().focus().deleteTable().run(),
      customIcon: deleteTable,
    },
    "divider",
    {
      title: "Inline Code",
      action: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      label: "</>",
    },
    "divider",
    {
      title: "Upload Image",
      action: onImageUpload,
      icon: <UploadOutlined />,
    },
    {
      title: "Upload Video",
      action: onVideoUpload,
      icon: <VideoCameraOutlined />,
    },
    "divider",
    !isTraining && {
      title: "Generate AI Text",
      action: onGenerateAI,
      icon: <RobotOutlined />,
    },
    "divider",
    {
      title: isFullscreen ? "Exit Fullscreen" : "Fullscreen",
      action: toggleFullscreen,
      label: isFullscreen ? "Exit Fullscreen" : "Fullscreen",
    },
  ];

  return (
    <div
      className={`${
        isFullscreen ? "sticky top-0 z-10" : ""
      } flex flex-wrap items-center gap-1 border-b border-gray-300 px-2 py-1 bg-gray-50 rounded-t-md`}
    >
      {toolbarItems.map((item, idx) =>
        item === "divider" ? (
          renderDivider(idx)
        ) : (
          <Tooltip title={item.title} key={idx}>
            <Button
              type="button"
              size="small"
              onClick={item.action}
              className={`p-1 rounded ${
                item.active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
              }`}
              icon={
                item.icon ? (
                  item.icon
                ) : item.customIcon ? (
                  <img
                    src={item.customIcon}
                    alt={item.title}
                    className="w-4 h-4"
                  />
                ) : null
              }
            >
              {item.label}
            </Button>
          </Tooltip>
        )
      )}
    </div>
  );
};

export default Toolbar;