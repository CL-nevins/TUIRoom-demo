<template>
  <Room
      ref="TUIRoomRef"
      @on-log-out="handleLogOut"
      @on-create-room="onCreateRoom"
      @on-enter-room="onEnterRoom"
      @on-exit-room="onExitRoom"
      @on-destroy-room="onDestroyRoom"
      @on-kick-off="onKickOff"
  ></Room>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Room from '@/TUIRoom/index.vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const TUIRoomRef = ref();

const roomInfo = sessionStorage.getItem('tuiRoom-roomInfo');
const userInfo = sessionStorage.getItem('tuiRoom-userInfo');
const roomId = route.query.roomId;

// 无roomId，跳转到home页; 无roomInfo,带参跳home页
if (!roomId) {
  router.push({ path: 'home' });
} else if (!roomInfo) {
  router.push({ path: 'home', query: { roomId } });
}

onMounted(async () => {
  const { action, roomMode, roomParam } = JSON.parse(roomInfo as string);
  const { sdkAppId, userId, userSig, shareUserId, shareUserSig, userName, userAvatar } = JSON.parse(userInfo as string);
  // 初始化 TUIRoom 数据
  await TUIRoomRef.value?.init({
    sdkAppId,
    userId,
    userSig,
    userName,
    userAvatar,
    shareUserId,
    shareUserSig,
  });
  if (action === 'createRoom') {
    // 主持人创建房间
    await TUIRoomRef.value?.createRoom(Number(roomId), roomMode, roomParam);
  } else if (action === 'enterRoom') {
    await TUIRoomRef.value?.enterRoom(Number(roomId), roomParam);
  }
});
/**
 * Processing users click [Logout Login] in the upper left corner of the page
 *
 * 处理用户点击页面左上角【退出登录】
 **/
function handleLogOut() {
  console.log('登出，清除 sessionStorage');
  sessionStorage.removeItem('tuiRoom-roomInfo');
  sessionStorage.removeItem('tuiRoom-userInfo');
  router.replace({ path: '/home' });
}

/**
 * Hosts create room callbacks
 *
 * 主持人创建房间回调
 **/
function onCreateRoom(info: { code: number; message: string }) {
  console.debug('onEnterRoom:', info);
}

/**
 * Ordinary members enter the room callback
 *
 * 普通成员进入房间回调
 **/
function onEnterRoom(info: { code: number; message: string }) {
  console.debug('onCreateRoom:', info);
}

/**
 * Hosts destroy room callbacks
 *
 * 主持人销毁房间回调
 **/
const onDestroyRoom = (info: { code: number; message: string }) => {
  console.log('房间信息',TUIRoomRef.value.getRoomInfo);
  console.debug('onDestroyRoom:', info);
  sessionStorage.removeItem('tuiRoom-roomInfo');
  router.replace({ path: '/home' });
};

/**
 * Ordinary members exit the room callback
 *
 * 普通成员退出房间回调
 **/
const onExitRoom = (info: { code: number; message: string }) => {
  console.debug('onExitRoom:', info);
  sessionStorage.removeItem('tuiRoom-roomInfo');
  router.replace({ path: '/home' });
};

/**
 * Ordinary members were kicked out of the room by the host
 *
 * 普通成员被主持人踢出房间
 **/
const onKickOff = (info: { code: number; message: string }) => {
  console.debug('onKickOff:', info);
  sessionStorage.removeItem('tuiRoom-roomInfo');
  router.replace({ path: '/home' });
};

</script>

<style scoped lang="scss">

</style>
