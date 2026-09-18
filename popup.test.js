const test = require("node:test");
const assert = require("node:assert/strict");
const mockData = require("./mock-data.json");

const {
  buildAvailabilityDays,
  createExportPayload,
  createMockPreview,
  deleteAnalysisRecord,
  fetchJapaneseHolidayDates,
  normalizeImportedState,
  normalizeSnapshotForAnalysis,
  readJsonResponse,
  resolveAiRequestConfig,
  testAiConnection
} = require("./popup.js");

test("mock JSON renders companies a, b, and c with a confirmed interview on tab 1", () => {
  const preview = createMockPreview(mockData);

  assert.equal(preview.snapshot.companyName, "会社a");
  assert.equal(preview.snapshot.messages.length, 4);
  assert.deepEqual(preview.state.companies.map(company => company.name), ["会社a", "会社b", "会社c"]);
  assert.equal(preview.state.companies[0].contactName, "人事a");
  assert.equal(preview.state.analyses[0].result.analysisType, "confirmed_interview");
  assert.equal(preview.state.analyses[0].result.latestConfirmedInterview.title, "一次面談");
  assert.equal(preview.state.analyses[0].result.latestConfirmedInterview.method, "オンライン");
  assert.equal(preview.state.settings.language, "ja");
  assert.equal(preview.state.scheduleItems.length, 3);
});

test("candidate availability excludes weekends and Japanese public holidays", () => {
  const days = buildAvailabilityDays(
    [],
    { availableFrom: "10:00", availableTo: "19:00", bufferMinutes: 60 },
    new Date(2026, 8, 18, 12, 0, 0),
    new Set(["2026-09-21"])
  );

  assert.equal(days.length, 9);
  assert.equal(days.some(day => day.date.getDay() === 0 || day.date.getDay() === 6), false);
  assert.equal(days.some(day => (
    day.date.getFullYear() === 2026 &&
    day.date.getMonth() === 8 &&
    day.date.getDate() === 21
  )), false);
});

test("holiday loading requests both years when the two-week range crosses New Year", async () => {
  const requestedUrls = [];
  const holidays = await fetchJapaneseHolidayDates(
    new Date(2026, 11, 25, 12, 0, 0),
    async url => {
      requestedUrls.push(url);
      const year = url.includes("/2026.json") ? 2026 : 2027;
      return {
        ok: true,
        status: 200,
        json: async () => year === 2026
          ? { "2026-12-31": "test" }
          : { "2027-01-01": "元日" }
      };
    }
  );

  assert.deepEqual(requestedUrls, [
    "https://api.jp-calendar.com/v1/holidays/2026.json",
    "https://api.jp-calendar.com/v1/holidays/2027.json"
  ]);
  assert.equal(holidays.has("2026-12-31"), true);
  assert.equal(holidays.has("2027-01-01"), true);
});

test("exported data can be imported without losing stored records or settings", () => {
  const original = {
    schemaVersion: 2,
    companies: [{ id: "company-1", name: "测试公司" }],
    messages: [{ id: "message-1", companyId: "company-1", text: "面谈消息" }],
    analyses: [{ id: "analysis-1", companyId: "company-1" }],
    scheduleItems: [{ id: "schedule-1", companyId: "company-1" }],
    analysisJob: null,
    settings: {
      language: "ja",
      ai: { url: "https://api.example/v1", apiKey: "secret", model: "model-1" },
      availableFrom: "09:00",
      availableTo: "18:00",
      bufferMinutes: 30
    }
  };

  const payload = createExportPayload(original, "2026-09-18T00:00:00.000Z");
  const imported = normalizeImportedState(JSON.parse(JSON.stringify(payload)));

  assert.deepEqual(imported.companies, original.companies);
  assert.deepEqual(imported.messages, original.messages);
  assert.deepEqual(imported.analyses, original.analyses);
  assert.deepEqual(imported.scheduleItems, original.scheduleItems);
  assert.equal(imported.settings.language, "ja");
  assert.equal(imported.settings.ai.apiKey, "secret");
});

test("import rejects unrelated JSON data", () => {
  assert.throws(
    () => normalizeImportedState({ companies: [] }),
    /Invalid backup format/
  );
});

function snapshot(companyName) {
  return {
    source: "Findy",
    platform: "Findy",
    url: "https://findy-code.io/matches/new-chat?page=1",
    baseConversationKey: "https://findy-code.io/matches/new-chat?page=1",
    conversationKey: `https://findy-code.io/matches/new-chat?page=1::${companyName}`,
    companyName,
    messages: []
  };
}

test("an untouched company field does not overwrite a newly selected conversation", () => {
  const result = normalizeSnapshotForAnalysis(snapshot("新公司"), "旧公司", false);

  assert.equal(result.companyName, "新公司");
});

