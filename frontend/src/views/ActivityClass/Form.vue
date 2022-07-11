<template>
  <v-card class="form-card">
    <div class="form-toolbar pl-4 pr-2 py-1">
      <div class="left-tool">
        <v-btn
          icon
          dark
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span class="form-title"> {{ title }}</span>
      </div>
      <div class="btn-block d-flex justify-end">
        <v-btn
          class="btn-save"
          color="primary"
          :disabled="!name"
          @click="save"
        >Lưu</v-btn>
      </div>
    </div>
    <form class="form-block px-4 pt-2 pb-2">
      <div class="input-id">
        <span class="label">Mã lớp <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          filled
          v-model="id"
        ></v-text-field>
      </div>
      <div class="input-name">
        <span class="label">Tên lớp <span class="require">(*)</span></span>
        <v-text-field
            class="input-text mb-1"
            solo
            dense
            hide-details
            v-model="name"
        ></v-text-field>
    </div>
      <div class="input-name">
        <span class="label">Khóa <span class="require">(*)</span></span>
        <div class="search-block mb-3">
          <v-select
            filled
            label="Nhấn để chọn"
            class="search-select"
            hide-details="false"
            :items="courseOptions"
            item-text="name"
            return-object
            v-model="selectedCourseOption"
            solo
            dense
          ></v-select>
        </div>
      </div>
      <div class="input-name">
        <span class="label">Khoa <span class="require">(*)</span></span>
        <div class="search-block mb-3">
          <v-select
            filled
            label="Nhấn để chọn"
            class="search-select"
            hide-details="false"
            :items="facultyOptions"
            item-text="name"
            v-model="selectedFacultyOption"
            return-object
            solo
            dense
          ></v-select>
        </div>
      </div>
    </form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Form",
  props: {
    activityClass: {
      type: Object,
      default() {
        return null;
      }
    },
    formType: {
      type: String,
      default: 'Create',
    }
  },
  data() {  
    return {
      id: this.activityClass ? this.activityClass.id : '',
      name: this.activityClass ? this.activityClass.name : '',
      courseOptions: [
        {
          id: '18',
          name: 'Khóa 18'
        },
        {
          id: '19',
          name: 'Khóa 19'
        },
        {
          id: '20',
          name: 'Khóa 20'
        },
        {
          id: '21',
          name: 'Khóa 21'
        }
      ],
      facultyOptions: [
        {
          id: '101',
          name: 'Cơ khí'
        },
        {
          id: '102',
          name: 'Công nghệ thông tin'
        },
        {
          id: '103',
          name: 'Cơ khí giao thông',
        },
        {
          id: '104',
          name: 'Công nghệ Nhiệt - Điện lạnh'
        },
        {
          id: '105',
          name: 'Điện'
        },
        {
          id: '106',
          name: 'Điện tử viễn thông'
        },
        {
          id: '107',
          name: 'Hóa'
        },
        {
          id: '109',
          name: 'Xây dựng cầu đường'
        },
        {
          id: '110',
          name: 'Xây dựng Dân dụng & Công nghiệp'
        },
        {
          id: '111',
          name: 'Xây dựng công trình thủy'
        },
        {
          id: '117',
          name: 'Môi trường',
        },
        {
          id: '118',
          name: 'Quản lý dự án',
        },
        {
          id: '121',
          name: 'Kiến trúc',
        },
        {
          id: '122',
          name: 'Công nghệ tiên tiến',
        }
      ],
      selectedCourseOption: this.activityClass ? this.activityClass.course_id : null,
      selectedFacultyOption: this.activityClass ? this.activityClass.faculty_id: null,
    }
  },
  methods: {
    ...mapActions({
      fetchCreateActivityClass: 'fetchCreateActivityClass',
      fetchUpdateActivityClass: 'fetchUpdateActivityClass',
    }),
    save() {
      if (this.formType === 'Create') {
        this.$emit('activity-class-form', {
          command: 'Create',
          activityClass: {
            id: this.id,
            name: this.name,
            faculty_id: this.selectedFacultyOption.id,
            course_id: this.selectedCourseOption.id,
          },
        });
      }
      if (this.formType === 'Update') {
        this.$emit('activity-class-form', {
          command: 'Update',
          activityClass: {
            id: this.id,
            name: this.name,
            faculty_id: this.selectedFacultyOption.id,
            course_id: this.selectedCourseOption.id,
          },
        });
      }
    },
    close() {
      this.id = null;
      this.name = null,
      this.$emit('activity-class-form', {
        command: 'close',
      });
      this.resetData();
    },
    resetData() {
      this.id = '';
      this.name = '';
      this.selectedCourseOption = null;
      this.selectedFacultyOption = null;
    }
  },
  watch: {
    activityClass() {
      console.log('abc');
      this.id = this.activityClass ? this.activityClass.id : '';
      this.name = this.activityClass ? this.activityClass.name : '';
      this.selectedCourseOption = this.activityClass ? this.courseOptions.filter((item) => item.id === this.activityClass.course_id)[0] : '';
      this.selectedFacultyOption = this.activityClass ? this.facultyOptions.filter((item) => item.id === this.activityClass.faculty_id)[0] : '';
    },
    formType() {
      console.log('abc');
      if (this.formType === 'Create') {
        this.title = 'Tạo mới thông tin chi đoàn';
      }
      if (this.formType === 'Update') {
        this.title = 'Cập nhật thông tin chi đoàn';
      }
    }
  },
  created() {
    if (this.formType === 'Create') {
      this.resetData();
      this.title = 'Tạo mới thông tin chi đoàn';
    }
    if (this.formType === 'Update') {
      this.title = 'Cập nhật thông tin chi đoàn';
      this.id = this.activityClass ? this.activityClass.id : '';
      this.name = this.activityClass ? this.activityClass.name : '';
      console.log(this.courseOptions.filter((item) => item.id === this.activityClass.course_id));
      this.selectedCourseOption = this.activityClass ? this.courseOptions.filter((item) => item.id === this.activityClass.course_id)[0] : '';
      this.selectedFacultyOption = this.activityClass ? this.facultyOptions.filter((item) => item.id === this.activityClass.faculty_id)[0] : '';
    }
  }
}
</script>

