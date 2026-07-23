<template>
  <div class="p-4">
    <div class="md:flex">
      <template v-for="(item, index) in growCardList" :key="item.title">
        <Card
          size="small"
          :loading="loading"
          :title="item.title"
          class="md:w-1/4 w-full !md:mt-0 !mt-4"
          :class="[index + 1 < 4 && '!md:mr-4']"
          :canExpan="false"
        >
          <template #extra>
            <Tag color="green">{{ item.action }}</Tag>
          </template>

          <div class="py-4 px-4 flex justify-between">
            <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl" />
            <Icon :icon="item.icon" :size="40" />
          </div>

          <div class="p-2 px-4 flex justify-between">
            <span>今日已处理</span>
            <CountTo prefix="" :startVal="1" :endVal="item.total" />
          </div>
        </Card>
      </template>

      <template v-for="(item, index) in growCardList2" :key="item.title">
        <Card
          size="small"
          :loading="loading"
          :title="item.title"
          class="md:w-1/4 w-full !md:mt-0 !mt-4"
          :class="[index + 1 < 4 && '!md:mr-4']"
          :canExpan="false"
        >
          <template #extra>
            <Tag color="green">{{ item.action }}</Tag>
          </template>

          <div class="py-4 px-4 flex justify-between">
            <CountTo prefix="" :startVal="1" :endVal="item.value" class="text-2xl" />
            <Icon :icon="item.icon" :size="40" />
          </div>

          <div class="p-2 px-4 flex justify-between">
            <span>今日已处理</span>
            <CountTo prefix="" :startVal="1" :endVal="item.total" />
          </div>
        </Card>
      </template>
    </div>


    <a-card :loading="loading" :bordered="false" :body-style="{ padding: '0' }">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }">

          <a-tab-pane loading="true" tab="入库趋势" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <Bar :chartData="inOrderBarData" :option="{ title: { text: '', textStyle: { fontWeight: 'lighter' } } }" height="40vh" :seriesColor="seriesColor"  />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <RankList title="货主出库排行榜" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="出库趋势" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <Bar :chartData="outOrderBarData" :option="{ title: { text: '', textStyle: { fontWeight: 'lighter' } } }" height="40vh" :seriesColor="seriesColor" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <RankList title="门店销售排行榜" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>


    <a-row>
      <a-col :span="24">
        <a-card :loading="loading" :class="{ 'anty-list-cust': true }" :bordered="false">
          <a-tabs v-model:activeKey="indexBottomTab" size="large" :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }">

            <a-tab-pane tab="库存预警" key="1">
              <a-table
                :dataSource="dataSource"
                size="default"
                rowKey="reBizCode"
                :columns="table.columns"
                :pagination="ipagination"
                @change="tableChange"
              >

              </a-table>
            </a-tab-pane>

          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import {ref, watch, computed, unref} from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';

  import Bar from '/@/components/chart/Bar.vue';
  import RankList from '/@/components/chart/RankList.vue';
import {defHttp} from "@/utils/http/axios";



  const loading = ref(true);
  const { getThemeColor } = useRootSetting();
  interface GrowCardItem {
    icon: string;
    title: string;
    value?: number;
    total: number;
    color?: string;
    action?: string;
    footer?: string;
  }
const growCardList= ref( [
    {
      title: '待收货任务',
      icon: 'visit-count|svg',
      value: 0,
      total: 0,
      action: '当天',
    },
    {
      title: '待上架任务',
      icon: 'total-sales|svg',
      value: 0,
      total: 0,
      action: '当天',
    },
    {
      title: '待拣货任务',
      icon: 'download-count|svg',
      value: 0,
      total: 0,
      action: '当天',
    },
  ]);
const growCardList2= ref( [
    {
      title: '待打包数',
      icon: 'transaction|svg',
      value: 0,
      total: 0,
      action: '当天',
    },
  ]);


