<template>
  <div class="activity-detail">
    <div class="main-block">
      <div class="cover-block">
        <div class="cover">
          <img src="https://res.cloudinary.com/drxazklch/image/upload/v1653753745/s-union/anh-background-doan-thanh-nien-don-gian-dep_093953592-1024x572_ytzysa.png" alt="">
        </div>
        <div class="registration-info">
          <div class="registration-quantity">
            <div class="open-quantity-block">
              <v-icon color="#E91E63" size="40">mdi-openid</v-icon>
              <span class="quantity-text">50</span>
              <span class="quantity-title">SỐ LƯỢNG MỞ</span>
            </div>
            <div class="registered-quantity-block">
              <v-icon color="#FF5722" size="40">mdi-account-multiple-plus</v-icon>
              <span class="quantity-text">50</span>
              <span class="quantity-title">ĐÃ ĐĂNG KÝ</span>
            </div>
            <div class="attendance-quantity-block">
              <v-icon color="#4CAF50" size="40">mdi-account-group</v-icon>
              <span class="quantity-text">50</span>
              <span class="quantity-title">ĐIỂM DANH</span>
            </div>
          </div>
          <div class="registration-time">
            <div class="open-time-block">
              <v-icon
                size="48px"
                color="#00ACED">mdi-clock
              </v-icon>
              <div class="open-time">
                <span class="sub-title">14/05/2022</span>
                <span class="box-title">Mở đăng ký</span>
              </div>
            </div>
            <div class="close-time-block">
              <v-icon size="48px" color="#F44336">mdi-clock-remove</v-icon>
              <div class="close-time">
                <span class="sub-title">14/05/2022</span>
                <span class="box-title">Đóng đăng ký</span>
              </div>
            </div>
            <div class="activity-button">
            </div>
          </div>
        </div>
      </div>
      <div class="information">
        <div class="detail">
          <div class="activity-content">
            <div class="box-title">Chi tiết</div>
            <div class="host">
              <v-icon>mdi-account</v-icon>
              <span>Được tổ chức bởi khoa Công nghệ thông tin</span>
            </div>
            <div class="time">
              <v-icon>mdi-timer</v-icon>
              <span>Thứ năm, ngày 22 tháng 6</span>
            </div>
            <div class="location">
              <v-icon>mdi-map-marker-radius</v-icon>
              <span>Hội trường khu F, Đại học Bách Khoa Đà Nẵng</span>
            </div>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel metus mollis, tincidunt diam a, finibus justo. Donec nec interdum enim. Integer et leo quis turpis lobortis pellentesque. Phasellus vel ipsum egestas, tempus quam vitae, fermentum libero. Etiam mattis leo urna, sit amet maximus nibh faucibus sit amet. Vivamus pretium purus nisi, ac varius velit aliquam tristique. Integer aliquet lorem mauris, sed ornare libero eleifend at. Maecenas commodo, eros ac accumsan ultricies, turpis massa ornare orci, sed finibus turpis ante nec ante. Suspendisse vitae lectus scelerisque, tempor libero et, mollis leo. Suspendisse tincidunt, ligula vel pretium molestie, tellus nisi auctor magna, vel mollis odio eros vitae est. Ut auctor cursus turpis, in tristique felis egestas et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Nulla nec lacus felis. Mauris a massa cursus lectus rhoncus iaculis.
              Fusce at aliquam felis, ac dignissim nunc. Donec tincidunt in enim vitae tristique. Suspendisse auctor ultricies dolor, eu convallis felis ultrices non. Praesent lectus ex, porttitor ut risus sed, sollicitudin viverra quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam tellus nibh, egestas in augue at, consectetur viverra lacus. Aliquam erat volutpat. Praesent maximus ultricies sapien, id porttitor mi finibus a. Proin purus lacus, gravida in tristique eget, finibus sit amet sem. Aenean vel laoreet erat, ut aliquam lectus.
              Praesent nec tempor orci. Fusce molestie viverra lacus id feugiat. Quisque et mauris nunc. Vivamus interdum mi non blandit dictum. Quisque sed viverra leo. Nunc aliquam, lectus ut vehicula varius, augue tortor sagittis orci, at luctus neque nunc a quam. Sed ultrices est et mauris iaculis dignissim. Etiam ante elit, gravida id magna eu, malesuada euismod dui. Curabitur consectetur fringilla dolor. Quisque aliquam finibus quam, in accumsan justo sollicitudin a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam blandit nisl at lacinia auctor. Pellentesque congue vel nulla ac dignissim. Nunc nunc augue, pellentesque ut mattis ut, mollis in augue. Morbi eget iaculis ex, nec faucibus ligula. Fusce neque eros, euismod id massa ornare, iaculis rutrum ex.
            </div>
          </div>
          <div class="map">
            <google-map />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import GoogleMap from "@/components/GoogleMap";
export default {
  name: "Detail",
  components: {
    GoogleMap
  }
}
</script>

<style lang="scss">
.activity-detail {
  .main-block {
    .cover-block {
      display: flex;
      justify-content: center;
      column-gap: 16px;
      .cover {
        img {
          max-width: 600px;
          max-height: 370px;
          width: 600px;
          height: 260px;
          border-radius: 4px;
          border: 8px solid #FFFFFF;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        }
      }

      .registration-info {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        .registration-time {
          display: flex;
          column-gap: 16px;

          .box-title {
            font: normal 400 15px Roboto;
            text-transform: uppercase;
            color: #99abb4;
          }
          .sub-title {
            font: normal 700 17px/30px Roboto;
            color: #455a64;
          }
          .open-time-block,
          .close-time-block {
            width: 236px;
            height: 90px;
            padding: 20px;
            display: flex;
            column-gap: 20px;
            color: #455a64;
            background: #FFFFFF;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            .open-time, .close-time {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
        }
        .registration-quantity {
          display: flex;
          column-gap: 16px;
          .open-quantity-block,
          .registered-quantity-block,
          .attendance-quantity-block {
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            height: 140px;
            width: 150px;
            text-align: center;
            .quantity-text {
              font: normal 500 24px Roboto;
              color: #455a64;
              margin-top: 8px;
              margin-bottom: 4px;
            }
            .quantity-title {
              font: normal 400 15px Roboto;
              color: #99abb4;
            }

          }
          .open-quantity-block {
            border-top: 4px solid #E91E63;
          }
          .registered-quantity-block {
            border-top: 4px solid #FF5722;
          }
          .attendance-quantity-block {
            border-top: 4px solid #4CAF50;
          }
        }
      }
    }
  }
  .information {
    width: 880px;
    .detail {
      display: flex;
      column-gap: 16px;
      justify-content: center;
      width: 880px;
      .activity-content {
        width: 600px;
        //height: 500px;
        background-color: #FFFFFF;
        padding: 16px;
        .box-title {
          font: normal 500 20px Roboto;
          color: #455a64;
        }
        .host, .time, .location {
          display: flex;
          column-gap: 6px;
          align-items: center;
          color: #455a64;
          height: 28px;
        }
        .content {
          height: 100%;
          text-align: justify;
        }
      }
      .map {

      }
    }
  }
}
</style>