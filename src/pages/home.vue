<template>
  <div class="home-container">
    <h1 class="home-title"> TUIRoom 组件 Demo</h1>
    <el-row :gutter="12">
      <el-col :span="12" :offset="6">
        <el-form :model="form" label-width="90px" class="form-wrapper" ref="tuiForm" :rules="rules">
          <el-form-item label="sdkAppId" prop="sdkAppId">
            <el-input type="number" v-model.number="form.sdkAppId"/>
          </el-form-item>
          <el-form-item label="SecretKey" prop="SecretKey">
            <el-input v-model="form.SecretKey"/>
          </el-form-item>
          <el-form-item label="userId" prop="userId">
            <el-input v-model="form.userId"/>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!roomId" type="primary" @click="submitForm(tuiForm)">创建房间</el-button>
            <el-button v-else type="primary" @click="handleEnterRoom">进入房间</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :offset="7">
        <stream-preview ref="streamPreviewRef"></stream-preview>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useRoute} from 'vue-router';
import router from '@/router';
import type {FormInstance, FormRules} from 'element-plus'
import StreamPreview from '@/TUIRoom/components/RoomHome/StreamPreview.vue';
import TUIRoomCore from '@/TUIRoom/tui-room-core';
import {getUserInfo} from "@/config";

const route = useRoute();
const streamPreviewRef = ref();
const tuiForm = ref<FormInstance>()

const roomId = route.query.roomId ? route.query.roomId : '';

const form = reactive({
  // 改成自己应用的 id 和 secretKey
  sdkAppId: 0,
  userId: 'LuRenJia',
  SecretKey: '',
})

const rules = reactive<FormRules>({
  sdkAppId: [
    {required: true, message: '请输入 sdkAppId', trigger: 'blur', type: 'number'},
    {min: 1, message: '应为正整数', trigger: 'blur', type: 'number'}
  ],
  userId: [
    {required: true, message: '请输入 userId', trigger: 'blur'},
  ],
  SecretKey: [
    {required: true, message: '请输入 SecretKey', trigger: 'blur'},
  ],
})

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      createRoom();
    } else {
      console.error('请检查你的输入!', fields)
    }
  })

}

// 生成房间
const createRoom = async () => {
  // 创建房间
  await setTUIRoomData('createRoom', userLogin())
  const roomId = await generateRoomId();
  router.replace({
    path: '/room',
    query: {
      roomId,
    },
  });
}

const setTUIRoomData = (action: string, userInfo?: any) => {
  const roomParam = streamPreviewRef.value.getRoomParam();
  const roomData = {
    action,
    roomMode: 'FreeSpeech',
    roomParam,
  };
  sessionStorage.setItem('tuiRoom-roomInfo', JSON.stringify(roomData));
}

// 创建房间时，生成房间号
async function generateRoomId(): Promise<number> {
  const roomId = Math.ceil(Math.random() * 1000000);
  const isRoomExist = await TUIRoomCore.checkRoomExistence(roomId);
  if (isRoomExist) {
    return await generateRoomId();
  }
  return roomId;
}

// userInfo 生成 & TUIRoom login
async function userLogin(){
  // 生成 userSig
  const userInfo = getUserInfo(form);
  // 存储 userInfo
  sessionStorage.setItem('tuiRoom-userInfo', JSON.stringify(userInfo));
  // TUIRoomCore 登录
  const {sdkAppId, userId, userSig} = userInfo;
  await TUIRoomCore.login(sdkAppId, userId, userSig);
  return userInfo;
}

// 被邀请人进入指定房间
async function handleEnterRoom() {
  // 进入房间
  await setTUIRoomData('enterRoom', userLogin())
  router.replace({
    path: '/room',
    query: {
      roomId,
    },
  });
}

</script>

<style lang="scss" scoped>
.home {
  &-container {
  }

  &-title {
    text-align: center;
    margin-bottom: 48px;
  }
}

.form-wrapper {
  :deep(.el-form-item__label) {
    color: #ffffff;
  }

  :deep(.el-input__inner) {
    color: #ffffff;
  }
}

.enter-room{
  margin-bottom: 24px;
}
</style>
