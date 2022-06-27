<template>
  <v-app>
    <v-main>
      <div class="login-page-wrapper">
        <div class="login-page-block" relative>
          <div class="login-background" relative>
            <div class="img-background">
              <img
                class="img-dut"
                src="@/assets/image/img-dut-landscape.jpg"
                alt=""
              />
            </div>
            <div class="color-background"></div>
          </div>
          <div class="login-content d-flex align-center">
            <div
              class="left-content d-flex flex-column justify-center align-center"
            >
              <div class="logo-block d-flex justify-center">
                <img
                  class="logo-dut mr-2"
                  width="122px"
                  height="122px"
                  src="@/assets/logo/logo-dut.jpg"
                  alt=""
                />
                <img
                  class="logo-union ml-2"
                  src="@/assets/logo/logo-union.png"
                  alt=""
                />
              </div>
              <div class="content-block">
                <h3 class="title">TRƯỜNG ĐẠI HỌC BÁCH KHOA ĐÀ NẴNG</h3>
                <h3 class="title">ĐOÀN THANH NIÊN CỘNG SẢN HỒ CHÍ MINH</h3>
                <h3 class="title">HỆ THỐNG QUẢN LÝ ĐOÀN THANH NIÊN</h3>
              </div>
            </div>
            <div class="right-content d-flex align-center justify-center">
              <div class="login-form-block">
                <div class="logo-app">
                  <img src="../../assets/logo/logo-color-app-text.svg" alt="">
                </div>
                <form class="login-form pa-7">
                  <v-text-field
                    type="text"
                    class="us nput-text"
                    label="Tên đăng nhập"
                    v-model="username"
                    hide-details="false"
                    @keyup.enter="login"
                    @keydown="changeUsername"
                    solo
                    dense
                  ></v-text-field>
                  <v-text-field
                    class="password input-text mt-3"
                    label="Mật khẩu"
                    v-model="password"
                    hide-details="false"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    @keyup.enter="login"
                    @keydown="changePassword"
                    solo
                    dense
                  ></v-text-field>
                  <p class="login-fail-text mt-1 ml-3" v-if="incorrectPassword">
                    {{ loginFailText }}
                  </p>
                  <v-btn
                    class="btn-login mt-3"
                    width="100%"
                    height="40"
                    @click="login"
                  >
                    Đăng nhập
                  </v-btn>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import localStorageUtils from '@/utils/local_storage';
import MESSAGE from '@/utils/message';
export default {
  name: 'Login',
  data(){
    return {
      username: '',
      password: '',
      showPassword: false,
      incorrectPassword: false,
      loginFailText: MESSAGE.LOGIN_FAIL,
    };
  },
  computed: {
    ...mapGetters({
      loginResult: 'getLoginResult',
    }),
  },
  methods: {
    ...mapActions({
      fetchLogin: 'fetchLogin',
    }),
    async login() {
      if (!this.username || !this.password) {
        this.incorrectPassword = true;
        return;
      } 
      let isLogined = await this.fetchLogin({
        username: this.username,
        password: this.password,
      });
      if (isLogined) {
        localStorageUtils.getService().setToken(this.loginResult.accessToken);
        localStorageUtils
          .getService()
          .setCurrentUser(this.loginResult.currentUser);
        this.$router.push('/');
      } else {
        this.incorrectPassword = true;
      }
    },
    changeUsername() {
      this.incorrectPassword = false;
    },
    changePassword() {
      this.incorrectPassword = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.login-page-wrapper {
  .login-page-block {
    .login-background {
      .img-background {
        position: absolute;
        width: 100vw;
        height: 100vh;
        .img-dut {
          width: 100vw;
          height: 100vh;
        }
      }
      .color-background {
        position: absolute;
        background: linear-gradient(
          180deg,
          rgba(6, 181, 230, 0.9) 0%,
          rgba(7, 92, 218, 0.5) 100%
        );
        width: 100vw;
        height: 100vh;
      }
    }
    .login-content {
      width: 100vw;
      height: 100vh;
      position: absolute;
      .left-content {
        width: 50%;
        height: 50%;
        .logo-block {
          .logo-dut {
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          }
          .logo-union {
            width: 120px;
            height: 125px;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
          }
        }
        .content-block {
          text-align: center;
          margin-top: 10px;
          .title {
            font: normal 500 23px/27px Roboto;
            color: #ffffff;
            text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          }
        }
      }
      .right-content {
        width: 50%;
        height: 50%;
        .login-form-block {
          width: 320px;
          height: 410px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 2px 4px 4px 1px rgba(0, 0, 0, 0.25);
          border-radius: 8px;
          .logo-app {
          text-align: center;
            margin-top: 45px;
            img {
              width: 140px;
            }
          }
          .login-form {
            .v-input__slot {
              background-color: red !important;
            }
            .v-text-field__details {
              display: none;
            }
            .login-fail-text {
              font: normal 400 13px Roboto;
              color: red;
            }
            .v-btn {
              background: linear-gradient(180deg, #06b5e6 0%, #075cda 100%);
              border-radius: 4px;
              font: normal 500 17px Roboto !important;
              color: #ffffff;
              letter-spacing: 0;
              text-transform: none;
            }
            .v-input__control {
              min-height: 40px !important;
            }
            .input-text {
              font: normal 400 15px Roboto;
            }
          }
        }
      }
    }
  }
}
</style>
