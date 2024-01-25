import { DynamicIcon } from "@/components/Icon";
import AlertModal from "@/components/modal/AlertModal";
import BaseModal from "@/components/modal/BaseModal";
import { useEffect } from "react";
import { overlays } from "./overlays";

interface AsyncModalOptions<T> {
  progress?: string | JSX.Element | null;
  sucessed?: string | JSX.Element | null;
  failed?: string | JSX.Element | null;
  onFailed?: (e: unknown) => void;
  onSuccessed?: (result: T) => void;
}

/**
 * 비동기 작업에 대한 세 종류의 모달을 보여줍니다.
 *
 * @param asyncCallback
 * @returns
 */
export default async function showAsyncModal<T>(
  asyncCallback: Promise<T>,
  {
    progress = "잠시만 기다려주세요",
    sucessed = "성공적으로 완료되었습니다",
    failed = "실패했습니다",
    onFailed = () => {},
    onSuccessed = () => {},
  }: AsyncModalOptions<T> = {
    progress: "잠시만 기다려주세요",
    sucessed: "성공적으로 완료되었습니다",
    failed: "예기치 못한 오류로 인해 실패했습니다",
    onFailed: () => {},
    onSuccessed: () => {},
  }
): Promise<{ result: T | null; error: Error | null }> {
  return new Promise(async (res) => {
    const overlayId = overlays.open(() => (typeof progress === "string" ? <BaseModal title={progress} /> : progress));

    const result = await Promise.resolve(asyncCallback)
      .then((result) => ({ result }))
      .catch((error: Error) => ({ error }));

    overlays.close(overlayId);
    if ("result" in result) {
      onSuccessed(result.result);
      overlays.open(({ overlayId: successOverlayId }) => {
        useEffect(() => {
          setTimeout(() => {
            overlays.close(successOverlayId);
          }, 3000);
        }, []);
        return typeof sucessed === "string" ? (
          <AlertModal
            logoImgSrc={<DynamicIcon id="check" size="medium" />}
            title={sucessed}
            onClose={() => {
              overlays.close(successOverlayId);
            }}
          />
        ) : (
          sucessed
        );
      });
      res({ result: result.result, error: null });
    } else {
      onFailed(result.error);
      overlays.open(({ overlayId: failOverlayId }) =>
        typeof failed === "string" ? (
          <AlertModal
            logoImgSrc={<DynamicIcon id="warning" size="medium" />}
            title={failed}
            description="잠시 후 다시 시도해주세요"
            onClose={() => {
              overlays.close(failOverlayId);
            }}
          />
        ) : (
          failed
        )
      );
      res({ result: null, error: result.error });
    }
  });
}
