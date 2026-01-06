import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/public/_layout/books/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Books />
}

export default function Books() {

  const books = [
    {
      id: 1,
      title: "Python Web 开发",
      author: "张三",
      cover: "https://goonwrite.com/cover3/28884.jpg",
      description: "介绍 Python 在 Web 开发中的应用。",
    },
    {
      id: 2,
      title: "React 前端开发实践",
      author: "李四",
      cover: "https://goonwrite.com/cover3/28885.jpg",
      description: "系统讲解 React 框架与组件化开发。",
    },
    {
      id: 3,
      title: "数据库系统原理",
      author: "王五",
      cover: "https://goonwrite.com/cover3/28886.jpg",
      description: "涵盖关系型数据库与 SQL 基础。",
    },
    {
      id: 4,
      title: "数据库系统原理",
      author: "王五",
      cover: "https://goonwrite.com/cover3/28887.jpg",
      description: "涵盖关系型数据库与 SQL 基础。",
    },
    {
      id: 5,
      title: "数据库系统原理",
      author: "王五",
      cover: "https://goonwrite.com/cover3/28888.jpg",
      description: "涵盖关系型数据库与 SQL 基础。",
    },
  ];

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          图书列表
        </h2>
        <p className="text-gray-600 mt-1">
          浏览系统中可借阅的图书资源
        </p>
      </div>

      {/* 图书列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition"
          >
            {/* 图书封面 */}
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-56 object-cover rounded-t-lg"
            />

            {/* 图书信息 */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                作者：{book.author}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {book.description}
              </p>

              {/* 详情按钮 */}
              <Link
                to={`/public/books/${book.id}`}
                className="inline-block mt-4 text-sm text-blue-600 hover:underline"
              >
                查看详情 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