test("a company name explicitly edited by the user remains an override", () => {
  const result = normalizeSnapshotForAnalysis(snapshot("识别结果"), "手动修正公司", true);

  assert.equal(result.companyName, "手动修正公司");
});

test("an OpenAI-compatible v1 base URL resolves to the chat completions endpoint", () => {
  const config = resolveAiRequestConfig("https://provider.example/v1");

  assert.equal(config.url, "https://provider.example/v1/chat/completions");
  assert.equal(config.protocol, "openai-chat");
});

test("an Anthropic v1 base URL resolves to the messages endpoint", () => {
  const config = resolveAiRequestConfig("https://api.anthropic.com/v1");

  assert.equal(config.url, "https://api.anthropic.com/v1/messages");
  assert.equal(config.protocol, "anthropic-messages");
});

test("connection test sends a minimal OpenAI-compatible request with the entered model and key", async () => {
  let captured;
  const result = await testAiConnection(
    { url: "https://provider.example/v1", apiKey: "test-key", model: "test-model" },
    async (url, options) => {
      captured = { url, options };
      return { ok: true, status: 200, text: async () => '{"choices":[]}' };
    }
  );

  assert.equal(captured.url, "https://provider.example/v1/chat/completions");
  assert.equal(captured.options.headers.Authorization, "Bearer test-key");
  assert.equal(JSON.parse(captured.options.body).model, "test-model");
  assert.equal(result.protocol, "openai-chat");
});

test("connection test uses Anthropic headers and request shape", async () => {
  let captured;
  const result = await testAiConnection(
    { url: "https://api.anthropic.com/v1", apiKey: "anthropic-key", model: "claude-test" },
    async (url, options) => {
      captured = { url, options };
      return { ok: true, status: 200, text: async () => '{"content":[]}' };
    }
  );

  assert.equal(captured.url, "https://api.anthropic.com/v1/messages");
  assert.equal(captured.options.headers["x-api-key"], "anthropic-key");
  assert.equal(JSON.parse(captured.options.body).max_tokens, 8);
  assert.equal(result.protocol, "anthropic-messages");
});

test("connection test surfaces provider errors", async () => {
  await assert.rejects(
    testAiConnection(
      { url: "https://provider.example/v1", apiKey: "bad-key", model: "test-model" },
      async () => ({
        ok: false,
        status: 401,
        text: async () => '{"error":{"message":"Invalid API key"}}'
      })
    ),
    /Invalid API key/
  );
});

test("empty 404 errors identify the sanitized endpoint without exposing query credentials", async () => {
  const config = resolveAiRequestConfig(
    "https://provider.example/v1/chat/completions?key=secret-value"
  );
  const response = { status: 404, text: async () => "" };

  await assert.rejects(
    readJsonResponse(response, config),
    error => {
      assert.match(error.message, /https:\/\/provider\.example\/v1\/chat\/completions/);
      assert.doesNotMatch(error.message, /secret-value/);
      return true;
    }
  );
});

test("deleting the latest analysis restores the previous company state and removes derived schedules", () => {
  const testState = {
    companies: [{
      id: "company-1",
      name: "测试公司",
      stage: "最新阶段",
      status: "waiting_user",
      nextAction: "最新动作",
      needsUserAction: true,
      lastUpdatedAt: "2026-09-18T11:00:00.000Z"
    }],
    messages: [],
    analyses: [
      {
        id: "analysis-old",
        companyId: "company-1",
        createdAt: "2026-09-18T10:00:00.000Z",
        result: {
          companyName: "测试公司",
          contactName: "旧联系人",
          stage: "旧阶段",
          status: "waiting_company",
          nextAction: "等待回复",
          needsUserAction: false
        }
      },
      {
        id: "analysis-new",
        companyId: "company-1",
        createdAt: "2026-09-18T11:00:00.000Z",
        result: {
          companyName: "测试公司",
          contactName: "新联系人",
          stage: "最新阶段",
          status: "waiting_user",
          nextAction: "最新动作",
          needsUserAction: true
        }
      }
    ],
    scheduleItems: [
      { id: "schedule-old", sourceAnalysisId: "analysis-old" },
      { id: "schedule-new", sourceAnalysisId: "analysis-new" }
    ]
  };

  const result = deleteAnalysisRecord(testState, "analysis-new");

  assert.equal(result.deleted, true);
  assert.deepEqual(testState.analyses.map(item => item.id), ["analysis-old"]);
  assert.deepEqual(testState.scheduleItems.map(item => item.id), ["schedule-old"]);
  assert.equal(testState.companies[0].stage, "旧阶段");
  assert.equal(testState.companies[0].status, "waiting_company");
  assert.equal(testState.companies[0].nextAction, "等待回复");
  assert.equal(testState.companies[0].lastUpdatedAt, "2026-09-18T10:00:00.000Z");
});
