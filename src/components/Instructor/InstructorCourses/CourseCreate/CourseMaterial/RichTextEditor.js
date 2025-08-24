import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { Video } from "./Video";
import { storage } from "./temp_firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Toolbar from "./Toolbar";
import { Spin, message } from "antd";
import "../CourseMaterial/RichTextEditor.css";
import commonApi from "../../../../../common/api";
import axiosInstance from "../../../../../config/axiosInstance";
import "highlight.js/styles/github.css";

const lowlight = createLowlight();
lowlight.register('js', javascript);
lowlight.register('py', python);

const RichTextEditor = forwardRef(({ content, onChange, lessonId, theoryTitle }, editorRef) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const editor = useEditor({
        extensions: [StarterKit.configure({
            codeBlock: false,
        }),
        CodeBlockLowlight.configure({
            lowlight,
        }),
        Table.configure({
            resizable: true,
        }),
            TableRow,
            TableHeader,
            TableCell,
        Image.configure({
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
        editorProps: {
            handleKeyDown(view, event) {
                if (event.key === "Tab") {
                    event.preventDefault()
                    view.dispatch(
                        view.state.tr.insertText("    ")
                    )
                    return true
                }
            },
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

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || "");
        }
        // eslint-disable-next-line
    }, [content]);

    const handleGenerateAI = async () => {
        if (!editor) return;
        if (!theoryTitle || theoryTitle?.trim() === ""){
            message.warning("Fill in theory title to use this feature.");
             return;
            }
        setIsGenerating(true);
        try {
            const res = await axiosInstance.post(commonApi.aiGenerateTheory.url,
                {
                    lessonId,
                    theoryTitle,
                    theoryContent: editor.getHTML()
                }
            );
            const data = await res.data.result.draft;

            const generatedText = data || "AI response here...";

            editor.commands.insertContent(generatedText);
        } catch (err) {
            console.error("AI generation failed:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="border border-gray-300 rounded-md">
            <div className={`border rounded bg-white ${isFullscreen
                ? "fixed left-0 top-[82px] right-0 bottom-0 z-50 bg-white flex flex-col"
                : "max-h-[600px] min-h-[400px] flex flex-col"
                }`}>
                {editor && <Toolbar
                    editor={editor}
                    onImageUpload={handleImageUpload}
                    onVideoUpload={handleVideoUpload}
                    onGenerateAI={handleGenerateAI}
                    isFullscreen={isFullscreen}
                    toggleFullscreen={toggleFullscreen} />}
                <div className={`relative flex-1 w-full overflow-x-auto ${isFullscreen ? " my-[40px]" : " max-w-none"
                    }`}>
                    <EditorContent editor={editor}
                        className={`w-full editor-typography ${isFullscreen ? " px-[400px]" : " px-4"
                            }`} />
                    {(isUploading || isGenerating) && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                            <Spin size="large" tip={isGenerating ? "Generating with AI..." : "Uploading..."} />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
});

export default RichTextEditor;
