import React, { useEffect, useState } from 'react';
import { Typography, Skeleton } from 'antd';
import axiosInstance from '../../../../config/axiosInstance';
import commonApi from '../../../../common/api';

const { Title } = Typography;

const TheoryViewer = ({ lessonId }) => {
    const [loading, setLoading] = useState(true);
    const [theory, setTheory] = useState(null);

    useEffect(() => {
        const fetchTheory = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(commonApi.getTheory.url(lessonId));

                setTheory(response.data.result);
            } catch (err) {
                console.error('Error loading theory', err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 400)
            }
        };

        fetchTheory();
    }, [lessonId]);

    if (loading || !theory) return <Skeleton active />;

    return (
        <div className="prose max-w-none">
            <Title level={4}>{theory.title}</Title>
            <div className="prose" dangerouslySetInnerHTML={{ __html: theory.content }} />
        </div>
    );
};

export default TheoryViewer;
