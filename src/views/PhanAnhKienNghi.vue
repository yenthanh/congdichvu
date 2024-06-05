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
              <v-card
                v-if="currentTab == 'PANK'"
                style="background-color: #fdf5ea"
              >
                <v-form
                  ref="formCrud"
                  lazy-validation
                  class="py-5 mt-2 px-10"
                  v-model="isValid"
                  @submit.prevent="submitForm"
                >
                  <v-row>
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start align-center"
                    >
                      <label
                        >Đối tượng PANK
                        <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
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
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start align-center"
                    >
                      <label
                        >Người dân <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.fullName"
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
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start align-start"
                    >
                      <label>Địa chỉ <span style="color: red">(*)</span></label>
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.address"
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
                  <v-row>
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start align-center"
                    >
                      <label
                        >Số điện thoại
                        <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.phone"
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
                            'Số điện thoại chỉ bao gồm số',
                          (v) =>
                            (v !== '' && v !== null && v !== undefined) ||
                            'Số điện thoại là bắt buộc',
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start align-center"
                    >
                      <label>Email </label>
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.email"
                        placeholder="Nhập email"
                        solo
                        dense
                        hide-details="auto"
                        clearable
                        :rules="[
                          (v) =>
                            !v ||
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) ||
                            'Email không đúng định dạng',
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start align-center"
                    >
                      <label
                        >PANK về việc <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.title"
                        placeholder="Nhập tiêu đề PANK"
                        solo
                        dense
                        hide-details="auto"
                        clearable
                        required
                        :rules="[
                          (v) =>
                            (v !== '' && v !== null && v !== undefined) ||
                            'Tiêu đề là bắt buộc',
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start align-center"
                    >
                      <label
                        >Nội dung <span style="color: red">(*)</span></label
                      >
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
                      <v-textarea
                        class="flex input-form"
                        v-model="formData.content"
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
                          font-size: 14px;
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
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start align-center"
                    >
                      <label>Đơn vị tiếp nhận </label>
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="formData.DonViTiepNhan"
                        placeholder="Nhập đơn vị tiếp nhận"
                        solo
                        dense
                        hide-details="auto"
                        clearable
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="4"
                      sm="4"
                      md="3"
                      lg="3"
                      class="d-flex justify-start"
                      :class="
                        dsFileUpload.length ? 'align-start' : 'align-center'
                      "
                    >
                      <label>Tài liệu đính kèm </label>
                    </v-col>
                    <v-col cols="8" sm="8" md="9" lg="9">
                      <v-row class="my-0 mx-0">
                        <v-btn
                          variant="flat"
                          size="large"
                          height="40px"
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
                          :multiple="true"
                          style="display: none"
                        />
                      </v-row>
                      <v-row
                        style="background-color: #ffffff"
                        class="my-0 mx-0 mb-2"
                        :class="{ 'mt-4': !index }"
                        v-for="(file, index) in dsFileUpload"
                        :key="index"
                      >
                        <v-col>
                          <p style="font-size: 18px; color: rgb(30, 47, 65)">
                            {{ `${file.name} - ${file.size}KB  ` }}
                          </p>
                        </v-col>
                        <v-col class="d-flex justify-end">
                          <v-icon
                            @click.stop="deleteFileUpload(index)"
                            size="20"
                            class="icon-draw"
                            icon="mdi-close"
                            style="cursor: pointer"
                          ></v-icon>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row class="mb-5">
                    <v-col cols="12" class="px-0 py-0 mt-5 text-center">
                      <v-btn
                        size="large"
                        color="#ce7a58"
                        class="mx-0 white--text"
                        width="180px"
                        height="40px"
                        type="submit"
                      >
                        <span>Gửi phản ánh</span>
                      </v-btn>
                      <v-btn
                        size="large"
                        variant="outlined"
                        class="mx-0 white--text ml-3"
                        width="180px"
                        height="40px"
                        style="color: #333; background-color: #ffffff"
                      >
                        <span>Nhập lại</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
              <v-card v-else>
                <div v-if="!showDetail" class="mt-5 px-4 py-4">
                  <p
                    class="mb-4"
                    style="
                      color: rgb(51, 51, 51);
                      font-weight: 500;
                      font-size: 28px;
                      line-height: 32px;
                    "
                  >
                    Tra cứu kết quả trả lời
                  </p>
                  <v-row class="mb-4">
                    <v-col cols="9">
                      <v-text-field
                        class="flex input-form"
                        v-model="keyWordSearch"
                        placeholder="Nhập mã số PAKN/ Tên người gửi"
                        solo
                        dense
                        hide-details="auto"
                        clearable
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-btn
                        size="small"
                        color="#ce7a58"
                        class="mx-0"
                        width="100%"
                        height="40px"
                        type="submit"
                      >
                        <span style="font-size: 18px">Tìm kiếm</span>
                      </v-btn></v-col
                    >
                  </v-row>
                  <p
                    class="mb-4"
                    style="
                      color: rgb(30, 47, 65);
                      font-weight: 500;
                      font-size: 22px;
                    "
                  >
                    {{
                      total
                        ? `Hiển thị tất cả ${total} kết quả`
                        : "Hiện tại chưa có kết quả "
                    }}
                  </p>
                  <v-col>
                    <div
                      class="card-contain"
                      v-for="(item, index) in dsKienNghi"
                      :key="index"
                    >
                      <p
                        style="
                          font-size: 16px;
                          color: rgb(102, 102, 102);
                          font-style: normal;
                          line-height: 21px;
                        "
                        class="mb-2"
                      >
                        {{
                          `${item.fullName} - ${dateLocaleTime(
                            item.createDate
                          )}`
                        }}
                        <span
                          style="font-style: normal"
                          :class="
                            item.status ? 'status-fail' : 'status-success'
                          "
                          >{{
                            item.status ? "Chưa trả lời" : "Đã trả lời"
                          }}</span
                        >
                      </p>
                      <div class="mb-4 card-title">
                        {{ item.title }}
                      </div>
                      <div class="mb-4 card-content">
                        {{ item.content }}
                      </div>
                    </div>
                    <Pagination
                      v-if="total"
                      :pageInput="page + 1"
                      :pageCount="pageCount"
                      :total="total"
                      @changePage="changePage"
                      style="margin-bottom: 50px"
                    />
                  </v-col>
                </div>
                <div v-else class="mt-5 px-4 py-4">
                  <v-row class="d-flex align-center mb-4">
                    <div class="d-flex">
                      <v-icon
                        size="30"
                        class="mr-3"
                        icon="mdi-chevron-left"
                        style="cursor: pointer"
                        @click.stop="showDetail = false"
                      ></v-icon>
                      <p
                        style="
                          color: rgb(51, 51, 51);
                          font-weight: 700;
                          font-size: 20px;
                          line-height: 28px;
                        "
                      >
                        {{ `Kiến nghị về việc: ${infoKienNghi.title}` }}
                      </p>
                    </div>
                  </v-row>
                  <p
                    style="
                      font-size: 14px;
                      color: rgb(102, 102, 102);
                      font-style: normal;
                      line-height: 21px;
                    "
                    class="mb-2"
                  >
                    {{
                      `Lê Tuấn - ${dateLocaleTime("2024-05-09 08:00:57.508")}`
                    }}
                  </p>
                  <div class="seperate-line"></div>
                  <v-col>
                    <v-row
                      style="
                        font-size: 18px;
                        line-height: 25px;
                        font-weight: 700;
                        color: rgb(30, 47, 65);
                      "
                      class="mb-3"
                      >Nội dung kiến nghị:</v-row
                    >
                    <v-row
                      style="
                        font-size: 16px;
                        line-height: 22px;
                        font-weight: 400;
                        color: rgb(30, 47, 65);
                      "
                      class="mb-5"
                      >{{ infoKienNghi.content }}</v-row
                    >
                    <v-row
                      v-for="(file, index) in infoKienNghi?.attachmentFile"
                      :key="index"
                    >
                      <v-col
                        cols="1"
                        class="d-flex justify-center align-center mr-3"
                        style="
                          background-color: #7c964c;
                          border-radius: 4px;
                          max-width: 70px;
                        "
                      >
                        <v-icon
                          size="30"
                          class="mr-2 text-center"
                          color="#ffff"
                          icon="mdi-paperclip"
                          style="cursor: pointer"
                        ></v-icon>
                      </v-col>
                      <v-col class="" style="background-color: #f2f4ed">
                        <p style="font-size: 14px; color: rgb(30, 47, 65)">
                          File đính kèm:
                        </p>
                        <p
                          style="font-size: 18px; color: rgb(30, 47, 65)"
                          class="file-upload"
                        >
                          file.png
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>
                  <div class="seperate-line"></div>
                  <v-col>
                    <v-row
                      style="
                        font-size: 18px;
                        line-height: 25px;
                        font-weight: 700;
                        color: rgb(30, 47, 65);
                      "
                      class="mb-3"
                      >Cơ quan chức năng trả lời:</v-row
                    >
                    <v-row
                      style="
                        font-size: 16px;
                        line-height: 22px;
                        font-weight: 400;
                        color: rgb(30, 47, 65);
                      "
                      class="mb-5"
                      >{{ infoKienNghi.reply }}
                    </v-row>
                    <v-row>
                      <v-col
                        cols="1"
                        class="d-flex justify-center align-center mr-3"
                        style="
                          background-color: #7c964c;
                          border-radius: 4px;
                          max-width: 70px;
                        "
                      >
                        <v-icon
                          size="30"
                          class="mr-2 text-center"
                          color="#ffff"
                          icon="mdi-paperclip"
                          style="cursor: pointer"
                        ></v-icon>
                      </v-col>
                      <v-col class="" style="background-color: #f2f4ed">
                        <p style="font-size: 14px; color: rgb(30, 47, 65)">
                          File đính kèm:
                        </p>
                        <p
                          style="font-size: 18px; color: rgb(30, 47, 65)"
                          class="file-upload"
                        >
                          file.png
                        </p>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-row class="mb-5">
                    <v-col
                      cols="12"
                      class="px-0 py-0 mt-5"
                      :class="
                        ['xs', 'sm'].includes(name)
                          ? 'text-center'
                          : 'text-right'
                      "
                    >
                      <v-btn
                        size="large"
                        variant="outlined"
                        color="#67A99F"
                        :class="{ 'mr-3': !['xs', 'sm'].includes(name) }"
                        height="40px"
                        :width="['xs', 'sm'].includes(name) ? '80%' : ''"
                        @click.stop="handleReact"
                      >
                        <v-icon
                          size="18"
                          class="mr-2"
                          icon="mdi-thumb-up-outline "
                          style="cursor: pointer"
                        ></v-icon>
                        <span style="font-size: 14px; text-transform: none"
                          >{{
                            `Hài lòng (${
                              infoKienNghi.rate ? infoKienNghi.rate : 0
                            })`
                          }}
                        </span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
  </v-main>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";
