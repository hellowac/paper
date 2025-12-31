# FastAPI 项目 - 后端

## 依赖要求

* Docker
* uv：用于 Python 包与虚拟环境管理

## Docker Compose

请按照 `../development.md` 中的指南，使用 Docker Compose 启动本地开发环境。

## 通用工作流

默认情况下，项目依赖由 uv 管理，请先前往其官方文档完成安装。

在 `./backend/` 目录下，可通过以下命令安装所有依赖：

```console
$ uv sync
```

然后激活虚拟环境：

```console
$ source .venv/bin/activate
```

请确保你的编辑器正在使用正确的 Python 虚拟环境，解释器路径应为 `backend/.venv/bin/python`。

* 数据与 SQL 表的 SQLModel 模型：`./backend/app/models.py`
* API 接口：`./backend/app/api/`
* CRUD（创建、读取、更新、删除）工具：`./backend/app/crud.py`

## VS Code

项目已预先配置好通过 Visual Studio Code 调试后端，你可以直接使用断点、暂停执行并查看变量等功能。

同时也已配置好在 VS Code 的 Python 测试面板中运行测试。

## Docker Compose Override

在开发期间，你可以在 `docker-compose.override.yml` 文件中修改 Docker Compose 配置，这些修改**仅影响本地开发环境**，不会影响生产环境。

因此，你可以添加一些“临时性”的配置来提升开发效率。

例如：后端代码目录会以卷的形式挂载到 Docker 容器中，你在本地修改的代码会实时同步到容器内，无需重新构建 Docker 镜像即可测试修改。这种方式只适合开发阶段；在生产环境中，应使用包含最新后端代码的 Docker 镜像。但在开发阶段，这能让你快速迭代。

此外，还存在一个命令覆盖配置，使容器运行 `fastapi run --reload` 而不是默认的 `fastapi run`。它只启动单进程（而非生产环境中的多进程），并在代码发生变化时自动重载。需要注意的是：如果你保存了包含语法错误的 Python 文件，服务会报错并退出，容器也会停止。修复错误后，可通过以下命令重新启动：

```console
$ docker compose watch
```

还有一个被注释掉的 `command` 覆盖配置，你可以取消注释并注释掉默认命令。这样后端容器将运行一个“什么也不做”的进程，但会保持容器存活。随后你可以进入容器内部执行命令，例如启动 Python 解释器检查依赖，或手动启动支持热重载的开发服务器。

要以 `bash` 会话方式进入容器，可先启动服务栈：

```console
$ docker compose watch
```

然后在另一个终端中执行：

```console
$ docker compose exec backend bash
```

你将看到类似如下的输出：

```console
root@7f2607af31c3:/app#
```

这表示你已以 `root` 用户身份进入容器内的 `/app` 目录。该目录下还有一个 `app` 子目录，即容器内代码所在位置：`/app/app`。

此时你可以运行以下命令启动支持热重载的调试服务器：

```console
$ fastapi run --reload app/main.py
```

执行后效果类似：

```console
root@7f2607af31c3:/app# fastapi run --reload app/main.py
```

当检测到代码变化时，服务器会自动重载。如果出现语法错误，进程会停止；但由于容器仍在运行、你仍处于 Bash 会话中，修复错误后可通过方向键上键加回车快速重新启动。

这也是让容器“空跑”并在 Bash 会话中手动启动热重载服务的实际价值所在。

## 后端测试

运行后端测试：

```console
$ bash ./scripts/test.sh
```

测试基于 Pytest，你可以在 `./backend/tests/` 中修改或新增测试。

如果使用 GitHub Actions，测试将会自动运行。

### 在已运行的服务栈中执行测试

如果服务栈已经启动，仅需运行测试，可使用：

```bash
docker compose exec backend bash scripts/tests-start.sh
```

`/app/scripts/tests-start.sh` 脚本会在确认其余服务正常运行后调用 `pytest`。如需向 `pytest` 传递额外参数，可直接附加到该命令中。

例如，在首次错误时停止：

```bash
docker compose exec backend bash scripts/tests-start.sh -x
```

### 测试覆盖率

测试运行完成后，会生成 `htmlcov/index.html` 文件，可在浏览器中打开查看测试覆盖率报告。

## 数据库迁移

由于在本地开发中，应用目录会作为卷挂载到容器内，你可以直接在容器中运行 Alembic 迁移命令，生成的迁移代码会保存在应用目录中（而非仅存在于容器内），因此可以提交到 Git 仓库。

请确保每次修改模型后都创建一个新的“修订（revision）”，并将数据库升级到该修订版本，否则数据库表不会更新，应用将产生错误。

操作步骤如下：

* 进入后端容器的交互式会话：

```console
$ docker compose exec backend bash
```

* Alembic 已配置为从 `./backend/app/models.py` 中导入 SQLModel 模型。

* 修改模型后（例如新增字段），在容器中生成迁移修订：

```console
$ alembic revision --autogenerate -m "Add column last_name to User model"
```

* 将 `alembic` 目录中生成的文件提交到 Git 仓库。

* 创建修订后，执行数据库迁移（真正修改数据库表结构）：

```console
$ alembic upgrade head
```

如果你完全不想使用迁移机制，可在 `./backend/app/core/db.py` 中取消注释以下代码：

```python
SQLModel.metadata.create_all(engine)
```

并在 `scripts/prestart.sh` 中注释掉包含以下内容的行：

```console
$ alembic upgrade head
```

如果你从一开始就不打算使用默认模型，且没有任何历史迁移版本，可以删除 `./backend/app/alembic/versions/` 目录下的所有修订文件（`.py`），然后按上述流程重新创建首个迁移。

## 邮件模板

邮件模板位于 `./backend/app/email-templates/`，其中包含两个目录：`build` 与 `src`。

* `src`：邮件模板源文件
* `build`：应用实际使用的最终邮件模板

在继续之前，请确保已在 VS Code 中安装 [MJML 扩展](https://marketplace.visualstudio.com/items?itemName=attilabuti.vscode-mjml)。

安装完成后，可在 `src` 目录中新建邮件模板。创建完成并在编辑器中打开 `.mjml` 文件后，按 `Ctrl+Shift+P` 打开命令面板，搜索并执行 `MJML: Export to HTML`。该操作会将 `.mjml` 文件转换为 `.html` 文件，随后你可以将其保存到 `build` 目录中。
