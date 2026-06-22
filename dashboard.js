const DEFAULT_TASTES = ["随便吃", "清淡", "热乎", "重口", "辣", "高蛋白", "低油低脂", "面食", "米饭"];
const DEFAULT_ITEMS = [
  ["皮蛋瘦肉粥", ["清淡", "热乎"], 16], ["鸡汤馄饨", ["清淡", "热乎", "面食"], 22],
  ["鲜肉小笼包", ["热乎", "面食"], 20], ["番茄鸡蛋面", ["清淡", "热乎", "面食"], 20],
  ["兰州牛肉面", ["热乎", "高蛋白", "面食"], 25], ["重庆小面", ["重口", "辣", "热乎", "面食"], 22],
  ["酸辣粉", ["重口", "辣", "热乎"], 20], ["砂锅米线", ["热乎", "米饭"], 24],
  ["麻辣烫", ["重口", "辣", "热乎"], 30], ["麻辣香锅", ["重口", "辣", "米饭"], 38],
  ["黄焖鸡米饭", ["热乎", "高蛋白", "米饭"], 28], ["咖喱鸡肉饭", ["热乎", "高蛋白", "米饭"], 30],
  ["番茄牛腩饭", ["热乎", "高蛋白", "米饭"], 36], ["照烧鸡腿饭", ["高蛋白", "米饭"], 32],
  ["黑椒牛柳饭", ["重口", "高蛋白", "米饭"], 38], ["台式卤肉饭", ["重口", "米饭"], 28],
  ["广式烧腊饭", ["重口", "高蛋白", "米饭"], 34], ["鱼香肉丝饭", ["重口", "辣", "米饭"], 28],
  ["宫保鸡丁饭", ["重口", "辣", "高蛋白", "米饭"], 30], ["韩式拌饭", ["重口", "米饭"], 32],
  ["日式牛肉饭", ["高蛋白", "米饭"], 32], ["海南鸡饭", ["清淡", "高蛋白", "米饭"], 35],
  ["蒸菜套餐", ["清淡", "低油低脂", "米饭"], 30], ["清蒸鱼套餐", ["清淡", "高蛋白", "低油低脂", "米饭"], 45],
  ["鸡胸肉沙拉", ["清淡", "高蛋白", "低油低脂"], 36], ["全麦鸡肉卷", ["清淡", "高蛋白", "低油低脂"], 28],
  ["轻食能量碗", ["清淡", "高蛋白", "低油低脂", "米饭"], 38], ["三明治配汤", ["清淡", "热乎", "低油低脂"], 30],
  ["水饺", ["清淡", "热乎", "面食"], 25], ["生煎包", ["热乎", "面食"], 24],
  ["酸菜鱼饭", ["重口", "辣", "高蛋白", "米饭"], 42], ["剁椒鱼头饭", ["重口", "辣", "高蛋白", "米饭"], 45],
  ["烤肉拌饭", ["重口", "高蛋白", "米饭"], 32], ["炸鸡汉堡", ["重口", "高蛋白"], 35],
  ["披萨", ["重口"], 45], ["煲仔饭", ["热乎", "重口", "米饭"], 35]
].map(([name, tags, price], index) => ({ id: `default-${index}`, name, tags, price, custom: false }));

const state = { tastes: new Set(), recommendations: [], libraryExpanded: false };
const $ = (selector) => document.querySelector(selector);
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } };
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

document.addEventListener("DOMContentLoaded", () => {
  renderTastes(); renderLocation(); renderLibrary(); renderHistory();
  $("#recommend").addEventListener("click", recommend);
  $("#again").addEventListener("click", recommend);
  $("#addItem").addEventListener("click", addItem);
  $("#toggleLibrary").addEventListener("click", () => { state.libraryExpanded = !state.libraryExpanded; renderLibrary(); });
  $("#searchNearby").addEventListener("click", searchNearby);
  $("#locationInput").addEventListener("keydown", (event) => { if (event.key === "Enter") searchNearby(); });
  $("#clearHistory").addEventListener("click", () => { save("lunchHistory", []); renderHistory(); });
});

function renderTastes() {
  $("#tastes").innerHTML = DEFAULT_TASTES.map((taste) => {
    const active = taste === "随便吃" ? state.tastes.size === 0 : state.tastes.has(taste);
    return `<button class="chip ${active ? "active" : ""}" data-taste="${taste}">${taste}</button>`;
  }).join("");
  document.querySelectorAll("[data-taste]").forEach((button) => button.addEventListener("click", () => {
    const taste = button.dataset.taste;
    if (taste === "随便吃") state.tastes.clear();
    else if (state.tastes.has(taste)) state.tastes.delete(taste);
    else state.tastes.add(taste);
    renderTastes();
  }));
}

function allItems() {
  const nearby = load("nearbyLunchItems", []);
  const custom = load("customLunchItems", []);
  return nearby.length ? [...nearby, ...custom] : [...DEFAULT_ITEMS, ...custom];
}