import $ from "jquery";
import axios from "axios";
import _ from "lodash";
import { useDisplay } from "vuetify";
import { watch } from "vue";
const Pagination = defineAsyncComponent(() =>
  import("../components/Pagination.vue")
);
const { name } = useDisplay();

const page = ref(0);
const pageCount = ref(0);
const total = ref(0);
const dsFileUpload = ref([]);
const dsKienNghi = ref([]);
const infoKienNghi = ref({});
const showDetail = ref(true);
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
});
const isValid = ref(false);

const pickFileUpload = function () {
  document.getElementById("uploadFile").value = "";
  document.getElementById("uploadFile").click();
};
const uploadFile = function () {
  let files = $("#uploadFile")[0].files;
  let arrTep = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    arrTep.push(file);
  }
  console.log(arrTep);
  dsFileUpload.value = _.cloneDeep(arrTep);
};
const dateLocaleTime = (dateInput) => {
  let date = new Date(dateInput);
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")} ngày ${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};
const submitForm = async () => {
  if (!isValid.value) {
    return;
  }
  let data = await handleSubmitKienNghi(formData.value);
};
const deleteFileUpload = (index) => {
  dsFileUpload.value.splice(index, 1);
};
const handleSubmitKienNghi = async (data) => {
  let settings = {
    method: "post",
    url: "https://x05.fds.vn/o/phananhkiennghi",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: { ...formData.value, files: dsFileUpload.value },
    params: {},
  };
  let response = await axios(settings);
  return response;
};
const getDsKienNghi = async () => {
  let settings = {
    method: "get",
    url: "https://x05.fds.vn/o/paknapi",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
    params: {
      start: 0,
      end: 5,
      maPAKN: "",
      fromRequest: "",
      toRequest: "",
      fromReply: "",
      toReply: "",
    },
  };
  let response = await axios(settings);
  return response;
};
const handleGetDsKienNghi = () => {
  getDsKienNghi()
    .then((response) => {
      dsKienNghi.value = response.datas;
      total.value = response.total;
    })
    .catch((error) => {});
};
handleGetDsKienNghi();
const changePage = function (pagePagination) {
  page.value = pagePagination.value - 1;
  getDsKienNghi();
};
const handleReact = async () => {
  let settings = {
    method: "get",
    url: `https://x05.fds.vn/o/paknapi/${infoKienNghi.value.maPAKN}/rate`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {},
    params: {},
  };
  let response = await axios(settings);
  return response;
};
</script>

<style>
@import "../assets//style.css";

.card-title,
.card-content {
  font-size: 18px;
  color: rgb(30, 47, 65);
  font-style: normal;
}
.card-title:hover {
  cursor: pointer;
  color: rgb(188, 93, 55);
}

.card-content {
  font-size: 18px;
  color: rgb(30, 47, 65);
  font-style: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.card-contain {
  border-bottom: 1px solid #cccc;
  margin-bottom: 30px;
}
.status-success {
  color: rgb(54, 179, 126);
}
.status-fail {
  color: #ce1212;
}
.seperate-line {
  margin: 15px 0px;
  height: 1px;
  background: #e9f0f8;
}
.file-upload:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
