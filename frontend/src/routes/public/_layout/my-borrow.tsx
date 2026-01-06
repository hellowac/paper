import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";

export const Route = createFileRoute('/public/_layout/my-borrow')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MyBorrow />
}

function MyBorrow() {

  const allBorrows = [
    {
      id: 1,
      title: "React 前端开发实践",
      borrowDate: "2024-12-01",
      returnDate: "-",
      status: "借阅中",
    },
    {
      id: 2,
      title: "Python Web 开发",
      borrowDate: "2024-11-20",
      returnDate: "2024-11-22",
      status: "已归还",
    },
    {
      id: 3,
      title: "数据库系统原理",
      borrowDate: "2024-11-15",
      returnDate: "-",
      status: "借阅中",
    },
    {
      id: 4,
      title: "操作系统原理",
      borrowDate: "2024-11-10",
      returnDate: "2024-11-28",
      status: "已归还",
    },
    {
      id: 5,
      title: "计算机网络",
      borrowDate: "2024-11-05",
      returnDate: "-",
      status: "借阅中",
    },
  ];

  // 分页参数
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allBorrows.length / pageSize);
  const currentData = allBorrows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 模拟归还操作
  const handleReturn = (id: number) => {
    alert(`图书（ID：${id}）归还成功`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          我的借阅
        </h2>
        <p className="text-gray-600 mt-1">
          查看并管理当前用户的借阅记录
        </p>
      </div>

      {/* 借阅表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">序号</th>
              <th className="px-4 py-2 border">图书名称</th>
              <th className="px-4 py-2 border">借阅日期</th>
              <th className="px-4 py-2 border">归还日期</th>
              <th className="px-4 py-2 border">状态</th>
              <th className="px-4 py-2 border">操作</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="px-4 py-2 border">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="px-4 py-2 border">{item.title}</td>
                <td className="px-4 py-2 border">{item.borrowDate}</td>
                <td className="px-4 py-2 border">{item.returnDate}</td>
                <td className="px-4 py-2 border">
                  {item.status === "借阅中" ? (
                    <span className="text-blue-600 font-medium">
                      借阅中
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      已归还
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {item.status === "借阅中" ? (
                    <button
                      onClick={() => handleReturn(item.id)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      归还
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex justify-end items-center mt-6 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:text-gray-400"
        >
          上一页
        </button>

        <span className="text-sm text-gray-600">
          第 {currentPage} / {totalPages} 页
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:text-gray-400"
        >
          下一页
        </button>
      </div>
    </div>
  );
}
