const test = require("node:test");
const assert = require("node:assert/strict");

const {
  deleteAnalysisRecord,
  normalizeSnapshotForAnalysis,
  readJsonResponse,
  resolveAiRequestConfig
} = require("./popup.js");

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
