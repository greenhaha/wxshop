const formidable = require('formidable');
const co = require('co');
const OSS = require('ali-oss');
const multiparty = require('multiparty');
const client = new OSS({
    region: 'oss-cn-beijing', //自定义项
    accessKeyId: process.env.ACCESSKEYID, //自定义项
    accessKeySecret: process.env.ACCESSKEYSECRET, //自定义项
});
const uploadOss = async (req: any, res: any, next: () => unknown) => {
    // eslint-disable-next-line camelcase
    const alioss_upfile = () => {
        return new Promise((resolve, reject) => {
            const data: any[] = [];
            const form = new multiparty.Form();
            form.parse(
                req,
                async (
                    err: any,
                    fields: any,
                    files: { file: { name: string; path: any; originalFilename: string }[] }
                ) => {
                    if (err) {
                        throw err;
                        // eslint-disable-next-line no-unreachable
                        return;
                    }
                    console.log('=====files=====', files.file);
                    for (const f of files.file) {
                        // 文件名
                        const date = new Date();
                        const time =
                            String(date.getFullYear()) + (date.getMonth() + 1) + date.getDate();
                        const filepath = '/2022/image/' + time + '/' + f.originalFilename;
                        // const fileext = f.originalFilename.split('.').pop();
                        const upfile = f.path;
                        const newfile = filepath;
                        client.useBucket('hlympic');
                        await client
                            .put(newfile, upfile)
                            .then((results: { url: any }) => {
                                console.log('文件上传成功!', results.url);
                                data.push(results.url);
                            })
                            .catch((err: any) => {
                                console.log(err);
                            });
                    }

                    res.send({ code: 200, data: data });
                }
            );
        });
    };
    await alioss_upfile();
};

export default uploadOss;
