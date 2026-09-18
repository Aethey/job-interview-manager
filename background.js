importScripts("popup.js");

const runningAnalysisJobs = new Set();

async function runAnalysisJob(jobId) {
  if (!jobId || runningAnalysisJobs.has(jobId)) return;
  runningAnalysisJobs.add(jobId);

  try {
    state = await loadState();
    const job = state.analysisJob;
    if (!job || job.id !== jobId || job.status !== "analyzing" || !job.snapshot) return;

    const snapshot = job.snapshot;
    const result = await requestAiAnalysis(snapshot);

    state = await loadState();
    if (state.analysisJob?.id !== jobId || state.analysisJob.status !== "analyzing") return;

    const company = upsertCompany(snapshot);
    saveSnapshotMessages(snapshot, company);
    const analysis = addAnalysis(company, snapshot, snapshot.messages, result);
    state.analysisJob = {
      id: jobId,
      status: "success",
      conversationKey: snapshot.conversationKey,
      messageCount: snapshot.messages.length,
      startedAt: job.startedAt,
      completedAt: new Date().toISOString(),
      analysisId: analysis.id
    };
    await saveState();
  } catch (error) {
    console.error("Background analysis failed.", error);
    state = await loadState();
    if (state.analysisJob?.id !== jobId) return;
    state.analysisJob = {
      id: jobId,
      status: "error",
      conversationKey: state.analysisJob.conversationKey,
      messageCount: state.analysisJob.messageCount,
      startedAt: state.analysisJob.startedAt,
      completedAt: new Date().toISOString(),
      error: error.message || "AI request failed."
    };
    await saveState();
  } finally {
    runningAnalysisJobs.delete(jobId);
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "runAnalysisJob") return false;
  runAnalysisJob(message.jobId);
  sendResponse({ accepted: true });
  return false;
});