<style lang="scss">
.form-card {
  .form-toolbar {
    background-color: #0B91E7;
    color: #ffffff;
    font: normal 400 17px Roboto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-block {
      align-items: flex-end;
    }
    .left-tool {
      display: flex;
      align-items: center;
    }
  }
  .form-block {
    .form-title {
      font: normal 400 17px Roboto;
    }
    .v-text-field .v-input__control .v-input__slot {
      min-height: 32px !important;
      font: normal 400 14px Roboto;
    }
    .v-input__slot {
      width: 100% !important;
    }
    .label {
      font: normal 400 14px Roboto;
    }
    .v-text-field__details {
      margin-bottom: 0px !important;
    }
  }
  .search-block {
    .search-select {
      height: 28px !important;
      font: normal 400 15px Roboto !important;
    }

    .v-input__slot {
      min-height: 32px !important;
      border: 1px solid #d9d9d9 !important;
    }

    .v-label {
      font: normal 400 14px Roboto !important;
      top: 7px !important;

      .v-select__selections {
        font: normal 400 14px Roboto !important;
      }
    }

    .v-text-field__slot {
      font: normal 400 14px Roboto !important;
      //margin-top: 1px;
    }

    .v-icon {
      font-size: 20px !important;
      margin-top: 1px;
    }
  }
  .btn-block {
    //padding: 0 16px 16px 16px;
    .btn-save {
      text-transform: unset !important;
      font: normal 400 14px Roboto !important;
      letter-spacing: 0;
    }
    .v-btn--disabled {
      color: #FFFFFF !important;
    }
    .theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
      background-color: #78baef !important;
    }
  }
}
</style>