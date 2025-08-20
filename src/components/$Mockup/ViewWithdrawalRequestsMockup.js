import React, { useState } from "react";
import { RoughNotation } from "react-rough-notation";

export default function WithdrawalRequestsWireframe() {
    const [modal, setModal] = useState(null); // {action: "approve" | "reject", id: number}

    const handleAction = (action, id) => {
        setModal({ action, id, reason: "" });
    };

    return (
        <div className="flex h-screen font-mono text-black">
            {/* Sidebar */}
            <div className="w-64 border-r border-black p-4 space-y-3 bg-white">
                <p className="text-xs mb-4">
                    WELCOME, <br /> CODEVERSE.AD@GMAIL.COM
                </p>
                <ul className="space-y-2 text-sm">
                    <li>My Profile</li>
                    <li>System Statistics</li>
                    <li>User Management</li>
                    <li>Approve Instructor Requests</li>
                    <li>Category Management</li>
                    <li>Course Management</li>
                    <li>Report Reason Management</li>
                    <li>Violation Management</li>
                    <li>Send Notifications</li>
                    <li>Withdrawal Requests</li>
                </ul>
                <div className="mt-6 text-xs">
                    <p>Settings</p>
                    <p>Logout</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 bg-white overflow-auto">
                <h2 className="text-xl font-bold mb-4">
                    <RoughNotation type="underline" show={true} color="black">
                        Withdrawal Requests
                    </RoughNotation>
                </h2>

                {/* Table */}
                <table className="w-full border border-black text-sm">
                    <thead>
                        <tr>
                            <th className="border border-black px-2 py-1">ID</th>
                            <th className="border border-black px-2 py-1">Instructor</th>
                            <th className="border border-black px-2 py-1">Amount</th>
                            <th className="border border-black px-2 py-1">Date</th>
                            <th className="border border-black px-2 py-1">Status</th>
                            <th className="border border-black px-2 py-1">Method</th>
                            <th className="border border-black px-2 py-1">Note</th>
                            <th className="border border-black px-2 py-1">QR Code</th>
                            <th className="border border-black px-2 py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Pending row with actions */}
                        <tr>
                            <td className="border border-black px-2 py-1">7</td>
                            <td className="border border-black px-2 py-1">Instructor C</td>
                            <td className="border border-black px-2 py-1">22.000 đ</td>
                            <td className="border border-black px-2 py-1">2025-08-18 23:36</td>
                            <td className="border border-black px-2 py-1">PENDING</td>
                            <td className="border border-black px-2 py-1">Bank Transfer</td>
                            <td className="border border-black px-2 py-1">N/A</td>
                            <td className="border border-black px-2 py-1">View</td>
                            <td className="border border-black px-2 py-1 flex gap-2">
                                <button
                                    onClick={() => handleAction("approve", 7)}
                                    className="border-2 border-black px-2 py-1"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleAction("reject", 7)}
                                    className="border-2 border-black px-2 py-1"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white border-4 border-black p-6 w-96 space-y-4">
                        {modal.action === "approve" ? (
                            <>
                                <h3 className="font-bold">Confirm Approval</h3>
                                <p>Are you sure you want to approve request #{modal.id}?</p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        className="border border-black px-3 py-1"
                                        onClick={() => setModal(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="border-2 border-black px-3 py-1"
                                        onClick={() => {
                                            alert(`Approved ID ${modal.id}`);
                                            setModal(null);
                                        }}
                                    >
                                        Approve
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="font-bold">Reject Withdrawal Request</h3>
                                <p>Please provide a reason to reject request #{modal.id}:</p>
                                <textarea
                                    className="w-full border border-black p-2"
                                    rows={3}
                                    value={modal.reason}
                                    onChange={(e) =>
                                        setModal({ ...modal, reason: e.target.value })
                                    }
                                    placeholder="Reason for rejection"
                                />
                                <div className="flex justify-end gap-3">
                                    <button
                                        className="border border-black px-3 py-1"
                                        onClick={() => setModal(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="border-2 border-black px-3 py-1"
                                        onClick={() => {
                                            alert(
                                                `Rejected ID ${modal.id} with reason: ${modal.reason}`
                                            );
                                            setModal(null);
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
