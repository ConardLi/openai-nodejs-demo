const Koa = require("koa");
const { Configuration, OpenAIApi } = require("openai");
const Router = require("koa-router");
const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

// 初始化 openai 库
const configuration = new Configuration({
    apiKey: '',
});
const openai = new OpenAIApi(configuration);

// 使用 koa-bodyparser 插件，对请求数据进行解析
app.use(bodyParser());

router.post("/api/generate-image", async (ctx, next) => {
    const { model, prompt } = ctx.request.body;

    const response = await openai.createImage({
        model: "image-alpha-001",
        prompt,
    });


    console.log(response.data);

    ctx.body = response.data.data[0];
});

// 使用 koa-static 插件，处理静态文件
app.use(serve("./public"));

// 将路由绑定到应用上
app.use(router.routes());

// 启动应用
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});