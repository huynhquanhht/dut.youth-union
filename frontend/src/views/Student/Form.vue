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
        <span class="label">Mã sinh viên <span class="require">(*)</span></span>
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
        <span class="label">Tên sinh viên <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="name"
        ></v-text-field>
      </div>
      <div class="input-name">
        <span class="label">Giới tính <span class="require">(*)</span></span>
        <v-radio-group v-model="gender">
          <div class="d-flex align-center">
            <v-radio
              label="Nam"
              :value="gender"
              class="mr-3"
            ></v-radio>
            <v-radio
              label="Nữ"
              :value="!gender"
            ></v-radio>
          </div>

        </v-radio-group>
      </div>
      <div class="input-name">
        <span class="label">Ngày sinh <span class="require">(*)</span></span>
        <date-picker class="input-date-time" v-model="birthday">
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </date-picker>
      </div>
      <div class="input-name">
        <span class="label">Email <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="email"
        ></v-text-field>
      </div>
      <div class="input-name">
        <span class="label">Số điện thoại <span class="require">(*)</span></span>
        <v-text-field
          class="input-text mb-1"
          solo
          dense
          hide-details
          v-model="phone"
        ></v-text-field>
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
            @change="changeFaculty"
          ></v-select>
        </div>
      </div>
      <div class="input-name">
        <span class="label">Lớp <span class="require">(*)</span></span>
        <div class="search-block mb-3">
          <v-select
            filled
            label="Nhấn để chọn"
            class="search-select"
            hide-details="false"
            :items="activityClassOptions"
            item-text="name"
            v-model="selectedActivityClassOption"
            return-object
            solo
            dense
          ></v-select>
        </div>
      </div>
      <div class="input-name">
        <span class="label">Thông tin thêm <span class="require">(*)</span></span>
        <div class="d-flex">
          <div class="union-member-checkbox d-flex align-center mr-3">
            <v-simple-checkbox v-model="isUnionMember"></v-simple-checkbox>
            <span>Đoàn viên</span>
          </div>
          <div class="class-secretary-checkbox d-flex align-center">
            <v-simple-checkbox v-model="isClassSecretary"></v-simple-checkbox>
            <span>Bí thư chi đoàn</span>
          </div>
        </div>
      </div>
    </form>
  </v-card>
</template>

<script>
import {DatePicker} from 'v-calendar';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Form",
  components: {
    DatePicker
  },
  props: {
    student: {
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
      id: this.student ? this.student.id : '',
      name: this.student ? this.student.name : '',
      gender: this.student ? this.student.gender: '',
      birthday: this.student ? this.student.birthday : '',
      email: this.student ? this.student.email : '',
      phone: this.student ? this.student.phone : '',
      activityClassId: this.student ? this.student.activity_class_id : '',
      isUnionMember: this.student ? this.student.is_union_member : false,
      isClassSecretary: this.student ? this.student.is_class_secretary : false,
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
      selectedFacultyOption: null,
      activityClassOptions: [],
      selectedActivityClassOption: null,
    }
  },
  computed: {
    ...mapGetters({
      activityClassList: 'getActivityClassList'
    })
  },
  methods: {
    ...mapActions({
      fetchGetActivityClassList: 'fetchGetActivityClassList',
    }),
    save() {
      if (this.formType === 'Create') {
        this.$emit('student-form', {
          command: 'Create',
          student: {
            id: this.id,
            name: this.name,
            gender: this.gender,
            birthday: this.birthday,
            email: this.email,
            phone: this.phone,
            activityClassId: this.selectedActivityClassOption.id,
            isUnionMember: this.isUnionMember ? this.isUnionMember : false,
            isClassSecretary: this.isClassSecretary ? this.isClassSecretary : false,
          },
        });
      }
      if (this.formType === 'Update') {
        this.$emit('student-form', {
          command: 'Update',
          student: {
            id: this.id,
            name: this.name,
            gender: this.gender,
            birthday: this.birthday,
            email: this.email,
            phone: this.phone,
            activityClassId: this.selectedActivityClassOption.id,
            isUnionMember: this.isUnionMember ? this.isUnionMember : false,
            isClassSecretary: this.isClassSecretary ? this.isClassSecretary : false,
          },
        });
      }
    },
    close() {
      this.id = null;
      this.name = null,
        this.$emit('student-form', {
          command: 'close',
        });
      this.resetData();
    },
    async changeFaculty(item) {
      await this.fetchGetActivityClassList({
        option: 'all',
        faculty_id: item.id
      });
      this.activityClassOptions = this.activityClassList.rows;
    },
    resetData() {
      this.id = '';
      this.name = '';
      this.gender = true;
      this.birthday = '';
      this.email = '';
      this.phone = '';
      this.activityClassId = '';
      this.isUnionMember = false;
      this.isClassSecretary = false;
    }
  },
  watch: {
    student() {
      console.log('student - ', this.student);
        this.id = this.student ? this.student.id : '';
        this.name = this.student ? this.student.name : '';
        this.gender = this.student ? this.student.gender : true;
        this.birthday = this.student ? this.student.birthday : '';
        this.email = this.student ? this.student.email : '';
        this.phone = this.student ? this.student.phone : '';
        this.activityClassId = this.student ? this.student.activity_class_id : '';
        this.isUnionMember = this.student ? this.student.is_union_member : false;
        this.isClassSecretary = this.student ? this.student.is_class_secretary : false;
        this.selectedFacultyOption = this.student ? this.facultyOptions.filter((item) => item.id == this.student.activity_class.faculty_id)[0] : null;
        this.activityClassOptions = this.activityClassList.rows;
        this.selectedActivityClassOption = this.activityClassOptions.filter((item) => item.id == this.student.activity_class_id)[0];
    },
    formType() {
      console.log('abc');
      if (this.formType === 'Create') {
        this.title = 'Tạo mới thông tin sinh viên';
      }
      if (this.formType === 'Update') {
        this.title = 'Cập nhật thông tin sinh viên';
      }
    }
  },
  async created() {
    if (this.formType === 'Create') {
      this.resetData();
      this.title = 'Tạo mới thông tin sinh viên';
    }
    if (this.formType === 'Update') {
      this.title = 'Cập nhật thông tin sinh viên';
      this.selectedFacultyOption = this.student ? this.facultyOptions.filter((item) => item.id == this.student.activity_class.faculty_id)[0] : null;
      this.activityClassOptions = this.activityClassList.rows;
      this.selectedActivityClassOption = this.activityClassOptions.filter((item) => item.id == this.student.activity_class_id)[0];
    }
  }
}
</script>

<style lang="scss">
.form-card {
  .v-input--radio-group--column .v-radio:not(:last-child):not(:only-child) {
    margin-bottom: 0px !important;
  }
  .v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
  }
  .v-messages {
    display: none !important;
  }
  .input-date-time {
    display: block;
    width: 100%;
    input {
      width: 100%;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      outline: none;
      font: normal 400 14px Roboto;
      min-height: 32px;
    }
  }
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