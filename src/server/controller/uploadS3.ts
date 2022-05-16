import * as fs from 'fs';
import AWS from 'aws-sdk';
import { PutObjectCommand } from '@aws-sdk/client-s3';

const getFileBody = (ctx: any) => {
    return new Promise((resolve, reject) => {
        const arr = [];
        const headers = ctx.req.header;
        ctx.req.on('data', (chunk) => {
            arr.push(chunk); // 存放请求过来的表单数据
        });
        ctx.req.on('end', () => {
            let total = 0;
            arr.forEach((item) => {
                total += item.length; // 计算文件内容(Buffer)的总长度,里面有文件名等具体的描述信息。
            });
            const list = Buffer.concat(arr, total); // 把读取的每一片buffer数据整合在一起。
            resolve({
                data: list,
                total,
                headers,
            });
            // 解析失败
            ctx.req.on('error', (err) => {
                reject(err);
            });
        });
    });
};

const uploadS3 = async (req: any, res: any, next: any) => {
    const aws = {
        accessKeyId: 'AKIATZJCDBGLBVJMRD4V',
        secretAccessKey: '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',
        bucket: 'ctfxbucket',
        acl: 'private',
    };
    AWS.config.credentials = {
        accessKeyId: aws.accessKeyId,
        secretAccessKey: aws.secretAccessKey,
    };
    AWS.config.region = 'ap-northeast-1';
    const { file } = req.body;
    const params: any = await getFileBody({ req, res });

    const data = params.data;
    // const fileStream = fs.createReadStream(data);
    // console.log(fileStream);
    const s3Client = new AWS.S3();
    const uploadParams = {
        Bucket: aws.bucket,
        // Add the required 'Key' parameter using the 'path' module.
        Key: '22222222',
        // Add the required 'Body' parameter
        Body: data,
    };
    s3Client.upload(uploadParams, (err, data) => {
        console.log(err, data);
        console.log('Successfully uploaded package.');
    });
    next();
};

export default uploadS3;
