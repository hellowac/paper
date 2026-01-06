import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/public/_layout/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "首页 - WAC图书管理系统",
      },
    ],
  }),
})

function RouteComponent() {
  return <Home />
}


export default function Home() {
  return (
    <div className="space-y-10">
      {/* 系统介绍 */}
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          系统介绍
        </h2>
        <p className="text-gray-700 leading-relaxed">
          本图书管理系统是一个基于 React 前端与 FastAPI 后端构建的
          Web 应用系统，主要面向高校及中小型图书管理场景。
          系统通过前后端分离架构，实现图书信息管理、用户管理、
          借阅与归还流程控制等功能，旨在提升图书管理的效率、
          准确性与用户使用体验。
        </p>
      </section>

      {/* 功能模块 */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          系统功能
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-blue-600 mb-2">
              图书信息管理
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              支持图书信息的查询、浏览与分类展示，方便用户快速
              获取所需图书资源。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-blue-600 mb-2">
              借阅与归还管理
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              实现图书借阅与归还流程的规范化管理，提高图书流通效率，
              减少人工操作失误。
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-blue-600 mb-2">
              用户与权限控制
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              通过用户身份认证与权限控制机制，保障系统数据安全
              与操作规范性。
            </p>
          </div>
        </div>
      </section>

      {/* 公告信息 */}
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          系统公告
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li className="border-l-4 border-blue-500 pl-4">
            📢 系统已完成基础功能开发并进入测试阶段。
          </li>
          <li className="border-l-4 border-blue-500 pl-4">
            📢 新版本将进一步优化借阅流程与界面交互体验。
          </li>
          <li className="border-l-4 border-blue-500 pl-4">
            📢 请用户妥善保管个人账号信息，避免泄露。
          </li>
        </ul>
      </section>
    </div>
  );
}
