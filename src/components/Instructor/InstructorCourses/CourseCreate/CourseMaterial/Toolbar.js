import React from "react";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from "lucide-react";
import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Toolbar = ({ editor, onImageUpload, onVideoUpload, isFullscreen, toggleFullscreen }) => {
    if (!editor) return null;

    return (
        <div className={`${isFullscreen ? "sticky top-0 z-10" : ""
        } flex items-center gap-2 border-b border-gray-300 px-2 py-1 bg-gray-50 rounded-t-md`}
         >
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 rounded ${editor.isActive('bold') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
                <Bold size={16} />
            </Button>
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 rounded ${editor.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
                <Italic size={16} />
            </Button>

            <div className="border-l mx-1 border-gray-300" />

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
                <Heading1 size={16} />
            </Button>
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
                <Heading2 size={16} />
            </Button>

            <div className="border-l mx-1 border-gray-300" />

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
                <List size={16} />
            </Button>

            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
            >
                <ListOrdered size={16} />
            </Button>

            <div className="border-l mx-1 border-gray-300" />

            <Button onClick={onImageUpload} type="button" title="Upload Image">
                <UploadOutlined />
            </Button>
            <Button onClick={onVideoUpload} type="button" title="Upload Video">
                <VideoCameraOutlined />
            </Button>

            <div className="border-l mx-1 border-gray-300" />

            <Button onClick={toggleFullscreen}>
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
        </div>
    );
};

export default Toolbar;
