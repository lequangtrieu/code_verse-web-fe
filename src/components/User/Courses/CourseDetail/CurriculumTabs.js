import React from "react";
import {Collapse, Tabs} from "antd";
import {BsFileEarmarkText} from "react-icons/bs";
import {FaLock, FaRegEye} from "react-icons/fa";
import Reviews from "./Reviews";

const { Panel } = Collapse;
const { TabPane } = Tabs;


const CurriculumTabs = ({ curriculumData, courseDetailData }) => {
    return (
        <Tabs defaultActiveKey="curriculum" className="mt-10">
            <TabPane tab="Curriculum" key="curriculum">
                <Collapse accordion className="mt-4">
                    {curriculumData.map((section, index) => (
                        <Panel
                            header={
                                <div className="flex justify-between font-semibold">
                                    <span>{section.courseModule.title}</span>
                                    <span className="text-xs text-gray-400">{section.totalDuration}</span>
                                </div>
                            }
                            key={index}
                        >
                            {section.lessons.map((item, idx) =>
                                typeof item === "string" ? (
                                    <p key={idx} className="text-gray-600 mb-2 flex items-center gap-2">
                                        <BsFileEarmarkText className="text-purple-600" />
                                        {item}
                                    </p>
                                ) : (
                                    <div key={idx} className="flex items-center justify-between border-b py-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            {item.orderIndex < 3 ? <FaRegEye /> : <FaLock />}
                                            <span>{item.type === "video" ? "Video: " : "Lesson: "} {item.title}</span>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {item.duration ? item.duration : `${item.questionCount} Ques`}
                                        </div>
                                    </div>
                                )
                            )}
                        </Panel>
                    ))}
                </Collapse>
            </TabPane>
            <TabPane tab="Reviews" key="reviews">
                <div className="mt-6 text-gray-600">
                    <Reviews courseId={courseDetailData?.id} />
                </div>
            </TabPane>
        </Tabs>
    );
};

export default CurriculumTabs;
