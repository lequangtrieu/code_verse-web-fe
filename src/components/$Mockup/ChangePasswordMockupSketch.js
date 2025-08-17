import { RoughNotation } from "react-rough-notation";

export default function ChangePasswordMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-[420px] rounded-lg p-6">
                    {/* Header */}
                    <h2 className="text-xl font-bold mb-6">Change Password</h2>

                    {/* Current Password */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Current Password
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white border-none outline-none"
                            type="password"
                        />
                    </RoughNotation>

                    {/* New Password */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * New Password
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white border-none outline-none"
                            type="password"
                        />
                    </RoughNotation>

                    {/* Confirm New Password */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Confirm New Password
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-6 bg-white border-none outline-none"
                            type="password"
                        />
                    </RoughNotation>

                    {/* Change Password button */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <button className="w-full py-2 bg-white font-semibold">
                            Change Password
                        </button>
                    </RoughNotation>
                </div>
            </RoughNotation>
        </div>
    );
}
