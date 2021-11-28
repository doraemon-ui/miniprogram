type PropType = 'high' | 'medium' | 'low'

const props: {
  [T in PropType]: string[]
} = {
  'high': [
    '四次元口袋', '竹蜻蜓', '时光机', '任意门',
    '缩小灯', '时光电视', '时光布',
  ],
  'medium': [
    '穿透环', '翻译米糕', '放大灯', '自家用人造卫星', '预备口袋',
    '请客桌巾', '换衣照相机', '医生皮箱', '如果电话亭',
    '增加镜', '桃太郎饭团', '立体放映机', '格列佛隧道',
    '闪躲披风', '空气炮', '冲击枪', '取物皮包', '宇宙救命小艇', '游泳粉',
    '梦风铃', '模范写信笔', '壁纸房', '机器丸', '适应灯', '凝云瓦斯', '石头帽', '隐身披风', '迷你速建照相机',
  ],
  'low': [
    '时光皮带', '露营胶囊', '天气箱', '打开就下雨的伞', '开花粉', '钓鱼卷幕', '进化退化放射线枪', '鼹鼠手套', '透明油漆', '隐形喷漆', '交换绳', '变时钟', '回到起点骰子',
    '万能舞台装置', '结草虫式睡袋', '能进入故事书的鞋子', '超人手套', '浓缩食品', '增加气氛的乐团', '观梦镜', '浮水瓦斯', '宇宙完全大百科', '泰山裤', '强力钻岩机', '钓鱼帮手', '外卖电话', '寻人手杖', '瞬间移动潜水艇', '假日农业组合', '速成陷阱', '非生物催眠喇叭', '喷射地鼠', '搔痒跳蚤', '遥控黏土', '监督闹钟', '爆破地下室', '灾难训练机', '折叠屋', '预知回信的邮筒', '随意水龙头', '声音凝固药',
    '二十二世纪的魔术手', '人工太阳', '日光苔', '预感虫', '立体实感锭', '模型化照相机', '全自动的机械', '随意洞', '前进风车', '电车游戏', '速长饲料', '蜗牛房', '速简电梯', '瞬间接着打手枪', '音乐地瓜', '地球破坏炸弹', '万能自动工程机', '芝麻锁', '投手帽', '动物语言耳机', '植物改造精', '芭蕉扇', '热线枪', '臭气丸', '对方停止器', '万能印刷机', '超能停时表', '人类遥控器', '来来猫', '空气枪药水', '饮水吸管', '深海面霜', '风神扇', '壁纸厕所', '罐头房', '丘比特的箭', '透明披风', '相反面霜', '海水原素', '北风桌巾', '吸云机', '变暗的灯泡', '雷达杖', '推理帽', '侦探烟斗', '电脑笔', '任意箱', '泰山绳', '全能通行证', '进入的镜子', '遗忘草', '失物钓池和钓竿', '幻想药', '空间交换机', '打架拳套', '间谍卫星', '回声山', '透视眼镜', '故事徽章', '马竹', '战斗枪', '引力油漆', '催眠机', '真心话贴布', '速成机器人', '延伸水管', '时门',
    '无敌炮台',
  ],
}

function getProp (type: PropType, index?: number): string {
  return props[type][index ?? Math.floor(Math.random() * props[type].length)]
}

/**
 * 获取 “哆啦A梦” 中出现 20 次以上的常用道具
 *
 * @export
 * @param {number} [index]
 * @return {*}  {string}
 */
export function high (index?: number): string {
  return getProp('high', index)
}

/**
 * 获取 “哆啦A梦” 中出现 5 次以上的常用道具
 *
 * @export
 * @param {number} [index]
 * @return {*}  {string}
 */
export function medium (index?: number): string {
  return getProp('medium', index)
}

/**
 * 获取 “哆啦A梦” 中出现 1 次以上的常用道具
 *
 * @export
 * @param {number} [index]
 * @return {*}  {string}
 */
export function low (index?: number): string {
  return getProp('low', index)
}

export default {
  high,
  medium,
  low,
}
