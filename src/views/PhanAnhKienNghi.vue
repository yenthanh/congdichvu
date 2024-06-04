<template>
  <v-main class="container wrap-content-page">
    <div style="width: 100%">
      <v-card>
        <v-tabs v-model="currentTab" bg-color="#ce1212">
          <v-tab
            v-for="(tab, index) in listTabs"
            :key="index"
            :value="tab.value"
            >{{ tab.title }}</v-tab
          >
        </v-tabs>

        <v-card-text class="px-0 py-0">
          <v-tabs-window v-model="currentTab">
            <v-tabs-window-item
              v-for="(tab, index) in listTabs"
              :key="index"
              :value="tab.value"
              style="background-color: #fdf5ea"
            >
              <v-card style="background-color: #fdf5ea">
                <v-form
                  ref="formCrud"
                  lazy-validation
                  class="py-0 mt-2 px-3"
                  @submit.prevent="submitForm"
                >
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-center">
                      <label
                        >Đối tượng PANK
                        <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="9">
                      <v-radio-group
                        class="d-flex justify-start align-center"
                        v-model="formData.DoiTuong"
                        inline
                      >
                        <v-radio
                          v-for="(item, index) in listDoiTuong"
                          :key="index"
                          color="#ce7a58"
                          :label="item.title"
                          :value="item.value"
                          class="mr-2"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-center">
                      <label
                        >Người dân <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.TenNguoiDan"
                        placeholder="Nhập tên người dân"
                        solo
                        dense
                        hide-details="auto"
                        clearable
                        required
                        :rules="[
                          (v) =>
                            (v !== '' && v !== null && v !== undefined) ||
                            'Tên người gửi là bắt buộc',
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-start">
                      <label>Địa chỉ <span style="color: red">(*)</span></label>
                    </v-col>
                    <v-col cols="9">
                      <v-row>
                        <v-col cols="4">
                          <v-autocomplete
                            class="input-form"
                            hide-no-data
                            v-model="formData.TinhThanh"
                            :items="[]"
                            placeholder="Tỉnh/Thành phố"
                            item-title="TenMuc"
                            item-value="MaMuc"
                            dense
                            solo
                            hide-details="auto"
                            clearable
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                          <v-autocomplete
                            class="input-form"
                            hide-no-data
                            v-model="formData.QuanHuyen"
                            :items="[]"
                            placeholder="Quận/Huyện"
                            item-title="TenMuc"
                            item-value="MaMuc"
                            dense
                            solo
                            hide-details="auto"
                            clearable
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                          <v-autocomplete
                            class="input-form"
                            hide-no-data
                            v-model="formData.PhuongXa"
                            :items="[]"
                            placeholder="Phường/Xã"
                            item-title="TenMuc"
                            item-value="MaMuc"
                            dense
                            solo
                            hide-details="auto"
                            clearable
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            class="flex input-form"
                            v-model="formData.SoNha"
                            placeholder="Nhập số nhà, thôn xóm..."
                            solo
                            dense
                            hide-details="auto"
                            clearable
                            required
                            :rules="[
                              (v) =>
                                (v !== '' && v !== null && v !== undefined) ||
                                'Địa chỉ là bắt buộc',
                            ]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-center">
                      <label
                        >Số điện thoại
                        <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.SoDienThoai"
                        placeholder="Nhập số điện thoại"
                        solo
                        dense
                        hide-details="auto"
                        clearable
                        required
                        :rules="[
                          (v) =>
                            !v ||
                            (v && /^\d+$/.test(v)) ||
                            'Số điện thoại là bắt buộc',
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-center">
                      <label>Email </label>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.ThuDienTu"
                        placeholder="Nhập email"
                        solo
                        dense
                        hide-details="auto"
                        clearable
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-center">
                      <label
                        >PANK về việc <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.PANK"
                        placeholder="Nhập tiêu đề PANK"
                        solo
                        dense
                        hide-details="auto"
                        clearable
                        required
                        :rules="[
                          (v) =>
                            (v !== '' && v !== null && v !== undefined) ||
                            'Thông tin bắt buộc',
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-center">
                      <label
                        >Nội dung <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="9">
                      <v-textarea
                        class="flex input-form"
                        v-model="formData.NoiDungPhanAnh"
                        placeholder="Nội dung"
                        solo
                        rows="3"
                        dense
                        hide-details="auto"
                        clearable
                        required
                        :rules="[
                          (v) =>
                            (v !== '' && v !== null && v !== undefined) ||
                            'Nội dung phản ánh bắt buộc',
                        ]"
                      ></v-textarea>
                      <p
                        style="
                          color: red;
                          font-size: 18px;
                          font-style: italic;
                          font-weight: 400;
                        "
                        class="mt-4"
                      >
                        *Nội dung này sẽ được công khai. Vui lòng không ghi chi
                        tiết thông tin cá nhân!
                      </p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-center">
                      <label>Đơn vị tiếp nhận </label>
                    </v-col>
                    <v-col cols="9">
                      <v-autocomplete
                        class="input-form"
                        hide-no-data
                        v-model="formData.DonViTiepNhan"
                        :items="[]"
                        placeholder="Chọn đơn vị tiếp nhận"
                        item-title="TenMuc"
                        item-value="MaMuc"
                        dense
                        solo
                        hide-details="auto"
                        clearable
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="d-flex justify-start align-center">
                      <label>Tài liệu đính kèm </label>
                    </v-col>
                    <v-col cols="9">
                      <v-btn
                        variant="flat"
                        size="large"
                        width="180px"
                        color="#ce7a58"
                        @click.stop="pickFileUpload"
                      >
                        Chọn file
                      </v-btn>
                      <input
                        type="file"
                        :id="'uploadFile'"
                        @input="uploadFile()"
                        style="display: none"
                    /></v-col>
                  </v-row>
                  <v-row class="mb-5">
                    <v-col cols="12" class="px-0 py-0 mt-5 text-center">
                      <v-btn
                        size="large"
                        color="#ce7a58"
                        class="mx-0 white--text"
                        width="180"
                        type="submit"
                      >
                        <span>Gửi phản ánh</span>
                      </v-btn>
                      <v-btn
                        size="large"
                        class="mx-0 white--text ml-3"
                        width="180"
                      >
                        <span>Nhập lại</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
  </v-main>
</template>

<script setup>
import { ref, watch } from "vue";
const listTabs = ref([
  { title: "Gửi PANK", value: "PANK" },
  { title: "Tra cứu kết quả trả lời", value: "TCKQ" },
]);
const listDoiTuong = ref([
  {
    title: "Người dân",
    value: "nguoidan",
  },
  {
    title: "Doanh nghiệp",
    value: "doanhnghiep",
  },
  {
    title: "Tổ chức",
    value: "tochuc",
  },
  {
    title: "Cơ quan nhà nước",
    value: "coquannhanuoc",
  },
]);
const currentTab = ref("PANK");
const formData = ref({
  DoiTuong: "nguoidan",
  TenNguoiDan: "",
});

const pickFileUpload = function () {
  document.getElementById("uploadFile").value = "";
  document.getElementById("uploadFile").click();
};
const submitForm = () => {
  console.log(formData.value);
};
</script>

<style>
@import "../assets//style.css";
</style>
