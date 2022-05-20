<template>
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
        <div class="btn-login-block">
          <v-btn>Đăng nhập</v-btn>
        </div>
      </div>
      <div class="banner-news"></div>
      <div class="slide-block">
        <v-carousel show-arrows="true" cycle="true">
          <v-carousel-item
            v-for="(item,i) in slideItems"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div class="content-block">
        <v-row>
          <v-col>
            <div class="notification-block">
              <div class="title">
                <v-icon> fa-bullhorn</v-icon>
                <span>THÔNG BÁO</span>
              </div>
              <div class="content">
                <v-tabs
                  background-color="#ffffff"
                >
                  <v-tab>ĐOÀN TRƯỜNG</v-tab>
                  <v-divider
                    class="mx-4"
                    vertical
                  ></v-divider>
                  <v-tab>LIÊN CHI ĐOÀN</v-tab>
                </v-tabs>
                <v-divider
                  class="mx-4"
                ></v-divider>
                <div class="notification" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
                  <div class="post-time">
                    <span class="date">08/04</span>
                    <span class="year">2022</span>
                  </div>
                  <div class="title-block">
                    <div class="title">
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
              <div class="title">
                <v-icon> fa-newspaper</v-icon>
                <span>TIN TỨC</span>
              </div>
              <div class="content">
                <span class="tab">MỚI NHẤT</span>
                <v-divider
                  class="mx-4"
                ></v-divider>
                <div class="news" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
                  <div class="image">
                    <img src="../../assets/image/slide7.jpg" alt="">
                  </div>
                  <div class="title-block">
                    <div class="title">
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
            <div class="activity-block">
              <div class="title">
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
                    <div class="title">
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

</template>

<script>
export default {
  data() {
    return {
      tab: null,
      tabItems: [
        {tab: 'Trang chủ', content: 'Tab 1 Content'},
        {tab: 'Giới thiệu', content: 'Tab 2 Content'},
        {tab: 'Hoạt động', content: 'Tab 3 Content'},
        {tab: 'Liên hệ', content: 'Tab 4 Content'},
      ],
      slideItems: [
        {
          src: require('../../assets/image/slide7.jpg'),
        },
        {
          src: require('../../assets/image/slide8.png'),
        },
        {
          src: require('../../assets/image/slide9.jpg'),
        },
        {
          src: require('../../assets/image/slide6.png'),
        },
        {
          src: require('../../assets/image/slide1.jpg'),
        },
        {
          src: require('../../assets/image/slide2.jpg'),
        },
        {
          src: require('../../assets/image/slide3.jpg'),
        },
        {
          src: require('../../assets/image/slide4.jpg'),
        },

      ]
    }
  },
  methods: {}
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
      height: 24px;
    }

    .slide-block {
      border: 8px solid #FFFFFF;
      box-shadow: rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px;
      margin-top: 8px;

      .v-window__prev {
        left: 0 !important;
      }

      .v-window__next {
        right: 0 !important;
      }

      .v-carousel__controls {
        height: 40px !important;
      }

      .v-window {
        height: 350px;
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

    .content-block {
      margin-top: 16px;

      .notification-block {
        .title {
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
              .title {
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
        .title {
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
            height: 36px;
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
              .title {
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
        .title {
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
            height: 36px;
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
              .title {
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