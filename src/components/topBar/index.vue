<template>

  <el-header class="header w-100%" :style="headerStyle">
    <Logo></Logo>
    
    <div class="header_right">
      <el-button v-if="!isLogin" type="primary" class="m-r-18px" @click="jumpPage('/login')">登陆</el-button>

      
        <el-row :gutter="16" >
          <el-col class="gutter-row"
            v-for="(item, index) in buttonComponentData"
            :key="index" :span="item.span"
          >
            <component  :is="item.component" round type="primary" @click="jumpPage(item.path)" >
              {{ item.text }}
            </component>
          </el-col>
        </el-row>

        <el-dropdown class="top-setting m-l-16px" split-button @command="handleButtonClick">
            {{ userInfo?.userName }}
           
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item  command="my" v-show="currentRouteName === 'FormDesign'" >
                  <el-icon :size="14"><Wallet /></el-icon>
                  我的作品
                </el-dropdown-item>

                <el-dropdown-item command="mySetting" v-if="currentRouteName !== 'mySetting'">
                  <el-icon :size="14"><Avatar /></el-icon>
                  个人设置
                </el-dropdown-item>

                <el-dropdown-item command="setting">
                  <el-icon :size="14"><SettingOutlined /></el-icon>
                  网站设置
                </el-dropdown-item>

                <el-dropdown-item command="logout">
                  <el-icon :size="14"><SwitchButton /></el-icon>
                  登出
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        
         
    </div>
  </el-header>

  <!-- 网站设置 -->
  <Setting />
  
</template>

<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue';
import { storeToRefs } from 'pinia';
import type { CSSProperties } from 'vue';
import { useRouter, RouteRecordName } from "vue-router"
import { ElLoading } from 'element-plus';
import { Wallet, Avatar, Setting as SettingOutlined, SwitchButton } from '@element-plus/icons-vue';
import Logo from "../common/logo.vue";
import Setting from '../common/Setting.vue';
import useUserStore from '@/store/modules/user'
import useSetting from '@/store/modules/setting'

const message = useMessage();

import { buttonComponent, ButtonOpt } from '@/typescript/userNavBar'

const router = useRouter()

const buttonComponentData = ref<ButtonOpt[]>([])

const props = defineProps<{type: string, buttonAuth: string}>()

buttonComponent.map(item => {
  if (item.buttonAuth === props.buttonAuth) {
    buttonComponentData.value = item.buttonOpt
  }
})

// 当前路由的name
const currentRouteName = ref<RouteRecordName | null | undefined>(router.currentRoute.value.name)

// 是否登陆/isLogin 用户信息/userInfo
const { isLogin, userInfo } = storeToRefs(useUserStore())

watch(
  () => props.type,
  () => {
    buttonComponent.map(item => {
      if (item.buttonAuth === props.buttonAuth) {
        buttonComponentData.value = item.buttonOpt
      }
    })
    currentRouteName.value = router.currentRoute.value.name
    
  }
)

// 网站设置
const { openDrawer } = storeToRefs(useSetting())

const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'rgba(0, 0, 0, .5)',
  padding: '0 50px',
  zIndex: 2
};

const jumpPage = (url: string) => {
  router.push({
    path: url
  })
}
const handleButtonClick = (e: string) => {
  console.log('click left button', e);
  if (e === 'my') {
    jumpPage('/my')
  }

  if (e === 'mySetting') {
    jumpPage('/mySetting')
  }

  if (e === 'setting') {
    openDrawer.value = true
    // openDrawer.value = true
  }
  
  
  const content = ref('退出登陆中..');
  if (e === 'logout') {
    const loading = ref()
    loading.value = ElLoading.service({
      lock: true,
      text: content.value,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    // message.loading({ content: () => content.value });
    setTimeout(() => {
      content.value = '退出登陆成功！';
      loading.value.close();
      useUserStore().logout()
      jumpPage('/login')
    }, 2000)
  }
};


</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    cursor: pointer;
    img {
      height: 35px;
    }
  }
 
  &_right {
    display: flex;
    align-items: center;
    // & > * {
    //   margin-left: 30px !important;
    // }
    .setUp {
      display: flex;
    }

    .top-setting {
      ::v-deep(.el-button) {
        border-radius: 555px 0 0 555px;
      }
      ::v-deep(.el-dropdown__caret-button) {
        border-radius: 0 555px 555px 0;
      }
    }
  }
  
}
</style>