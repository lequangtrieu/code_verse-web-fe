import React from "react";
import { Collapse } from "antd";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export default function SortablePanel({ id, children, header }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: 10
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Collapse defaultActiveKey={["1"]}>
                <Panel
                    key="1"
                    header={
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span
                                className="font-semibold" style={{ flex: 1 }}>{header}</span>
                            {/* Drag Handle */}
                            <span
                                {...attributes}
                                {...listeners}
                                style={{ cursor: "grab", padding: "0 4px" }}
                            >
                                <MenuOutlined />
                            </span>
                        </div>
                    }
                >
                    {children}
                </Panel>
            </Collapse>
        </div>
    );
}