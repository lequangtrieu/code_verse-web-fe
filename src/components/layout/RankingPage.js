import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Select, Table, Avatar, message } from "antd";
import commonApi from "../../common/api";
import useDocumentTitle from "../../common/useDocumentTitle";
import { UserOutlined } from "@ant-design/icons";

const { Option } = Select;

const RankingPage = () => {
    const [rankingData, setRankingData] = useState([]);
    const [topThree, setTopThree] = useState([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useDocumentTitle("Ranking - CodeVerse");
    const fetchRanking = async () => {
        try {
            setLoading(true);
            const response = await axios.get(commonApi.ranking.userExp.url(period));
            const data = response.data || [];
            setRankingData(data);
            setTopThree(data.slice(0, 3));
        } catch (error) {
            message.error("Failed to fetch ranking data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRanking();
    }, [period]);

    const columns = [
        {
            title: "Rank",
            dataIndex: "rank",
            render: (_, __, index) =>
                (currentPage - 1) * pageSize + index + 4,
                   },
        {
            title: "User",
            dataIndex: "username",
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <Avatar src={record.avatar} icon={<UserOutlined />}/>
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: "EXP",
            dataIndex: "totalExp",
        },
    ];


    return (
        <div className="p-8 lg:px-8 lg:py-8 lg:pl-[100px] lg:pr-[100px]">
            {/* Period Selector */}
            <div className="mb-6">
                <span className="mr-2 font-medium">Select Period:</span>
                <Select
                    value={period}
                    onChange={(value) => {
                        setPeriod(value);
                        setCurrentPage(1);
                    }}
                    style={{ width: 150 }}
                >
                    <Option value="ALL">All Time</Option>
                    <Option value="YEAR">This Year</Option>
                    <Option value="MONTH">This Month</Option>
                    <Option value="WEEK">This Week</Option>
                    <Option value="DAY">Today</Option>
                </Select>
            </div>

            {/* Top 3 */}
            <div className="flex flex-col lg:flex-row justify-center gap-6 mb-8 items-center">
                {topThree.length === 3 && (
                    <>
                        {/* Top 2 - trái */}
                        <Card
                            title={`#2 - ${topThree[1].username}`}
                            className="text-center border border-pink-300 shadow-md w-full order-2 lg:order-1"
                        >
                            <Avatar size={64} src={topThree[1].avatar} className="mb-2" />
                            <div className="text-lg font-semibold">{topThree[1].totalExp} EXP</div>
                        </Card>

                        {/* Top 1 - giữa */}
                        <Card
                            title={`#1 - ${topThree[0].username}`}
                            className="text-center border-2 border-yellow-500 shadow-xl w-full order-1 lg:order-2 bg-yellow-50"
                        >
                            <Avatar size={72} src={topThree[0].avatar} className="mb-2" />
                            <div className="text-xl font-bold text-yellow-600">{topThree[0].totalExp} EXP</div>
                        </Card>

                        {/* Top 3 - phải */}
                        <Card
                            title={`#3 - ${topThree[2].username}`}
                            className="text-center border border-pink-300 shadow-md w-full order-3 lg:order-3"
                        >
                            <Avatar size={64} src={topThree[2].avatar} className="mb-2" />
                            <div className="text-lg font-semibold">{topThree[2].totalExp} EXP</div>
                        </Card>
                    </>
                )}
            </div>

            <Table
                dataSource={rankingData.slice(3)}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={{ pageSize, current: currentPage }}
                onChange={(pagination) => {
                    setCurrentPage(pagination.current);
                    setPageSize(pagination.pageSize);
                }}
                loading={loading}
                bordered
            />

        </div>
    );
};

export default RankingPage;
