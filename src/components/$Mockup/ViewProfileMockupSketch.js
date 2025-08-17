import { RoughNotation } from "react-rough-notation";

export default function ViewProfileMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-[420px] rounded-lg p-6">
                    {/* Header */}
                    <h2 className="text-xl font-bold mb-6">Profile</h2>

                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-6">
                        <RoughNotation type="circle" show={true} strokeWidth={2} color="black">
                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                Avatar
                            </div>
                        </RoughNotation>
                        <h3 className="mt-4 text-lg font-bold">User Name</h3>
                    </div>

                    {/* Update Profile button */}
                    <div className="mb-6 flex justify-center">
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <button className="px-4 py-2 bg-white font-semibold">
                                Update Profile
                            </button>
                        </RoughNotation>
                    </div>

                    {/* Info fields */}
                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold">Email</p>
                            <p>user@gmail.com</p>
                        </div>

                        <div>
                            <p className="font-semibold">Full Name</p>
                            <p>Le Quang Trieu</p>
                        </div>

                        <div>
                            <p className="font-semibold">Phone Number</p>
                            <p>0123456789</p>
                        </div>

                        <div>
                            <p className="font-semibold">Biography</p>
                            <p>Some short description...</p>
                        </div>

                        <div>
                            <p className="font-semibold">Registration Date</p>
                            <p>Jul 05, 2025</p>
                        </div>
                    </div>
                </div>
            </RoughNotation>
        </div>
    );
}
