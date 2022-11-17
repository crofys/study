const Koa = require("koa");
const Router = require("koa-router");
const KoaStatic = require("koa-static");

const path = require("path");
const multiparty = require("multiparty");

const app = new Koa();
const router = new Router();

router.post("/api/upload", async (ctx) => {
  const form = new multiparty.Form({
    uploadDir: "static/hash",
  });
  form.parse(ctx.req);
  form.on("file", () => {
    console.log("上传成功");
  });
  form.on("error", () => {
    console.log("上传失败");
  });
  ctx.response.body = "上传成功 ";
});

app.use(router.routes());
app.use(KoaStatic(path.join(__dirname, "/public")));
// app.use("/static", KoaStatic(path.join(__dirname, "/static")));

app.listen(3000, () => {
  console.log("server listen at port http://127.0.0.1:3000");
});
