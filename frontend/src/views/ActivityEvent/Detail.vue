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

          </div>

        </div>
      </div>
    </div>
    <div class="information">
      <div class="detail">
        <div class="map">
          <google-map />
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

<style lang="scss" scoped>
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
          //.quantity-text {
          //  font: normal 500 24px Roboto;
          //
          //  margin-top: 8px;
          //  margin-bottom: 4px;
          //}
          //.quantity-title {
          //  font: normal 400 15px Roboto;
          //  color: #99abb4;
          //}

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
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            .open-time, .close-time {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }
          .open-time-block {
            //border-top: 4px solid #00ACED;
            background: #FFFFFF;
          }
          .close-time-block {
            //border-top: 4px solid #F44336;
            background: #FFFFFF;
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

    .information-block {
      background-color: #ffffff;

      span {
        display: block;
      }
    }
  }
}
</style>