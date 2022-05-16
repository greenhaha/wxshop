import React, { useState } from 'react';
import { Upload, message, Button, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Axios from 'axios';
import './image.less';
const Page = () => {
    const [fileList, setFileList] = useState<any>([]);
    const [alertFlag, setAlertFlay] = useState<any>(false);
    const [alertSuccessFlag, setAlertSuccessFlag] = useState<any>(false);
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info: { file: { status: string; name: any }; fileList: any }) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const handleUpload = () => {};
    const handleFileChange = ({ file, fileList }: any) => {
        //处理文件change，保证用户选择的文件只有一个
        const fileListArr = fileList.length ? [fileList[fileList.length - 1]] : [];
        setFileList(fileListArr);
        console.log(fileList);
        const formData = new FormData();
        fileList.forEach((element: { originFileObj: string | Blob }) => {
            formData.append('file', element.originFileObj);
        });
        if (file.uid === fileList[fileList.length - 1].uid) {
            setAlertFlay(true);
            Axios({
                method: 'post',
                url: '/api/uploadImage',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then(({ data }) => {
                    console.log(data);
                    setAlertFlay(false);
                    setAlertSuccessFlag(true);
                    setTimeout(() => {
                        setAlertSuccessFlag(false);
                    }, 3000);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                {alertSuccessFlag ? (
                    <Alert message="Success Tips" description="上传成功" type="success" showIcon />
                ) : null}
                {alertFlag ? (
                    <Alert
                        message="Warning"
                        description="文件正在上传中，请勿重复点击，请稍等。。。"
                        type="warning"
                        showIcon
                    />
                ) : null}
            </div>
            <Upload
                multiple
                beforeUpload={(f, fList) => false}
                listType="picture"
                className="upload-list-inline"
                onChange={handleFileChange}
                progress={{
                    strokeColor: {
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    },
                    strokeWidth: 3,
                    format: (percent: number | undefined) =>
                        `${parseFloat(percent ? percent.toFixed(2) : '0')}%`,
                }}
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </>
    );
};

export default Page;
