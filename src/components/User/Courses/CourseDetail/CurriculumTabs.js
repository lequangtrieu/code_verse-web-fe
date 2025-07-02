import React from "react";
import { Collapse, Tabs } from "antd";
import { BsFileEarmarkText } from "react-icons/bs";
import { FaPlayCircle, FaLock } from "react-icons/fa";
import Reviews from "./Reviews";

const { Panel } = Collapse;
const { TabPane } = Tabs;


const CurriculumTabs = ({ curriculumData }) => {
    const reviewsData = [
        {
            username: "John Doe",
            userAvatar: "https://pethelpful.com/.image/c_fill,g_faces:center/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg",
            rating: 5,
            comment:
                "This course is amazing! Learned a lot about software development.",
        },
        {
            username: "Jane Smith",
            userAvatar: "https://pethelpful.com/.image/c_fill,g_faces:center/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg",
            rating: 4,
            comment: "Great course, but I wish there were more examples.",
        },
        {
            username: "Alice Brown",
            userAvatar: "https://pethelpful.com/.image/c_fill,g_faces:center/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg",
            rating: 4,
            comment: "Good content but the course could be a bit faster.",
        },
        {
            username: "Bob White",
            userAvatar: "https://pethelpful.com/.image/c_fill,g_faces:center/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg",
            rating: 3,
            comment: "The course was helpful, but the explanations were too brief.",
        },
    ];
    return (
        <Tabs defaultActiveKey="curriculum" className="mt-10">
            <TabPane tab="Curriculum" key="curriculum">
                <Collapse accordion className="mt-4">
                    {curriculumData.map((section, index) => (
                        <Panel
                            header={
                                <div className="flex justify-between font-semibold">
                                    <span>{section.title}</span>
                                    <span className="text-xs text-gray-400">{section.duration}</span>
                                </div>
                            }
                            key={index}
                        >
                            {section.items.map((item, idx) =>
                                typeof item === "string" ? (
                                    <p key={idx} className="text-gray-600 mb-2 flex items-center gap-2">
                                        <BsFileEarmarkText className="text-purple-600" />
                                        {item}
                                    </p>
                                ) : (
                                    <div key={idx} className="flex items-center justify-between border-b py-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            {item.type === "video" ? <FaPlayCircle /> : <FaLock />}
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
            <TabPane tab="Description" key="description">
                <div className="mt-6 text-gray-600">
                    This is a detailed description of the course.
                </div>
            </TabPane>
            <TabPane tab="Reviews" key="reviews">
                <div className="mt-6 text-gray-600">
                    <Reviews reviewsData={reviewsData} />
                </div>
            </TabPane>
            <TabPane tab="Instructor" key="instructor">
                <div className="mt-6 text-gray-600">
                    Instructor details section goes here.
                </div>
            </TabPane>
        </Tabs>
    );
};

export default CurriculumTabs;
