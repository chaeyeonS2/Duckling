import { DynamicIcon } from "@/components/Icon";
import AlertModal from "@/components/modal/AlertModal";
import BaseModal from "@/components/modal/BaseModal";
import { useEffect } from "react";
import { overlays } from "./overlays";

interface AsyncModalOptions<T> {
  progress?: string | React.FC<{ overlayId: number }> | JSX.Element | null;
  success?: string | React.FC<{ overlayId: number }> | JSX.Element | null;
  failure?: string | React.FC<{ overlayId: number }> | JSX.Element | null;
  onFailed?: (e: unknown) => void;
  onSucceed?: (result: T) => void;
}

function resolvesModal(
  def: "progress" | "success" | "failure",
  overlayId: number,
  ComponentOrParam: string | React.FC<{ overlayId: number }> | JSX.Element | null
) {
  return typeof ComponentOrParam === "string" ? (
    def == "progress" ? (
      <BaseModal overlayId={overlayId} title={ComponentOrParam} />
    ) : def == "success" ? (
      <AlertModal
        overlayId={overlayId}
        logoImgSrc={<DynamicIcon id="check" size="medium" />}
        title={ComponentOrParam}
      />
    ) : (
      <AlertModal
        overlayId={overlayId}
        logoImgSrc={<DynamicIcon id="warning" size="medium" />}
        title={ComponentOrParam}
        description="잠시 후 다시 시도해주세요"
      />
    )
  ) : typeof ComponentOrParam === "function" ? (
    <ComponentOrParam overlayId={overlayId} />
  ) : (
    ComponentOrParam
  );
}

/**
 * 비동기 작업에 대한 세 종류의 모달을 보여줍니다.
 */
export default async function showAsyncModal<T>(
  asyncCallback: Promise<T>,
  {
    progress: Progress = "잠시만 기다려주세요",
    success: Success = "성공적으로 완료되었습니다",
    failure: Failure = "실패했습니다",
    onFailed = () => {},
    onSucceed = () => {},
  }: AsyncModalOptions<T> = {
    progress: "잠시만 기다려주세요",
    success: "성공적으로 완료되었습니다",
    failure: "예기치 못한 오류로 인해 실패했습니다",
    onFailed: () => {},
    onSucceed: () => {},
  }
): Promise<{ result: T | null; error: unknown | null }> {
  return new Promise(async (res) => {
    const progressOverlayId = overlays.open(({ overlayId }) => resolvesModal("progress", overlayId, Progress));

    const result = await Promise.resolve(asyncCallback)
      .then((result) => ({ result }))
      .catch((error: unknown) => ({ error }));
    overlays.close(progressOverlayId);
    if ("result" in result) {
      onSucceed(result.result);
      overlays.open(({ overlayId }) => {
        useEffect(() => {
          setTimeout(() => {
            overlays.close(overlayId);
          }, 1500);
        }, []);
        return resolvesModal("success", overlayId, Success);
      });
      res({ result: result.result, error: null });
    } else {
      console.log(result);
      onFailed(result.error);
      overlays.open(({ overlayId }) => resolvesModal("failure", overlayId, Failure));
      res({ result: null, error: result.error });
    }
  });
}
