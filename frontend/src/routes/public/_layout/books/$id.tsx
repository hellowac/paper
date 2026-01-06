import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/public/_layout/books/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BookDetail />
}


function BookDetail() {
  const { id } = Route.useParams();

  const book = {
    id,
    title: "React 前端开发实践",
    author: "李四",
    category: "计算机技术",
    publisher: "电子工业出版社",
    publishDate: "2022-06",
    cover: "https://goonwrite.com/cover3/28884.jpg",
    status: "可借阅",
    description:
      "本书系统介绍了 React 框架的核心思想、组件化开发模式以及在实际项目中的应用方法，适合具有一定前端基础的读者学习。",
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧：图书封面 */}
        <div className="flex-shrink-0">
          <img
            src={book.cover}
            alt={book.title}
            className="w-48 h-64 object-cover rounded"
          />
        </div>

        {/* 右侧：图书信息 */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {book.title} - id {id}
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">作者：</span>
              {book.author}
            </p>
            <p>
              <span className="font-medium">分类：</span>
              {book.category}
            </p>
            <p>
              <span className="font-medium">出版社：</span>
              {book.publisher}
            </p>
            <p>
              <span className="font-medium">出版时间：</span>
              {book.publishDate}
            </p>
            <p>
              <span className="font-medium">当前状态：</span>
              <span className="text-green-600">{book.status}</span>
            </p>
          </div>

          {/* 借阅按钮 */}
          <div className="mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              借阅图书
            </button>
          </div>
        </div>
      </div>

      {/* 图书简介 */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          图书简介
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {book.description}
        </p>
      </div>
    </div>
  );
}
