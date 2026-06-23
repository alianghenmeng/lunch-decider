const moods = [
  { id: "carb", label: "碳水缺失", emoji: "🍚", diagnosis: "确诊：碳水灵魂离线。", tags: ["米饭", "顶饱", "省钱"] },
  { id: "battery", label: "低电量人类", emoji: "🪫", diagnosis: "确诊：今天只剩勉强营业。", tags: ["清淡", "热乎", "暖胃"] },
  { id: "spicy", label: "重口续命", emoji: "🌶", diagnosis: "确诊：需要一点辣证明自己还活着。", tags: ["辣", "重口", "快乐"] },
  { id: "wallet", label: "钱包报警", emoji: "💸", diagnosis: "确诊：想吃好的，但余额不同意。", tags: ["省钱", "快餐", "面食"] },
  { id: "soup", label: "热汤续命", emoji: "🍲", diagnosis: "确诊：胃需要一点人间温度。", tags: ["汤", "热乎", "暖胃"] },
  { id: "fate", label: "玄学托管", emoji: "🔮", diagnosis: "确诊：你需要一个替你背锅的按钮。", tags: ["玄学"] }
];

const meals = [
  ["黄焖鸡米饭", ["米饭", "顶饱", "热乎", "省钱"], "有饭有肉有汤汁，午饭界的靠谱同事。"],
  ["番茄牛腩饭", ["米饭", "热乎", "高蛋白"], "酸甜汤汁一浇，班味能洗掉三成。"],
  ["照烧鸡腿饭", ["米饭", "顶饱", "高蛋白"], "不吵不闹，很像终于会沟通的同事。"],
  ["台式卤肉饭", ["米饭", "顶饱", "咸鲜"], "卤汁下去，灵魂短暂归位。"],
  ["广式烧腊饭", ["米饭", "顶饱", "高蛋白"], "油光很诚实，快乐也很诚实。"],
  ["麻辣烫", ["辣", "重口", "热乎", "快乐"], "想吃什么夹什么，午饭界自助式人生。"],
  ["麻辣香锅", ["辣", "重口", "快乐", "顶饱"], "适合把生活里的钝感直接炒香。"],
  ["酸菜鱼", ["辣", "重口", "高蛋白", "快乐"], "鱼负责鲜，酸菜负责把你叫醒。"],
  ["重庆小面", ["辣", "面食", "省钱", "热乎"], "便宜、热乎、够味，打工人三件套。"],
  ["牛肉面", ["面食", "热乎", "汤", "高蛋白"], "汤一喝，灵魂归位。面一嗦，下午营业。"],
  ["鸡汤馄饨", ["清淡", "热乎", "暖胃", "汤"], "适合低电量人类，像被世界轻拍肩膀。"],
  ["皮蛋瘦肉粥", ["清淡", "暖胃", "省钱"], "今天不硬刚生活，今天温柔续航。"],
  ["砂锅米线", ["热乎", "汤", "面食", "暖胃"], "热气一上来，烦恼自动后退半步。"],
  ["水饺", ["面食", "省钱", "顶饱"], "简单直接，午饭界老实人。"],
  ["生煎包", ["面食", "省钱", "快乐"], "底脆汁多，奖励一下没崩溃的你。"],
  ["轻食能量碗", ["清淡", "低负担", "高蛋白"], "吃完会产生一种我在管理人生的错觉。"],
  ["蒸菜套餐", ["清淡", "米饭", "低负担"], "体面吃饭，不和肠胃正面开战。"],
  ["韩式拌饭", ["米饭", "重口", "高蛋白"], "搅一搅拌一拌，人生暂时也能糊弄。"],
  ["日式牛肉饭", ["米饭", "快餐", "高蛋白"], "快、稳、香，适合结束午饭选择题。"],
  ["烤肉拌饭", ["米饭", "重口", "快乐"], "肉香负责快乐，米饭负责兜底。"],
  ["炸鸡汉堡", ["快餐", "快乐", "高蛋白"], "今天别讲大道理，先让快乐脆一下。"],
  ["披萨", ["快乐", "重口"], "对平淡工作日进行一点小型叛逆。"],
  ["咖喱鸡肉饭", ["米饭", "热乎", "顶饱"], "把普通午休染成金黄色。"],
  ["煲仔饭", ["米饭", "热乎", "咸鲜"], "锅巴一响，命运鼓掌。"],
  ["鱼香肉丝饭", ["米饭", "重口", "省钱"], "没有鱼也叫鱼香，午饭本来就很玄学。"],
  ["番茄鸡蛋面", ["清淡", "热乎", "面食", "省钱"], "朴素但靠谱，像生活递来的温柔假条。"],
  ["酸辣粉", ["辣", "重口", "省钱"], "一口下去，困意被辣醒。"],
  ["海南鸡饭", ["清淡", "米饭", "高蛋白"], "清爽稳定，不让胃参加团建。"],
  ["冒菜", ["辣", "热乎", "重口", "快乐"], "一个人的火锅平替，孤独但很香。"],
  ["螺蛳粉", ["辣", "重口", "快乐"], "社交距离自动拉开，但快乐会靠近。"],
  ["猪脚饭", ["米饭", "顶饱", "咸鲜"], "打工人硬通货，吃完还能再顶两小时。"],
  ["热干面", ["面食", "省钱", "顶饱"], "芝麻酱一拌，灵魂暂时不会散。"]
].map(([name, tags, intro], index) => ({ id: index, name, tags, intro }));

