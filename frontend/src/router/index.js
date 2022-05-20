import Vue from 'vue';
import VueRouter from 'vue-router';
import localStorageUtils from "@/utils/local_storage";
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: ()  => import('@/views/Login/Login'),
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
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/Home'),
    meta: { title: 'DUT Union - Hệ thống quản lý đoàn thanh niên Đại học Bách Khoa Đà Nẵng' },
    // redirect: () => { return 'login' },
  },
  {
    path: '/',
    component: () => import('@/views/MainPage/MainPage'),
    children: [
      {
        path: 'faculty',
        name: 'faculty',
        meta: { title: 'Quản lý Liên chi đoàn' },
        component: () => import('@/views/Faculty/List'),
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
        path: 'activity-class',
        name: 'activity-class-list',
        meta: { title: 'Quản lý lớp sinh hoạt'},
        props: (route) => ({
          page: !+route.query.page ? 1 : +route.query.page,
          size: !+route.query.size ? 10 : +route.query.size,
          name: !route.query.name ? null: route.query.name,
          courseName: !route.query.courseName ? null: route.query.courseName,
          facultyName: !route.query.facultyName ? null : route.query.facultyName,
        }),
        component: () => import('@/views/ActivityClass/List'),
      },
      {
        path: 'student',
        name: 'student-list',
        meta: { title: 'Quản lý đoàn viên'},
        props: (route) => ({
          page: !+route.query.page ? 1 : +route.query.page,
          size: !+route.query.size ? 10 : +route.query.size,
          name: !route.query.name ? null : route.query.name,
          className: !route.query.className ? null : route.query.className,
        }),
        component: () => import('@/views/Student/List'),
      },
      {
        path: 'user',
        name: 'user-list',
        meta: { title: 'Quản lý người dùng'},
        props: (route) => ({
          page: !+route.query.page ? 1 : +route.query.page,
          size: !+route.query.size ? 10 : +route.query.size,
        }),
        component: () => import('@/views/User/List'),
      },
      {
        path: 'author',
        name: 'author-list',
        meta: { title: 'Quản lý phân quyền'},
        component: () => import('@/views/Author/List'),
      },
      {
        path: 'account-group',
        name: 'account-group-list',
        meta: { title: 'Nhóm tài khoản'},
        component: () => import('@/views/AccountGroup/List'),
      },
      {
        path: 'union-textbook',
        name: 'union-textbook-list',
        props: (route) => ({
          page: !+route.query.page ? 1 : +route.query.page,
          size: !+route.query.size ? 10 : +route.query.size,
          name: !route.query.name ? null : route.query.name,
          className: !route.query.className ? null : route.query.className,
        }),
        meta: { title: 'Quản lý sổ đoàn'},
        component: () => import('@/views/UnionTextbook/List'),
      },
      {
        path: 'union-fee',
        name: 'union-fee-list',
        props: (route) => ({
          page: !+route.query.page ? 1 : +route.query.page,
          size: !+route.query.size ? 10 : +route.query.size,
          name: !route.query.name ? null : route.query.name,
          className: !route.query.className ? null : route.query.className,
        }),
        meta: { title: 'Quản lý đợt thu đoàn phí'},
        component: () => import('@/views/UnionFee/List'),
      },
      {
        path: 'union-fee-of-student',
        name: 'union-fee-of-student-list',
        props: (route) => ({
          page: !+route.query.page ? 1 : +route.query.page,
          size: !+route.query.size ? 10 : +route.query.size,
          name: !route.query.name ? null : route.query.name,
          className: !route.query.className ? null : route.query.className,
        }),
        meta: { title: 'Quản lý đoàn phí'},
        component: () => import('@/views/UnionFeeOfStudent/List'),
      }
      // {
      //   path: 'function',
      //   name: 'functions',
      //   meta: { title: 'Quanr lý chức năng'},
      //   props: (route) => ({
      //     page: !+route.query.page ? 1 : +route.query.page,
      //     size: !+route.query.size ? 10 : +route.query.size,
      //   }),
      //   component: () => import('@/views/Function/List'),
      // }
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
