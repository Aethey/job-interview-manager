const STORAGE_KEY = "jobInterviewManagerState";
const CURRENT_SCHEMA_VERSION = 2;
const DATA_EXPORT_FORMAT = "job-conversation-extractor-backup";
const DATA_EXPORT_VERSION = 1;
const JAPANESE_HOLIDAY_API_BASE_URL = "https://api.jp-calendar.com/v1/holidays";
const USE_MOCK_DATA = false;
const LANGUAGE_LOCALES = { zh: "zh-CN", en: "en-US", ja: "ja-JP" };
const TRANSLATIONS = {
  zh: {
    appTitle: "转职面谈管理", appSubtitle: "少整理一点，把注意力留给沟通",
    analyzeTab: "分析", scheduleTab: "面试日程", settingsTab: "设置",
    analyzeCurrent: "分析当前对话", copyConversation: "复制原始对话", checkingConversation: "正在检查当前会话。",
    latestInterview: "最新确定的面试", analysisResultTitle: "分析结果", analyzingConversation: "正在分析当前对话…", analysisEmpty: "分析后显示最新确定的面试或候选时间请求。",
    scheduleTitle: "面试日程", scheduleEmpty: "还没有已确定的面试。", editSchedule: "编辑时间安排", cancel: "取消",
    title: "标题", start: "开始", end: "结束", saveChanges: "保存更新", language: "语言",
    protocolHint: "根据 URL 自动判断协议", modelName: "模型名称", testConnection: "测试连接", saveAi: "保存 AI 设置", scheduling: "日程设置",
    availableFrom: "每天开始", availableTo: "每天结束", duration: "面谈时长", buffer: "面试时间前后余量（分钟）", candidateCount: "候选数量",
    saveSettings: "保存设置", data: "数据", importData: "导入数据", exportData: "导出数据", clearData: "清空本地数据",
    dataFooter: "API Key、消息、分析结果和面试日程都保存在此浏览器的扩展本地存储中。",
    unreadable: "当前页面不可读取", openFindy: "请打开 Findy 的对话页面后重新打开插件。", messageCount: "{count} 条消息",
    updatedAt: "更新于 {time}", noConfirmed: "当前没有已确定的面试", noConfirmedDesc: "对话中没有明确确认的面试时间。",
    contact: "联系人", method: "方式", location: "地点 / 链接", notes: "备注", rationale: "判断",
    scheduleCount: "{count} 项", confirmed: "已确定", edit: "编辑", delete: "删除",
    dataSummary: "{messages} 条消息 · {analyses} 条分析 · {schedules} 项面试日程",
    interview: "面试", reading: "正在读取当前对话……", noMessages: "当前对话没有可分析的消息。",
    missingAi: "请到设置中填写 API URL、API Key 和模型后再次分析。", reanalyzing: "上次报告晚于最新消息，正在重新分析完整对话……",
    analyzingFull: "正在分析当前完整对话（{count} 条消息）……", analyzeDone: "分析完成。", copyDone: "原始对话已复制到剪贴板。",
    unsupported: "当前页面暂不支持。请打开 Findy 的对话页面。", ready: "当前会话已准备好，可以开始分析。",
    aiFieldsRequired: "请填写 API URL、API Key 和模型名称。", testingConnection: "正在测试连接……", connectionOk: "连接成功。", connectionFailed: "连接失败：{error}", permissionDenied: "未授予该 API 地址的访问权限。", aiSaved: "AI 设置已保存。", settingsSaved: "设置已保存到本地。",
    clearConfirm: "确定清空所有本地消息、分析和面试日程吗？", dataCleared: "业务数据已清空，设置仍然保留。", invalidTime: "请检查开始和结束时间。",
    importConfirm: "导入会覆盖当前所有本地数据和设置，确定继续吗？", importDone: "数据导入完成。", importFailed: "无法导入：请选择由本扩展导出的有效 JSON 文件。", exportDone: "数据已导出。"
    ,candidateRequest: "待回复候选时间", nextTwoWeeks: "未来两周可用时间", allAvailable: "{start}–{end} 都可以", unavailable: "没有可用时间",
    availability: "可用时间设置", holidaysLoading: "正在获取日本节假日……", holidaysUnavailable: "日本节假日暂时无法获取，以下日期可能包含节假日。", availableDayCount: "{count} 个工作日", fullWindowAvailable: "全部时段可用"
  },
  en: {
    appTitle: "Interview Manager", appSubtitle: "Spend less time organizing and more time communicating",
    analyzeTab: "Analyze", scheduleTab: "Interviews", settingsTab: "Settings",
    analyzeCurrent: "Analyze current conversation", copyConversation: "Copy conversation", checkingConversation: "Checking the current conversation.",
    latestInterview: "Latest confirmed interview", analysisResultTitle: "Analysis result", analyzingConversation: "Analyzing the current conversation…", analysisEmpty: "A confirmed interview or request for candidate times will appear here.",
    scheduleTitle: "Interview schedule", scheduleEmpty: "No confirmed interviews yet.", editSchedule: "Edit interview", cancel: "Cancel",
    title: "Title", start: "Start", end: "End", saveChanges: "Save changes", language: "Language",
    protocolHint: "Protocol is detected from the URL", modelName: "Model", testConnection: "Test connection", saveAi: "Save AI settings", scheduling: "Schedule settings",
    availableFrom: "Daily start", availableTo: "Daily end", duration: "Duration", buffer: "Minutes blocked before and after an interview", candidateCount: "Candidate slots",
    saveSettings: "Save settings", data: "Data", importData: "Import data", exportData: "Export data", clearData: "Clear local data",
    dataFooter: "The API key, messages, analysis results, and interview schedule are stored locally in this browser extension.",
    unreadable: "This page cannot be read", openFindy: "Open a Findy conversation and reopen the extension.", messageCount: "{count} messages",
    updatedAt: "Updated {time}", noConfirmed: "No confirmed interview", noConfirmedDesc: "The conversation does not contain a clearly confirmed interview time.",
    contact: "Contact", method: "Method", location: "Location / link", notes: "Notes", rationale: "Reason",
    scheduleCount: "{count} items", confirmed: "Confirmed", edit: "Edit", delete: "Delete",
    dataSummary: "{messages} messages · {analyses} analyses · {schedules} interviews",
    interview: "Interview", reading: "Reading the current conversation…", noMessages: "There are no messages to analyze.",
    missingAi: "Set the API URL, API key, and model in Settings, then analyze again.", reanalyzing: "The previous report is newer than the latest message. Reanalyzing the full conversation…",
    analyzingFull: "Analyzing the full conversation ({count} messages)…", analyzeDone: "Analysis complete.", copyDone: "Conversation copied to the clipboard.",
    unsupported: "This page is not supported. Open a Findy conversation.", ready: "The current conversation is ready to analyze.",
    aiFieldsRequired: "Enter the API URL, API key, and model.", testingConnection: "Testing connection…", connectionOk: "Connection successful.", connectionFailed: "Connection failed: {error}", permissionDenied: "Access to this API address was not granted.", aiSaved: "AI settings saved.", settingsSaved: "Settings saved locally.",
    clearConfirm: "Clear all locally stored messages, analyses, and interview schedules?", dataCleared: "Local data cleared. Settings were retained.", invalidTime: "Check the start and end times.",
    importConfirm: "Importing will replace all current local data and settings. Continue?", importDone: "Data imported.", importFailed: "Import failed. Select a valid JSON file exported by this extension.", exportDone: "Data exported."
    ,candidateRequest: "Candidate times requested", nextTwoWeeks: "Availability for the next two weeks", allAvailable: "Any time from {start}–{end}", unavailable: "No available time",
    availability: "Availability", holidaysLoading: "Loading Japanese public holidays…", holidaysUnavailable: "Japanese public holidays could not be loaded. The dates below may include holidays.", availableDayCount: "{count} business days", fullWindowAvailable: "Full window available"
  },
  ja: {
    appTitle: "転職面談管理", appSubtitle: "整理の手間を減らし、連絡に集中",
    analyzeTab: "分析", scheduleTab: "面談日程", settingsTab: "設定",
    analyzeCurrent: "現在の会話を分析", copyConversation: "元の会話をコピー", checkingConversation: "現在の会話を確認しています。",
    latestInterview: "最新の確定面談", analysisResultTitle: "分析結果", analyzingConversation: "現在の会話を分析しています…", analysisEmpty: "分析後、確定面談または候補日時の提示依頼を表示します。",
    scheduleTitle: "面談日程", scheduleEmpty: "確定済みの面談はまだありません。", editSchedule: "日程を編集", cancel: "キャンセル",
    title: "タイトル", start: "開始", end: "終了", saveChanges: "変更を保存", language: "言語",
    protocolHint: "URL からプロトコルを自動判定", modelName: "モデル名", testConnection: "接続をテスト", saveAi: "AI 設定を保存", scheduling: "日程設定",
    availableFrom: "毎日の開始時刻", availableTo: "毎日の終了時刻", duration: "面談時間", buffer: "面談時刻の前後に空ける時間（分）", candidateCount: "候補数",
    saveSettings: "設定を保存", data: "データ", importData: "データを読み込む", exportData: "データを書き出す", clearData: "ローカルデータを消去",
    dataFooter: "API キー、メッセージ、分析結果、面談日程は、このブラウザ拡張機能のローカルストレージに保存されます。",
    unreadable: "現在のページを読み取れません", openFindy: "Findy の会話ページを開いてから、拡張機能を開き直してください。", messageCount: "{count} 件のメッセージ",
    updatedAt: "更新：{time}", noConfirmed: "確定済みの面談はありません", noConfirmedDesc: "会話内に明確に確定した面談日時がありません。",
    contact: "担当者", method: "実施方法", location: "場所 / リンク", notes: "備考", rationale: "判断根拠",
    scheduleCount: "{count} 件", confirmed: "確定", edit: "編集", delete: "削除",
    dataSummary: "メッセージ {messages} 件 · 分析 {analyses} 件 · 面談日程 {schedules} 件",
    interview: "面談", reading: "現在の会話を読み込んでいます…", noMessages: "分析できるメッセージがありません。",
    missingAi: "設定で API URL、API キー、モデルを入力してから、もう一度分析してください。", reanalyzing: "前回のレポートが最新メッセージより新しいため、会話全文を再分析しています…",
    analyzingFull: "現在の会話全文（{count} 件）を分析しています…", analyzeDone: "分析が完了しました。", copyDone: "元の会話をクリップボードにコピーしました。",
    unsupported: "このページは未対応です。Findy の会話ページを開いてください。", ready: "現在の会話を分析できます。",
    aiFieldsRequired: "API URL、API キー、モデル名を入力してください。", testingConnection: "接続をテストしています…", connectionOk: "接続に成功しました。", connectionFailed: "接続に失敗しました：{error}", permissionDenied: "この API アドレスへのアクセスが許可されませんでした。", aiSaved: "AI 設定を保存しました。", settingsSaved: "設定をローカルに保存しました。",
    clearConfirm: "ローカルのメッセージ、分析結果、面談日程をすべて消去しますか？", dataCleared: "データを消去しました。設定は保持されています。", invalidTime: "開始時刻と終了時刻を確認してください。",
    importConfirm: "読み込むと現在のローカルデータと設定がすべて上書きされます。続行しますか？", importDone: "データを読み込みました。", importFailed: "読み込めませんでした。この拡張機能から書き出した有効な JSON ファイルを選択してください。", exportDone: "データを書き出しました。"
    ,candidateRequest: "候補日時の返信待ち", nextTwoWeeks: "今後2週間の空き時間", allAvailable: "{start}〜{end} はいつでも可", unavailable: "空き時間なし",
    availability: "空き時間設定", holidaysLoading: "日本の祝日を取得しています…", holidaysUnavailable: "日本の祝日を取得できませんでした。以下の日付には祝日が含まれる可能性があります。", availableDayCount: "{count} 営業日", fullWindowAvailable: "全時間帯で空き"
  }
};

