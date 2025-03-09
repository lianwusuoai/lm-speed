"use client";
import { type SpeedTestResult } from "@/db/schema";
import { useTranslations } from "next-intl";

type SpeedTestResultCard = SpeedTestResult & {
  status?: "pending" | "running" | "completed";
};

interface Props {
  results: SpeedTestResultCard[];
  expandedIndex: number | null;
  streamContents: {
    [key: number]: string;
  };
}

export function ResultsList({ results, expandedIndex, streamContents }: Props) {
  const t = useTranslations("SpeedTest");
  const tRank = useTranslations("rank");

  return (
    <>
      <h2 className="text-xl text-center font-bold mb-4">
        {t("results.title")}
      </h2>
      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              result.status === "running"
                ? "bg-blue-50"
                : result.status === "completed"
                ? "bg-gray-200"
                : "bg-gray-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-gray-700 font-medium mb-1">
                  {t("results.prompt")}: {result.prompt}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {t("results.model")}: {result.model}
                </p>
              </div>
              <div className="ml-4">
                {result.status === "pending" && (
                  <span className="text-gray-500">
                    {t("results.status.pending")}
                  </span>
                )}
                {result.status === "running" && (
                  <span className="text-blue-400">
                    {t("results.status.running")}
                  </span>
                )}
                {result.status === "completed" && (
                  <span className="text-green-400">
                    {t("results.status.completed")}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-12">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("results.metrics.firstTokenLatency")}
                </p>
                <p className="text-gray-700">
                  {result.status === "completed"
                    ? `${(result.firstTokenLatency / 1000).toFixed(2)} s`
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("results.metrics.totalTime")}
                </p>
                <p className="text-gray-700">
                  {result.status === "completed"
                    ? `${(result.totalTime / 1000).toFixed(2)} s`
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {tRank("table.avgTokens")}
                </p>
                <p className="text-gray-700">
                  {result.status === "completed" || expandedIndex === index
                    ? `${result.tokensPerSecond.toFixed(2)} t/s (${
                        result.outputToken
                      }/${(result.outputTime / 1000).toFixed(2)}s)`
                    : "-"}
                </p>
              </div>
            </div>

            <div
              id={`content-${index}`}
              className={`max-h-96 overflow-y-auto mt-4 p-4 bg-white rounded-lg ${
                expandedIndex === index ? "block" : "hidden"
              }`}
            >
              <h4 className="text-gray-700 font-medium mb-2">
                {t("results.output.title")}:
              </h4>
              <div className="whitespace-pre-wrap font-mono text-sm">
                {streamContents[index] ||
                  (result.status === "pending"
                    ? t("results.output.waiting")
                    : t("results.output.loading"))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
