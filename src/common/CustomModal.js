import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const CustomModal = ({ open, onClose, title, children, footer, footerContent }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
            style={{ top: '82px' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl rounded-2xl shadow-xl bg-white dark:bg-zinc-900 flex flex-col"
                style={{ maxHeight: 'calc(100vh - 140px)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between py-1 px-4 border-b border-zinc-200 dark:border-zinc-700">
                    <h2 className="text-xl text-zinc-800 dark:text-white">{title}</h2>
                    <Button
                        onClick={onClose}
                        className="text-zinc-500 transition border-0 p-0"
                        type="text"
                        icon={<CloseOutlined />}
                    />
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-4 text-sm text-zinc-700 dark:text-zinc-200">
                    {children}
                </div>

                {/* Footer (optional) */}
                {footer && (
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-end gap-2">
                        {footerContent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomModal;