function createDefaultSettings() {
  return {
    language: "zh",
    availabilityVersion: 1,
    openSettingsSections: ["language", "ai", "availability"],
    ai: {
      url: "https://api.openai.com/v1/chat/completions",
      apiKey: "",
      model: "gpt-5.6"
    },
    availableFrom: "10:00",
    availableTo: "19:00",
    durationMinutes: 60,
    bufferMinutes: 60,
    candidateCount: 3
  };
}

function currentLanguage() {
  const language = state?.settings?.language;
  return TRANSLATIONS[language] ? language : "zh";
}

function t(key, values = {}) {
  let text = TRANSLATIONS[currentLanguage()][key] || TRANSLATIONS.zh[key] || key;
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

function applyTranslations() {
  const language = currentLanguage();
  document.documentElement.lang = LANGUAGE_LOCALES[language];
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
}

const STATUS_LABELS = {
  waiting_user: "等待自己处理",
  waiting_company: "等待企业回复",
  confirmed: "面谈已确定",
  selection: "选考进行中",
  closed: "已结束",
  unknown: "待分析"
};

const ANALYSIS_SCHEMA = {
  type: "object",
  properties: {
    companyName: { type: "string" },
    contactName: { type: "string" },
    summary: { type: "string" },
    analysisType: { type: "string", enum: ["confirmed_interview", "candidate_time_request", "none"] },
    hasConfirmedInterview: { type: "boolean" },
    latestConfirmedInterview: {
      type: "object",
      properties: {
        title: { type: "string" },
        startAt: { type: "string" },
        endAt: { type: "string" },
        contactName: { type: "string" },
        method: { type: "string" },
        location: { type: "string" },
        notes: { type: "string" }
      },
      required: ["title", "startAt", "endAt", "contactName", "method", "location", "notes"],
      additionalProperties: false
    },
    candidateTimeRequest: {
      type: "object",
      properties: {
        requested: { type: "boolean" },
        notes: { type: "string" }
      },
      required: ["requested", "notes"],
      additionalProperties: false
    }
  },
  required: [
    "companyName",
    "contactName",
    "summary",
    "analysisType",
    "hasConfirmedInterview",
    "latestConfirmedInterview",
    "candidateTimeRequest"
  ],
  additionalProperties: false
};

let state = createEmptyState();
let currentSnapshot = null;
let currentCompanyId = null;
let pageDetectionRevision = 0;
let pageDetectionTimer = null;
let japaneseHolidayDates = new Set();
let holidayDataStatus = "idle";
const requestedBackgroundJobs = new Set();

function createEmptyState() {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    companies: [],
    messages: [],
    analyses: [],
    scheduleItems: [],
    analysisJob: null,
    settings: createDefaultSettings()
  };
}

function createMockPreview(mockData) {
  if (!mockData || typeof mockData !== "object") {
    throw new Error("Mock data is invalid.");
  }

  const collectionKeys = ["companies", "messages", "analyses", "scheduleItems"];
  if (collectionKeys.some(key => !Array.isArray(mockData[key]))) {
    throw new Error("Mock data collections are invalid.");
  }

  const company = mockData.companies.find(item => item.id === mockData.currentCompanyId);
  if (!company) {
    throw new Error("Mock current company was not found.");
  }

  const messages = mockData.messages.filter(message => message.companyId === company.id);
  const snapshot = {
    source: company.source || "Findy",
    platform: company.source || "Findy",
    url: company.url || "https://findy-code.io/matches/mock-chat",
    baseConversationKey: company.conversationKey.split("::")[0],
    conversationKey: company.conversationKey,
    companyName: company.name,
    messages
  };
  const mockState = {
    ...createEmptyState(),
    companies: mockData.companies,
    messages: mockData.messages,
    analyses: mockData.analyses,
    scheduleItems: mockData.scheduleItems,
    settings: normalizeSettings(mockData.settings || {})
  };

  return { state: mockState, snapshot, companyId: company.id };
}

async function loadMockPreview(fetchImpl = fetch) {
  const response = await fetchImpl("mock-data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Mock data could not be loaded (${response.status}).`);
  }
  return createMockPreview(await response.json());
}

function normalizeSettings(savedSettings = {}) {
  const defaults = createDefaultSettings();

  if (savedSettings.ai) {
    const normalized = {
      ...defaults,
      ...savedSettings,
      ai: { ...defaults.ai, ...savedSettings.ai }
    };
    if (savedSettings.availabilityVersion !== defaults.availabilityVersion) {
      normalized.availableFrom = defaults.availableFrom;
      normalized.availableTo = defaults.availableTo;
      normalized.bufferMinutes = defaults.bufferMinutes;
      normalized.availabilityVersion = defaults.availabilityVersion;
    }
    return normalized;
  }

  const migratedProvider = Array.isArray(savedSettings.providers)
    ? savedSettings.providers.find(provider => provider.id === savedSettings.activeProviderId) || savedSettings.providers[0]
    : null;
  const legacyProviderId = savedSettings.provider || "openai";
  const legacyUrl = migratedProvider?.url || (
    legacyProviderId === "anthropic"
      ? "https://api.anthropic.com/v1/messages"
      : legacyProviderId === "deepseek"
        ? "https://api.deepseek.com/chat/completions"
        : defaults.ai.url
  );
  const legacyApiKey = migratedProvider?.apiKey || savedSettings.apiKey || "";
  const legacyModel = migratedProvider?.model || savedSettings.model || defaults.ai.model;

  return {
    ...defaults,
    ...savedSettings,
    ai: {
      url: legacyUrl,
      apiKey: legacyApiKey,
      model: legacyModel
    }
  };
}

async function loadState() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const saved = result?.[STORAGE_KEY];

  if (!saved) {
    return createEmptyState();
  }

  if (saved.schemaVersion !== CURRENT_SCHEMA_VERSION) {
    const clearedState = createEmptyState();
    clearedState.settings = normalizeSettings(saved.settings);
    await chrome.storage.local.set({ [STORAGE_KEY]: clearedState });
    return clearedState;
  }

  return {
    ...createEmptyState(),
    ...saved,
    companies: Array.isArray(saved.companies) ? saved.companies : [],
    messages: Array.isArray(saved.messages) ? saved.messages : [],
    analyses: Array.isArray(saved.analyses) ? saved.analyses : [],
    scheduleItems: Array.isArray(saved.scheduleItems) ? saved.scheduleItems : [],
    settings: normalizeSettings(saved.settings)
  };
}