function recommend() {
  const budget = Number($("#budget").value);
  const tastes = [...state.tastes];
  const recentNames = new Set(load("lunchHistory", []).slice(0, 7).map((item) => item.name));
  const eligible = allItems().filter((item) => item.price <= budget).map((item) => {
    const matches = tastes.filter((taste) => item.tags.includes(taste));
    let score = Math.random() * 20 + matches.length * 25;
    if (tastes.length && !matches.length) score -= 20;
    if (recentNames.has(item.name)) score -= 35;
    if (item.distance) score -= item.distance * 4;
    return { ...item, matches, score };
  }).sort((a, b) => b.score - a.score);
  state.recommendations = eligible.slice(0, 3);
  if (!state.recommendations.length) { showStatus("当前预算下没有候选，调高预算或添加一项吧。", true); return; }
  renderCards();
  $("#results").hidden = false;
  showStatus(`已从 ${eligible.length} 个符合预算的候选中选出 3 个答案。`);
  $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCards() {
  $("#cards").innerHTML = state.recommendations.map((item, index) => `<article class="card">
    <div class="rank">0${index + 1}</div><h3>${escapeHtml(item.name)}</h3>
    <div class="meta">${item.distanceKm ? `${item.distanceKm} km · ` : ""}约 ${item.price} 元 · ${item.tags.join("、")}</div>
    <div class="reason">${item.matches.length ? `符合今天的“${item.matches.join("、")}”` : "给今天一点随机惊喜"}</div>
    <div class="card-actions"><button class="order" data-copy="${escapeHtml(item.name)}">复制名称</button><button class="order" data-choose="${escapeHtml(item.id)}">就吃这个</button></div>
  </article>`).join("");
  document.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy); button.textContent = "已复制";
  }));
  document.querySelectorAll("[data-choose]").forEach((button) => button.addEventListener("click", () => choose(button.dataset.choose)));
}

function choose(id) {
  const item = state.recommendations.find((candidate) => candidate.id === id);
  if (!item) return;
  const history = [{ name: item.name, price: item.price, at: Date.now() }, ...load("lunchHistory", [])].slice(0, 30);
  save("lunchHistory", history); renderHistory(); showStatus(`今天就吃：${item.name}。决定完成。`);
}

function addItem() {
  const name = $("#itemName").value.trim().slice(0, 30);
  const price = Number($("#itemPrice").value);
  const tags = $("#itemTags").value.trim().split(/[\s,，、]+/).filter(Boolean).slice(0, 6);
  if (!name || !price) { showStatus("请填写名称和大致价格。", true); return; }
  const custom = load("customLunchItems", []);
  custom.push({ id: `custom-${Date.now()}`, name, price, tags, custom: true }); save("customLunchItems", custom);
  $("#itemName").value = $("#itemTags").value = $("#itemPrice").value = ""; renderLibrary(); showStatus(`${name} 已加入候选库。`);
}

function renderLibrary() {
  const custom = load("customLunchItems", []);
  const nearby = load("nearbyLunchItems", []);
  const baseItems = nearby.length ? nearby : DEFAULT_ITEMS;
  const visibleItems = [...baseItems, ...custom];
  $("#libraryCount").textContent = `共 ${visibleItems.length} 项`;
  $("#libraryDescription").textContent = nearby.length ? `已找到 ${nearby.length} 家周边餐厅，推荐时会优先考虑距离、口味和预算。价格为分类估算。` : "还没有定位时使用内置午餐；添加定位后会优先推荐周边餐厅。";
  const shown = state.libraryExpanded ? visibleItems : visibleItems.slice(0, 12);
  $("#toggleLibrary").textContent = state.libraryExpanded ? "收起" : `查看全部 ${visibleItems.length} 项`;
  $("#toggleLibrary").hidden = visibleItems.length <= 12;
  $("#customItems").innerHTML = shown.map((item) => `<article class="library-item">
    <div><b>${escapeHtml(item.name)}</b><span>${item.tags.length ? item.tags.join(" · ") : "自定义"}</span></div>
    <div class="library-item-meta">${item.distanceKm ? `<small>${item.distanceKm} km</small>` : ""}<strong>约 ¥${item.price}</strong>${item.custom ? `<button data-remove="${item.id}" aria-label="删除 ${escapeHtml(item.name)}">×</button>` : ""}</div>
  </article>`).join("") || `<span class="empty">候选库还是空的，先添加一项吧。</span>`;
  document.querySelectorAll("[data-remove]").forEach((button) => button.addEventListener("click", () => { save("customLunchItems", custom.filter((item) => item.id !== button.dataset.remove)); renderLibrary(); }));
}

function renderLocation() {
  const location = load("lunchLocation", null);
  if (!location) return;
  $("#locationInput").value = location.query;
  $("#radius").value = String(location.radius);
  $("#locationSummary").innerHTML = `当前位置：<strong>${escapeHtml(location.displayName)}</strong> · 已缓存 ${load("nearbyLunchItems", []).length} 家餐厅`;
}

