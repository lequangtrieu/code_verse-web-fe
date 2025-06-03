import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Video } from "./Video";
import { storage } from "./temp_firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Toolbar from "./Toolbar";
import { Spin } from "antd";
import "../CourseMaterial/RichTextEditor.css";

const RichTextEditor = forwardRef(({ content, onChange, lessonId }, editorRef) => {
    const [isUploading, setIsUploading] = useState(false);

    const editor = useEditor({
        extensions: [StarterKit, Image.configure({
            inline: false,
            allowBase64: false,
            HTMLAttributes: {
                class: 'rounded-md',
            },
        }),
            Video],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    useImperativeHandle(editorRef, () => ({
        getHtml: () => editor?.getHTML() || ""
    }));

    const handleImageUpload = async () => {
        const file = await selectFile("image/*");
        if (file) {
            const url = await uploadFileToFirebase(file);
            editor?.chain().focus().setImage({ src: url }).run();
        }
    };

    const handleVideoUpload = async () => {
        const file = await selectFile("video/*");
        if (file) {
            const url = await uploadFileToFirebase(file);
            editor?.chain().focus().insertContent({
                type: 'video',
                attrs: {
                    src: url,
                    controls: true,
                },
            }).run();
        }
    };

    const selectFile = (accept) =>
        new Promise((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = accept;
            input.onchange = () => resolve(input.files[0]);
            input.click();
        });

    const uploadFileToFirebase = async (file) => {
        setIsUploading(true);
        try {
            const path = `editor/${lessonId}/${Date.now()}_${file.name}`;
            const fileRef = storageRef(storage, path);
            await uploadBytes(fileRef, file);
            return getDownloadURL(fileRef);
        } finally {
            setIsUploading(false);
        }
    };

    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsFullscreen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isFullscreen]);

    return (
        <div className="border border-gray-300 rounded-md">
            <div className={`border rounded bg-white ${isFullscreen
                ? "fixed left-0 top-[82px] right-0 bottom-0 z-50 bg-white flex flex-col"
                : "max-h-[400px] flex flex-col"
                }`}>
                {editor && <Toolbar
                    editor={editor}
                    onImageUpload={handleImageUpload}
                    onVideoUpload={handleVideoUpload}
                    isFullscreen={isFullscreen}
                    toggleFullscreen={toggleFullscreen} />}
                <div className={`relative flex-1 w-full overflow-x-auto ${isFullscreen ? "" : " max-w-none"
                    }`}>
                    <EditorContent editor={editor}
                        className={`w-full px-4 editor-typography`} />
                    {isUploading && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                            <Spin size="large" />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
});

export default RichTextEditor;
