importScripts("popup.js");

const runningAnalysisJobs = new Set();

async function runAnalysisJob(jobId) {
  if (!jobId) return { status: "error", error: "Missing analysis job ID." };
  if (runningAnalysisJobs.has(jobId)) return { status: "running" };
  runningAnalysisJobs.add(jobId);

  try {
    state = await loadState();
    const job = state.analysisJob;
    if (!job || job.id !== jobId || job.status !== "analyzing") return { status: "ignored" };
    if (!job.snapshot) throw new Error("Saved conversation is missing. Please analyze again.");

    const snapshot = job.snapshot;
    const result = await requestAiAnalysis(snapshot);

    state = await loadState();
    if (state.analysisJob?.id !== jobId || state.analysisJob.status !== "analyzing") return { status: "ignored" };

    const company = upsertCompany(snapshot);
    const savedMessages = saveSnapshotMessages(snapshot, company);
    const analysis = addAnalysis(company, snapshot, savedMessages, result);
    analysis.jobId = jobId;
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
    return { status: "success", analysisId: analysis.id };
  } catch (error) {
    console.error("Background analysis failed.", error);
    try {
      state = await loadState();
      if (state.analysisJob?.id !== jobId || state.analysisJob.status !== "analyzing") return { status: "ignored" };
      state.analysisJob = {
        ...state.analysisJob,
        status: "error",
        completedAt: new Date().toISOString(),
        errorCode: error.code || "request_failed",
        error: error.message || "AI request failed."
      };
      await saveState();
    } catch (storageError) {
      console.error("Could not save analysis error.", storageError);
    }
    return { status: "error", error: error.message || "AI request failed." };
  } finally {
    runningAnalysisJobs.delete(jobId);
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "runAnalysisJob") return false;
  runAnalysisJob(message.jobId)
    .then(sendResponse)
    .catch(error => sendResponse({ status: "error", error: error.message || "Background analysis failed." }));
  return true;
});
