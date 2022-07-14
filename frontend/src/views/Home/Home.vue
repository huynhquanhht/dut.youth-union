<template>
  <v-app>
    <div class="home-wrapper">
    <div class="home-block">
      <div class="header">
        <div class="logo">
          <img src="../../assets/image/logo-header.svg" alt="header-logo/">
        </div>
        <div class="nav-options">
          <v-tabs
            v-model="tab"
            background-color="#FFFFFF"
          >
            <v-tab
              v-for="item in tabItems"
              :key="item.tab"
            >
              {{ item.tab }}
            </v-tab>
          </v-tabs>
        </div>
        <div class="user-block" v-if="currentUser">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                class="acti-button mr-1"
                icon
                color="#075793"
                width="36px"
                height="36px"
                v-bind="attrs"
                v-on="on"
                @click="goActionPage"
              >
                <v-icon dark size="20">mdi-page-next</v-icon>
              </v-btn>
            </template>
            <span>Kênh hoạt động</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                class="bell-button mr-1"
                icon
                color="#075793"
                width="36px"
                height="36px"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark size="20">mdi-bell</v-icon>
              </v-btn>
            </template>
            <span>Thông báo</span>
          </v-tooltip>
          <profile-option :currentUser="currentUser"/>

        </div>
        <div class="btn-login-block" v-else>
          <v-btn @click="$router.push('/login')">Đăng nhập</v-btn>
        </div>
      </div>
      <div class="banner-news">
        <marquee>
          Cuộc thi “Ý tưởng khởi nghiệp đổi mới sáng tạo Light Up Your Creativity” năm 2022 đã trở lại với các bạn trẻ Đà Nẵng.
          Cuộc thi năm nay hứa hẹn sẽ tạo ra sân chơi thú vị để học sinh, sinh viên, người đi làm được tự do thể hiện các ý tưởng sáng tạo, khởi nghiệp khi mà cuộc sống bình thường đã quay trở lại nhiều nơi.
          Ban tổ chức hi vọng các thí sinh sẽ đưa ra những sáng tạo mang tính đột phá, những ý tưởng khởi nghiệp xuất sắc, trong đó tập trung vào lĩnh vực nông nghiệp công nghệ cao🤖🦾🦿
          Cơ hội tranh tài dành cho các bạn học sinh, sinh viên và người đi làm trên địa bàn thành phố Đà Nẵng; các bạn sinh viên Việt Nam đang học tập tại Hàn Quốc và Áo, sinh viên Trường Đại học Nông Lâm - Đại học Huế!
          Nhóm lĩnh vực dự thi
          - Đối tượng dự thi có thể đăng ký ý tưởng, dự án khởi nghiệp đổi mới sáng tạo thuộc tất cả các ngành, lĩnh vực sản xuất, kinh doanh, dịch vụ, công nghiệp, nông nghiệp, bảo vệ môi trường, ứng phó biến đổi khí hậu.
          - Khuyến khích các ý tưởng, dự án dự thi thuộc các lĩnh vực sau:
          + Ứng dụng khoa học công nghệ, nông nghiệp công nghệ cao, trong đó chú trọng các mô hình kinh tế sản xuất xanh, kinh tế tuần hoàn, sản xuất các sản phẩm thân thiện với môi trường; ứng dụng kỹ thuật nuôi trồng, bảo quản theo tiêu chuẩn vệ sinh, an toàn thực phẩm; triển khai hiệu quả chương trình “Mỗi xã một sản phẩm” - OCOP, hỗ trợ thông tin kênh tiêu thụ sản phẩm cho thanh niên khởi nghiệp, lập nghiệp.
          + Ứng dụng khoa học công nghệ kỹ thuật mới thúc đẩy việc phát triển kinh tế, xã hội cho thanh niên vùng dân tộc thiểu số, vùng sâu, vùng xa với các lĩnh vực chủ yếu là chăn nuôi, trồng trọt ứng dụng kỹ thuật công nghệ mới mang lại hiệu quả kinh tế.
          + Ứng dụng tiến bộ khoa học kỹ thuật, chuyển đổi cơ cấu sản xuất, ứng dụng thương mại điện tử để tiêu thụ sản phẩm; chú trọng hỗ trợ ứng dụng công nghệ trong truy xuất nguồn gốc sản phẩm, đăng ký nhãn hiệu hàng hóa, bản quyền.
          Phần thưởng dành cho ý tưởng chiến thắng vô cùng hấp dẫn bao gồm:
          - 01 Giải nhất: Bằng khen của BCH Đoàn TNCS Hồ Chí Minh Thành phố Đà Nẵng và tiền thưởng 8.000.000 đồng/giải.
          - 01 Giải nhì: Bằng khen của BCH Đoàn TNCS Hồ Chí Minh Thành phố Đà Nẵng và tiền thưởng 5.000.000 đồng giải.
          - 01 Giải ba: Bằng khen của BCH Đoàn TNCS Hồ Chí Minh Thành phố Đà Nẵng và tiền thưởng 3.000.000 đồng/giải.
          - 02 Giải khuyến khích: Bằng khen của BCH Đoàn TNCS Hồ Chí Minh Thành phố Đà Nẵng và tiền thưởng 1.000.000 đồng/giải.
          Ngoài ra Ban Tổ chức sẽ trao giải Dự án tiềm năng và kết nối với Nhà đầu tư.         </marquee>
      </div>
      <div class="event-block">
        <div class="slide-block">
          <v-carousel :show-arrows="true" :cycle="true">
            <v-carousel-item
              v-for="(item,i) in slideItems"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </div>
        <div class="image-block">
          <img src="../../assets/image/mua-he-xanh.jpg" alt="">
          <img src="../../assets/image/282094376_1978610139006451_5596072089181779361_n.jpg" alt="">
        </div>
      </div>
      <div class="content-block">
        <v-row>
          <v-col>
            <div class="notification-block">
              <div class="title-text">
                <v-icon> fa-bullhorn</v-icon>
                <span>THÔNG BÁO</span>
              </div>
              <div class="content">
                <span class="tab">MỚI NHẤT</span>
                <v-divider
                ></v-divider>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">07/07</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Cuộc thi “Ý tưởng khởi nghiệp đổi mới sáng tạo Light Up Your Creativity” năm 2022</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>07/07/2022 22:00</span>
                    </div>
                  </div>
                </div>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">05/07</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Tuyển thành viên đội chủ lực Mùa hè xanh 2022</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>05/07/2022 19:00</span>
                    </div>
                  </div>
                </div>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">04/07</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href=""> Cuộc thi ảnh mùa hè xanh trong tôi</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>04/07/2022 08:30</span>
                    </div>
                  </div>
                </div>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">02/07</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Tập huấn kỹ năng sơ cấp cứu cho TNV tham gia chiến dịch "Sinh viên ĐHĐN tình nguyện hè 2022"</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>02/07/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">01/07</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Cuộc thi thiết kế ấn phẩm truyền thông “Khởi sắc hè tình nguyện”</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>01/07/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">30/06</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Kêu gọi quyên góp "Tủ sách yêu thương" - Mùa hè xanh 2022</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>30/06/2022 17:28</span>
                    </div>
                  </div>
                </div>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">15/06</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Chung kết BK'S ON THE MIC - Đại học Bách Khoa Đà Nẵng</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>15/06/2022 16:39</span>
                    </div>
                  </div>
                </div>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">11/06</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Phát động phong trào "Mùa thi nghiêm túc - Liêm chính học thuật"</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>11/06/2022 21:30</span>
                    </div>
                  </div>
                </div>
                <div class="notification">
                  <div class="post-time">
                    <span class="date">11/06</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Chương trình "Singapore from your home - Understanding Asean"</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>11/06/2022 08:24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col>
            <div class="news-block">
              <div class="title-text">
                <v-icon> fa-newspaper</v-icon>
                <span>TIN TỨC</span>
              </div>
              <div class="content">
                <span class="tab">MỚI NHẤT</span>
                <v-divider
                ></v-divider>
                <div class="news" v-for="(item, index) in newsList.rows" :key="index">
                  <div class="image">
                    <img :src="item.cover_url" alt="">
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">
                          {{ item.title }}
                        </a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span> {{ item.created_at }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col>
            <div class="activity-block">
              <div class="title-text">
                <v-icon> mdi-flag</v-icon>
                <span>DUYỆT HOẠT ĐỘNG </span>
              </div>
              <div class="content">
                <span class="tab">MỚI NHẤT</span>
                <v-divider
                ></v-divider>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">TQ</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180128 - Trần Đức Quang - 18C1B</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">NQ</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180129 - Nguyễn Quốc - 18C1B</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">NT</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180138 - Nguyễn Tuấn Thiện - 18C1B</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">TT</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180139 - Trần Tiến Thịnh - 18C1B</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">BT</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180142 - Bùi Văn Tình - 18C1B</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">PT</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180151 - Phạm Hiếu Trường Tùng - 18C1B</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">CĐ</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">102180004 - Chế Văn Minh Đức - 18T1</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">LH</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180020 - Lê Văn Hải - 18C1A</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">CH</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180022 - Cao Văn Hảo - 18C1A</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
                <div class="users">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">ĐH</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">101180023 - Đàm Trung Hiếu - 18C1A</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>23/05/2022 08:24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="footer">
          <p class="main-title">Đoàn thanh niên trường Đại học Bách Khoa Đà Nẵng</p>
          <p>Địa chỉ: 54 Nguyễn Lương Bằng, Quận Liên Chiểu, Thành phố Đà Nẵng </p>
          <p>Hệ thống hỗ trợ quản lý Đoàn thanh niên trường Đại học Bách Khoa</p>
          <p>© 2022 - Bản quyền thuộc Đoàn thanh niên trường Đại học Bách Khoa Đà Nẵng</p>
      </div>
    </div>
  </div>
  </v-app>
</template>

<script>
import localStorageUtils from "@/utils/local_storage";
import ProfileOption from '@/components/ProfileOption.vue';
import {mapActions, mapGetters} from "vuex";
import jwtDecode from "jwt-decode";

export default {
  name: 'Home',
  components: { ProfileOption },
  data() {
    return {
      tab: null,
      currentUser: null,
      tabItems: [
        {tab: 'Trang chủ', content: 'Tab 1 Content'},
        {tab: 'Giới thiệu', content: 'Tab 2 Content'},
        {tab: 'Hoạt động', content: 'Tab 3 Content', route: '/'},
        {tab: 'Liên hệ', content: 'Tab 4 Content'},
      ],
      slideItems: [
        {
          src: require('../../assets/image/cuoc-thi-khoi-sac-tinh-nguyen.jpg'),
        },
        {
          src: require('../../assets/image/cuoc-thi-mua-he-xanh-trong-toi.jpg'),
        },
        {
          src: require('../../assets/image/slide10.jpg'),
        },
        {
          src: require('../../assets/image/slide9.jpg'),
        },
        {
          src: require('../../assets/image/slide5.png'),
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      newsList: 'getNewsList',
      user: 'getUser',
    }),
  },
  methods: {
    ...mapActions({
      fetchGetNewsList: 'fetchGetNewsList',
      fetchGetUserById: 'fetchGetUserById',
    }),
    goActionPage() {
      if (this.user.roles[0].name === 'Quản trị viên') {
        this.$router.push({ name: 'faculty'});
        return;
      }
      if (this.user.roles[0].name === 'Chuyên viên') {
        this.$router.push({ name: 'faculty'});
        return;
      }
      if (this.user.roles[0].name === 'Ban thường vụ') {
        this.$router.push({ name: 'faculty'});
        return;
      }
      if (this.user.roles[0].name === 'Bí thư liên chi đoàn') {
        this.$router.push({ name: 'activity-class-list'});
        return;
      }
      if (this.user.roles[0].name === 'Bí thư chi đoàn') {
        this.$router.push({ name: 'student-list'});
        return;
      }
      if (this.user.roles[0].name === 'Sinh viên') {
        console.log('abc');
        this.$router.push({ name: 'student-profile'});
        return;
      }
    }
  },
  async created() {
    if(localStorageUtils.getToken()) {
      this.currentUser = jwtDecode(localStorageUtils.getToken());
      await this.fetchGetUserById({ userId: this.currentUser.userId });
    }

    const query = {
      page: 1,
      size: 10,
    };
    await this.fetchGetNewsList(query);
  }
}
</script>

<style lang="scss">
.home-wrapper {
  display: flex;
  justify-content: center;
  .home-block {
    width: 1200px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 4px 0px;
      border-bottom: 4px solid #075794;

      .logo {
        img {
          width: 300px;
        }
      }

      .nav-options {
        display: flex;
        align-items: center;
        margin-left: -240px;

        .v-tab {
          font: 700 normal 14px/18px Roboto;
          font-weight: 700;
          color: #363636 !important;
          text-transform: uppercase;
          letter-spacing: 0;
        }

        .v-tabs-slider {
          background-color: #075794;
        }

        .v-tabs-bar {
          height: 36px !important;
        }

        .v-tab--active {
          color: #075794 !important;
        }
      }

      .btn-login-block {
        display: flex;
        align-items: center;
        justify-self: flex-end;

        .v-btn {
          background-color: #075794;
          color: #FFFFFF;
          font: 500 normal 13px Roboto;
          letter-spacing: 0px;
        }
      }
    }
    .footer {
      width: 100%;
      height: 150px;
      background-color: #075794;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .main-title {
        font: 700 15px Roboto;
      }
      p {
        color: #FFFFFF;
        margin-bottom: 0px;
        font: 400 15px Roboto;
        line-height: 20px;
        margin-bottom: 0px !important;
        line-height: unset !important;
      }
      .logo-versace {
        height: 60px;
        margin-bottom: 20px;
      }
    }
    .banner-news {
      margin-top: 4px;
      background-color: #075794;
      height: 28px;
      font: normal 300 13px Roboto;
      color: #FFFFFF;
      display: flex;
      align-items: center;
    }
    .event-block {
      display: flex;
      column-gap: 16px;
      row-gap: 16px;
      margin-top: 8px;
      .slide-block {
        border: 2px solid #FFFFFF;
        box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
        display: flex;
        width: 700px;
        height: 400px;

        .v-window__prev {
          left: 0 !important;
        }

        .v-window__next {
          right: 0 !important;
        }

        .v-carousel__controls {
          height: 32px !important;
        }

        .v-window {
          height: 395px !important;
          width: 700px;
        }

        .v-window-item {
          height: 400px;
        }

        .v-carousel__item {
          height: 400px !important;
        }

        .v-image__image--cover {
          background-size: contain;
        }

        //.v-item-group {
        //  height: 350px !important;
        //}
        .v-responsive__content {
          width: 1200px !important;
        }
      }
      .image-block {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        img {
          width: 484px;
          height: 192px;
          border: 2px solid #FFFFFF;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        }
      }
    }
    .image-activity {

    }

    .content-block {
      margin-top: 16px;

      .notification-block {
        .title-text {
          display: flex;
          align-items: center;

          i, span {
            color: #363636;
          }

          i {
            font-size: 20px;
          }

          span {
            padding-top: 1px;
            margin-left: 4px;
            font: 700 normal 17px/20px Roboto;
          }
        }

        .content {
          .tab {
            margin-top: 10px;
            padding-bottom: 2px;
            font: 700 normal 14px/18px Roboto;
            color: #075794;
            display: block;
            display: flex;
            align-items: center;
          }

          .v-tabs {
            margin-bottom: 4px;
          }

          .v-tab {
            font: 700 normal 14px/18px Roboto;
            font-weight: 700;
            color: #363636 !important;
            text-transform: uppercase;
            letter-spacing: 0;
            padding: 0 8px;
          }

          .v-tabs-slider {
            background-color: #075794;
          }

          .v-tabs-bar {
            height: 32px !important;
          }

          .v-tabs-slider-wrapper {
            display: none;
          }

          .v-tab--active {
            color: #075794 !important;
          }

          .notification {
            display: flex;
            column-gap: 8px;
            margin-bottom: 16px;
            margin-top: 8px;

            .post-time {
              box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
              border: 2px solid #FFFFFF;

              .date {
                display: block;
                width: 66px;
                height: 31px;
                background-color: #075794;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #FFFFFF;
                font: normal 400 17px Roboto;
              }

              .year {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 66px;
                height: 26px;
                border: 1px solid #b6becb;
                border-top: none;
                font: normal 400 17px Roboto;
                color: #a5a5a5;
              }
            }

            .title-block {
              .title-text {
                p {
                  a {
                    color: #363636;
                    font: 500 normal 14px Roboto;
                    text-decoration: none;

                    &:hover {
                      color: #075794;
                    }
                  }
                }
              }

              .time {
                display: flex;
                align-items: center;

                .v-icon {
                  font-size: 19px;
                }

                span {
                  font: 300 normal 13px Roboto;
                  color: #a9a9a9;
                }
              }
            }
          }
        }
      }

      .news-block {
        .title-text {
          display: flex;
          align-items: center;

          i, span {
            color: #363636;
          }

          i {
            font-size: 20px;
          }

          span {
            padding-top: 1px;
            margin-left: 4px;
            font: 700 normal 17px/20px Roboto;
          }
        }

        .content {
          .tab {
            margin-top: 10px;
            padding-bottom: 2px;
            font: 700 normal 14px/18px Roboto;
            color: #075794;
            display: block;
            display: flex;
            align-items: center;
          }

          .news {
            display: flex;
            column-gap: 8px;
            margin-bottom: 16px;
            margin-top: 8px;

            .image {
              img {
                width: 84px;
                height: 57px;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                border: 2px solid #FFFFFF;
              }
            }

            .title-block {
              .title-text {
                p {
                  a {
                    color: #363636;
                    font: 500 normal 14px Roboto;
                    text-decoration: none;

                    &:hover {
                      color: #075794;
                    }
                  }
                }
              }

              .time {
                display: flex;
                align-items: center;

                .v-icon {
                  font-size: 19px;
                }

                span {
                  font: 300 normal 13px Roboto;
                  color: #a9a9a9;
                }
              }
            }
          }
        }
      }

      .activity-block {
        .title-text {
          display: flex;
          align-items: center;

          i, span {
            color: #363636;
          }

          i {
            font-size: 21px;
          }

          span {
            margin-left: 4px;
            font: 700 normal 17px/20px Roboto;
          }
        }

        .content {
          .tab {
            margin-top: 10px;
            padding-bottom: 2px;
            font: 700 normal 14px/18px Roboto;
            color: #075794;
            display: flex;
            align-items: center;
          }

          .users {
            display: flex;
            column-gap: 8px;
            margin-bottom: 16px;
            margin-top: 8px;

            .avatar {
              .v-avatar {
                box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
              }

              .name {
                color: #FFFFFF !important;
                font: 500 normal 15px Roboto;
              }
            }

            .title-block {
              .title-text {
                p {
                  a {
                    color: #363636;
                    font: 500 normal 14px Roboto;
                    text-decoration: none;

                    &:hover {
                      color: #075794;
                    }
                  }
                }
              }
              .time {
                display: flex;
                align-items: center;

                .v-icon {
                  font-size: 19px;
                }

                span {
                  font: 300 normal 13px Roboto;
                  color: #a9a9a9;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>