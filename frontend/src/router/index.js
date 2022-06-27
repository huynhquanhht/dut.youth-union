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
    name: 'main-page',
    meta: { title: ''},
    component: () => import('@/views/MainPage/MainPage'),
    children: [
      {
        path: 'faculty',
        name: 'faculty',
        meta: { title: 'Quản lý Liên chi đoàn' },
        component: () => import('@/views/Faculty/List'),
      },
      {
        path: 'activity-event',
        name: 'activity-event',
        meta: { title: 'Hoạt động - Sự kiện' },
        component: () => import('@/views/ActivityEvent/List'),
      },
      {
        path: 'activity-event/:id',
        name: 'activity-event',
        meta: { title: 'Chi tiết sự kiện' },
        component: () => import('@/views/ActivityEvent/Detail'),
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
        path: 'accumulated-point',
        name: 'accumulated-point',
        component: () => import('@/views/AccumulatedPoint/PersonalAccumulatedPoint'),
        meta: { title: 'Điểm tích lũy'},
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
        path: 'news',
        name: 'news-list',
        meta: { title: 'Quản lý tin tức'},
        component: () => import('@/views/News/List'),
      },
      {
        path: 'news/create',
        name: 'create-news',
        meta: { title: 'Tạo mới tin tức'},
        component: () => import('@/views/News/NewsForm')
      },
      {
        path: 'news/:id',
        name: 'news-detail',
        meta: { title: 'Cập nhật tin tức'},
        component: () => import('@/views/News/NewsForm')
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
        path: 'profile-me',
        name: 'student-profile',
        meta: { title: 'Thông tin cá nhân'},
        component: () => import('@/views/Profile/Student'),
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
      // {
      //   path: 'me/union-fee',
      //   name: 'me/union-fee-period',
      //   props: (route) => ({
      //     page: !+route.query.page ? 1 : +route.query.page,
      //     size: !+route.query.size ? 10 : +route.query.size,
      //     name: !route.query.name ? null : route.query.name,
      //     className: !route.query.className ? null : route.query.className,
      //   }),
      //   meta: { title: 'Thông tin đoàn phí cá nhân'},
      //   component: () => import('@/views/UnionFeeOfPersonal/List'),
      // },
      {
        path: 'union-fee',
        name: 'union-fee',
        props: (route) => ({
          page: !+route.query.page ? 1 : +route.query.page,
          size: !+route.query.size ? 10 : +route.query.size,
          name: !route.query.name ? null : route.query.name,
          className: !route.query.className ? null : route.query.className,
        }),
        meta: { title: 'Quản lý đoàn phí'},
        component: () => import('@/views/UnionFee/List'),
      },
      {
        path: 'personal-union-fee',
        name: 'personal-union-fee',
        meta: { title: 'Thông tin đoàn phí cá nhân'},
        component: () => import('@/views/UnionFeeOfPersonal/PersonalUnionMemberFee'),
      },
      {
        path: '/registered-list/:id',
        name: 'registered-list',
        meta: { title: 'Danh sách đăng ký'},
        component: () => import('@/views/RegisterJoin/List'),
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
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorPage/ErrorPage'),
    children: [
      {
        path: 'denied-access',
        name: 'denied-access',
        component: () => import('@/views/ErrorPage/ErrorDeniedAccess'),
        meta: { title: 'Error 403 - Forbidden' },
      },
      {
        path: 'other-error',
        name: 'other-error',
        component: () => import('@/views/ErrorPage/ErrorOther'),
        meta: { title: 'Other error' },
      },
      {
        path: 'invalid-token',
        name: 'invalid-token',
        meta: { title: 'Invalid token' },
        component: () => import('../views/ErrorPage/ErrorToken'),
      },
      {
        path: 'internal-server',
        name: 'internal-server',
        meta: { title: 'Error 500 - Internal Server Error' },
        component: () => import('../views/ErrorPage/ErrorInternalServer.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/views/ErrorPage/ErrorPage'),
    children: [
      {
        path: '*',
        name: 'not-found',
        component: () => import('@/views/ErrorPage/ErrorNotFound'),
        meta: { title: 'Error 404 - Not found' },
      },
    ],
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