async function saveState() {
  await chrome.storage.local.set({ [STORAGE_KEY]: state });
}

function createExportPayload(sourceState, exportedAt = new Date().toISOString()) {
  return {
    format: DATA_EXPORT_FORMAT,
    exportVersion: DATA_EXPORT_VERSION,
    exportedAt,
    state: sourceState
  };
}

function normalizeImportedState(payload) {
  if (
    !payload ||
    payload.format !== DATA_EXPORT_FORMAT ||
    payload.exportVersion !== DATA_EXPORT_VERSION ||
    !payload.state ||
    typeof payload.state !== "object" ||
    payload.state.schemaVersion !== CURRENT_SCHEMA_VERSION
  ) {
    throw new Error("Invalid backup format.");
  }

  const imported = payload.state;
  const collectionKeys = ["companies", "messages", "analyses", "scheduleItems"];
  if (collectionKeys.some(key => !Array.isArray(imported[key]))) {
    throw new Error("Invalid backup data.");
  }

  if (!imported.settings || typeof imported.settings !== "object" || Array.isArray(imported.settings)) {
    throw new Error("Invalid backup settings.");
  }

  return {
    ...createEmptyState(),
    schemaVersion: CURRENT_SCHEMA_VERSION,
    companies: imported.companies,
    messages: imported.messages,
    analyses: imported.analyses,
    scheduleItems: imported.scheduleItems,
    analysisJob: imported.analysisJob && typeof imported.analysisJob === "object" ? imported.analysisJob : null,
    settings: normalizeSettings(imported.settings)
  };
}

