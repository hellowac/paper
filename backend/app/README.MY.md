# windows环境

操作记录

## 迁移

生成迁移文件:

```shell
uv run alembic revision --autogenerate -m "init tables"
```

执行迁移文件

```shell
uv run alembic upgrade head
```

## 启动后端

```shell
uv run fastapi run
```

## 初始化用户

```shell
uv run python .\app\initial_data.py
```