const tickers = [
  "饭签机今日开光：不包好吃，但包你别再纠结。",
  "不是我说你，饭都没吃，哪来的力气摸鱼？",
  "午饭别开会了，交给玄学。",
  "不好吃怪饭签，别怪自己。",
  "今日忌：把午饭选成年度战略会议。"
];

const ritualLines = [
  "正在让玄学背锅...",
  "正在排除嘴上随便心里嫌弃的选项...",
  "正在计算下午摸鱼所需热量...",
  "正在向碳水之神递交申请...",
  "正在生成一个别太后悔的答案..."
];

const verdicts = [
  "不是我说你，不吃饱哪来的力气摸鱼。",
  "这顿饭不负责治愈人生，只负责让你别饿着骂人生。",
  "点它吧，万一不好吃，就怪玄学，别怪自己。",
  "饭都没吃，下午怎么假装自己很忙。",
  "你说随便，但每一个选项你都有意见。",
  "本饭自带轻微招财属性，适合下午报价、催款和假装很专业。",
  "今日贵人运上升，表现为有人把会议取消。",
  "饿着肚子摸鱼，属于对鱼和胃都不尊重。",
  "命运已经端上桌了，别让它凉了。",
  "别再装随便了，你的随便比需求文档还难伺候。",
  "今日饭签已出，继续纠结属于擅自加班。",
  "点它，吃它，忘了它。午饭不需要写复盘。",
  "你不是想吃这个，你是需要一个结束纠结的理由。",
  "吃完它，下午被消息轰炸时，至少胃是站在你这边的。",
  "别再和午饭拉扯了，它只是饭，不是前任。",
  "这顿饭不能改变人生，但能改变你下午的脸色。",
  "本饭签已替你拍板，大脑可以去旁边休息了。",
  "午饭不需要灵魂契合，能准时入口就很伟大。",
  "吃它吧，再不吃饭，世界看起来会更讨厌。"
];

const powers = ["摸鱼续航 +20%", "精神力 +18%", "横跳欲望 -35%", "班味清除 30%", "开会耐受 +12%", "碳水护体成功"];
const dos = ["宜：碳水续命", "宜：相信第一眼", "宜：少点内耗", "宜：趁热下单", "宜：体面地省", "宜：正常吃饭"];
const donts = ["忌：反复横跳", "忌：空腹冰美式", "忌：刷外卖20分钟", "忌：质疑饭签", "忌：拿零食假装午餐", "忌：饿着开会"];
const flavors = ["幸运调味：葱花", "幸运调味：辣椒油", "幸运调味：蒜香", "幸运调味：番茄汤汁", "幸运调味：芝麻酱", "幸运调味：一勺热汤"];

let selectedMood = null;
let currentResult = null;
let redrawCount = 0;
let ritualTimer = null;