function downloadDataBackup() {
  const payload = createExportPayload(state);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().slice(0, 10);
  const link = document.createElement("a");
  link.href = url;
  link.download = `job-conversation-extractor-${date}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function hashString(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDateTime(value) {
  if (!value) return "时间未识别";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(LANGUAGE_LOCALES[currentLanguage()], {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatInterviewDateTime(value) {
  if (!value) return "时间未识别";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(LANGUAGE_LOCALES[currentLanguage()], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatDateOnly(value) {
  if (!value) return "日期未识别";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(LANGUAGE_LOCALES[currentLanguage()], {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short"
  }).format(date);
}

function toDateTimeLocalValue(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLocalDateTime(dateValue, timeValue) {
  if (!dateValue || !timeValue) return null;
  const date = new Date(`${dateValue}T${timeValue}:00`);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function statusLabel(status) {
  return STATUS_LABELS[status] || STATUS_LABELS.unknown;
}

function setStatus(element, message, tone = "") {
  element.textContent = message;
  element.className = `status-message ${tone}`.trim();
}

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function extractFindySnapshot(tabId) {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const messageTextSelector = '[class*="__messageText"]';
      const textElements = [...document.querySelectorAll(messageTextSelector)].filter(element => {
        const style = getComputedStyle(element);
        return element.innerText.trim() &&
          element.getClientRects().length > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          !element.querySelector(messageTextSelector) &&
          !element.closest("a[href]");
      });
      const companySelectors = [
        '[class*="__enterpriseName"]',
        '[class*="__companyName"]',
        '[class*="__organizationName"]',
        '[class*="__company"] h1',
        '[class*="__enterprise"] h1'
      ];
      const currentUrl = new URL(location.href);

      const clean = value => (value || "").replace(/\s+/g, " ").trim();
      const isUsefulCompanyName = value => {
        if (!value || value.length > 80) return false;
        return !/^(findy|message|messages|メッセージ|ホーム|検索|通知|設定|プロフィール|求人|スカウト)$/i.test(value);
      };

      const namesInside = (root, selectors) => {
        if (!root) return [];
        return [...new Set(selectors.flatMap(selector =>
          [...root.querySelectorAll(selector)].map(element => clean(element.innerText))
        ).filter(isUsefulCompanyName))];
      };

      const currentConversationLink = [...document.querySelectorAll("a[href]")].find(link => {
        try {
          const linkUrl = new URL(link.href, location.href);
          return linkUrl.origin === currentUrl.origin && linkUrl.pathname === currentUrl.pathname;
        } catch {
          return false;
        }
      });
      const linkedCompanyName = namesInside(currentConversationLink, companySelectors)[0] || "";

      let commonMessageAncestor = textElements[0] || null;
      while (
        commonMessageAncestor &&
        !textElements.every(element => commonMessageAncestor.contains(element))
      ) {
        commonMessageAncestor = commonMessageAncestor.parentElement;
      }

      const nearestScopedName = selectors => {
        let scope = commonMessageAncestor;

        while (scope && scope !== document.body) {
          const names = namesInside(scope, selectors);
          if (names.length === 1) return names[0];
          if (names.length > 1) return "";
          scope = scope.parentElement;
        }

        return "";
      };

      const scopedCompanyName = nearestScopedName(companySelectors);
      const scopedHeadingName = nearestScopedName(["h1", "h2", '[role="heading"]']);
      const titleCandidate = clean(document.title.split(/[|｜]/)[0]);
      const companyName = [
        linkedCompanyName,
        scopedCompanyName,
        scopedHeadingName,
        titleCandidate
      ].find(isUsefulCompanyName) || "";

      const seenContainers = new WeakSet();
      const seenMessages = new Set();
      const messages = textElements
        .map((textElement, index) => {
          let container = textElement;
          let depth = 0;

          while (
            container &&
            container !== document.body &&
            depth < 8 &&
            !container.querySelector?.("time[datetime]")
          ) {
            container = container.parentElement;
            depth += 1;
          }

          if (!container || container === document.body || seenContainers.has(container)) return null;
          seenContainers.add(container);

          const senderName = clean(
            container?.querySelector('[class*="__userNameWrapper"]')?.innerText
          ) || null;
          const datetime = container?.querySelector("time[datetime]")?.getAttribute("datetime") || null;
          const classText = [
            container?.className || "",
            container?.parentElement?.className || "",
            container?.parentElement?.parentElement?.className || ""
          ].join(" ");
          const senderType = classText.includes("enterprise")
            ? "company"
            : classText.includes("user")
              ? "me"
              : "unknown";
          const text = textElement.innerText.trim();

          if (!text) return null;

          const messageKey = [datetime || "", senderType, senderName || "", text].join("\u241f");
          if (seenMessages.has(messageKey)) return null;
          seenMessages.add(messageKey);

          return { sourceIndex: index + 1, senderType, senderName, text, datetime };
        })
        .filter(Boolean);

      const url = new URL(currentUrl);
      url.hash = "";
      const baseConversationKey = url.toString();

      return {
        source: "Findy",
        platform: "Findy",
        url: location.href,
        baseConversationKey,
        conversationKey: `${baseConversationKey}::${companyName || "unknown"}`,
        companyName,
        messages
      };
    }
  });

  return results[0]?.result || null;
}

function normalizeSnapshot(snapshot, companyNameOverride = "") {
  const companyName = companyNameOverride.trim() || snapshot.companyName || "未命名公司";
  const baseConversationKey = snapshot.baseConversationKey || snapshot.conversationKey.split("::")[0];
  const conversationKey = `${baseConversationKey}::${companyName}`;
  const seenMessages = new Set();
  const messages = [];

  for (const message of snapshot.messages || []) {
    const messageKey = [
      message.datetime || "",
      message.senderType || "unknown",
      message.senderName || "",
      String(message.text || "").replace(/\s+/g, " ").trim()
    ].join("\u241f");
    if (!message.text?.trim() || seenMessages.has(messageKey)) continue;
    seenMessages.add(messageKey);
    messages.push({
      ...message,
      id: `msg_${hashString([snapshot.conversationKey, messageKey].join("\u241f"))}`
    });
  }

  return {
    ...snapshot,
    companyName,
    conversationKey,
    messages
  };
}

function normalizeSnapshotForAnalysis(snapshot, companyNameInput, companyNameEditedByUser) {
  return normalizeSnapshot(snapshot, companyNameEditedByUser ? companyNameInput : "");
}

function findCompanyByConversation(conversationKey) {
  return state.companies.find(company => company.conversationKey === conversationKey) || null;
}

function upsertCompany(snapshot) {
  let company = findCompanyByConversation(snapshot.conversationKey);

  if (!company) {
    company = {
      id: createId("company"),
      source: snapshot.source,
      conversationKey: snapshot.conversationKey,
      name: snapshot.companyName,
      contactName: "",
      stage: "待分析",
      status: "unknown",
      nextAction: "等待分析",
      needsUserAction: false,
      lastUpdatedAt: new Date().toISOString()
    };
    state.companies.push(company);
  } else if (snapshot.companyName && snapshot.companyName !== "未命名公司") {
    company.name = snapshot.companyName;
  }

  currentCompanyId = company.id;
  return company;
}

function saveSnapshotMessages(snapshot, company) {
  for (const message of snapshot.messages) {
    if (state.messages.some(saved => saved.id === message.id)) continue;

    state.messages.push({
      ...message,
      companyId: company.id,
      conversationKey: snapshot.conversationKey,
      source: snapshot.source,
      receivedAt: new Date().toISOString()
    });
  }

  company.lastMessageAt = snapshot.messages.at(-1)?.datetime || company.lastUpdatedAt;
  company.lastUpdatedAt = new Date().toISOString();
}

function latestAnalysisForCompany(companyId) {
  return [...state.analyses]
    .filter(analysis => analysis.companyId === companyId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
}

function applyAnalysisToCompany(company, analysis) {
  const result = analysis.result || {};
  company.name = result.companyName || company.name;
  company.contactName = result.contactName || "";
  company.stage = result.stage || "待分析";
  company.status = result.status || "unknown";
  company.nextAction = result.nextAction || "等待分析";
  company.needsUserAction = Boolean(result.needsUserAction);
  company.lastUpdatedAt = analysis.createdAt;
}

function deleteAnalysisRecord(targetState, analysisId) {
  const analysis = targetState.analyses.find(item => item.id === analysisId);
  if (!analysis) return { deleted: false, companyId: null };

  targetState.analyses = targetState.analyses.filter(item => item.id !== analysisId);
  targetState.scheduleItems = targetState.scheduleItems.filter(
    item => item.sourceAnalysisId !== analysisId
  );

  const company = targetState.companies.find(item => item.id === analysis.companyId);
  if (company) {
    const latestRemaining = [...targetState.analyses]
      .filter(item => item.companyId === company.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;

    if (latestRemaining) {
      applyAnalysisToCompany(company, latestRemaining);
    } else {
      const latestMessage = [...targetState.messages]
        .filter(message => message.companyId === company.id)
        .sort((a, b) => {
          const bTime = new Date(b.datetime || b.receivedAt || 0).getTime() || 0;
          const aTime = new Date(a.datetime || a.receivedAt || 0).getTime() || 0;
          return bTime - aTime;
        })[0] || null;
      company.contactName = "";
      company.stage = "待分析";
      company.status = "unknown";
      company.nextAction = "等待分析";
      company.needsUserAction = false;
      company.lastUpdatedAt = latestMessage?.datetime || latestMessage?.receivedAt || company.lastUpdatedAt;
    }
  }

  return { deleted: true, companyId: analysis.companyId };
}

function normalizeAnalysisResult(result, snapshot) {
  if (!result || typeof result !== "object") {
    throw new Error("AI 没有返回有效的分析结果。");
  }

  const summary = String(result.summary || "").trim();
  if (!summary) {
    throw new Error("AI 分析结果缺少内容摘要。");
  }

  const interview = result.latestConfirmedInterview || {};
  const hasConfirmedInterview = result.hasConfirmedInterview === true;
  const candidateTimeRequest = result.candidateTimeRequest || {};
  const requestsCandidateTimes = !hasConfirmedInterview && (
    result.analysisType === "candidate_time_request" || candidateTimeRequest.requested === true
  );
  const analysisType = hasConfirmedInterview
    ? "confirmed_interview"
    : requestsCandidateTimes
      ? "candidate_time_request"
      : "none";
  const startAt = String(interview.startAt || "").trim();
  if (hasConfirmedInterview && !startAt) {
    throw new Error("AI 判断存在已确定面试，但没有返回面试时间。");
  }

  const normalizedInterview = {
    title: String(interview.title || "面试").trim() || "面试",
    startAt,
    endAt: String(interview.endAt || "").trim(),
    contactName: String(interview.contactName || result.contactName || "").trim(),
    method: String(interview.method || "").trim(),
    location: String(interview.location || "").trim(),
    notes: String(interview.notes || "").trim()
  };

  return {
    companyName: String(result.companyName || snapshot.companyName).trim() || snapshot.companyName,
    contactName: String(result.contactName || normalizedInterview.contactName || "").trim(),
    analysisType,
    stage: hasConfirmedInterview ? "面试已确定" : requestsCandidateTimes ? "待回复候选时间" : "未发现已确定面试",
    status: hasConfirmedInterview ? "confirmed" : "unknown",
    nextAction: hasConfirmedInterview ? "准备最新确定的面试" : requestsCandidateTimes ? "回复可用时间" : "继续关注招聘沟通",
    needsUserAction: requestsCandidateTimes,
    eventTitle: hasConfirmedInterview ? "最新确定的面试" : requestsCandidateTimes ? "待回复候选时间" : "未发现已确定面试",
    eventDescription: summary,
    timeline: [],
    scheduleItems: hasConfirmedInterview ? [{
      type: "interview",
      title: normalizedInterview.title,
      startAt: normalizedInterview.startAt,
      endAt: normalizedInterview.endAt || normalizedInterview.startAt,
      status: "confirmed",
      contactName: normalizedInterview.contactName,
      method: normalizedInterview.method,
      location: normalizedInterview.location,
      notes: normalizedInterview.notes
    }] : [],
    candidateRequest: {
      requested: requestsCandidateTimes,
      fromDate: "",
      toDate: "",
      fromTime: "",
      toTime: "",
      notes: String(candidateTimeRequest.notes || "").trim()
    },
    summary,
    hasConfirmedInterview,
    latestConfirmedInterview: normalizedInterview
  };
}

function analysisPrompt(snapshot) {
  const instructions = {
    zh: [
      "请分析下面完整的招聘对话，目标是帮助用户快速确认最新已经确定的面试安排。",
      "只根据对话中的明确内容判断，不要推测或编造日期、时间、联系人、方式、地点或链接。",
      "只有企业明确确认了具体面试日期和时间，hasConfirmedInterview 才能为 true。候选时间、询问可用时间、尚未确认的提议都不是已确定面试。",
      "如果存在多次已确定面试，只返回对话中时间最新的一次。",
      "如果对方正在询问候选人的可用时间或要求提供多个候选面谈时间，并且尚未确定具体时间，则 analysisType 为 candidate_time_request，candidateTimeRequest.requested 为 true。",
      "startAt 和 endAt 使用包含时区的 ISO 8601 日期时间；对话未明确结束时间时 endAt 返回空字符串。",
      "summary、title、method、location、notes 使用中文。专有名称保持原文。没有已确定面试时，latestConfirmedInterview 的所有字符串字段返回空字符串。",
      "只返回符合下面 JSON Schema 的 JSON object，不要输出 Markdown 或额外说明。"
    ],
    en: [
      "Analyze the complete recruitment conversation below and identify the latest confirmed interview arrangement.",
      "Use only explicit information from the conversation. Do not infer or invent dates, times, contacts, methods, locations, or links.",
      "Set hasConfirmedInterview to true only when the company has explicitly confirmed a specific interview date and time. Proposed times, availability questions, and unconfirmed suggestions are not confirmed interviews.",
      "If multiple interviews were confirmed, return only the chronologically latest one.",
      "If the company is asking for the candidate's availability or multiple proposed interview times and no exact time is confirmed, set analysisType to candidate_time_request and candidateTimeRequest.requested to true.",
      "Use ISO 8601 with a time zone for startAt and endAt. Return an empty endAt when the conversation does not specify an end time.",
      "Write summary, title, method, location, and notes in English. Keep proper nouns in their original form. If no interview is confirmed, return empty strings for every field in latestConfirmedInterview.",
      "Return only a JSON object matching the JSON Schema below. Do not return Markdown or additional commentary."
    ],
    ja: [
      "以下の採用に関する会話全文を分析し、直近で確定した面談予定を特定してください。",
      "会話内で明示されている情報だけを使用し、日付、時刻、担当者、実施方法、場所、リンクを推測・捏造しないでください。",
      "企業側が具体的な面談日時を明確に確定した場合に限り、hasConfirmedInterview を true にしてください。候補日時、都合の確認、未確定の提案は確定面談ではありません。",
      "確定した面談が複数ある場合は、日時が最も新しいものだけを返してください。",
      "企業側が候補者の空き時間や複数の面談候補日時の提示を求めており、具体的な日時が未確定の場合、analysisType を candidate_time_request、candidateTimeRequest.requested を true にしてください。",
      "startAt と endAt はタイムゾーンを含む ISO 8601 形式にしてください。終了時刻が明示されていない場合、endAt は空文字列にしてください。",
      "summary、title、method、location、notes は日本語で記述してください。固有名詞は原文のまま保持してください。確定面談がない場合、latestConfirmedInterview 内のすべての文字列フィールドを空文字列にしてください。",
      "以下の JSON Schema に一致する JSON object だけを返し、Markdown や追加説明は出力しないでください。"
    ]
  }[currentLanguage()];

  return [
    ...instructions,
    JSON.stringify(ANALYSIS_SCHEMA),
    currentLanguage() === "ja"
      ? "以下は「元の会話をコピー」ボタンで取得する内容と同一です："
      : currentLanguage() === "en"
        ? "The content below is identical to the output of the Copy conversation button:"
        : "以下内容与“复制原始对话”按钮复制的内容完全一致：",
    rawConversationText(snapshot)
  ].join("\n\n");
}

function resolveAiRequestConfig(value) {
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase();
  const normalizedPath = url.pathname.replace(/\/+$/, "");
  const isVersionBase = /\/v1$/i.test(normalizedPath);
  const isRoot = normalizedPath === "";

  if (hostname === "api.anthropic.com" && (isRoot || isVersionBase)) {
    url.pathname = "/v1/messages";
  } else if (isVersionBase) {
    url.pathname = `${normalizedPath}/chat/completions`;
  } else if (hostname === "api.openai.com" && isRoot) {
    url.pathname = "/v1/chat/completions";
  } else if (hostname === "api.deepseek.com" && isRoot) {
    url.pathname = "/chat/completions";
  }

  const pathname = url.pathname.replace(/\/+$/, "").toLowerCase();
  const protocol = pathname.endsWith("/messages")
    ? "anthropic-messages"
    : "openai-chat";

  return {
    url: url.toString(),
    displayUrl: `${url.origin}${url.pathname}`,
    protocol
  };
}

async function readJsonResponse(response, requestConfig = null) {
  const rawText = await response.text();
  const trimmedText = rawText.trim();

  if (!trimmedText) {
    if (response.status === 404 && requestConfig?.displayUrl) {
      const expectedSuffix = requestConfig.protocol === "anthropic-messages"
        ? "/v1/messages"
        : "/v1/chat/completions";
      throw new Error(
        `AI 请求失败（404）：请求地址 ${requestConfig.displayUrl} 不存在。` +
        `请在 Settings 检查完整 API URL；当前协议通常应以 ${expectedSuffix} 结尾。`
      );
    }
    throw new Error(`AI 请求失败（${response.status}）：服务商返回了空响应。`);
  }

  try {
    return JSON.parse(trimmedText);
  } catch {
    const preview = trimmedText.slice(0, 180).replace(/\s+/g, " ");
    throw new Error(
      response.ok
        ? `AI 返回了非 JSON 内容：${preview}`
        : `AI 请求失败（${response.status}）：${preview}`
    );
  }
}

async function testAiConnection(ai, fetchImpl = fetch) {
  const requestConfig = resolveAiRequestConfig(ai.url);
  const isAnthropic = requestConfig.protocol === "anthropic-messages";
  const response = await fetchImpl(requestConfig.url, {
    method: "POST",
    headers: isAnthropic
      ? {
          "Content-Type": "application/json",
          "x-api-key": ai.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ai.apiKey}`
        },
    body: JSON.stringify(isAnthropic
      ? {
          model: ai.model,
          max_tokens: 8,
          messages: [{ role: "user", content: "Reply with OK." }]
        }
      : {
          model: ai.model,
          stream: false,
          messages: [{ role: "user", content: "Reply with OK." }]
        })
  });

  const payload = await readJsonResponse(response, requestConfig);
  if (!response.ok) {
    throw new Error(
      payload?.error?.message ||
      `AI 请求失败（${response.status}）：${requestConfig.displayUrl}`
    );
  }

  return { protocol: requestConfig.protocol, displayUrl: requestConfig.displayUrl };
}

