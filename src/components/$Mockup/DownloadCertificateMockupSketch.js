import { RoughNotation } from "react-rough-notation";

export default function DownloadCertificateMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-[600px] rounded-lg p-6 space-y-4 bg-white text-black">
                    {/* Section Header */}
                    <h2 className="text-xl font-bold mb-4">My Certificates</h2>

                    {/* Certificate Item */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4 bg-white flex justify-between items-center">
                            {/* Left Info */}
                            <div>
                                <p className="font-semibold underline">JavaScript basics</p>
                                <p className="text-sm">tientnmde170657@fpt.edu.vn</p>
                                <p className="text-xs">Completed on: August 6, 2025</p>
                            </div>

                            {/* Right Buttons */}
                            <div className="flex gap-3">
                                <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                                    <button className="px-3 py-1 bg-white text-sm font-semibold">
                                        View
                                    </button>
                                </RoughNotation>
                                <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                                    <button className="px-3 py-1 bg-white text-sm font-semibold">
                                        Download
                                    </button>
                                </RoughNotation>
                                <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                                    <button className="px-3 py-1 bg-white text-sm font-semibold">
                                        Copy URL
                                    </button>
                                </RoughNotation>
                            </div>
                        </div>
                    </RoughNotation>
                </div>
            </RoughNotation>
        </div>
    );
}
