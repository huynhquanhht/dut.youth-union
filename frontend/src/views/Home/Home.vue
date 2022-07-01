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
                @click="$router.push('/')"
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
          Vào ngày 12/06/2022, chương trình Định cư Con người Liên Hợp Quốc #UNHabitat phối hợp cùng Quỹ Nhi đồng Liên Hợp Quốc (UNICEF) sẽ tổ chức sự kiện Diễn đàn thanh niên đô thị 2030 Việt Nam tại thành phố Đà Nẵng. Đây là sự kiện nằm trong khuôn khổ dự án Thanh niên đô thị 2030 di UN-Habitat thực hiện tại 06 quốc
          ✅Diễn đàn Thanh niên đô thị 2030 Việt Nam #youth2030cities mong muốn tạo ra nền tảng đối thoại giữa thanh niên với các bên liên quan tham gia vào quá trình đô thị hóa bền vững. Kết quả cụ thể của Diễn đàn sẽ là một tuyên bố thanh niên với đô thị hóa bền vững (DeclarACTION) và là đóng góp của thanh niên Việt Nam tại Diễn đàn Đô thị Thế giới lần thứ 11 #WUF11 sắp được tổ chức tại Ba Lan. Tuyên bố này sẽ đóng vai trò làm lộ trình thực hiện và kế hoạch hành động cho giới trẻ nhằm đạt được các Mục tiêu phát triển bền vững và các mục tiêu đề ra trong Chương trình Nghị sự đô thị mới.
          🏢Vì vậy, Đoàn Thanh niên Trường Đại học Bách Khoa - ĐHĐN kêu gọi các bạn sinh viên, thanh niên tham gia sự kiện lần này. Dự án lần này do UN-Habitat tổ chức với mong muốn tăng cường tiếng nói, sự tham gia của các thanh niên trong việc phát triển đô thị bền vững.
        </marquee>
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
          <img src="../../assets/image/282094376_1978610139006451_5596072089181779361_n.jpg" alt="">
          <img src="../../assets/image/283670943_5389268691119151_4683700183425758671_n.jpg" alt="">
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
                  class="mx-4"
                ></v-divider>
                <div class="notification" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
                  <div class="post-time">
                    <span class="date">08/04</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">Tuyển sinh vào đại học hệ chính quy theo phương thức tuyển sinh riêng năm
                          2022</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>30/04/2022 08:24</span>
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
                  class="mx-4"
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
                  class="mx-4"
                ></v-divider>
                <div class="users" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
                  <div class="avatar">
                    <v-avatar
                      color="#06B5E6"
                      size="36"
                    ><span class="name">HQ</span></v-avatar>
                  </div>
                  <div class="title-block">
                    <div class="title-text">
                      <p>
                        <a href="">102180126 - Nguyễn Trần Công Tân - 18TCLC_DT1</a>
                      </p>
                    </div>
                    <div class="time">
                      <v-icon>mdi-calendar-month</v-icon>
                      <span>30/04/2022 08:24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
  </v-app>
</template>

<script>
import localStorageUtils from "@/utils/local_storage";
import ProfileOption from '@/components/ProfileOption.vue';
import {mapActions, mapGetters} from "vuex";

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
          src: require('../../assets/image/slide9.jpg'),
        },
        {
          src: require('../../assets/image/slide5.png'),
        },
        {
          src: require('../../assets/image/slide10.jpg'),
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      newsList: 'getNewsList',
    }),
  },
  methods: {
    ...mapActions({
      fetchGetNewsList: 'fetchGetNewsList',
    }),
  },
  async created() {
    this.currentUser = localStorageUtils.getService().getCurrentUser();
    const query = {
      page: 1,
      size: 10,
    };
    await this.fetchGetNewsList(query);
    console.log('currentUser - ', this.currentUser);
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