const $ = (selector) => document.querySelector(selector);
const pick = (items) => items[Math.floor(Math.random() * items.length)];
const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch (_) { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

document.addEventListener("DOMContentLoaded", () => {
  $("#ticker").textContent = pick(tickers);
  renderMoods();
  renderHistory();
  showView("viewMood");
  $("#drawBtn").addEventListener("click", drawMeal);
  $("#copyBtn").addEventListener("click", copyMeal);
  $("#acceptBtn").addEventListener("click", acceptFate);
  $("#redrawBtn").addEventListener("click", redraw);
});

function showView(id) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === id));
  const active = document.getElementById(id);
  if (active) active.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderMoods() {
  $("#moodGrid").innerHTML = moods.map((mood) => `<button class="sticker" data-mood="${mood.id}">
    <b>${mood.emoji}</b>
    <span>${mood.label}</span>
  </button>`).join("");
  document.querySelectorAll("[data-mood]").forEach((button) => button.addEventListener("click", () => {
    selectedMood = moods.find((mood) => mood.id === button.dataset.mood);
    document.querySelectorAll("[data-mood]").forEach((item) => item.classList.toggle("active", item === button));
    $("#machine").classList.add("fed");
    $("#machineHint").textContent = "症状已投喂，下面开签";
    $("#diagnosis").textContent = selectedMood.diagnosis;
    setTimeout(() => showView("viewSummon"), 320);
  }));
}

function drawMeal() {
  if (!selectedMood) return;
  $("#ritual").hidden = false;
  let i = 0;
  $("#ritualText").textContent = ritualLines[0];
  clearInterval(ritualTimer);
  ritualTimer = setInterval(() => {
    i += 1;
    $("#ritualText").textContent = ritualLines[i % ritualLines.length];
  }, 260);
  setTimeout(() => {
    clearInterval(ritualTimer);
    $("#ritual").hidden = true;
    currentResult = buildResult();
    renderResult(currentResult);
  }, 1500);
}

function buildResult() {
  const pool = selectedMood.id === "fate" ? meals : meals.map((meal) => {
    const matches = meal.tags.filter((tag) => selectedMood.tags.includes(tag)).length;
    return { ...meal, score: matches * 20 + Math.random() * 10 };
  }).sort((a, b) => b.score - a.score).slice(0, 14);
  const main = pick(pool);
  const backups = meals.filter((meal) => meal.name !== main.name).sort(() => Math.random() - 0.5).slice(0, 2);
  return {
    main,
    backups,
    verdict: `${pick(verdicts)}${main.intro}`,
    power: pick(powers),
    luckyDo: pick(dos),
    luckyDont: pick(donts),
    flavor: pick(flavors)
  };
}

function renderResult(result) {
  const slip = $("#fortuneSlip");
  slip.classList.remove("throw-away", "reveal-again");
  void slip.offsetWidth;
  slip.classList.add("reveal-again");
  $("#mealName").textContent = result.main.name;
  $("#powerBadge").textContent = result.power;
  $("#verdict").textContent = result.verdict;
  $("#luckyDo").textContent = result.luckyDo;
  $("#luckyDont").textContent = result.luckyDont;
  $("#luckyFlavor").textContent = result.flavor;
  $("#backupLine").innerHTML = `备胎饭：${result.backups.map((meal) => `<b>${meal.name}</b>`).join(" / ")}`;
  $("#copyBtn").textContent = "复制去下单";
  showView("viewResult");
}

async function copyMeal() {
  if (!currentResult) return;
  await navigator.clipboard.writeText(currentResult.main.name);
  $("#copyBtn").textContent = "已复制，去外卖开战";
}

function acceptFate() {
  if (!currentResult) return;
  const history = load("fortuneHistory", []);
  history.unshift({ name: currentResult.main.name, power: currentResult.power, at: Date.now() });
  save("fortuneHistory", history.slice(0, 5));
  renderHistory();
  $("#diagnosis").textContent = `命已收下：${currentResult.main.name}。别再横跳了。`;
  showView("viewHistory");
}

function redraw() {
  redrawCount += 1;
  const roasts = ["你开始质疑玄学了。", "行吧，饭签机也有售后。", "再抽下去，空气拌饭要入选了。"];
  $("#diagnosis").textContent = roasts[Math.min(redrawCount - 1, roasts.length - 1)];
  const slip = $("#fortuneSlip");
  slip.classList.add("throw-away");
  setTimeout(drawMeal, 360);
}

function renderHistory() {
  const history = load("fortuneHistory", []);
  $("#historyList").innerHTML = history.length ? history.map((item) => `<div class="history-chip">
    <b>${item.name}</b>
    <span>${item.power}</span>
  </div>`).join("") : `<div class="empty">还没有收下任何饭命。</div>`;
}
