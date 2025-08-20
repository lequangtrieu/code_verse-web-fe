import React, { useState } from "react";
import { Table } from "antd";
import { RoughNotation } from "react-rough-notation";

export default function AnnouncementHistoryMockup() {
    const [activeTab, setActiveTab] = useState("sent");

    const data = [
        {
            key: 1,
            title: "System Maintenance",
            content: "Platform will be down for maintenance on 20/08.",
            audience: "ALL",
            status: "Sent",
            sendDate: "16/08/2025, 22:00",
            sender: "Admin 1"
        },
        {
            key: 2,
            title: "New Course Policy",
            content: "New courses require stricter approval checks.",
            audience: "INSTRUCTOR",
            status: "Sent",
            sendDate: "15/08/2025, 15:20",
            sender: "Admin 2"
        },
        {
            key: 3,
            title: "Upcoming Webinar",
            content: "Join free webinar on ReactJS on 25/08.",
            audience: "LEARNER",
            status: "Scheduled",
            sendDate: "25/08/2025, 10:00",
            sender: "Admin 3"
        }
    ];

    const columns = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Content", dataIndex: "content", key: "content" },
        { title: "Audience", dataIndex: "audience", key: "audience" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Send Date", dataIndex: "sendDate", key: "sendDate" },
        { title: "Sender", dataIndex: "sender", key: "sender" }
    ];

    const filteredData =
        activeTab === "sent"
            ? data.filter((d) => d.status === "Sent")
            : data.filter((d) => d.status === "Scheduled");

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar Panel */}
            <div className="w-64 border-r p-4">
                <h3 className="font-bold mb-6">ADMIN PANEL</h3>
                <ul className="space-y-3 text-sm">
                    <li className="cursor-pointer">Dashboard</li>
                    <li className="cursor-pointer">System Statistics</li>
                    <li className="cursor-pointer">User Management</li>
                    <li className="cursor-pointer">Course Management</li>
                    <li className="cursor-pointer">Send Notifications</li>
                    <li className="cursor-pointer font-bold underline">View Announcement History</li>
                    <li className="cursor-pointer">Settings</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-6">Announcement History</h2>

                {/* Tabs */}
                <div className="flex gap-8 border-b mb-6">
                    <div
                        onClick={() => setActiveTab("sent")}
                        className="cursor-pointer pb-2"
                    >
                        <RoughNotation
                            type="underline"
                            show={activeTab === "sent"}
                            color="black"
                            strokeWidth={2}
                            animationDelay={200}
                        >
                            Sent Announcements
                        </RoughNotation>
                    </div>
                    <div
                        onClick={() => setActiveTab("scheduled")}
                        className="cursor-pointer pb-2"
                    >
                        <RoughNotation
                            type="underline"
                            show={activeTab === "scheduled"}
                            color="black"
                            strokeWidth={2}
                            animationDelay={200}
                        >
                            Scheduled Announcements
                        </RoughNotation>
                    </div>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 5 }}
                    bordered
                />
            </div>
        </div>
    );
}