const table = {
  dataSource: [
    { reBizCode: '1', type: '转移登记', acceptBy: '张三', acceptDate: '2019-01-22', curNode: '任务分派', flowRate: 60 },
    { reBizCode: '2', type: '抵押登记', acceptBy: '李四', acceptDate: '2019-01-23', curNode: '领导审核', flowRate: 30 },
    { reBizCode: '3', type: '转移登记', acceptBy: '王武', acceptDate: '2019-01-25', curNode: '任务处理', flowRate: 20 },
    { reBizCode: '4', type: '转移登记', acceptBy: '赵楼', acceptDate: '2019-11-22', curNode: '部门审核', flowRate: 80 },
    { reBizCode: '5', type: '转移登记', acceptBy: '钱就', acceptDate: '2019-12-12', curNode: '任务分派', flowRate: 90 },
    { reBizCode: '6', type: '转移登记', acceptBy: '孙吧', acceptDate: '2019-03-06', curNode: '任务处理', flowRate: 10 },
    { reBizCode: '7', type: '抵押登记', acceptBy: '周大', acceptDate: '2019-04-13', curNode: '任务分派', flowRate: 100 },
    { reBizCode: '8', type: '抵押登记', acceptBy: '吴二', acceptDate: '2019-05-09', curNode: '任务上报', flowRate: 50 },
    { reBizCode: '9', type: '抵押登记', acceptBy: '郑爽', acceptDate: '2019-07-12', curNode: '任务处理', flowRate: 63 },
    { reBizCode: '20', type: '抵押登记', acceptBy: '林有', acceptDate: '2019-12-12', curNode: '任务打回', flowRate: 59 },
    { reBizCode: '11', type: '转移登记', acceptBy: '码云', acceptDate: '2019-09-10', curNode: '任务签收', flowRate: 87 },
  ],
  columns: [
    {
      title: '业务号',
      align: 'center',
      dataIndex: 'reBizCode',
    },
    {
      title: '业务类型',
      align: 'center',
      dataIndex: 'type',
    },
    {
      title: '受理人',
      align: 'center',
      dataIndex: 'acceptBy',
    },
    {
      title: '受理时间',
      align: 'center',
      dataIndex: 'acceptDate',
    },
    {
      title: '当前节点',
      align: 'center',
      dataIndex: 'curNode',
    },
    {
      title: '办理时长',
      align: 'center',
      dataIndex: 'flowRate',
    },
  ],
  ipagination: {
    current: 1,
    pageSize: 5,
    pageSizeOptions: ['10', '20', '30'],
    showTotal: (total, range) => {
      return range[0] + '-' + range[1] + ' 共' + total + '条';
    },
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
  },
};

  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const rankList = ref([
    {
      name: '白鹭岛 1号店',
      total: 1234.56 ,
    },
    {
      name: '白鹭岛 2号店',
      total: 1274.56 ,
    },
    {
      name: '白鹭岛 1号店',
      total: 1234.56 ,
    },
    {
      name: '白鹭岛 2号店',
      total: 1274.56 ,
    },
    {
      name: '白鹭岛 1号店',
      total: 1234.56 ,
    }

  ]);

  const inOrderBarData = ref([
    {
      name: `1月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `3月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `4月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `5月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `6月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `7月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `8月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `9月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `10 月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `11月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `12月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },

  ]);
  const outOrderBarData = ref([
    {
      name: `1月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `3月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `4月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `5月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `6月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `7月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `8月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `9月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `10 月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `11月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },
    {
      name: `12月`,
      value: Math.floor(Math.random() * 1000) + 200,
    },

  ]);
  const seriesColor = computed(() => {
    return getThemeColor.value
  })


  setTimeout(() => {
    loading.value = false;
  }, 500);



const indexBottomTab = ref('1');
const indexRegisterType = ref('转移登记');
const dataSource = ref([]);
const ipagination = ref(table.ipagination);

function tableChange(pagination) {
  ipagination.value.current = pagination.current;
  ipagination.value.pageSize = pagination.pageSize;
  loadDataSource();
}


function loadDataSource() {
  dataSource.value = table.dataSource
}

loadDataSource();



//加载待办任务
todoTaskList();
//加载入库趋势
inOrderData();
//加载出库趋势
outOrderData();
//加载货主出库统计
rankListData();

/**
 * 获取仓库信息
 */
async function getTodoTaskList(params?){
  return defHttp.get({ url: '/bigscreen/todo-tasks', params });
}
/**
 *加载待办任务
 */
async function todoTaskList() {
  const result = await getTodoTaskList();
  console.log('records', result)
  if (result && result.length > 0) {
     growCardList.value=result;
  }
}
/**
 * 获取入库趋势
 */
async function getInOrderData(params?){
   return defHttp.get({ url: '/bigscreen/todo-tasks', params });
}
/**
 * 加载入库趋势
 */
async function inOrderData() {
  const result = await getInOrderData();
  console.log('records', result)
  if (result && result.length > 0) {
    inOrderBarData.value=result;
  }
}
/**
 * 获取出库趋势
 */
async function getOutOrderData(params?){
  // return defHttp.get({ url: '/bigscreen/todo-tasks', params });
}
/**
 * 加载入库趋势
 */
async function outOrderData() {
  const result = await getOutOrderData();
  console.log('records', result)
  if (result && result.length > 0) {
    outOrderBarData.value=result;
  }
}
/**
 * 获取货主出库统计
 */
async function getRankList(params?){
  // return defHttp.get({ url: '/bigscreen/todo-tasks', params });
}
/**
 * 加载货主出库统计
 */
async function rankListData() {
  const result = await getRankList();
  console.log('records', result)
  if (result && result.length > 0) {
    rankList.value=result;
  }
}


// 暴露方法给父组件
defineExpose({
  todoTaskList,inOrderData,outOrderData,rankListData
});
</script>

<style lang="less" scoped>
   .infoArea {
    display: flex;
    justify-content: space-between;
    padding: 0 10%;
    .head-info.center {
      padding: 0;
    }
    .head-info {
      min-width: 0;
    }
  }
  .circle-cust {
    position: relative;
    top: 28px;
    left: -100%;
  }

  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  /* 首页访问量统计 */
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      font-size: 0.95rem;
      line-height: 42px;
      margin-bottom: 4px;
    }

    p {
      line-height: 42px;
      margin: 0;

      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }
  .ant-card {
    ::v-deep(.ant-card-head-title) {
      font-weight: normal;
    }
  }
</style>
