# FastAPI 项目 - 前端

前端基于 Vite、React、TypeScript、TanStack Query、TanStack Router 以及 Tailwind CSS 构建。

## 前端开发

在开始之前，请确保你的系统中已安装 Node 版本管理工具：Node Version Manager（nvm）或 Fast Node Manager（fnm）中的任意一个。

* 安装 fnm 请参考 [官方 fnm 指南](https://github.com/Schniz/fnm#installation)。如果你更偏好 nvm，可参考 [官方 nvm 指南](https://github.com/nvm-sh/nvm#installing-and-updating)。

* 安装完成 nvm 或 fnm 后，进入 `frontend` 目录：

```bash
cd frontend
```

* 如果系统中尚未安装 `.nvmrc` 文件中指定的 Node.js 版本，可使用相应命令进行安装：

```bash
# 使用 fnm
fnm install

# 使用 nvm
nvm install
```

* 安装完成后，切换到该版本：

```bash
# 使用 fnm
fnm use

# 使用 nvm
nvm use
```

* 在 `frontend` 目录下，安装所需的 NPM 包：

```bash
npm install
```

* 使用以下 `npm` 脚本启动本地开发服务器：

```bash
npm run dev
```

* 然后在浏览器中打开 [http://localhost:5173/](http://localhost:5173/) 。

请注意，这个本地开发服务器并未运行在 Docker 中，它仅用于本地开发，这也是推荐的工作流。当你对前端效果满意后，可以构建前端的 Docker 镜像并启动它，以在更接近生产环境的条件下进行测试。但在每次修改后都重新构建镜像，效率远不如使用支持热更新的本地开发服务器。

可查看 `package.json` 文件以了解其他可用选项。

### 移除前端

如果你正在开发一个仅包含 API 的应用，并希望移除前端，可按以下步骤操作：

* 删除 `./frontend` 目录。
* 在 `docker-compose.yml` 文件中，移除整个 `frontend` 服务（对应的配置段）。
* 在 `docker-compose.override.yml` 文件中，移除整个 `frontend` 和 `playwright` 服务（对应的配置段）。

完成后，你将得到一个不包含前端（仅 API）的应用。🤓

---

如果你愿意，也可以从以下位置移除 `FRONTEND` 相关的环境变量：

* `.env`
* `./scripts/*.sh`

这只是为了清理配置，保留它们实际上也不会产生任何影响。

## 生成客户端代码

### 自动方式

* 激活后端的虚拟环境。
* 在项目根目录下运行脚本：

```bash
./scripts/generate-client.sh
```

* 提交生成的变更。

### 手动方式

* 启动 Docker Compose 服务栈。
* 从 `http://localhost/api/v1/openapi.json` 下载 OpenAPI 的 JSON 文件，并将其复制到 `frontend` 目录根路径下的新文件 `openapi.json` 中。
* 运行以下命令生成前端客户端代码：

```bash
npm run generate-client
```

* 提交生成的变更。

请注意，每当后端发生变化（即 OpenAPI schema 发生变更）时，都需要再次执行上述步骤以更新前端客户端。

## 使用远程 API

如果你希望使用远程 API，可以将环境变量 `VITE_API_URL` 设置为远程 API 的地址。例如，在 `frontend/.env` 文件中设置：

```env
VITE_API_URL=https://api.my-domain.example.com
```

这样在运行前端时，就会使用该地址作为 API 的基础 URL。

## 代码结构

前端代码结构如下：

* `frontend/src` —— 前端主要代码
* `frontend/src/assets` —— 静态资源
* `frontend/src/client` —— 自动生成的 OpenAPI 客户端
* `frontend/src/components` —— 前端各类组件
* `frontend/src/hooks` —— 自定义 hooks
* `frontend/src/routes` —— 前端路由及页面

## 使用 Playwright 进行端到端测试

前端已包含基于 Playwright 的初始端到端测试。运行测试前，需要先启动 Docker Compose 服务栈，使用以下命令启动后端：

```bash
docker compose up -d --wait backend
```

随后，运行测试：

```bash
npx playwright test
```

你也可以以 UI 模式运行测试，以便看到浏览器并进行交互：

```bash
npx playwright test --ui
```

测试完成后，如需停止并移除 Docker Compose 服务栈并清理测试数据，可执行：

```bash
docker compose down -v
```

如需更新测试，请进入 tests 目录，修改现有测试文件或根据需要新增测试。

有关编写和运行 Playwright 测试的更多信息，请参考官方的 [Playwright 文档](https://playwright.dev/docs/intro)。
