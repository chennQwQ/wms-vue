import { defHttp } from '/@/utils/http/axios';

enum Api {
  loginfo = '/sys/loginfo',
  visitInfo = '/sys/visitInfo',
  todoTasks = '/bigscreen/todo-tasks',
  inboundTrend = '/bigscreen/inbound-trend',
  outboundTrend = '/bigscreen/outbound-trend',
  ownerOutboundRanking = '/bigscreen/owner-outbound-ranking',
}
/**
 * 日志统计信息
 * @param params
 */
export const getLoginfo = (params) => defHttp.get({ url: Api.loginfo, params }, { isTransformResponse: false });
/**
 * 访问量信息
 * @param params
 */
export const getVisitInfo = (params) => defHttp.get({ url: Api.visitInfo, params }, { isTransformResponse: false });

export const getTodoTasks = () => defHttp.get({ url: Api.todoTasks });
export const getInboundTrend = () => defHttp.get({ url: Api.inboundTrend });
export const getOutboundTrend = () => defHttp.get({ url: Api.outboundTrend });
export const getOwnerOutboundRanking = () => defHttp.get({ url: Api.ownerOutboundRanking });
