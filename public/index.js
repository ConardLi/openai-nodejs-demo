// 表单的提交按钮
const submitButton = document.querySelector("button");
// 表单的 model 和 prompt 字段
const modelInput = document.querySelector("#model");
const promptInput = document.querySelector("#prompt");
// 图片展示区域
const imageContainer = document.querySelector("#image-container");
const image = document.querySelector("#image");

// 绑定表单提交事件
submitButton.addEventListener("click", async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取用户输入的 model 和 prompt
    const model = modelInput.value;
    const prompt = promptInput.value;

    // 调用 API 生成图片
    const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, prompt }),
    });
    const data = await response.json();

    // 将生成的图片展示在页面上
    imageContainer.style.display = "block";
    image.src = data.url;
});