async function requestAiAnalysis(snapshot) {
  const ai = state.settings.ai;
  if (!ai?.url || !ai.apiKey.trim() || !ai.model.trim()) {
    throw new Error("请先在 Settings 设置 API Key。");
  }

  const prompt = analysisPrompt(snapshot);
  const systemPrompt = {
    zh: "你是招聘对话整理助手，只判断最新的已确定面试或对方是否要求候选面谈时间。所有说明文字使用中文。",
    en: "You organize recruitment conversations. Identify either the latest confirmed interview or a request for candidate interview times. Write all descriptive text in English.",
    ja: "あなたは採用メッセージ整理アシスタントです。最新の確定面談、または企業側からの面談候補日時の提示依頼を判定し、説明文はすべて日本語で記述してください。"
  }[currentLanguage()];
  let response;
  const requestConfig = resolveAiRequestConfig(ai.url);
  const protocol = requestConfig.protocol;

  if (protocol === "anthropic-messages") {
    response = await fetch(requestConfig.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ai.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: ai.model,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }]
      })
    });
  } else {
    response = await fetch(requestConfig.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ai.apiKey}`
      },
      body: JSON.stringify({
        model: ai.model,
        stream: false,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          { role: "user", content: prompt }
        ]
      })
    });
  }

  const payload = await readJsonResponse(response, requestConfig);
  if (!response.ok) {
    throw new Error(
      payload?.error?.message ||
      `AI 请求失败（${response.status}）：${requestConfig.displayUrl}`
    );
  }

  const outputText = protocol === "anthropic-messages"
    ? payload.content?.find(item => item.type === "text")?.text
    : extractChatCompletionText(payload.choices?.[0]?.message?.content);

  if (!outputText) {
    throw new Error("AI 没有返回可读取的分析结果。");
  }

  try {
    const normalizedText = outputText.trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");
    try {
      return JSON.parse(normalizedText);
    } catch {
      const objectStart = normalizedText.indexOf("{");
      const objectEnd = normalizedText.lastIndexOf("}");
      if (objectStart < 0 || objectEnd <= objectStart) throw new Error("No JSON object");
      return JSON.parse(normalizedText.slice(objectStart, objectEnd + 1));
    }
  } catch {
    throw new Error("AI 返回的结果不是有效 JSON。");
  }
}

function extractChatCompletionText(content) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content.filter(item => item?.type === "text").map(item => item.text || "").join("\n");
}

function addAnalysis(company, snapshot, allMessages, result) {
  const normalized = normalizeAnalysisResult(result, snapshot);
  const analysis = {
    id: createId("analysis"),
    companyId: company.id,
    conversationKey: snapshot.conversationKey,
    messageIds: allMessages.map(message => message.id),
    createdAt: new Date().toISOString(),
    result: normalized
  };

  state.analyses.push(analysis);
  applyAnalysisToCompany(company, analysis);

  for (const item of normalized.scheduleItems) {
    if (!item.startAt) continue;
    const existing = state.scheduleItems.find(existing =>
      existing.companyId === company.id &&
      existing.startAt === item.startAt &&
      existing.type === item.type
    );
    if (existing) {
      Object.assign(existing, {
        title: item.title,
        endAt: item.endAt,
        status: item.status,
        contactName: item.contactName,
        method: item.method,
        location: item.location,
        notes: item.notes,
        sourceAnalysisId: analysis.id
      });
      continue;
    }

    state.scheduleItems.push({
      id: createId("schedule"),
      companyId: company.id,
      type: item.type,
      title: item.title,
      startAt: item.startAt,
      endAt: item.endAt,
      status: item.status,
      contactName: item.contactName,
      method: item.method,
      location: item.location,
      notes: item.notes,
      platform: snapshot.platform,
      sourceAnalysisId: analysis.id,
      createdAt: analysis.createdAt
    });
  }

  return analysis;
}

function setAnalysisLoading(isLoading) {
  document.getElementById("analysisLoading").classList.toggle("hidden", !isLoading);
  document.getElementById("analysisResult").classList.toggle("hidden", isLoading);
}

function clockToMinutes(value, fallback) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value || "");
  if (!match) return fallback;
  return Number(match[1]) * 60 + Number(match[2]);
}

function minutesToClock(value) {
  const hours = String(Math.floor(value / 60)).padStart(2, "0");
  const minutes = String(value % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function availabilityYears(referenceDate = new Date()) {
  const firstDate = new Date(referenceDate);
  firstDate.setHours(0, 0, 0, 0);
  const lastDate = new Date(firstDate);
  lastDate.setDate(firstDate.getDate() + 13);
  return [...new Set([firstDate.getFullYear(), lastDate.getFullYear()])];
}

async function fetchJapaneseHolidayDates(referenceDate = new Date(), fetchImpl = fetch) {
  const holidayMaps = await Promise.all(availabilityYears(referenceDate).map(async year => {
    const response = await fetchImpl(`${JAPANESE_HOLIDAY_API_BASE_URL}/${year}.json`);
    if (!response.ok) {
      throw new Error(`Japanese holiday API request failed (${response.status}).`);
    }
    const payload = await response.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new Error("Japanese holiday API returned invalid data.");
    }
    return payload;
  }));

  return new Set(
    holidayMaps.flatMap(holidayMap => Object.keys(holidayMap))
      .filter(date => /^\d{4}-\d{2}-\d{2}$/.test(date))
  );
}

async function refreshJapaneseHolidayDates(referenceDate = new Date()) {
  holidayDataStatus = "loading";
  let timeoutId;
  try {
    japaneseHolidayDates = await Promise.race([
      fetchJapaneseHolidayDates(referenceDate),
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error("Japanese holiday API request timed out.")), 5000);
      })
    ]);
    holidayDataStatus = "loaded";
  } catch (error) {
    console.warn("Japanese holidays could not be loaded.", error);
    japaneseHolidayDates = new Set();
    holidayDataStatus = "error";
  } finally {
    clearTimeout(timeoutId);
  }
}

function buildAvailabilityDays(
  scheduleItems = state.scheduleItems,
  settings = state.settings,
  referenceDate = new Date(),
  holidayDates = japaneseHolidayDates
) {
  const startMinutes = clockToMinutes(settings.availableFrom, 10 * 60);
  const configuredEnd = clockToMinutes(settings.availableTo, 19 * 60);
  const endMinutes = configuredEnd > startMinutes ? configuredEnd : 19 * 60;
  const bufferMinutes = Math.max(0, Number(settings.bufferMinutes) || 0);
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const blocked = scheduleItems
      .filter(item => {
        const start = new Date(item.startAt);
        return !Number.isNaN(start.getTime()) && start >= date && start < nextDate;
      })
      .map(item => {
        const start = new Date(item.startAt);
        const minute = start.getHours() * 60 + start.getMinutes();
        return [
          Math.max(startMinutes, minute - bufferMinutes),
          Math.min(endMinutes, minute + bufferMinutes)
        ];
      })
      .filter(([start, end]) => start < end)
      .sort((a, b) => a[0] - b[0]);

    const merged = [];
    for (const interval of blocked) {
      const previous = merged.at(-1);
      if (previous && interval[0] <= previous[1]) previous[1] = Math.max(previous[1], interval[1]);
      else merged.push([...interval]);
    }

    const available = [];
    let cursor = startMinutes;
    for (const [blockedStart, blockedEnd] of merged) {
      if (cursor < blockedStart) available.push([cursor, blockedStart]);
      cursor = Math.max(cursor, blockedEnd);
    }
    if (cursor < endMinutes) available.push([cursor, endMinutes]);

    return { date, available, startMinutes, endMinutes };
  }).filter(day => (
    day.date.getDay() !== 0 &&
    day.date.getDay() !== 6 &&
    !holidayDates.has(localDateKey(day.date))
  ));
}

function renderAvailability() {
  const dateFormatter = new Intl.DateTimeFormat(LANGUAGE_LOCALES[currentLanguage()], {
    month: "numeric",
    day: "numeric"
  });
  const weekdayFormatter = new Intl.DateTimeFormat(LANGUAGE_LOCALES[currentLanguage()], {
    weekday: "short"
  });

  if (holidayDataStatus === "idle" || holidayDataStatus === "loading") {
    return `
      <div class="availability-header">
        <div class="availability-title">${escapeHtml(t("nextTwoWeeks"))}</div>
      </div>
      <div class="muted small">${escapeHtml(t("holidaysLoading"))}</div>`;
  }

  const holidayWarning = holidayDataStatus === "error"
    ? `<div class="status-message warning">${escapeHtml(t("holidaysUnavailable"))}</div>`
    : "";
  const availabilityDays = buildAvailabilityDays();

  return `
    <div class="availability-header">
      <div class="availability-title">${escapeHtml(t("nextTwoWeeks"))}</div>
      <span class="availability-count">${escapeHtml(t("availableDayCount", { count: availabilityDays.length }))}</span>
    </div>
    ${holidayWarning}
    <div class="availability-list">
      ${availabilityDays.map(day => {
        const fullDay = day.available.length === 1 &&
          day.available[0][0] === day.startMinutes &&
          day.available[0][1] === day.endMinutes;
        const slots = fullDay
          ? `<span class="availability-slot full">
              <span>${escapeHtml(`${minutesToClock(day.startMinutes)}–${minutesToClock(day.endMinutes)}`)}</span>
              <span class="availability-slot-note">${escapeHtml(t("fullWindowAvailable"))}</span>
            </span>`
          : day.available.length
            ? day.available.map(([start, end]) => `
                <span class="availability-slot">${escapeHtml(`${minutesToClock(start)}–${minutesToClock(end)}`)}</span>
              `).join("")
            : `<span class="availability-slot unavailable">${escapeHtml(t("unavailable"))}</span>`;
        return `
          <div class="availability-day">
            <div class="availability-date">
              <span class="availability-date-main">${escapeHtml(dateFormatter.format(day.date))}</span>
              <span class="availability-weekday">${escapeHtml(weekdayFormatter.format(day.date))}</span>
            </div>
            <div class="availability-slots">${slots}</div>
          </div>`;
      }).join("")}
    </div>`;
}

function renderLatestInterview(analysis) {
  const resultElement = document.getElementById("analysisResult");
  const updatedElement = document.getElementById("analysisUpdatedAt");
  setAnalysisLoading(false);

  if (!analysis) {
    updatedElement.textContent = "";
    resultElement.innerHTML = `<div class="empty">${escapeHtml(t("analysisEmpty"))}</div>`;
    return;
  }

  updatedElement.textContent = t("updatedAt", { time: formatDateTime(analysis.createdAt) });
  const result = analysis.result || {};
  const interview = result.latestConfirmedInterview || {};

  if (result.analysisType === "candidate_time_request" || result.candidateRequest?.requested) {
    resultElement.innerHTML = `
      <div class="interview-title">${escapeHtml(t("candidateRequest"))}</div>
      <div class="interview-detail">${escapeHtml(result.summary || result.candidateRequest?.notes || "")}</div>
      ${renderAvailability()}
    `;
    return;
  }

  if (!result.hasConfirmedInterview) {
    resultElement.innerHTML = `
      <div class="interview-title">${escapeHtml(t("noConfirmed"))}</div>
      <div class="interview-detail">${escapeHtml(result.summary || result.eventDescription || t("noConfirmedDesc"))}</div>
    `;
    return;
  }

  const endText = interview.endAt ? ` ～ ${formatInterviewDateTime(interview.endAt)}` : "";
  resultElement.innerHTML = `
    <div class="interview-title">${escapeHtml(interview.title || t("interview"))}</div>
    <div class="interview-time">${escapeHtml(formatInterviewDateTime(interview.startAt))}${escapeHtml(endText)}</div>
    <div class="interview-detail">
      ${interview.contactName ? `${escapeHtml(t("contact"))}：${escapeHtml(interview.contactName)}<br>` : ""}
      ${interview.method ? `${escapeHtml(t("method"))}：${escapeHtml(interview.method)}<br>` : ""}
      ${interview.location ? `${escapeHtml(t("location"))}：${escapeHtml(interview.location)}<br>` : ""}
      ${interview.notes ? `${escapeHtml(t("notes"))}：${escapeHtml(interview.notes)}<br>` : ""}
      ${result.summary ? `${escapeHtml(t("rationale"))}：${escapeHtml(result.summary)}` : ""}
    </div>
  `;
}

function renderAnalyze() {
  const sourceName = document.getElementById("sourceName");
  const sourceInfo = document.getElementById("sourceInfo");
  const analyzeButton = document.getElementById("analyzeButton");
  const copyRawButton = document.getElementById("copyRawButton");

  if (!currentSnapshot) {
    sourceName.textContent = t("unreadable");
    sourceInfo.textContent = t("openFindy");
    analyzeButton.disabled = true;
    copyRawButton.disabled = true;
    renderLatestInterview(null);
    return;
  }

  sourceName.textContent = currentSnapshot.companyName || "未识别公司";
  sourceInfo.textContent = t("messageCount", { count: currentSnapshot.messages.length });
  analyzeButton.disabled = currentSnapshot.messages.length === 0;
  copyRawButton.disabled = currentSnapshot.messages.length === 0;

  const company = findCompanyByConversation(currentSnapshot.conversationKey);
  const analysis = company ? latestAnalysisForCompany(company.id) : null;
  renderLatestInterview(analysis);
}

function rawConversationText(snapshot) {
  return [
    `SOURCE: ${snapshot.platform}`,
    `URL: ${snapshot.url}`,
    "",
    "--- CONVERSATION ---",
    "",
    ...snapshot.messages.map((message, index) => [
      `[${index + 1}]`,
      `senderType: ${message.senderType}`,
      `senderName: ${message.senderName || ""}`,
      `datetime: ${message.datetime || ""}`,
      "",
      message.text
    ].join("\n"))
  ].join("\n\n");
}

function renderSchedule() {
  const list = document.getElementById("scheduleList");
  const count = document.getElementById("scheduleCount");
  const items = [...state.scheduleItems]
    .filter(item => item.startAt)
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
  count.textContent = t("scheduleCount", { count: items.length });

  if (items.length === 0) {
    list.innerHTML = `<div class="empty">${escapeHtml(t("scheduleEmpty"))}</div>`;
    return;
  }

  let lastDate = "";
  list.innerHTML = items.map(item => {
    const dateKey = new Date(item.startAt).toDateString();
    const heading = dateKey !== lastDate
      ? `<div class="schedule-date">${escapeHtml(formatDateOnly(item.startAt).toUpperCase())}</div>`
      : "";
    lastDate = dateKey;
    const company = state.companies.find(candidate => candidate.id === item.companyId);
    const sourceAnalysis = state.analyses.find(analysis => analysis.id === item.sourceAnalysisId);
    const savedInterview = sourceAnalysis?.result?.latestConfirmedInterview || {};
    const contactName = item.contactName || savedInterview.contactName || "";
    const method = item.method || savedInterview.method || "";
    const location = item.location || savedInterview.location || "";
    const notes = item.notes || savedInterview.notes || "";
    const startTime = new Date(item.startAt).toLocaleTimeString(LANGUAGE_LOCALES[currentLanguage()], { hour: "2-digit", minute: "2-digit" });
    const endTime = item.endAt && item.endAt !== item.startAt
      ? new Date(item.endAt).toLocaleTimeString(LANGUAGE_LOCALES[currentLanguage()], { hour: "2-digit", minute: "2-digit" })
      : "";
    return `${heading}
      <div class="schedule-item">
        <div class="schedule-item-header">
          <div class="schedule-time">
            <span class="schedule-time-start">${escapeHtml(startTime)}</span>
            ${endTime ? `<span class="schedule-time-separator">→</span><span class="schedule-time-end">${escapeHtml(endTime)}</span>` : ""}
          </div>
          <div class="schedule-actions">
            <button class="secondary-button schedule-action edit-schedule" data-schedule-id="${escapeHtml(item.id)}">${escapeHtml(t("edit"))}</button>
            <button class="danger-button schedule-action delete-schedule" data-schedule-id="${escapeHtml(item.id)}">${escapeHtml(t("delete"))}</button>
          </div>
        </div>
        <div class="schedule-item-body">
          <div class="schedule-summary">
            <div class="schedule-company-row">
              <div class="schedule-company">${escapeHtml(company?.name || "未命名公司")}</div>
              <span class="badge success">${escapeHtml(t("confirmed"))}</span>
            </div>
            <div class="schedule-title">${escapeHtml(item.title)}</div>
          </div>
          ${(contactName || method || location || notes) ? `
            <div class="schedule-details">
              ${contactName ? `<div class="schedule-detail"><span class="schedule-detail-label">${escapeHtml(t("contact"))}</span><span class="schedule-detail-value">${escapeHtml(contactName)}</span></div>` : ""}
              ${method ? `<div class="schedule-detail"><span class="schedule-detail-label">${escapeHtml(t("method"))}</span><span class="schedule-detail-value">${escapeHtml(method)}</span></div>` : ""}
              ${location ? `<div class="schedule-detail"><span class="schedule-detail-label">${escapeHtml(t("location"))}</span><span class="schedule-detail-value">${escapeHtml(location)}</span></div>` : ""}
              ${notes ? `<div class="schedule-detail"><span class="schedule-detail-label">${escapeHtml(t("notes"))}</span><span class="schedule-detail-value">${escapeHtml(notes)}</span></div>` : ""}
            </div>` : ""}
        </div>
      </div>`;
  }).join("");
}

function showScheduleEditor(scheduleId) {
  const item = state.scheduleItems.find(candidate => candidate.id === scheduleId);
  if (!item) return;
  document.getElementById("scheduleEditId").value = item.id;
  document.getElementById("scheduleEditTitle").value = item.title || t("interview");
  document.getElementById("scheduleEditStart").value = toDateTimeLocalValue(item.startAt);
  document.getElementById("scheduleEditEnd").value = toDateTimeLocalValue(item.endAt || item.startAt);
  document.getElementById("scheduleEditStatus").textContent = "";
  document.getElementById("scheduleEditorCard").classList.remove("hidden");
}

function hideScheduleEditor() {
  document.getElementById("scheduleEditorCard").classList.add("hidden");
}

function renderSettings() {
  document.getElementById("apiUrl").value = state.settings.ai?.url || "";
  document.getElementById("apiKey").value = state.settings.ai?.apiKey || "";
  document.getElementById("model").value = state.settings.ai?.model || "";
  document.getElementById("language").value = currentLanguage();
  document.getElementById("availableFrom").value = state.settings.availableFrom;
  document.getElementById("availableTo").value = state.settings.availableTo;
  document.getElementById("defaultBuffer").value = state.settings.bufferMinutes;
  document.getElementById("dataSummary").textContent = t("dataSummary", {
    messages: state.messages.length,
    analyses: state.analyses.length,
    schedules: state.scheduleItems.length
  });
}

function renderAll() {
  applyTranslations();
  renderAnalyze();
  renderSchedule();
  renderSettings();
  return renderBackgroundJobState();
}

function requestBackgroundJob(jobId) {
  if (!jobId || requestedBackgroundJobs.has(jobId)) return;
  requestedBackgroundJobs.add(jobId);
  chrome.runtime.sendMessage({ type: "runAnalysisJob", jobId }).catch(async error => {
    requestedBackgroundJobs.delete(jobId);
    state = await loadState();
    if (state.analysisJob?.id !== jobId || state.analysisJob.status !== "analyzing") return;
    state.analysisJob = {
      ...state.analysisJob,
      status: "error",
      error: error.message || "Background analysis could not start.",
      completedAt: new Date().toISOString()
    };
    await saveState();
    renderAll();
  });
}

function renderBackgroundJobState() {
  const job = state.analysisJob;
  if (!job || !currentSnapshot || job.conversationKey !== currentSnapshot.conversationKey) return false;

  const status = document.getElementById("analyzeStatus");
  const button = document.getElementById("analyzeButton");
  if (job.status === "analyzing") {
    setAnalysisLoading(true);
    button.disabled = true;
    setStatus(
      status,
      job.reportIsNewer
        ? t("reanalyzing")
        : t("analyzingFull", { count: job.messageCount || currentSnapshot.messages.length }),
      job.reportIsNewer ? "warning" : ""
    );
    requestBackgroundJob(job.id);
    return true;
  }

  requestedBackgroundJobs.delete(job.id);
  setAnalysisLoading(false);
  button.disabled = currentSnapshot.messages.length === 0;
  if (job.status === "error") {
    setStatus(status, job.error || "AI request failed.", "error");
    return true;
  }
  if (job.status === "success") {
    setStatus(status, t("analyzeDone"), "success");
    return true;
  }
  return false;
}

function applySettingsSectionState() {
  const openSections = new Set(state.settings.openSettingsSections || []);
  document.querySelectorAll("[data-settings-section]").forEach(section => {
    section.open = openSections.has(section.dataset.settingsSection);
  });
}

async function analyzeCurrentConversation() {
  const status = document.getElementById("analyzeStatus");
  const button = document.getElementById("analyzeButton");

  const tab = await getCurrentTab();

  if (!tab?.id || !tab.url?.includes("findy-code.io")) {
    throw new Error("当前页面不是受支持的 Findy 对话页面。");
  }

  button.disabled = true;
  setStatus(status, t("reading"));

  const rawSnapshot = await extractFindySnapshot(tab.id);
  currentSnapshot = normalizeSnapshot(rawSnapshot);
  if (currentSnapshot.messages.length === 0) {
    setStatus(status, t("noMessages"), "warning");
    button.disabled = false;
    return;
  }

  const ai = state.settings.ai;
  if (!ai?.apiKey.trim() || !ai?.url || !ai?.model.trim()) {
    setStatus(status, t("missingAi"), "warning");
    button.disabled = false;
    return;
  }

  const company = upsertCompany(currentSnapshot);
  saveSnapshotMessages(currentSnapshot, company);
  const previousAnalysis = latestAnalysisForCompany(company.id);

  const latestMessageTime = Math.max(...currentSnapshot.messages.map(message => {
    const time = new Date(message.datetime || 0).getTime();
    return Number.isNaN(time) ? 0 : time;
  }));
  const previousAnalysisTime = previousAnalysis
    ? new Date(previousAnalysis.createdAt).getTime()
    : 0;
  const reportIsNewer = latestMessageTime > 0 && previousAnalysisTime >= latestMessageTime;

  const jobId = createId("job");
  state.analysisJob = {
    id: jobId,
    status: "analyzing",
    conversationKey: currentSnapshot.conversationKey,
    messageCount: currentSnapshot.messages.length,
    startedAt: new Date().toISOString(),
    reportIsNewer,
    snapshot: currentSnapshot
  };
  await saveState();
  setAnalysisLoading(true);
  setStatus(
    status,
    reportIsNewer ? t("reanalyzing") : t("analyzingFull", { count: currentSnapshot.messages.length }),
    reportIsNewer ? "warning" : ""
  );
  renderAll();
}

function switchView(viewName) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.view === viewName);
  });
  document.querySelectorAll(".view").forEach(view => {
    view.classList.toggle("active", view.id === `view-${viewName}`);
  });
}

async function ensureApiOriginPermission(endpoint) {
  const parsed = new URL(endpoint);
  if (!['https:', 'http:'].includes(parsed.protocol)) {
    throw new Error("API URL 必须使用 http 或 https。");
  }

  const originPattern = `${parsed.origin}/*`;
  if (await chrome.permissions.contains({ origins: [originPattern] })) {
    return true;
  }

  return chrome.permissions.request({ origins: [originPattern] });
}

async function detectCurrentPage() {
  const revision = ++pageDetectionRevision;
  const status = document.getElementById("analyzeStatus");
  try {
    const tab = await getCurrentTab();
    if (revision !== pageDetectionRevision) return;

    if (!tab?.id || !tab.url?.includes("findy-code.io")) {
      currentSnapshot = null;
      currentCompanyId = null;
      renderAll();
      setStatus(status, t("unsupported"), "warning");
      return;
    }

    const nextSnapshot = normalizeSnapshot(await extractFindySnapshot(tab.id));
    if (revision !== pageDetectionRevision) return;

    currentSnapshot = nextSnapshot;
    const company = findCompanyByConversation(currentSnapshot.conversationKey);
    currentCompanyId = company?.id || null;
    const jobRendered = renderAll();
    if (!jobRendered) setStatus(status, t("ready"), "success");
  } catch (error) {
    if (revision !== pageDetectionRevision) return;
    currentSnapshot = null;
    currentCompanyId = null;
    renderAll();
    setStatus(status, error.message || "无法读取当前页面。", "error");
  }
}

function scheduleCurrentPageDetection(delay = 0) {
  clearTimeout(pageDetectionTimer);
  pageDetectionTimer = setTimeout(() => {
    detectCurrentPage();
  }, delay);
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  document.querySelectorAll("[data-settings-section]").forEach(section => {
    section.addEventListener("toggle", async () => {
      state.settings.openSettingsSections = [...document.querySelectorAll("[data-settings-section]")]
        .filter(candidate => candidate.open)
        .map(candidate => candidate.dataset.settingsSection);
      await saveState();
    });
  });

  document.getElementById("analyzeButton").addEventListener("click", async () => {
    try {
      await analyzeCurrentConversation();
    } catch (error) {
      setStatus(document.getElementById("analyzeStatus"), error.message || "分析失败。", "error");
      document.getElementById("analyzeButton").disabled = false;
    }
  });

  document.getElementById("copyRawButton").addEventListener("click", async () => {
    if (!currentSnapshot?.messages?.length) return;
    await navigator.clipboard.writeText(rawConversationText(currentSnapshot));
    setStatus(document.getElementById("analyzeStatus"), t("copyDone"), "success");
  });

  chrome.tabs.onActivated.addListener(() => scheduleCurrentPageDetection(100));
  chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
    if (tab.active && (changeInfo.url || changeInfo.status === "complete")) {
      scheduleCurrentPageDetection(200);
    }
  });

  chrome.storage.onChanged.addListener(async (changes, areaName) => {
    if (areaName !== "local" || !changes[STORAGE_KEY]) return;
    state = await loadState();
    renderAll();
  });

  document.getElementById("language").addEventListener("change", async event => {
    state.settings.language = event.target.value;
    await saveState();
    renderAll();
    setStatus(document.getElementById("analyzeStatus"), t("ready"), "success");
  });

  document.getElementById("testAiConnectionButton").addEventListener("click", async () => {
    const button = document.getElementById("testAiConnectionButton");
    const status = document.getElementById("aiSettingsStatus");
    const ai = {
      url: document.getElementById("apiUrl").value.trim(),
      apiKey: document.getElementById("apiKey").value.trim(),
      model: document.getElementById("model").value.trim()
    };

    if (!ai.url || !ai.apiKey || !ai.model) {
      setStatus(status, t("aiFieldsRequired"), "error");
      return;
    }

    button.disabled = true;
    button.textContent = t("testingConnection");
    setStatus(status, t("testingConnection"));
    try {
      if (!await ensureApiOriginPermission(ai.url)) {
        throw new Error(t("permissionDenied"));
      }
      await testAiConnection(ai);
      setStatus(status, t("connectionOk"), "success");
    } catch (error) {
      setStatus(status, t("connectionFailed", { error: error.message || String(error) }), "error");
    } finally {
      button.disabled = false;
      button.textContent = t("testConnection");
    }
  });

  document.getElementById("saveAiSettingsButton").addEventListener("click", async () => {
    const status = document.getElementById("aiSettingsStatus");
    const ai = {
      url: document.getElementById("apiUrl").value.trim(),
      apiKey: document.getElementById("apiKey").value.trim(),
      model: document.getElementById("model").value.trim()
    };

    if (!ai.url || !ai.apiKey || !ai.model) {
      setStatus(status, t("aiFieldsRequired"), "error");
      return;
    }

    try {
      const permissionGranted = await ensureApiOriginPermission(ai.url);
      state.settings.ai = ai;
      await saveState();
      renderSettings();
      setStatus(
        status,
        permissionGranted ? t("aiSaved") : "API origin permission was not granted.",
        permissionGranted ? "success" : "warning"
      );
    } catch (error) {
      setStatus(status, error.message || "AI 设置保存失败。", "error");
    }
  });

  document.getElementById("saveSettingsButton").addEventListener("click", async () => {
    state.settings = {
      ...state.settings,
      availableFrom: document.getElementById("availableFrom").value || createDefaultSettings().availableFrom,
      availableTo: document.getElementById("availableTo").value || createDefaultSettings().availableTo,
      bufferMinutes: Math.max(0, Number(document.getElementById("defaultBuffer").value) || createDefaultSettings().bufferMinutes)
    };
    await saveState();
    renderSettings();
    setStatus(document.getElementById("settingsStatus"), t("settingsSaved"), "success");
  });

  document.getElementById("exportDataButton").addEventListener("click", () => {
    downloadDataBackup();
    setStatus(document.getElementById("dataStatus"), t("exportDone"), "success");
  });

  document.getElementById("importDataButton").addEventListener("click", () => {
    document.getElementById("importDataInput").click();
  });

  document.getElementById("importDataInput").addEventListener("change", async event => {
    const input = event.target;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;

    try {
      const importedState = normalizeImportedState(JSON.parse(await file.text()));
      if (!confirm(t("importConfirm"))) return;
      state = importedState;
      await saveState();
      currentCompanyId = null;
      applySettingsSectionState();
      renderAll();
      setStatus(document.getElementById("dataStatus"), t("importDone"), "success");
    } catch (error) {
      console.error(error);
      setStatus(document.getElementById("dataStatus"), t("importFailed"), "error");
    }
  });

  document.getElementById("clearDataButton").addEventListener("click", async () => {
    if (!confirm(t("clearConfirm"))) return;
    const settings = state.settings;
    state = createEmptyState();
    state.settings = settings;
    await saveState();
    currentCompanyId = null;
    renderAll();
    setStatus(document.getElementById("dataStatus"), t("dataCleared"), "success");
  });

  document.getElementById("scheduleList").addEventListener("click", async event => {
    const editButton = event.target.closest(".edit-schedule");
    if (editButton) {
      showScheduleEditor(editButton.dataset.scheduleId);
      return;
    }
    const button = event.target.closest(".delete-schedule");
    if (!button) return;
    state.scheduleItems = state.scheduleItems.filter(item => item.id !== button.dataset.scheduleId);
    await saveState();
    renderAll();
  });

  document.getElementById("cancelScheduleEdit").addEventListener("click", hideScheduleEditor);

  document.getElementById("saveScheduleEdit").addEventListener("click", async () => {
    const id = document.getElementById("scheduleEditId").value;
    const item = state.scheduleItems.find(candidate => candidate.id === id);
    const status = document.getElementById("scheduleEditStatus");
    if (!item) return;

    const start = new Date(document.getElementById("scheduleEditStart").value);
    const end = new Date(document.getElementById("scheduleEditEnd").value);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start >= end) {
      setStatus(status, t("invalidTime"), "error");
      return;
    }

    item.title = document.getElementById("scheduleEditTitle").value.trim() || t("interview");
    item.startAt = start.toISOString();
    item.endAt = end.toISOString();
    await saveState();
    renderAll();
    hideScheduleEditor();
  });

}

async function initialize() {
  if (USE_MOCK_DATA) {
    const mockPreview = await loadMockPreview();
    state = mockPreview.state;
    currentSnapshot = mockPreview.snapshot;
    currentCompanyId = mockPreview.companyId;
    applySettingsSectionState();
    bindEvents();
    renderAll();
    await refreshJapaneseHolidayDates();
    renderAll();
    setStatus(document.getElementById("analyzeStatus"), t("analyzeDone"), "success");
    return;
  }

  try {
    state = await loadState();
  } catch (error) {
    console.error(error);
    state = createEmptyState();
  }

  applySettingsSectionState();
  bindEvents();
  renderAll();
  refreshJapaneseHolidayDates().then(renderAll);
  await detectCurrentPage();
}

if (typeof chrome !== "undefined" && typeof document !== "undefined") {
  initialize();
}

if (typeof module !== "undefined") {
  module.exports = {
    buildAvailabilityDays,
    createExportPayload,
    createMockPreview,
    deleteAnalysisRecord,
    fetchJapaneseHolidayDates,
    loadMockPreview,
    normalizeImportedState,
    normalizeSnapshotForAnalysis,
    readJsonResponse,
    resolveAiRequestConfig,
    testAiConnection
  };
}