async function searchNearby() {
  const query = $("#locationInput").value.trim();
  const radius = Number($("#radius").value);
  if (!query) { showStatus("请输入一个商场、写字楼、园区或地铁站。", true); return; }
  const button = $("#searchNearby");
  button.disabled = true; button.textContent = "正在找餐厅…";
  showStatus("正在确认位置并搜索周边餐饮信息…");
  try {
    const geoUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=cn&accept-language=zh-CN&q=${encodeURIComponent(query)}`;
    const geoResponse = await fetch(geoUrl, { headers: { "Accept": "application/json" } });
    if (!geoResponse.ok) throw new Error("地图定位服务暂时不可用");
    const places = await geoResponse.json();
    if (!places.length) throw new Error("没有找到这个位置，请补充城市名称后再试");
    const lat = Number(places[0].lat); const lon = Number(places[0].lon);
    const overpassQuery = `[out:json][timeout:25];(nwr["amenity"~"restaurant|fast_food|cafe"](around:${radius},${lat},${lon}););out center tags;`;
    const poiResponse = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`, { headers: { "Accept": "application/json" } });
    if (!poiResponse.ok) throw new Error("周边餐厅查询繁忙，请稍后再试");
    const poiData = await poiResponse.json();
    const nearby = poiData.elements.map((element) => mapRestaurant(element, lat, lon)).filter(Boolean)
      .sort((a, b) => a.distance - b.distance).slice(0, 50);
    if (!nearby.length) throw new Error("公开地图中暂时没有这个位置附近的餐厅数据");
    save("nearbyLunchItems", nearby);
    save("lunchLocation", { query, radius, displayName: places[0].display_name, lat, lon, updatedAt: Date.now() });
    renderLocation(); renderLibrary();
    showStatus(`找到 ${nearby.length} 家周边餐厅，已经加入今天的推荐范围。`);
  } catch (error) {
    showStatus(error.message || "搜索失败，请稍后再试。", true);
  } finally {
    button.disabled = false; button.textContent = "搜索周边";
  }
}

function mapRestaurant(element, originLat, originLon) {
  const tags = element.tags || {};
  const name = tags["name:zh"] || tags.name;
  const lat = Number(element.lat ?? element.center?.lat); const lon = Number(element.lon ?? element.center?.lon);
  if (!name || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const distance = haversine(originLat, originLon, lat, lon);
  const foodTags = inferRestaurantTags(name, tags.cuisine, tags.amenity);
  const price = tags.amenity === "fast_food" ? 25 : tags.amenity === "cafe" ? 35 : 35;
  return { id: `osm-${element.type}-${element.id}`, name, tags: foodTags, price, distance, distanceKm: distance.toFixed(1), custom: false, source: "OpenStreetMap" };
}

function inferRestaurantTags(name, cuisine = "", amenity = "") {
  const text = `${name} ${cuisine}`.toLowerCase(); const tags = [];
  const rules = {
    "清淡": ["粥", "蒸", "汤", "沙拉", "素食", "vegetarian"], "热乎": ["面", "粉", "汤", "锅", "粥", "noodle"],
    "重口": ["烧烤", "火锅", "香锅", "川", "湘", "barbecue"], "辣": ["辣", "川", "湘", "火锅", "sichuan"],
    "高蛋白": ["鸡", "牛", "鱼", "肉", "海鲜", "steak", "seafood"], "低油低脂": ["轻食", "沙拉", "素食", "vegetarian"],
    "面食": ["面", "粉", "饺", "包", "noodle", "dumpling"], "米饭": ["饭", "便当", "煲仔", "rice", "chinese"]
  };
  for (const [tag, words] of Object.entries(rules)) if (words.some((word) => text.includes(word))) tags.push(tag);
  if (!tags.length) tags.push(amenity === "cafe" ? "清淡" : "随便吃");
  return tags;
}

function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (degree) => degree * Math.PI / 180; const earth = 6371;
  const dLat = toRad(lat2 - lat1); const dLon = toRad(lon2 - lon1);
  const value = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return earth * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function renderHistory() {
  const history = load("lunchHistory", []);
  $("#historyList").innerHTML = history.length ? history.slice(0, 8).map((item) => `<div class="history-item"><strong>${escapeHtml(item.name)}</strong><span>约 ¥${item.price} · ${new Date(item.at).toLocaleDateString("zh-CN")}</span></div>`).join("") : `<div class="empty">还没有记录。今天的第一顿，等你拍板。</div>`;
}

function showStatus(message, error = false) { const el = $("#status"); el.hidden = false; el.textContent = message; el.style.background = error ? "#9e3525" : "var(--sage-dark)"; }
function escapeHtml(value) { return String(value || "").replace(/[&<>'"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[char])); }
