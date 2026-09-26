const STORAGE_KEY = "jobInterviewManagerState";
const CURRENT_SCHEMA_VERSION = 2;
const DATA_EXPORT_FORMAT = "job-conversation-extractor-backup";
const DATA_EXPORT_VERSION = 1;
const ANALYSIS_TIMEOUT_MS = 90_000;
const JAPANESE_HOLIDAY_API_BASE_URL = "https://api.jp-calendar.com/v1/holidays";
const USE_MOCK_DATA = false;
const LANGUAGE_LOCALES = { zh: "zh-CN", en: "en-US", ja: "ja-JP" };
const TRANSLATIONS = {
  zh: {
    appTitle: "转职面谈管理", appSubtitle: "少整理一点，把注意力留给沟通",
    analyzeTab: "分析", scheduleTab: "面试日程", availabilityTab: "可用日程", settingsTab: "设置",
    analyzeCurrent: "分析当前对话", copyConversation: "复制原始对话", checkingConversation: "正在检查当前会话。",
    latestInterview: "最新面试安排", analysisResultTitle: "分析结果", analyzingConversation: "正在分析当前对话…", analysisEmpty: "分析后显示已确定、暂定的面试或候选时间请求。",
    scheduleTitle: "面试日程", scheduleEmpty: "还没有确定或暂定的面试。", scheduleUpcomingEmpty: "没有未结束的面谈。", showAllSchedules: "显示全部", hidePastSchedules: "隐藏已结束", listView: "列表", calendarView: "日历", hasInterviewDay: "有面谈", freeDay: "无面谈", holidayDay: "周末 / 节假日", calendarDayHint: "点击日期查看当天的面谈。", calendarHolidayLoading: "正在获取节假日……", calendarHolidayUnavailable: "节假日暂时无法获取，灰色日期可能不完整。", previousMonth: "上个月", nextMonth: "下个月", calendarInterviewCount: "{count} 项面谈", editSchedule: "编辑时间安排", cancel: "取消",
    title: "标题", start: "开始", end: "结束", saveChanges: "保存更新", language: "语言", privacyMode: "隐私模式",
    protocolHint: "根据 URL 自动判断协议", modelName: "模型名称", testConnection: "测试连接", saveAi: "保存 AI 设置", scheduling: "日程设置",
    availableFrom: "每天开始", availableTo: "每天结束", duration: "面谈时长", buffer: "面试时间前后余量（分钟）", candidateCount: "候选数量",
    saveSettings: "保存设置", privacyNotSaved: "隐私模式已在当前窗口生效，但未能保存设置。", data: "数据", importData: "导入数据", exportData: "导出数据", clearData: "清空本地数据",
    dataFooter: "API Key、消息、分析结果和面试日程都保存在此浏览器的扩展本地存储中。",
    unreadable: "当前页面不可读取", openFindy: "请打开 Findy 或 BizReach 的对话页面后重新打开插件。", messageCount: "{count} 条消息",
    updatedAt: "更新于 {time}", noConfirmed: "当前没有已确定的面试", noConfirmedDesc: "对话中没有明确确认的面试时间。",
    contact: "联系人", method: "方式", location: "地点 / 链接", notes: "备注", rationale: "判断",
    scheduleCount: "{count} 项", confirmed: "已确定", tentative: "仮予定", edit: "编辑", delete: "删除",
    dataSummary: "{messages} 条消息 · {analyses} 条分析 · {schedules} 项面试日程",
    interview: "面试", reading: "正在读取当前对话……", noMessages: "当前对话没有可分析的消息。",
    missingAi: "请到设置中填写 API URL、API Key 和模型后再次分析。", reanalyzing: "上次报告晚于最新消息，正在重新分析完整对话……",
    analyzingFull: "正在分析当前完整对话（{count} 条消息）……", analyzeDone: "分析完成。", analysisTimeout: "分析超过 90 秒，尚未取得结果。请重试。", copyDone: "原始对话已复制到剪贴板。",
    unsupported: "当前页面暂不支持。请打开 Findy 或 BizReach 的对话页面。", ready: "当前会话已准备好，可以开始分析。",
    aiFieldsRequired: "请填写 API URL、API Key 和模型名称。", testingConnection: "正在测试连接……", connectionOk: "连接成功。", connectionFailed: "连接失败：{error}", permissionDenied: "未授予该 API 地址的访问权限。", aiSaved: "AI 设置已保存。", settingsSaved: "设置已保存到本地。",
    clearConfirm: "确定清空所有本地消息、分析和面试日程吗？", dataCleared: "业务数据已清空，设置仍然保留。", invalidTime: "请检查开始和结束时间。",
    importConfirm: "导入会覆盖当前所有本地数据和设置，确定继续吗？", importDone: "数据导入完成。", importFailed: "无法导入：请选择由本扩展导出的有效 JSON 文件。", exportDone: "数据已导出。", jobLink: "职位信息", messageLink: "消息页面"
    ,candidateRequest: "待回复候选时间", nextTwoWeeks: "未来两周可用时间", allAvailable: "{start}–{end} 都可以", unavailable: "没有可用时间",
    availability: "可用时间设置", availabilityPageTitle: "可选择的时间", availabilityIntro: "根据设置和已保存的面试日程，选择未来两周的候选时间。", selectedAvailability: "已选候选时间", selectedAvailabilityCount: "{selected}/{limit}", copySelectedAvailability: "复制已选时间", noSelectedAvailability: "尚未选择时间。", noSlotsAvailable: "未来两周没有符合设置的可用时间。", availableSlotsCount: "{count} 个可选时间", selectLimit: "最多选择 {count} 个时间。", copiedAvailability: "已复制候选时间。", invalidAvailabilitySettings: "请检查每天的起止时间、面谈时长、候选数量和缓冲时间。", holidaysLoading: "正在获取日本节假日……", holidaysUnavailable: "日本节假日暂时无法获取，以下日期可能包含节假日。", availableDayCount: "{count} 个工作日", fullWindowAvailable: "全部时段可用",
    refreshAvailability: "刷新可用时间", availabilityRefreshed: "已从本地数据读取 {count} 项面试日程，并重新计算可用时间（{time}）。"
  },
  en: {
    appTitle: "Interview Manager", appSubtitle: "Spend less time organizing and more time communicating",
    analyzeTab: "Analyze", scheduleTab: "Interviews", availabilityTab: "Availability", settingsTab: "Settings",
    analyzeCurrent: "Analyze current conversation", copyConversation: "Copy conversation", checkingConversation: "Checking the current conversation.",
    latestInterview: "Latest interview arrangement", analysisResultTitle: "Analysis result", analyzingConversation: "Analyzing the current conversation…", analysisEmpty: "A confirmed or tentative interview, or request for candidate times, will appear here.",
    scheduleTitle: "Interview schedule", scheduleEmpty: "No confirmed or tentative interviews yet.", scheduleUpcomingEmpty: "No upcoming interviews.", showAllSchedules: "Show all", hidePastSchedules: "Hide past", listView: "List", calendarView: "Calendar", hasInterviewDay: "Interview", freeDay: "No interview", holidayDay: "Weekend / holiday", calendarDayHint: "Select a date to view its interviews.", calendarHolidayLoading: "Loading holidays…", calendarHolidayUnavailable: "Holidays could not be loaded; some gray dates may be missing.", previousMonth: "Previous month", nextMonth: "Next month", calendarInterviewCount: "{count} interviews", editSchedule: "Edit interview", cancel: "Cancel",
    title: "Title", start: "Start", end: "End", saveChanges: "Save changes", language: "Language", privacyMode: "Privacy mode",
    protocolHint: "Protocol is detected from the URL", modelName: "Model", testConnection: "Test connection", saveAi: "Save AI settings", scheduling: "Schedule settings",
    availableFrom: "Daily start", availableTo: "Daily end", duration: "Duration", buffer: "Minutes blocked before and after an interview", candidateCount: "Candidate slots",
    saveSettings: "Save settings", privacyNotSaved: "Privacy mode is active in this window, but the setting could not be saved.", data: "Data", importData: "Import data", exportData: "Export data", clearData: "Clear local data",
    dataFooter: "The API key, messages, analysis results, and interview schedule are stored locally in this browser extension.",
    unreadable: "This page cannot be read", openFindy: "Open a Findy or BizReach conversation and reopen the extension.", messageCount: "{count} messages",
    updatedAt: "Updated {time}", noConfirmed: "No confirmed interview", noConfirmedDesc: "The conversation does not contain a clearly confirmed interview time.",
    contact: "Contact", method: "Method", location: "Location / link", notes: "Notes", rationale: "Reason",
    scheduleCount: "{count} items", confirmed: "Confirmed", tentative: "Tentative", edit: "Edit", delete: "Delete",
    dataSummary: "{messages} messages · {analyses} analyses · {schedules} interviews",
    interview: "Interview", reading: "Reading the current conversation…", noMessages: "There are no messages to analyze.",
    missingAi: "Set the API URL, API key, and model in Settings, then analyze again.", reanalyzing: "The previous report is newer than the latest message. Reanalyzing the full conversation…",
    analyzingFull: "Analyzing the full conversation ({count} messages)…", analyzeDone: "Analysis complete.", analysisTimeout: "No analysis result after 90 seconds. Please retry.", copyDone: "Conversation copied to the clipboard.",
    unsupported: "This page is not supported. Open a Findy or BizReach conversation.", ready: "The current conversation is ready to analyze.",
    aiFieldsRequired: "Enter the API URL, API key, and model.", testingConnection: "Testing connection…", connectionOk: "Connection successful.", connectionFailed: "Connection failed: {error}", permissionDenied: "Access to this API address was not granted.", aiSaved: "AI settings saved.", settingsSaved: "Settings saved locally.",
    clearConfirm: "Clear all locally stored messages, analyses, and interview schedules?", dataCleared: "Local data cleared. Settings were retained.", invalidTime: "Check the start and end times.",
    importConfirm: "Importing will replace all current local data and settings. Continue?", importDone: "Data imported.", importFailed: "Import failed. Select a valid JSON file exported by this extension.", exportDone: "Data exported.", jobLink: "Job details", messageLink: "Messages"
    ,candidateRequest: "Candidate times requested", nextTwoWeeks: "Availability for the next two weeks", allAvailable: "Any time from {start}–{end}", unavailable: "No available time",
    availability: "Availability", availabilityPageTitle: "Available times", availabilityIntro: "Choose times in the next two weeks based on your settings and saved interviews.", selectedAvailability: "Selected times", selectedAvailabilityCount: "{selected}/{limit}", copySelectedAvailability: "Copy selected times", noSelectedAvailability: "No times selected.", noSlotsAvailable: "No times match your settings in the next two weeks.", availableSlotsCount: "{count} available times", selectLimit: "Choose up to {count} times.", copiedAvailability: "Selected times copied.", invalidAvailabilitySettings: "Check your daily hours, interview duration, candidate count, and buffer.", holidaysLoading: "Loading Japanese public holidays…", holidaysUnavailable: "Japanese public holidays could not be loaded. The dates below may include holidays.", availableDayCount: "{count} business days", fullWindowAvailable: "Full window available",
    refreshAvailability: "Refresh available times", availabilityRefreshed: "Read {count} saved interviews and recalculated availability ({time})."
  },
  ja: {
    appTitle: "転職面談管理", appSubtitle: "整理の手間を減らし、連絡に集中",
    analyzeTab: "分析", scheduleTab: "面談日程", availabilityTab: "空き時間", settingsTab: "設定",
    analyzeCurrent: "現在の会話を分析", copyConversation: "元の会話をコピー", checkingConversation: "現在の会話を確認しています。",
    latestInterview: "最新の面談予定", analysisResultTitle: "分析結果", analyzingConversation: "現在の会話を分析しています…", analysisEmpty: "分析後、確定・仮予定の面談または候補日時の提示依頼を表示します。",
    scheduleTitle: "面談日程", scheduleEmpty: "確定または仮予定の面談はまだありません。", scheduleUpcomingEmpty: "これからの面談はありません。", showAllSchedules: "すべて表示", hidePastSchedules: "終了分を隠す", listView: "一覧", calendarView: "カレンダー", hasInterviewDay: "面談あり", freeDay: "面談なし", holidayDay: "週末・祝日", calendarDayHint: "日付を選ぶと面談を確認できます。", calendarHolidayLoading: "祝日を取得しています…", calendarHolidayUnavailable: "祝日を取得できませんでした。灰色の日付が一部表示されない可能性があります。", previousMonth: "前月", nextMonth: "翌月", calendarInterviewCount: "面談 {count} 件", editSchedule: "日程を編集", cancel: "キャンセル",
    title: "タイトル", start: "開始", end: "終了", saveChanges: "変更を保存", language: "言語", privacyMode: "プライバシーモード",
    protocolHint: "URL からプロトコルを自動判定", modelName: "モデル名", testConnection: "接続をテスト", saveAi: "AI 設定を保存", scheduling: "日程設定",
    availableFrom: "毎日の開始時刻", availableTo: "毎日の終了時刻", duration: "面談時間", buffer: "面談時刻の前後に空ける時間（分）", candidateCount: "候補数",
    saveSettings: "設定を保存", privacyNotSaved: "この画面ではプライバシーモードが有効ですが、設定を保存できませんでした。", data: "データ", importData: "データを読み込む", exportData: "データを書き出す", clearData: "ローカルデータを消去",
    dataFooter: "API キー、メッセージ、分析結果、面談日程は、このブラウザ拡張機能のローカルストレージに保存されます。",
    unreadable: "現在のページを読み取れません", openFindy: "Findy または BizReach の会話ページを開いてから、拡張機能を開き直してください。", messageCount: "{count} 件のメッセージ",
    updatedAt: "更新：{time}", noConfirmed: "確定済みの面談はありません", noConfirmedDesc: "会話内に明確に確定した面談日時がありません。",
    contact: "担当者", method: "実施方法", location: "場所 / リンク", notes: "備考", rationale: "判断根拠",
    scheduleCount: "{count} 件", confirmed: "確定", tentative: "仮予定", edit: "編集", delete: "削除",
    dataSummary: "メッセージ {messages} 件 · 分析 {analyses} 件 · 面談日程 {schedules} 件",
    interview: "面談", reading: "現在の会話を読み込んでいます…", noMessages: "分析できるメッセージがありません。",
    missingAi: "設定で API URL、API キー、モデルを入力してから、もう一度分析してください。", reanalyzing: "前回のレポートが最新メッセージより新しいため、会話全文を再分析しています…",
    analyzingFull: "現在の会話全文（{count} 件）を分析しています…", analyzeDone: "分析が完了しました。", analysisTimeout: "90秒以内に分析結果を取得できませんでした。再試行してください。", copyDone: "元の会話をクリップボードにコピーしました。",
    unsupported: "このページは未対応です。Findy または BizReach の会話ページを開いてください。", ready: "現在の会話を分析できます。",
    aiFieldsRequired: "API URL、API キー、モデル名を入力してください。", testingConnection: "接続をテストしています…", connectionOk: "接続に成功しました。", connectionFailed: "接続に失敗しました：{error}", permissionDenied: "この API アドレスへのアクセスが許可されませんでした。", aiSaved: "AI 設定を保存しました。", settingsSaved: "設定をローカルに保存しました。",
    clearConfirm: "ローカルのメッセージ、分析結果、面談日程をすべて消去しますか？", dataCleared: "データを消去しました。設定は保持されています。", invalidTime: "開始時刻と終了時刻を確認してください。",
    importConfirm: "読み込むと現在のローカルデータと設定がすべて上書きされます。続行しますか？", importDone: "データを読み込みました。", importFailed: "読み込めませんでした。この拡張機能から書き出した有効な JSON ファイルを選択してください。", exportDone: "データを書き出しました。", jobLink: "求人情報", messageLink: "メッセージ"
    ,candidateRequest: "候補日時の返信待ち", nextTwoWeeks: "今後2週間の空き時間", allAvailable: "{start}〜{end} はいつでも可", unavailable: "空き時間なし",
    availability: "空き時間設定", availabilityPageTitle: "選択できる時間", availabilityIntro: "設定と保存済みの面談日程から、今後2週間の候補時間を選べます。", selectedAvailability: "選択した候補時間", selectedAvailabilityCount: "{selected}/{limit}", copySelectedAvailability: "選択した時間をコピー", noSelectedAvailability: "時間が選択されていません。", noSlotsAvailable: "今後2週間に設定に合う空き時間はありません。", availableSlotsCount: "{count} 件の候補時間", selectLimit: "最大 {count} 件まで選択できます。", copiedAvailability: "候補時間をコピーしました。", invalidAvailabilitySettings: "一日の時間帯、面談時間、候補数、前後の余裕時間を確認してください。", holidaysLoading: "日本の祝日を取得しています…", holidaysUnavailable: "日本の祝日を取得できませんでした。以下の日付には祝日が含まれる可能性があります。", availableDayCount: "{count} 営業日", fullWindowAvailable: "全時間帯で空き",
    refreshAvailability: "空き時間を更新", availabilityRefreshed: "保存済みの面談 {count} 件を読み込み、空き時間を再計算しました（{time}）。"
  }
};

