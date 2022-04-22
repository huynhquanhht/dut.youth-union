import Vue from 'vue';
import VueRouter from 'vue-router';
import localStorageUtils from "@/utils/local_storage";
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login'),
    meta: { title: 'Đăng nhập' },
    beforeEnter: async (to, from, next) => {
      const token = localStorageUtils.getService().getToken();
      if (!token) {
        next();
      } else {
        router.push("/admin/activity");
      }
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/Home'),
    redirect: () => { return 'login' },
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin/AdminPage'),
    children: [
      {
        path: 'association-union-branch',
        name: 'association-union-branch-list',
        meta: { title: 'Quản lý Liên chi đoàn' },
        component: () => import('@/views/AssociationUnionBranch/List'),
      },
      {
        path: 'activity',
        name: 'activity-list',
        component: () => import('@/views/Activity/List'),
        meta: { title: 'Quản lý hoạt động' },
        props: (route) => ({
          id: !+route.query.id ? null : +route.query.id,
          name: !route.query.name ? null : route.query.name,
          page: !+route.query.page ? 1 : +route.query.page,
          size: !+route.query.size ? 10 : +route.query.size,
        }),
      },
      {
        path: 'activity/create',
        name: 'create-activity',
        meta: { title: 'Tạo mới hoạt động'},
        component: () => import('@/views/Activity/ActivityForm'),
      },
      {
        path: 'activity/:id',
        name: 'edit-activity',
        meta: { title: 'Chỉnh sửa hoạt động'},
        component: () => import('@/views/Activity/ActivityForm'),
      },
      {
        path: 'union-branch',
        name: 'union-branch-list',
        meta: { title: 'Quản lý chi đoàn'},
        props: (route) => ({
          CurrentPage: !+route.query.CurrentPage ? 1 : +route.query.CurrentPage,
          PageSize: !+route.query.PageSize ? 10 : +route.query.PageSize,
          Course: !+route.query.Course ? null : +route.query.Course,
        }),
        component: () => import('@/views/UnionBranch/List'),
      },

      {
        path: 'union-member',
        name: 'union-member-list',
        meta: { title: 'Quản lý đoàn viên'},
        props: (route) => ({
          CurrentPage: !+route.query.CurrentPage ? 1 : +route.query.CurrentPage,
          PageSize: !+route.query.PageSize ? 10 : +route.query.PageSize,
          ActivityClass: !route.query.ActivityClass ? null : route.query.ActivityClass,
          Email: !route.query.Email ? null : route.query.Email,
          Phone: !route.query.Phone ? null : route.query.Phone,
        }),
        component: () => import('@/views/UnionMember/List'),
      }
    ],
  },
  {
    path: '/error403',
    name: 'error403',
    component: () => import('@/views/ErrorPage/ErrorPage'),
  },
  {
    path: '*',
    name: 'error404',
    component: () => import('@/views/ErrorPage/ErrorPage'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