function createDefaultSettings() {
  return {
    language: "zh",
    privacyMode: false,
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

function privacyText(value) {
  return state.settings.privacyMode && value ? "****" : value;
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
    analysisType: { type: "string", enum: ["confirmed_interview", "tentative_interview", "candidate_time_request", "none"] },
    hasConfirmedInterview: { type: "boolean" },
    hasTentativeInterview: { type: "boolean" },
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
    latestTentativeInterview: {
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
    "hasTentativeInterview",
    "latestConfirmedInterview",
    "latestTentativeInterview",
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
const backgroundJobFailures = new Map();
let analysisTimeoutTimer = null;
let analysisPollTimer = null;
const selectedAvailabilitySlots = new Set();
let availableSlotLookup = new Map();
let showPastSchedules = false;
let scheduleViewMode = "list";
let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let selectedCalendarDateKey = null;
const calendarHolidayCache = new Map();
const calendarHolidayPending = new Set();

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

  return normalizeStoredState(saved);
}

function normalizeStoredState(saved) {
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

function parseConversationPageUrl(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (hostname === "findy-code.io" || hostname.endsWith(".findy-code.io")) {
      return { platform: "Findy", conversationId: "" };
    }

    const bizReachMatch = url.pathname.match(/^\/messages\/([^/]+)\/?$/);
    if ((hostname === "bizreach.jp" || hostname.endsWith(".bizreach.jp")) && bizReachMatch) {
      return { platform: "BizReach", conversationId: decodeURIComponent(bizReachMatch[1]) };
    }
  } catch {
    return null;
  }

  return null;
}

function isSupportedConversationUrl(value) {
  return Boolean(parseConversationPageUrl(value));
}

function platformLogoMarkup(platform) {
  const isBizReach = String(platform || "").toLowerCase() === "bizreach";
  const key = isBizReach ? "bizreach" : "findy";
  const label = isBizReach ? "BizReach" : "Findy";
  const initial = isBizReach ? "B" : "F";
  return `<span class="platform-mark ${key}" aria-label="${label}"><span class="platform-logo" aria-hidden="true">${initial}</span><span class="platform-label">${label}</span></span>`;
}

function normalizeSourceLink(value, platform, kind) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return "";
    const isBizReach = String(platform || "").toLowerCase() === "bizreach";
    const validHost = isBizReach
      ? url.hostname === "www.bizreach.jp"
      : url.hostname === "findy-code.io";
    const validPath = isBizReach
      ? kind === "job" ? /^\/jobs\/[^/]+\/?$/.test(url.pathname) : /^\/messages\/[^/]+\/?$/.test(url.pathname)
      : kind === "job" ? /^\/companies\/[^/]+\/jobs\/[^/]+\/?$/.test(url.pathname) : /^\/matches\/[^/]+\/?$/.test(url.pathname);
    return validHost && validPath ? url.href : "";
  } catch {
    return "";
  }
}

function sourceLinksForCompany(company) {
  const platform = company?.source || "";
  const conversationKey = company?.conversationKey || "";
  const identity = conversationIdentity(conversationKey);
  const liveSnapshot = currentSnapshot && identity &&
    conversationIdentity(currentSnapshot.conversationKey) === identity
    ? currentSnapshot : null;
  const fallbackMessageUrl = platform.toLowerCase() === "bizreach"
    ? /^bizreach:([^/]+)$/.test(conversationKey)
      ? `https://www.bizreach.jp/messages/${encodeURIComponent(conversationKey.slice(9))}/`
      : ""
    : conversationKey.split("::")[0];
  return {
    jobUrl: normalizeSourceLink(company?.jobUrl, platform, "job") ||
      normalizeSourceLink(liveSnapshot?.jobUrl, platform, "job"),
    messageUrl: normalizeSourceLink(company?.messageUrl, platform, "message") ||
      normalizeSourceLink(liveSnapshot?.url, platform, "message") ||
      normalizeSourceLink(fallbackMessageUrl, platform, "message")
  };
}

async function extractConversationSnapshot(tabId) {
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const currentUrl = new URL(location.href);
      const hostname = currentUrl.hostname.toLowerCase();
      const clean = value => (value || "").replace(/\s+/g, " ").trim();
      const isVisible = element => {
        const style = getComputedStyle(element);
        return element.getClientRects().length > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden";
      };
      const bizReachMatch = currentUrl.pathname.match(/^\/messages\/([^/]+)\/?$/);

      if ((hostname === "bizreach.jp" || hostname.endsWith(".bizreach.jp")) && bizReachMatch) {
        const conversationId = decodeURIComponent(bizReachMatch[1]);
        const header = document.querySelector('header[class*="MessageHeaderContainer"]') ||
          document.querySelector('header[class*="MessageHeader"]');
        const companyLink = header?.querySelector('a[href^="/company/view/"], a[href*="bizreach.jp/company/view/"]');
        const companyName = clean(companyLink?.querySelector("p")?.innerText || companyLink?.innerText);
        const headerTexts = header
          ? [...header.querySelectorAll("p")].map(element => clean(element.innerText)).filter(Boolean)
          : [];
        const contactName = headerTexts.find(value => value !== companyName) || "";
        const messageSelector = [
          'p[class*="Text-module"][class*="size-sm"][class*="line-height-body"][class*="color-inverse"]',
          'p[class*="Text-module"][class*="size-sm"][class*="line-height-body"][class*="color-high-emphasis"]'
        ].join(", ");
        const seenMessages = new Set();
        const messages = [...document.querySelectorAll(messageSelector)]
          .filter(element => {
            if (!clean(element.innerText) || !isVisible(element)) return false;
            if (element.closest("header, nav, aside, footer, button, form")) return false;
            if (!header) return Boolean(element.closest('[class*="Message"], [class*="message"]'));
            return Boolean(header.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING);
          })
          .map((textElement, index) => {
            const classText = String(textElement.className || "");
            const senderType = classText.includes("color-inverse") ? "me" : "company";
            const text = textElement.innerText.trim();
            let scope = textElement.parentElement;
            let timeElement = null;
            let depth = 0;
            while (scope && scope !== document.body && depth < 8 && !timeElement) {
              if (scope.querySelectorAll?.(messageSelector).length > 1) break;
              timeElement = scope.querySelector?.("time[datetime], time") || null;
              scope = scope.parentElement;
              depth += 1;
            }
            const datetime = timeElement?.getAttribute("datetime") || clean(timeElement?.innerText) || null;
            const messageKey = [datetime || "", senderType, text].join("\u241f");
            if (seenMessages.has(messageKey)) return null;
            seenMessages.add(messageKey);
            return {
              sourceIndex: index + 1,
              senderType,
              senderName: senderType === "company" ? contactName || null : null,
              text,
              datetime
            };
          })
          .filter(Boolean);
        const conversationKey = `bizreach:${conversationId}`;
        const attachedJobLink = document.querySelector('[class*="AttachedJob"][class*="card"] a[href^="/jobs/"]');
        const jobUrl = attachedJobLink ? new URL(attachedJobLink.getAttribute("href"), currentUrl.origin).href : "";

        return {
          source: "BizReach",
          platform: "BizReach",
          conversationId,
          url: location.href,
          jobUrl,
          baseConversationKey: conversationKey,
          conversationKey,
          companyName,
          contactName,
          messages
        };
      }

      if (!(hostname === "findy-code.io" || hostname.endsWith(".findy-code.io"))) {
        return null;
      }

      const messageTextSelector = '[class*="__messageText"]';
      const textElements = [...document.querySelectorAll(messageTextSelector)].filter(element => {
        return element.innerText.trim() &&
          isVisible(element) &&
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
      const jobLink = document.querySelector('a[class*="match-job-description"][href*="/jobs/"], a[href^="/companies/"][href*="/jobs/"]');
      const jobUrl = jobLink ? new URL(jobLink.getAttribute("href"), currentUrl.origin).href : "";

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
        jobUrl,
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
  if (!snapshot) {
    throw new Error("无法读取当前会话。");
  }
  const companyName = companyNameOverride.trim() || snapshot.companyName || "未命名公司";
  const platformKey = String(snapshot.platform || snapshot.source || "").toLowerCase();
  const baseConversationKey = snapshot.baseConversationKey || snapshot.conversationKey?.split("::")[0] || snapshot.url;
  const conversationKey = snapshot.conversationId
    ? `${platformKey}:${snapshot.conversationId}`
    : `${baseConversationKey}::${companyName}`;
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
      id: `msg_${hashString([conversationKey, messageKey].join("\u241f"))}`
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

function conversationIdentity(conversationKey) {
  const value = String(conversationKey || "");
  if (/^bizreach:[^:/]+$/.test(value)) return value;
  try {
    const url = new URL(value.split("::")[0]);
    if (url.hostname !== "findy-code.io" || url.protocol !== "https:") return "";
    const match = url.pathname.match(/^\/matches\/([^/]+)\/?$/);
    return match ? `findy:${match[1]}` : "";
  } catch {
    return "";
  }
}

function findCompanyByConversation(conversationKey, companies = state.companies) {
  const identity = conversationIdentity(conversationKey);
  return companies.find(company => identity && conversationIdentity(company.conversationKey) === identity) ||
    companies.find(company => company.conversationKey === conversationKey) || null;
}

function upsertCompany(snapshot) {
  let company = findCompanyByConversation(snapshot.conversationKey);

  if (!company) {
    company = {
      id: createId("company"),
      source: snapshot.source,
      conversationKey: snapshot.conversationKey,
      jobUrl: normalizeSourceLink(snapshot.jobUrl, snapshot.platform, "job"),
      messageUrl: normalizeSourceLink(snapshot.url, snapshot.platform, "message"),
      name: snapshot.companyName,
      contactName: snapshot.contactName || "",
      stage: "待分析",
      status: "unknown",
      nextAction: "等待分析",
      needsUserAction: false,
      lastUpdatedAt: new Date().toISOString()
    };
    state.companies.push(company);
  } else {
    if (snapshot.companyName && snapshot.companyName !== "未命名公司") {
      company.name = snapshot.companyName;
    }
    if (snapshot.contactName) company.contactName = snapshot.contactName;
    if (snapshot.source) company.source = snapshot.source;
    const jobUrl = normalizeSourceLink(snapshot.jobUrl, snapshot.platform, "job");
    const messageUrl = normalizeSourceLink(snapshot.url, snapshot.platform, "message");
    if (jobUrl) company.jobUrl = jobUrl;
    if (messageUrl) company.messageUrl = messageUrl;
  }

  currentCompanyId = company.id;
  return company;
}

function messageContentKey(message) {
  return [
    message.datetime || "",
    message.senderType || "unknown",
    message.senderName || "",
    String(message.text || "").replace(/\s+/g, " ").trim()
  ].join("\u241f");
}

function saveSnapshotMessages(snapshot, company, targetState = state) {
  const savedMessages = [];
  for (const message of snapshot.messages) {
    const existing = targetState.messages.find(saved => saved.companyId === company.id && (
      saved.id === message.id || messageContentKey(saved) === messageContentKey(message)
    ));
    if (existing) {
      savedMessages.push(existing);
      continue;
    }

    const savedMessage = {
      ...message,
      companyId: company.id,
      conversationKey: snapshot.conversationKey,
      source: snapshot.source,
      receivedAt: new Date().toISOString()
    };
    targetState.messages.push(savedMessage);
    savedMessages.push(savedMessage);
  }

  company.lastMessageAt = snapshot.messages.at(-1)?.datetime || company.lastUpdatedAt;
  company.lastUpdatedAt = new Date().toISOString();
  return savedMessages;
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

  const confirmedInterview = result.latestConfirmedInterview || {};
  const tentativeInterview = result.latestTentativeInterview || (
    result.analysisType === "tentative_interview" ? confirmedInterview : {}
  );
  const hasConfirmedInterview = result.hasConfirmedInterview === true;
  const hasTentativeInterview = !hasConfirmedInterview && (
    result.hasTentativeInterview === true || result.analysisType === "tentative_interview"
  );
  const candidateTimeRequest = result.candidateTimeRequest || {};
  const requestsCandidateTimes = !hasConfirmedInterview && !hasTentativeInterview && (
    result.analysisType === "candidate_time_request" || candidateTimeRequest.requested === true
  );
  const analysisType = hasConfirmedInterview
    ? "confirmed_interview"
    : hasTentativeInterview
      ? "tentative_interview"
      : requestsCandidateTimes
        ? "candidate_time_request"
        : "none";
  const confirmedStartAt = String(confirmedInterview.startAt || "").trim();
  const tentativeStartAt = String(tentativeInterview.startAt || "").trim();
  if (hasConfirmedInterview && !confirmedStartAt) {
    throw new Error("AI 判断存在已确定面试，但没有返回面试时间。");
  }
  if (hasTentativeInterview && !tentativeStartAt) {
    throw new Error("AI 判断存在暂定面试，但没有返回候选人已选择的具体时间。");
  }

  const normalizeInterview = (interview, scheduled) => ({
    title: scheduled ? String(interview.title || "面试").trim() || "面试" : "",
    startAt: String(interview.startAt || "").trim(),
    endAt: String(interview.endAt || "").trim(),
    contactName: String(interview.contactName || result.contactName || "").trim(),
    method: String(interview.method || "").trim(),
    location: String(interview.location || "").trim(),
    notes: String(interview.notes || "").trim()
  });
  const normalizedConfirmedInterview = normalizeInterview(confirmedInterview, hasConfirmedInterview);
  const normalizedTentativeInterview = normalizeInterview(tentativeInterview, hasTentativeInterview);
  const scheduledInterview = hasConfirmedInterview
    ? normalizedConfirmedInterview
    : hasTentativeInterview
      ? normalizedTentativeInterview
      : null;
  const scheduleStatus = hasConfirmedInterview ? "confirmed" : "tentative";
  const stage = hasConfirmedInterview
    ? "面试已确定"
    : hasTentativeInterview
      ? "面试暂定"
      : requestsCandidateTimes
        ? "待回复候选时间"
        : "未发现面试安排";
  const nextAction = hasConfirmedInterview
    ? "准备最新确定的面试"
    : hasTentativeInterview
      ? "等待企业确认暂定时间"
      : requestsCandidateTimes
        ? "回复可用时间"
        : "继续关注招聘沟通";
  const eventTitle = hasConfirmedInterview
    ? "最新确定的面试"
    : hasTentativeInterview
      ? "暂定面试"
      : requestsCandidateTimes
        ? "待回复候选时间"
        : "未发现面试安排";

  const scheduleItems = scheduledInterview ? [{
    type: "interview",
    title: scheduledInterview.title,
    startAt: scheduledInterview.startAt,
    endAt: scheduledInterview.endAt || scheduledInterview.startAt,
    status: scheduleStatus,
    contactName: scheduledInterview.contactName,
    method: scheduledInterview.method,
    location: scheduledInterview.location,
    notes: scheduledInterview.notes
  }] : [];

  return {
    companyName: String(result.companyName || snapshot.companyName).trim() || snapshot.companyName,
    contactName: String(
      result.contactName || scheduledInterview?.contactName || ""
    ).trim(),
    analysisType,
    stage,
    status: hasConfirmedInterview ? "confirmed" : hasTentativeInterview ? "waiting_company" : "unknown",
    nextAction,
    needsUserAction: requestsCandidateTimes,
    eventTitle,
    eventDescription: summary,
    timeline: [],
    scheduleItems,
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
    hasTentativeInterview,
    latestConfirmedInterview: normalizedConfirmedInterview,
    latestTentativeInterview: normalizedTentativeInterview
  };
}

function analysisPrompt(snapshot) {
  const instructions = {
    zh: [
      "请分析下面完整的招聘对话，目标是帮助用户整理已确定或需要为自己预留时间的面试安排。",
      "只根据对话中的明确内容判断，不要推测或编造日期、时间、联系人、方式、地点或链接。",
      "只有企业明确确认了具体面试日期和时间，hasConfirmedInterview 才能为 true。候选时间、询问可用时间、尚未确认的提议都不是已确定面试。",
      "如果企业提供了一个或多个具体日期和时间，而候选人随后明确选择、接受或回复将参加其中一个具体时间，即使企业尚未再次回复，也设置 analysisType 为 tentative_interview、hasTentativeInterview 为 true，并把候选人选择的具体时间写入 latestTentativeInterview。这是候选人需要先为自己占用的仮予定。",
      "候选人只表示时间灵活、只提供多个可用范围、尚未选择某个具体时间，不能判定为 tentative_interview。",
      "如果企业后来明确确认该时间，confirmed_interview 优先于 tentative_interview。",
      "如果存在多次已确定面试，只返回对话中时间最新的一次。",
      "如果对方正在询问候选人的可用时间或要求提供多个候选面谈时间，并且尚未确定具体时间，则 analysisType 为 candidate_time_request，candidateTimeRequest.requested 为 true。",
      "如果对方提供 Timerex、Calendly 等预约链接，要求候选人自行登记或选择可用时间，但对话中尚未明确具体日期和时间，也必须判定为 candidate_time_request，而不是已确定面试。",
      "startAt 和 endAt 使用包含时区的 ISO 8601 日期时间；对话未明确结束时间时 endAt 返回空字符串。",
      "summary、title、method、location、notes 使用中文。专有名称保持原文。没有已确定面试时，latestConfirmedInterview 的所有字符串字段返回空字符串；没有仮予定时，latestTentativeInterview 的所有字符串字段返回空字符串。",
      "只返回符合下面 JSON Schema 的 JSON object，不要输出 Markdown 或额外说明。"
    ],
    en: [
      "Analyze the complete recruitment conversation below and identify confirmed interviews as well as interview times the candidate needs to reserve tentatively.",
      "Use only explicit information from the conversation. Do not infer or invent dates, times, contacts, methods, locations, or links.",
      "Set hasConfirmedInterview to true only when the company has explicitly confirmed a specific interview date and time. Proposed times, availability questions, and unconfirmed suggestions are not confirmed interviews.",
      "If the company offers one or more specific dates and times and the candidate then explicitly selects, accepts, or says they will attend one specific time, set analysisType to tentative_interview and hasTentativeInterview to true even if the company has not replied again. Put the selected time in latestTentativeInterview because the candidate needs to reserve it.",
      "Do not classify flexible availability, multiple unselected ranges, or a reply that does not choose one specific time as tentative_interview.",
      "If the company later explicitly confirms that time, confirmed_interview takes precedence over tentative_interview.",
      "If multiple interviews were confirmed, return only the chronologically latest one.",
      "If the company is asking for the candidate's availability or multiple proposed interview times and no exact time is confirmed, set analysisType to candidate_time_request and candidateTimeRequest.requested to true.",
      "If the company provides a scheduling link such as Timerex or Calendly and asks the candidate to register or choose an available time, treat it as candidate_time_request unless a specific date and time are explicitly confirmed in the conversation.",
      "Use ISO 8601 with a time zone for startAt and endAt. Return an empty endAt when the conversation does not specify an end time.",
      "Write summary, title, method, location, and notes in English. Keep proper nouns in their original form. Return empty strings in latestConfirmedInterview when there is no confirmed interview, and in latestTentativeInterview when there is no tentative interview.",
      "Return only a JSON object matching the JSON Schema below. Do not return Markdown or additional commentary."
    ],
    ja: [
      "以下の採用に関する会話全文を分析し、確定した面談と、候補者が自分の予定として確保すべき面談日時を整理してください。",
      "会話内で明示されている情報だけを使用し、日付、時刻、担当者、実施方法、場所、リンクを推測・捏造しないでください。",
      "企業側が具体的な面談日時を明確に確定した場合に限り、hasConfirmedInterview を true にしてください。候補日時、都合の確認、未確定の提案は確定面談ではありません。",
      "企業側が1つ以上の具体的な日時を提示し、その後に候補者がそのうち1つの具体的な日時を明確に選択・承諾・参加すると返信した場合、企業側から再返信がなくても analysisType を tentative_interview、hasTentativeInterview を true とし、選択した日時を latestTentativeInterview に入れてください。これは候補者側で時間を確保する仮予定です。",
      "候補者が柔軟に調整できると述べただけの場合、複数の空き時間帯を提示しただけの場合、特定の1日時を選択していない場合は tentative_interview にしないでください。",
      "企業側が後からその日時を明確に確定した場合は、tentative_interview より confirmed_interview を優先してください。",
      "確定した面談が複数ある場合は、日時が最も新しいものだけを返してください。",
      "企業側が候補者の空き時間や複数の面談候補日時の提示を求めており、具体的な日時が未確定の場合、analysisType を candidate_time_request、candidateTimeRequest.requested を true にしてください。",
      "Timerex、Calendly などの予約リンクから候補者自身に空き時間の登録・選択を求めているだけで、会話内に具体的な日時の確定がない場合も、確定面談ではなく candidate_time_request と判定してください。",
      "startAt と endAt はタイムゾーンを含む ISO 8601 形式にしてください。終了時刻が明示されていない場合、endAt は空文字列にしてください。",
      "summary、title、method、location、notes は日本語で記述してください。固有名詞は原文のまま保持してください。確定面談がない場合は latestConfirmedInterview、仮予定がない場合は latestTentativeInterview のすべての文字列フィールドを空文字列にしてください。",
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

function findScheduleItemForUpdate(scheduleItems, companyId, item) {
  const targetTime = new Date(item.startAt).getTime();
  const sameTypeItems = scheduleItems.filter(existing =>
    existing.companyId === companyId &&
    (existing.type || "interview") === (item.type || "interview")
  );
  const exact = sameTypeItems.find(existing => {
    const existingTime = new Date(existing.startAt).getTime();
    return Number.isFinite(targetTime) && Number.isFinite(existingTime)
      ? existingTime === targetTime
      : existing.startAt === item.startAt;
  });
  if (exact) return exact;

  if (item.status === "confirmed" || item.status === "tentative") {
    return [...sameTypeItems]
      .filter(existing => existing.status === "tentative")
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0] || null;
  }

  return null;
}

async function requestAiAnalysis(snapshot) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ANALYSIS_TIMEOUT_MS);
  try {
    return await requestAiAnalysisWithSignal(snapshot, controller.signal);
  } catch (error) {
    if (controller.signal.aborted) {
      const timeoutError = new Error("AI analysis timed out after 90 seconds.");
      timeoutError.code = "timeout";
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function requestAiAnalysisWithSignal(snapshot, signal) {
  const ai = state.settings.ai;
  if (!ai?.url || !ai.apiKey.trim() || !ai.model.trim()) {
    throw new Error("请先在 Settings 设置 API Key。");
  }

  const prompt = analysisPrompt(snapshot);
  const systemPrompt = {
    zh: "你是为候选人本人服务的招聘对话整理助手。识别已确定面试、候选人已经选择但企业尚未确认的仮予定，以及仍需候选人回复的时间请求。所有说明文字使用中文。",
    en: "You organize recruitment conversations for the candidate. Identify confirmed interviews, tentative times explicitly selected by the candidate but not yet confirmed by the company, and requests still awaiting the candidate's reply. Write all descriptive text in English.",
    ja: "あなたは候補者本人のための採用メッセージ整理アシスタントです。確定面談、候補者が選択済みで企業確認待ちの仮予定、候補者の返信待ちの日時提示依頼を判定し、説明文はすべて日本語で記述してください。"
  }[currentLanguage()];
  let response;
  const requestConfig = resolveAiRequestConfig(ai.url);
  const protocol = requestConfig.protocol;

  if (protocol === "anthropic-messages") {
    response = await fetch(requestConfig.url, {
      method: "POST",
      signal,
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
      signal,
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
    const existing = findScheduleItemForUpdate(state.scheduleItems, company.id, item);
    if (existing) {
      Object.assign(existing, {
        title: item.title,
        startAt: item.startAt,
        endAt: item.endAt,
        status: existing.status === "confirmed" && item.status === "tentative"
          ? "confirmed"
          : item.status,
        contactName: item.contactName,
        method: item.method,
        location: item.location,
        notes: item.notes,
        platform: snapshot.platform,
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
  const durationMinutes = Math.max(15, Number(settings.durationMinutes) || 60);
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const blocked = scheduleItems
      .map(item => {
        const start = new Date(item.startAt);
        if (Number.isNaN(start.getTime())) return null;
        const savedEnd = new Date(item.endAt);
        const end = Number.isNaN(savedEnd.getTime()) || savedEnd <= start
          ? new Date(start.getTime() + durationMinutes * 60_000)
          : savedEnd;
        const blockedStart = start.getTime() - bufferMinutes * 60_000;
        const blockedEnd = end.getTime() + bufferMinutes * 60_000;
        if (blockedStart >= nextDate.getTime() || blockedEnd <= date.getTime()) return null;
        return [
          Math.max(startMinutes, Math.floor((blockedStart - date.getTime()) / 60_000)),
          Math.min(endMinutes, Math.ceil((blockedEnd - date.getTime()) / 60_000))
        ];
      })
      .filter(Boolean)
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

function buildSelectableAvailabilityDays(
  availabilityDays = buildAvailabilityDays(),
  settings = state.settings,
  referenceDate = new Date()
) {
  const durationMinutes = Math.max(15, Number(settings.durationMinutes) || 60);
  return availabilityDays.map(day => {
    const slots = [];
    for (const [windowStart, windowEnd] of day.available) {
      for (let minute = Math.ceil(windowStart / 30) * 30;
        minute + durationMinutes <= windowEnd;
        minute += 30) {
        const startAt = new Date(day.date);
        startAt.setHours(Math.floor(minute / 60), minute % 60, 0, 0);
        if (startAt <= referenceDate) continue;
        const endAt = new Date(startAt.getTime() + durationMinutes * 60_000);
        slots.push({
          id: startAt.toISOString(),
          startAt,
          endAt,
          label: `${minutesToClock(minute)}–${minutesToClock(minute + durationMinutes)}`
        });
      }
    }
    return { date: day.date, slots };
  }).filter(day => day.slots.length > 0);
}

function renderAvailableSchedule() {
  const optionsElement = document.getElementById("availabilityOptions");
  const noticeElement = document.getElementById("availabilityNotice");
  const selectionElement = document.getElementById("availabilitySelection");
  const copyButton = document.getElementById("copyAvailabilityButton");
  const limit = Math.max(1, Math.min(10, Number(state.settings.candidateCount) || 3));
  while (selectedAvailabilitySlots.size > limit) {
    selectedAvailabilitySlots.delete([...selectedAvailabilitySlots].at(-1));
  }
  const openDays = new Set([...optionsElement.querySelectorAll("details[open]")]
    .map(element => element.dataset.dayKey));
  const hadDayOptions = Boolean(optionsElement.querySelector("details"));

  if (holidayDataStatus === "idle" || holidayDataStatus === "loading") {
    noticeElement.innerHTML = `<div class="muted small">${escapeHtml(t("holidaysLoading"))}</div>`;
    optionsElement.innerHTML = "";
    availableSlotLookup = new Map();
  } else {
    noticeElement.innerHTML = holidayDataStatus === "error"
      ? `<div class="status-message warning">${escapeHtml(t("holidaysUnavailable"))}</div>`
      : "";
    const days = buildSelectableAvailabilityDays();
    availableSlotLookup = new Map(days.flatMap(day => day.slots.map(slot => [slot.id, slot])));
    for (const id of selectedAvailabilitySlots) {
      if (!availableSlotLookup.has(id)) selectedAvailabilitySlots.delete(id);
    }
    document.getElementById("availabilityDayCount").textContent = t("availableDayCount", { count: days.length });
    const dateFormatter = new Intl.DateTimeFormat(LANGUAGE_LOCALES[currentLanguage()], {
      month: "numeric", day: "numeric", weekday: "short"
    });
    optionsElement.innerHTML = days.length
      ? days.map((day, index) => {
        const dayKey = localDateKey(day.date);
        const isOpen = openDays.has(dayKey) || (!hadDayOptions && index === 0);
        return `<details class="availability-option-day" data-day-key="${dayKey}" ${isOpen ? "open" : ""}>
          <summary><span>${escapeHtml(dateFormatter.format(day.date))}</span><span class="muted small">${escapeHtml(t("availableSlotsCount", { count: day.slots.length }))}</span></summary>
          <div class="availability-option-list">${day.slots.map(slot => `
            <button class="availability-choice" type="button" data-slot-id="${escapeHtml(slot.id)}" aria-pressed="${selectedAvailabilitySlots.has(slot.id)}">${escapeHtml(slot.label)}</button>
          `).join("")}</div>
        </details>`;
      }).join("")
      : `<div class="empty">${escapeHtml(t("noSlotsAvailable"))}</div>`;
  }

  if (holidayDataStatus === "idle" || holidayDataStatus === "loading") {
    document.getElementById("availabilityDayCount").textContent = "";
  }
  const selected = [...selectedAvailabilitySlots]
    .map(id => availableSlotLookup.get(id))
    .filter(Boolean)
    .sort((a, b) => a.startAt - b.startAt);
  document.getElementById("availabilitySelectedCount").textContent = t("selectedAvailabilityCount", {
    selected: selected.length, limit
  });
  const selectedDateFormatter = new Intl.DateTimeFormat(LANGUAGE_LOCALES[currentLanguage()], {
    year: "numeric", month: "numeric", day: "numeric", weekday: "short"
  });
  selectionElement.innerHTML = selected.length
    ? selected.map(slot => `<div class="availability-selection-item">${escapeHtml(`${selectedDateFormatter.format(slot.startAt)} ${slot.label}`)}</div>`).join("")
    : `<div class="muted small">${escapeHtml(t("noSelectedAvailability"))}</div>`;
  copyButton.disabled = selected.length === 0;
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

  if (!analysis) {
    updatedElement.textContent = "";
    resultElement.innerHTML = `<div class="empty">${escapeHtml(t("analysisEmpty"))}</div>`;
    return;
  }

  updatedElement.textContent = t("updatedAt", { time: formatDateTime(analysis.createdAt) });
  const result = analysis.result || {};
  const isTentative = result.analysisType === "tentative_interview" || result.hasTentativeInterview === true;
  const interview = isTentative
    ? result.latestTentativeInterview || result.latestConfirmedInterview || {}
    : result.latestConfirmedInterview || {};

  if (result.analysisType === "candidate_time_request" || result.candidateRequest?.requested) {
    resultElement.innerHTML = `
      <div class="interview-title">${escapeHtml(t("candidateRequest"))}</div>
      <div class="interview-detail">${escapeHtml(result.summary || result.candidateRequest?.notes || "")}</div>
      ${renderAvailability()}
    `;
    return;
  }

  if (!result.hasConfirmedInterview && !isTentative) {
    resultElement.innerHTML = `
      <div class="interview-title">${escapeHtml(t("noConfirmed"))}</div>
      <div class="interview-detail">${escapeHtml(result.summary || result.eventDescription || t("noConfirmedDesc"))}</div>
    `;
    return;
  }

  const endText = interview.endAt ? ` ～ ${formatInterviewDateTime(interview.endAt)}` : "";
  resultElement.innerHTML = `
    <div class="interview-title-row">
      <div class="interview-title">${escapeHtml(interview.title || t("interview"))}</div>
      ${isTentative ? `<span class="badge warning">${escapeHtml(t("tentative"))}</span>` : ""}
    </div>
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
  const sourcePlatform = document.getElementById("sourcePlatform");
  const sourceName = document.getElementById("sourceName");
  const sourceInfo = document.getElementById("sourceInfo");
  const analyzeButton = document.getElementById("analyzeButton");
  const copyRawButton = document.getElementById("copyRawButton");

  if (!currentSnapshot) {
    sourcePlatform.innerHTML = "";
    sourcePlatform.classList.add("hidden");
    sourceName.textContent = t("unreadable");
    sourceInfo.textContent = t("openFindy");
    analyzeButton.disabled = true;
    copyRawButton.disabled = true;
    renderLatestInterview(null);
    return;
  }

  sourcePlatform.innerHTML = platformLogoMarkup(currentSnapshot.platform || currentSnapshot.source);
  sourcePlatform.classList.remove("hidden");
  sourceName.textContent = privacyText(currentSnapshot.companyName || "未识别公司");
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
  const toggleButton = document.getElementById("togglePastSchedules");
  const openItems = new Set([...list.querySelectorAll(".schedule-item[open]")]
    .map(element => element.dataset.scheduleId));
  const now = Date.now();
  const defaultDurationMs = Math.max(15, Number(state.settings.durationMinutes) || 60) * 60_000;
  const isPast = item => {
    const startAt = new Date(item.startAt).getTime();
    if (!Number.isFinite(startAt)) return false;
    const savedEndAt = new Date(item.endAt).getTime();
    const effectiveEndAt = Number.isFinite(savedEndAt) && savedEndAt > startAt
      ? savedEndAt
      : startAt + defaultDurationMs;
    return effectiveEndAt <= now;
  };
  const allItems = [...state.scheduleItems]
    .filter(item => item.startAt)
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));
  const pastCount = allItems.filter(isPast).length;
  if (!pastCount) showPastSchedules = false;
  const items = showPastSchedules ? allItems : allItems.filter(item => !isPast(item));
  toggleButton.parentElement.classList.toggle("hidden", pastCount === 0);
  toggleButton.textContent = t(showPastSchedules ? "hidePastSchedules" : "showAllSchedules");
  toggleButton.setAttribute("aria-pressed", String(showPastSchedules));
  count.textContent = t("scheduleCount", { count: items.length });

  if (items.length === 0) {
    list.innerHTML = `<div class="empty">${escapeHtml(t(allItems.length ? "scheduleUpcomingEmpty" : "scheduleEmpty"))}</div>`;
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
    const { jobUrl, messageUrl } = sourceLinksForCompany(company);
    const sourceLink = (url, label) => url
      ? `<a class="secondary-button schedule-source-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(privacyText(label))}</a>`
      : `<span class="secondary-button schedule-source-link unavailable" aria-disabled="true">${escapeHtml(privacyText(label))}</span>`;
    const sourceAnalysis = state.analyses.find(analysis => analysis.id === item.sourceAnalysisId);
    const savedInterview = sourceAnalysis?.result?.latestConfirmedInterview || {};
    const contactName = item.contactName || savedInterview.contactName || "";
    const method = item.method || savedInterview.method || "";
    const location = item.location || savedInterview.location || "";
    const notes = item.notes || savedInterview.notes || "";
    const platform = item.platform || company?.source || "Findy";
    const isTentative = item.status === "tentative";
    const isFinished = item.status === "confirmed" && isPast(item);
    const startTime = new Date(item.startAt).toLocaleTimeString(LANGUAGE_LOCALES[currentLanguage()], { hour: "2-digit", minute: "2-digit" });
    const endTime = item.endAt && item.endAt !== item.startAt
      ? new Date(item.endAt).toLocaleTimeString(LANGUAGE_LOCALES[currentLanguage()], { hour: "2-digit", minute: "2-digit" })
      : "";
    return `${heading}
      <details class="schedule-item" data-schedule-id="${escapeHtml(item.id)}" ${openItems.has(String(item.id)) ? "open" : ""}>
        <summary class="schedule-item-header">
          <div class="schedule-company-main">
            ${platformLogoMarkup(platform)}
            <div class="schedule-company">${escapeHtml(privacyText(company?.name || "未命名公司"))}</div>
          </div>
          <div class="schedule-time">
            <span class="schedule-time-start">${escapeHtml(startTime)}</span>
            ${endTime ? `<span class="schedule-time-separator">→</span><span class="schedule-time-end">${escapeHtml(endTime)}</span>` : ""}
          </div>
          ${isFinished ? `<span class="schedule-finished-stamp compact" role="img" aria-label="面談終了済">終了済</span>` : ""}
        </summary>
        ${isFinished ? `<span class="schedule-finished-stamp" role="img" aria-label="面談終了済">終了済</span>` : ""}
        <div class="schedule-item-body">
          <div class="schedule-summary">
            <div class="schedule-summary-head">
              <div class="schedule-title">${escapeHtml(item.title)}</div>
              <span class="badge ${isTentative ? "warning" : "success"}">${escapeHtml(t(isTentative ? "tentative" : "confirmed"))}</span>
            </div>
            <div class="schedule-source-links">
              ${sourceLink(jobUrl, t("jobLink"))}
              ${sourceLink(messageUrl, t("messageLink"))}
            </div>
          </div>
          ${(contactName || method || location || notes) ? `
            <div class="schedule-details">
              ${contactName ? `<div class="schedule-detail"><span class="schedule-detail-label">${escapeHtml(t("contact"))}</span><span class="schedule-detail-value">${escapeHtml(privacyText(contactName))}</span></div>` : ""}
              ${method ? `<div class="schedule-detail"><span class="schedule-detail-label">${escapeHtml(t("method"))}</span><span class="schedule-detail-value">${escapeHtml(method)}</span></div>` : ""}
              ${location ? `<div class="schedule-detail"><span class="schedule-detail-label">${escapeHtml(t("location"))}</span><span class="schedule-detail-value">${escapeHtml(privacyText(location))}</span></div>` : ""}
              ${notes ? `<div class="schedule-detail"><span class="schedule-detail-label">${escapeHtml(t("notes"))}</span><span class="schedule-detail-value">${escapeHtml(privacyText(notes))}</span></div>` : ""}
            </div>` : ""}
          <div class="schedule-actions">
            <button class="secondary-button schedule-action edit-schedule" data-schedule-id="${escapeHtml(item.id)}">${escapeHtml(t("edit"))}</button>
            <button class="danger-button schedule-action delete-schedule" data-schedule-id="${escapeHtml(item.id)}">${escapeHtml(t("delete"))}</button>
          </div>
        </div>
      </details>`;
  }).join("");
}

function calendarHolidaysForYear(year) {
  if (calendarHolidayCache.has(year)) return calendarHolidayCache.get(year);
  if (availabilityYears().includes(year)) {
    if (holidayDataStatus === "loaded") {
      const dates = new Set([...japaneseHolidayDates].filter(date => date.startsWith(`${year}-`)));
      calendarHolidayCache.set(year, dates);
      return dates;
    }
    if (holidayDataStatus === "idle" || holidayDataStatus === "loading") return undefined;
  }
  if (!calendarHolidayPending.has(year)) {
    calendarHolidayPending.add(year);
    let timeoutId;
    Promise.race([
      fetchJapaneseHolidayDates(new Date(year, 0, 1)),
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error("Japanese holiday request timed out.")), 5000);
      })
    ]).then(dates => {
      calendarHolidayCache.set(year, dates);
    }).catch(error => {
      console.warn("Calendar holidays could not be loaded.", error);
      calendarHolidayCache.set(year, null);
    }).finally(() => {
      clearTimeout(timeoutId);
      calendarHolidayPending.delete(year);
      if (scheduleViewMode === "calendar" && calendarMonth.getFullYear() === year) renderScheduleCalendar();
    });
  }
  return undefined;
}

function renderScheduleCalendar() {
  const isCalendar = scheduleViewMode === "calendar";
  document.getElementById("scheduleListPanel").classList.toggle("hidden", isCalendar);
  document.getElementById("scheduleCalendarPanel").classList.toggle("hidden", !isCalendar);
  document.getElementById("scheduleListViewButton").setAttribute("aria-pressed", String(!isCalendar));
  document.getElementById("scheduleCalendarViewButton").setAttribute("aria-pressed", String(isCalendar));
  if (!isCalendar) return;

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const locale = LANGUAGE_LOCALES[currentLanguage()];
  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}-`;
  const interviewsByDate = new Map();
  for (const item of state.scheduleItems) {
    if (!item.startAt) continue;
    const start = new Date(item.startAt);
    if (Number.isNaN(start.getTime())) continue;
    const dateKey = localDateKey(start);
    if (!dateKey.startsWith(monthPrefix)) continue;
    if (!interviewsByDate.has(dateKey)) interviewsByDate.set(dateKey, []);
    interviewsByDate.get(dateKey).push(item);
  }
  const holidayDates = calendarHolidaysForYear(year);
  const notice = document.getElementById("calendarHolidayNotice");
  setStatus(notice, holidayDates === undefined
    ? t("calendarHolidayLoading")
    : holidayDates === null ? t("calendarHolidayUnavailable") : "",
  holidayDates === null ? "warning" : "");

  document.getElementById("calendarMonthLabel").textContent = new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "long"
  }).format(calendarMonth);
  document.getElementById("calendarPreviousMonth").setAttribute("aria-label", t("previousMonth"));
  document.getElementById("calendarNextMonth").setAttribute("aria-label", t("nextMonth"));
  document.getElementById("scheduleCount").textContent = t("scheduleCount", {
    count: [...interviewsByDate.values()].reduce((total, items) => total + items.length, 0)
  });

  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "long", day: "numeric", weekday: "short"
  });
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const todayKey = localDateKey(new Date());
  const weekdayCells = Array.from({ length: 7 }, (_, index) =>
    `<div class="calendar-weekday">${escapeHtml(weekdayFormatter.format(new Date(2024, 0, 7 + index)))}</div>`);
  const dayCells = Array.from({ length: cellCount }, (_, index) => {
    const day = index - firstWeekday + 1;
    if (day < 1 || day > daysInMonth) return `<span class="calendar-empty-day" aria-hidden="true"></span>`;
    const date = new Date(year, month, day);
    const dateKey = localDateKey(date);
    const interviewCount = interviewsByDate.get(dateKey)?.length || 0;
    const isHoliday = date.getDay() === 0 || date.getDay() === 6 || (holidayDates?.has(dateKey) ?? false);
    const classes = ["calendar-day", interviewCount ? "has-interview" : "free"];
    if (isHoliday) classes.push("holiday");
    if (dateKey === todayKey) classes.push("today");
    if (dateKey === selectedCalendarDateKey) classes.push("selected");
    const label = [dateFormatter.format(date),
      t(interviewCount ? "calendarInterviewCount" : "freeDay", { count: interviewCount }),
      isHoliday ? t("holidayDay") : ""].filter(Boolean).join(" · ");
    return `<button class="${classes.join(" ")}" type="button" data-date-key="${dateKey}" aria-label="${escapeHtml(label)}" aria-pressed="${dateKey === selectedCalendarDateKey}">
      <span>${day}</span>${interviewCount ? `<span class="calendar-day-count">${interviewCount}</span>` : ""}
    </button>`;
  });
  document.getElementById("calendarGrid").innerHTML = [...weekdayCells, ...dayCells].join("");

  const detail = document.getElementById("calendarDayDetail");
  if (!selectedCalendarDateKey?.startsWith(monthPrefix)) {
    detail.textContent = t("calendarDayHint");
    return;
  }
  const selectedDate = new Date(`${selectedCalendarDateKey}T00:00:00`);
  const selectedItems = interviewsByDate.get(selectedCalendarDateKey) || [];
  const selectedIsHoliday = selectedDate.getDay() === 0 || selectedDate.getDay() === 6 || (holidayDates?.has(selectedCalendarDateKey) ?? false);
  detail.innerHTML = `<div class="calendar-day-detail-title">${escapeHtml(dateFormatter.format(selectedDate))}${selectedIsHoliday ? ` · ${escapeHtml(t("holidayDay"))}` : ""}</div>
    ${selectedItems.length ? selectedItems.map(item => {
      const company = state.companies.find(candidate => candidate.id === item.companyId);
      const start = new Date(item.startAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
      const end = item.endAt && item.endAt !== item.startAt
        ? new Date(item.endAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) : "";
      return `<div class="calendar-day-detail-item">${escapeHtml(privacyText(company?.name || t("interview")))} · ${escapeHtml(start)}${end ? `–${escapeHtml(end)}` : ""}</div>`;
    }).join("") : `<div class="muted">${escapeHtml(t("freeDay"))}</div>`}`;
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
  document.getElementById("privacyMode").setAttribute("aria-checked", String(Boolean(state.settings.privacyMode)));
  document.getElementById("apiUrl").value = state.settings.ai?.url || "";
  document.getElementById("apiKey").value = state.settings.ai?.apiKey || "";
  document.getElementById("model").value = state.settings.ai?.model || "";
  document.getElementById("language").value = currentLanguage();
  document.getElementById("availableFrom").value = state.settings.availableFrom;
  document.getElementById("availableTo").value = state.settings.availableTo;
  document.getElementById("durationMinutes").value = state.settings.durationMinutes;
  document.getElementById("candidateCount").value = state.settings.candidateCount;
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
  renderScheduleCalendar();
  renderAvailableSchedule();
  renderSettings();
  return renderBackgroundJobState();
}

function requestBackgroundJob(jobId) {
  if (!jobId || requestedBackgroundJobs.has(jobId)) return;
  requestedBackgroundJobs.add(jobId);
  chrome.runtime.sendMessage({ type: "runAnalysisJob", jobId })
    .then(response => {
      if (response?.status === "running") return;
      requestedBackgroundJobs.delete(jobId);
      const failureMessage = response?.status === "success"
        ? "Analysis finished, but its result was not saved. Please retry."
        : response?.error || "Background analysis did not complete. Please retry.";
      return refreshBackgroundJob(jobId, failureMessage);
    })
    .catch(error => {
      requestedBackgroundJobs.delete(jobId);
      return refreshBackgroundJob(jobId, error.message || "Background analysis could not start.");
    });
}

async function refreshBackgroundJob(jobId, failureMessage = "", quiet = false) {
  const previousState = state;
  try {
    const storedState = await loadState();
    if (state !== previousState) return;
    if (quiet &&
        storedState.analysisJob?.id === previousState.analysisJob?.id &&
        storedState.analysisJob?.status === previousState.analysisJob?.status &&
        storedState.analysisJob?.completedAt === previousState.analysisJob?.completedAt) {
      if (analysisTimeoutTimer && state.analysisJob?.id === jobId) {
        analysisPollTimer = setTimeout(() => refreshBackgroundJob(jobId, "", true), 1500);
      }
      return;
    }
    state = storedState;
  } catch (error) {
    failureMessage = error.message || failureMessage || "Could not read analysis state.";
  }
  if (state.analysisJob?.id === jobId && state.analysisJob.status === "analyzing" && failureMessage) {
    backgroundJobFailures.set(jobId, failureMessage);
  }
  renderAll();
}

function renderBackgroundJobState() {
  clearTimeout(analysisTimeoutTimer);
  analysisTimeoutTimer = null;
  clearTimeout(analysisPollTimer);
  analysisPollTimer = null;
  const job = state.analysisJob;
  if (!job || !currentSnapshot) {
    setAnalysisLoading(false);
    return false;
  }
  const jobIdentity = conversationIdentity(job.conversationKey);
  if (jobIdentity
    ? jobIdentity !== conversationIdentity(currentSnapshot.conversationKey)
    : job.conversationKey !== currentSnapshot.conversationKey) {
    setAnalysisLoading(false);
    return false;
  }

  const status = document.getElementById("analyzeStatus");
  const button = document.getElementById("analyzeButton");
  if (job.status === "analyzing") {
    const backgroundError = backgroundJobFailures.get(job.id);
    if (backgroundError) {
      setAnalysisLoading(false);
      button.disabled = currentSnapshot.messages.length === 0;
      setStatus(status, backgroundError, "error");
      return true;
    }
    const savedDeadline = new Date(job.expiresAt).getTime();
    const deadline = Number.isFinite(savedDeadline)
      ? savedDeadline
      : new Date(job.startedAt).getTime() + ANALYSIS_TIMEOUT_MS;
    if (!Number.isFinite(deadline) || Date.now() >= deadline) {
      requestedBackgroundJobs.delete(job.id);
      setAnalysisLoading(false);
      button.disabled = currentSnapshot.messages.length === 0;
      setStatus(status, t("analysisTimeout"), "error");
      return true;
    }
    analysisTimeoutTimer = setTimeout(() => renderAll(), deadline - Date.now());
    analysisPollTimer = setTimeout(() => refreshBackgroundJob(job.id, "", true), 1500);
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
  backgroundJobFailures.delete(job.id);
  setAnalysisLoading(false);
  button.disabled = currentSnapshot.messages.length === 0;
  if (job.status === "error") {
    setStatus(status, job.errorCode === "timeout" ? t("analysisTimeout") : job.error || "AI request failed.", "error");
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

  if (!tab?.id || !isSupportedConversationUrl(tab.url)) {
    throw new Error("当前页面不是受支持的 Findy 或 BizReach 对话页面。");
  }

  button.disabled = true;
  setStatus(status, t("reading"));

  const rawSnapshot = await extractConversationSnapshot(tab.id);
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
    expiresAt: new Date(Date.now() + ANALYSIS_TIMEOUT_MS).toISOString(),
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
  if (viewName === "schedule") {
    renderSchedule();
    renderScheduleCalendar();
  }
  if (viewName === "availability") renderAvailableSchedule();
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

    if (!tab?.id || !isSupportedConversationUrl(tab.url)) {
      currentSnapshot = null;
      currentCompanyId = null;
      renderAll();
      setStatus(status, t("unsupported"), "warning");
      return;
    }

    const nextSnapshot = normalizeSnapshot(await extractConversationSnapshot(tab.id));
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

  document.getElementById("scheduleListViewButton").addEventListener("click", () => {
    scheduleViewMode = "list";
    renderSchedule();
    renderScheduleCalendar();
  });
  document.getElementById("scheduleCalendarViewButton").addEventListener("click", () => {
    scheduleViewMode = "calendar";
    renderScheduleCalendar();
  });
  document.getElementById("calendarPreviousMonth").addEventListener("click", () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
    selectedCalendarDateKey = null;
    renderScheduleCalendar();
  });
  document.getElementById("calendarNextMonth").addEventListener("click", () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
    selectedCalendarDateKey = null;
    renderScheduleCalendar();
  });
  document.getElementById("calendarGrid").addEventListener("click", event => {
    const button = event.target.closest("button[data-date-key]");
    if (!button) return;
    selectedCalendarDateKey = button.dataset.dateKey;
    renderScheduleCalendar();
  });

  document.getElementById("refreshAvailabilityButton").addEventListener("click", async () => {
    const button = document.getElementById("refreshAvailabilityButton");
    const status = document.getElementById("availabilityRefreshStatus");
    button.disabled = true;
    try {
      state = await loadState();
      applyTranslations();
      renderSchedule();
      renderScheduleCalendar();
      renderAvailableSchedule();
      renderSettings();
      setStatus(status, t("availabilityRefreshed", {
        count: state.scheduleItems.filter(item => item.startAt).length,
        time: formatDateTime(new Date().toISOString())
      }), "success");
    } catch (error) {
      setStatus(status, error.message || String(error), "error");
    } finally {
      button.disabled = false;
    }
  });

  document.getElementById("availabilityOptions").addEventListener("click", event => {
    const button = event.target.closest(".availability-choice");
    if (!button || !availableSlotLookup.has(button.dataset.slotId)) return;
    const id = button.dataset.slotId;
    const limit = Math.max(1, Math.min(10, Number(state.settings.candidateCount) || 3));
    const status = document.getElementById("availabilityStatus");
    if (selectedAvailabilitySlots.has(id)) {
      selectedAvailabilitySlots.delete(id);
    } else if (selectedAvailabilitySlots.size >= limit) {
      setStatus(status, t("selectLimit", { count: limit }), "warning");
      return;
    } else {
      selectedAvailabilitySlots.add(id);
    }
    renderAvailableSchedule();
    setStatus(status, "");
  });

  document.getElementById("copyAvailabilityButton").addEventListener("click", async () => {
    renderAvailableSchedule();
    const selected = [...selectedAvailabilitySlots]
      .map(id => availableSlotLookup.get(id))
      .filter(Boolean)
      .sort((a, b) => a.startAt - b.startAt);
    const status = document.getElementById("availabilityStatus");
    if (!selected.length) {
      setStatus(status, t("noSelectedAvailability"), "warning");
      return;
    }
    const dateFormatter = new Intl.DateTimeFormat(LANGUAGE_LOCALES[currentLanguage()], {
      year: "numeric", month: "numeric", day: "numeric", weekday: "short"
    });
    const text = selected.map(slot => `${dateFormatter.format(slot.startAt)} ${slot.label}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setStatus(status, t("copiedAvailability"), "success");
    } catch (error) {
      setStatus(status, error.message || String(error), "error");
    }
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
      setAnalysisLoading(false);
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

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !changes[STORAGE_KEY]) return;
    const saved = changes[STORAGE_KEY].newValue;
    if (!saved || saved.schemaVersion !== CURRENT_SCHEMA_VERSION) return;
    state = normalizeStoredState(saved);
    renderAll();
  });

  document.getElementById("privacyMode").addEventListener("click", async event => {
    state.settings.privacyMode = !state.settings.privacyMode;
    event.currentTarget.setAttribute("aria-checked", String(state.settings.privacyMode));
    renderAnalyze();
    renderSchedule();
    renderScheduleCalendar();
    const status = document.getElementById("privacyStatus");
    try {
      await saveState();
      setStatus(status, t("settingsSaved"), "success");
    } catch (error) {
      setStatus(status, t("privacyNotSaved"), "error");
    }
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
    const availableFrom = document.getElementById("availableFrom").value;
    const availableTo = document.getElementById("availableTo").value;
    const durationMinutes = Number(document.getElementById("durationMinutes").value);
    const candidateCount = Number(document.getElementById("candidateCount").value);
    const bufferMinutes = Number(document.getElementById("defaultBuffer").value);
    const status = document.getElementById("settingsStatus");
    if (clockToMinutes(availableFrom, -1) < 0 ||
        clockToMinutes(availableTo, -1) <= clockToMinutes(availableFrom, -1) ||
        !Number.isInteger(durationMinutes) || durationMinutes < 15 || durationMinutes > 240 ||
        !Number.isInteger(candidateCount) || candidateCount < 1 || candidateCount > 10 ||
        !Number.isInteger(bufferMinutes) || bufferMinutes < 0) {
      setStatus(status, t("invalidAvailabilitySettings"), "error");
      return;
    }
    const previousSettings = state.settings;
    state.settings = {
      ...state.settings,
      availableFrom,
      availableTo,
      durationMinutes,
      candidateCount,
      bufferMinutes
    };
    try {
      await saveState();
      renderAll();
      setStatus(status, t("settingsSaved"), "success");
    } catch (error) {
      state.settings = previousSettings;
      setStatus(status, error.message || String(error), "error");
    }
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
      selectedAvailabilitySlots.clear();
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
    selectedAvailabilitySlots.clear();
    currentCompanyId = null;
    renderAll();
    setStatus(document.getElementById("dataStatus"), t("dataCleared"), "success");
  });

  document.getElementById("togglePastSchedules").addEventListener("click", () => {
    showPastSchedules = !showPastSchedules;
    renderSchedule();
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
    conversationIdentity,
    deleteAnalysisRecord,
    extractConversationSnapshot,
    fetchJapaneseHolidayDates,
    findScheduleItemForUpdate,
    findCompanyByConversation,
    loadMockPreview,
    normalizeImportedState,
    normalizeAnalysisResult,
    normalizeSnapshotForAnalysis,
    normalizeSourceLink,
    parseConversationPageUrl,
    platformLogoMarkup,
    readJsonResponse,
    resolveAiRequestConfig,
    saveSnapshotMessages,
    sourceLinksForCompany,
    testAiConnection
  };
}
